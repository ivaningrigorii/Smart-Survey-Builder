from rest_framework import serializers
from apps.survey_manage.survey_base.models import *


class SurveysShowSerializer(serializers.ModelSerializer):
    type_survey = serializers.SerializerMethodField('get_type_survey')

    class Meta:
        model = ISurvey
        fields = ('pk', 'name', 'time_create', 'type_survey')

    def get_type_survey(self, obj):
        return type(obj).__name__

