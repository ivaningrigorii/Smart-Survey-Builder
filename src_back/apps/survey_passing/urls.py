from django.urls import path, re_path

from .views import *

urlpatterns = [
    path('list_qustions/', ListQuestionsInSurvey.as_view(), name='surveys_list'),
    path('taking_survey/start/', StartTakingSurveyAPIView.as_view(), name='taking_survey'),

]
