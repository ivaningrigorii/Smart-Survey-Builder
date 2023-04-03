from django.urls import path, re_path

from apps.survey_manage.question_blocks.views import QuestionSimpleAddAPIView

urlpatterns = [
    path('addQuestion/', QuestionSimpleAddAPIView.as_view()),
]