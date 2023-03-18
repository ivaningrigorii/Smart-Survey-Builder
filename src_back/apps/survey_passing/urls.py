from django.urls import path, re_path

from .views import *

urlpatterns = [
    path('list_surveys/', SurveyList.as_view(), name='surveys_list'),  # test start
]
