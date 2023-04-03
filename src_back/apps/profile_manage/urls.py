from django.urls import path, re_path, include
from .views import *

urlpatterns = [
    path('cats_own/', ShowCreatedSurveys.as_view()),
    path('cats_own/<int:pk>/', DeleteSurveyFromCreatedCat.as_view()),
    path('me/', ProfileOwner.as_view()),
]
