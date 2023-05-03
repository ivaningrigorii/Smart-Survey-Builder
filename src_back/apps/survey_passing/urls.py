from django.urls import path, re_path

from .views import *

urlpatterns = [
    path('list_questions/<int:id>/', ListAllQuestionsInSurvey.as_view(), name='surveys_list'),
    path('taking_survey/start/', StartTakingSurveyAPIView.as_view(), name='start_taking_survey'),
    path('taking_survey/end/', EndTakingSurveyAPIView.as_view(), name='end_taking_survey'),
    path('taking_survey/select/', SaveResultAnswerAPIView.as_view(), name='select_result_answer'),
    path('taking_survey/change_select/', UpdateResultAnswerAPIView.as_view(), 
         name='update_select_result_answer'),
    path('id-from-slug/<slug:slug>/', IdSurveyFromSlug.as_view(), name='id_from_slug'),
]
