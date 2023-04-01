from rest_framework import serializers

from apps.survey_manage.survey_base.models import ISurvey


class LinkSurveySerializer(serializers.ModelSerializer):
    class Meta:
        model = ISurvey
        fields = ('slug', 'id', 'name')


