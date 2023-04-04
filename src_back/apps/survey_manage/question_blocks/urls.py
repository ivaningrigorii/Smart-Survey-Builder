from django.urls import path, re_path

from apps.survey_manage.question_blocks.views import *

urlpatterns = [
    path('question/', QuestionSimpleAddAPIView.as_view()),
    path('question/<int:pk>/', QuestionSimpleGetDeleteUpdateAPIView.as_view()),
]