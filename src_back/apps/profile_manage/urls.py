from django.urls import path, re_path, include
from .views import *

urlpatterns = [
    path('cats/created/', ShowCreatedSurveys.as_view()),
    path('cats/created/<int:pk>/', DeleteSurveyFromCretedCat.as_view()),
    path('<int:pk>/', ProfileOwner.as_view()),
]
