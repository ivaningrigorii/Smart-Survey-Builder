from rest_framework import serializers
from apps.survey_manage.survey_base.models import *


class SurveysShowSerializer(serializers.ModelSerializer):
    class Meta:
        model = ISurvey
        fields = ('pk', 'name', 'time_create')
