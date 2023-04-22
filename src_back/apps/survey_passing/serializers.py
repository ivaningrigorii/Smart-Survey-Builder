from rest_framework import serializers
from rest_polymorphic.serializers import PolymorphicSerializer

from apps.survey_passing.models import TakingSurvey, ResultSelect, ResultTextInput


class TakingSurveySerializer(serializers.ModelSerializer):
    class Meta:
        model = TakingSurvey
        fields = ["id", "survey", "user", "is_completed", "time_start", "time_passing"]


class TakingSurveyEndSerializer(serializers.ModelSerializer):
    class Meta:
        model = TakingSurvey
        fields = ["id", "survey", "user", "is_completed", "time_start", "time_end", "time_passing"]


class ResultSelectSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResultSelect
        fields = ["id", "taking_survey", "answer", "question"]


class ResultTextInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResultTextInput
        fields = ["id", "taking_survey", "answer", "question", "input_text"]


class IResultAnswerFullSerializer(PolymorphicSerializer):
    model_serializer_mapping = {
        ResultSelect: ResultSelectSerializer,
        ResultTextInput: ResultTextInputSerializer,
    }
