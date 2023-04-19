from django.urls import path, re_path

from apps.survey_manage.question_blocks.views import *

urlpatterns = [
    path('question/', QuestionAddAPIView.as_view()),
    path('question/<int:pk>/', QuestionGetDeleteUpdateAPIView.as_view()),
    path('questions-survey/<int:pk>/', QuestionsInSurvey.as_view()),
]