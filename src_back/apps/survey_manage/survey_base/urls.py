from django.urls import path, re_path
from .views import SurveyGetUpdateHeader, SurveyCreateHeaderView

urlpatterns = [
    path('survey-header/<int:pk>/', SurveyGetUpdateHeader.as_view()),
    path('survey-header/', SurveyCreateHeaderView.as_view()),
]
