from rest_framework import generics
from apps.survey_manage.survey_base.serializers import SurveysShowSerializer

from apps.survey_manage.survey_base.models import ISurvey


class SurveyList(generics.ListAPIView):
    queryset = ISurvey.objects.all()
    serializer_class = SurveysShowSerializer
