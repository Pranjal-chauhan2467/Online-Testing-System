from django.http import JsonResponse
from django.contrib.auth.hashers import make_password, check_password
from .models import User,Question,Exam,UserAnswer
import json
from django.views.decorators.csrf import csrf_exempt
@csrf_exempt
def register(request):
     if request.method=="POST":
        try:
          data=json.loads(request.body)
          full_name=data["full_name"]
          username=data["username"]
          email=data["email"]
          password=data["password"]
          if User.objects.filter(username=username):
                  return JsonResponse({'message':"username already exist"},status=400)
          if User.objects.filter(email=email):
                return JsonResponse({'message':'email already exist'},status=400)
          User.objects.create(
               full_name=full_name,
               username=username,
               email=email,
               password=password,
               role="Learner"
          )
          return JsonResponse({'message':"User Register successfully"},status=200)
        except json.JSONDecodeError:
             return JsonResponse({'message':'invalid json'},status=400)
     return JsonResponse({'message':"invalid request method"},status=400) 
@csrf_exempt
def login(request):
     if request.method=="POST":
          data=json.loads(request.body)
          username=data["username"]
          password=data["password"]
          try:
               user=User.objects.get(username=username)
               if password==user.password:
                    request.session["user_id"]=user.id
                    request.session["role"]=user.role
                    return JsonResponse({'message':"login successful",
                                         "role":user.role},status=200)
               else:
                return JsonResponse({
                    "message": "Incorrect Password"
                },status=400)
          except User.DoesNotExist:
               return JsonResponse({
                    'message':"user does not found"
               },status=400)

     return JsonResponse({
        "message": "Invalid Request"
    },status=400)
@csrf_exempt
def logout(request):
     request.session.flush()
     return JsonResponse({'message':'logout successful'})
def view_users(request):
    if request.session.get("role") != "Admin":
        return JsonResponse({
            "message": "Access Denied"
        }, status=400)
    users = User.objects.all().values(
        "id",
        "full_name",
        "username",
        "email",
        "role"
        )
    return JsonResponse({
        "users": list(users)
    })

def check_session(request):
    if "user_id" in request.session:
        return JsonResponse({
            "logged_in": True,
            "role": request.session["role"]
        })
    return JsonResponse({
        "logged_in": False
    })


def login_required(view_function):

     def authenticate(request,*args,**kwargs):
                  if "user_id" not in request.session:
                   return JsonResponse({
                   "message": "Please Login"
                   })

                  return view_function(request, *args, **kwargs)
     return authenticate
@csrf_exempt
@login_required
def addQuestion(request):
     if request.method=="POST":
          if request.session["role"] != "Admin":
            return JsonResponse({
                 "message": "Access Denied"
           })
          data=json.loads(request.body)
          question= data["question"]
          option1= data["option1"]
          option2= data["option2"]
          option3= data["option3"]
          option4= data["option4"]
          correct_option=data["correct_option"]

          if Question.objects.filter(question=question).exists():
           return JsonResponse({
             "message": "Question already exists"
          }, status=400)

          Question.objects.create(question=question,option1=option1,option2=option2,option3=option3,option4=option4,correct_option=correct_option)

          return JsonResponse({
            "message": "Question Added Successfully"
          },status=200)

     return JsonResponse({"message":
                          "invalid method"},status=400)
@login_required
def viewQuestion(request):
     if request.session["role"] != "Admin":
                 return JsonResponse({
                      "message": "Access Denied"
                })
     questions=Question.objects.all().values()
     return JsonResponse({"questions":list(questions)})

@csrf_exempt
@login_required
def updateQuestion(request, id):

    if request.method == "POST":

        if request.session["role"] != "Admin":
            return JsonResponse({
                "message": "Access Denied"
            })
        data=json.loads(request.body)
        question = Question.objects.get(id=id)

        question.question = data["question"]
        question.option1 = data["option1"]
        question.option2 = data["option2"]
        question.option3 = data["option3"]
        question.option4 = data["option4"]
        question.correct_option = data["correct_option"]
        question.save()
        return JsonResponse({
            "message": "Question Updated Successfully"
        },status=200)
    return JsonResponse({'message':"invalid method"},status=400)

@csrf_exempt
@login_required
def deleteQuestion(request, id):

    if request.session["role"] != "Admin":
        return JsonResponse({
            "message": "Access Denied"
        })
    question = Question.objects.get(id=id)
    question.delete()

    return JsonResponse({
        "message": "Question Deleted Successfully"
    },status=200)

@login_required
def start_exam(request):
     questions=Question.objects.order_by('?')[:5]
     data=[]
     for question in questions:
          data.append({
            "id":question.id ,
            "question":question.question,
            "option1":question.option1,
            "option2":question.option2,
            "option3":question.option3,
            "option4":question.option4,
          })
     return JsonResponse({
         "questions":data
    })
@csrf_exempt
@login_required
def submit_exam(request):
     data=json.loads(request.body)
     answers=data["answers"]
     user=User.objects.get(id=request.session["user_id"])

     exam=Exam.objects.create(
          user=user,
          score=0,
          total_questions=len(answers)   
     )

     score=0
     for answer in answers:
          question=Question.objects.get(id=answer["question_id"])
          if answer['selected_option']==question.correct_option:
               score+=1
        
          UserAnswer.objects.create(
            exam=exam,
            question=question,
            selected_option=answer["selected_option"]
        )

     exam.score=score
     exam.save()
     return JsonResponse({

        "message": "Exam Submitted Successfully",
        "score": score,
        "total_questions": len(answers)
    })


@login_required
def my_results(request):

    if request.session["role"] != "Learner":
        return JsonResponse({
            "message": "Access Denied"
        })

    user = User.objects.get(
        id=request.session["user_id"]
    )
    exams = Exam.objects.filter(
        user=user
    ).values()

    return JsonResponse({
        "results": list(exams)
    })


