from django.urls import path, re_path
from .views import *

urlpatterns = [
    path('survey-header/<int:pk>/', SurveyGetUpdateHeader.as_view()),
    path('survey-header/', SurveyCreateHeaderView.as_view()),
    path('survey-header/<int:pk>/slug/', SurveyGetSlugView.as_view()),
]


