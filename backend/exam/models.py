from django.db import models

class User(models.Model):
     full_name=models.CharField(max_length=100)
     username=models.CharField(unique=True,max_length=100)
     email=models.CharField(unique=True)
     password=models.CharField()
     role=models.CharField()


class Question(models.Model):

    question = models.TextField()
    option1 = models.CharField(max_length=200)
    option2 = models.CharField(max_length=200)
    option3 = models.CharField(max_length=200)
    option4 = models.CharField(max_length=200)
    correct_option = models.IntegerField()

class Exam(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField()
    total_questions = models.IntegerField()


class UserAnswer(models.Model):

    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    selected_option = models.IntegerField()
    