from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.views import APIView

from .models import ISurvey
from .serializers import *


class SurveyList(APIView):
    def get(self, request):
        surveys = ISurvey.objects.all()
        surveys_ = SurveysShowSerializer(instance=surveys, many=True)
        return Response(surveys_.data)