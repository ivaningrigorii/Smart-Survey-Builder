from rest_framework import serializers

from apps.survey_passing.models import TakingSurvey


class TakingSurveySerializer(serializers.ModelSerializer):
    class Meta:
        model = TakingSurvey
        fields = ["id", "survey", "user", "is_completed", "time_start", "time_passing"]


class TakingSurveyEndSerializer(serializers.ModelSerializer):
    class Meta:
        model = TakingSurvey
        fields = ["id", "survey", "user", "is_completed", "time_start", "time_end", "time_passing"]
