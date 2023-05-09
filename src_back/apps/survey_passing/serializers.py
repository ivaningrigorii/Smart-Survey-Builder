from abc import ABC

from rest_framework import serializers
from rest_polymorphic.serializers import PolymorphicSerializer

from apps.survey_passing.models import TakingSurvey, ResultSelect, ResultTextInput
from apps.survey_manage.survey_base.models import *
from .models import ISurvey


class SurveyTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = SurveyTest
        fields = (
            "id", "name", "description",
            "time_create", "start_time", "end_time",
            "time_passing", "slug", "option_is_published",
            "option_only_for_register_users", "user", "img", 
        )


class SurveySimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = SurveySimple
        fields = (
            "id", "name", "description",
            "time_create", "slug", "option_is_published",
            "option_only_for_register_users", "user", "img", 
        )


class ISurveyFullSerializer(PolymorphicSerializer):
    model_serializer_mapping = {
        SurveySimple: SurveySimpleSerializer,
        SurveyTest: SurveyTestSerializer,
    }


class TakingSurveySerializer(serializers.ModelSerializer):
    class Meta:
        model = TakingSurvey
        fields = ["id", "survey", "user", "is_completed", "time_start", ]


class TakingSurveyEndSerializer(serializers.ModelSerializer):
    class Meta:
        model = TakingSurvey
        fields = ["id", "survey", "user", "is_completed", "time_start", "time_end", ]


class ResultSelectSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResultSelect
        fields = ["id", "taking_survey", "answer", ]


class ResultTextInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResultTextInput
        fields = ["id", "taking_survey", "answer", "input_text"]


class IResultAnswerFullSerializer(PolymorphicSerializer):
    model_serializer_mapping = {
        ResultSelect: ResultSelectSerializer,
        ResultTextInput: ResultTextInputSerializer,
    }


class PageAnswersSerializer(serializers.Serializer):
    id_question = serializers.IntegerField()
    result_answers = IResultAnswerFullSerializer(many=True, )


class BlockQuestiosSerializer(serializers.Serializer):
    id_passing = serializers.IntegerField()
    result_questions = PageAnswersSerializer(many=True, )
        



