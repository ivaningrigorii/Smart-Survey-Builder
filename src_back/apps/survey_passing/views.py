from rest_framework import generics
from rest_framework.permissions import AllowAny

from apps.survey_manage.survey_base.models import ISurvey
from apps.survey_passing.serializers import SurveysShowSerializer


class SurveyList(generics.ListAPIView):
    queryset = ISurvey.objects.all()
    serializer_class = SurveysShowSerializer
