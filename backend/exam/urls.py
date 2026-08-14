from django.urls import path,include
from .import views
urlpatterns=[
    path("register/",views.register),
    path("login/",views.login),
    path("logout/",views.logout),
    path("checksession/",views.check_session),
    path("add-question/", views.addQuestion),
    path("view-question/", views.viewQuestion),
    path("update-question/<int:id>/", views.updateQuestion),
    path("delete-question/<int:id>/", views.deleteQuestion),
    path("start-exam/", views.start_exam),
    path("submit-exam/", views.submit_exam),
    path("my-results/", views.my_results),
    path("view-users/", views.view_users),
]
