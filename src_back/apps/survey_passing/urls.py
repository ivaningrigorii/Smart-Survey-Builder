from django.urls import path, re_path

from .views import *

urlpatterns = [
    path('list_questions/<int:id>/', ListAllQuestionsInSurvey.as_view(), name='surveys_list'),
    path('taking_survey/start/', StartTakingSurveyAPIView.as_view(), name='start_taking_survey'),
    path('taking_survey/end/<int:pk>/', EndTakingSurveyAPIView.as_view(), name='end_taking_survey'),
    path('id-from-slug/<slug:slug>/', IdSurveyFromSlug.as_view(), name='id_from_slug'),
    path('save_answers/', SaveResultAnswerPageAPIView.as_view(), name="save_answers"),
]
