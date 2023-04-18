from django.urls import path, re_path

from .views import *

urlpatterns = [
    path('list_qustions/<int:id>/', ListAllQuestionsInSurvey.as_view(), name='surveys_list'),
    path('taking_survey/start/', StartTakingSurveyAPIView.as_view(), name='start_taking_survey'),
    path('taking_survey/end/', EndTakingSurveyAPIView.as_view(), name='end_taking_survey'),
]
