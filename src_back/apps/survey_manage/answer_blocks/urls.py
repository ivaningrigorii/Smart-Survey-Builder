from django.urls import path, re_path

from apps.survey_manage.answer_blocks.views import *

urlpatterns = [
    path('answer/', AnswerAddAPIView.as_view()),
    path('answer/<int:pk>/', AnswerGetDeleteUpdateAPIView.as_view()),
]
