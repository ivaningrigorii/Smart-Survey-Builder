from rest_framework import generics
from .serializers import LinkSurveySerializer

from apps.survey_manage.survey_base.models import ISurvey
from ..survey_manage.survey_base.serializers import SurveysHeaderShowSerializer


class SurveyList(generics.ListAPIView):
    """
    Тестовое API, потом его снести нужно будет
    """
    queryset = ISurvey.objects.all()
    serializer_class = SurveysHeaderShowSerializer

