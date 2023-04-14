from django.urls import path, re_path

from .views import *

urlpatterns = [
    path('list_qustions/', ListQuestionsInSurvey.as_view(), name='surveys_list'),
]
