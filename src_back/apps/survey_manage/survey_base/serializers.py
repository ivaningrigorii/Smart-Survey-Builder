from rest_framework import serializers
from apps.survey_manage.survey_base.models import *
from rest_polymorphic.serializers import PolymorphicSerializer


class SurveysHeaderShowSerializer(serializers.ModelSerializer):
    type_survey = serializers.SerializerMethodField('get_type_survey')

    def get_type_survey(self, obj):
        return type(obj).__name__

    class Meta:
        model = ISurvey
        fields = ('id', 'name', 'time_create', 'type_survey', 'slug')


class SurveyTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = SurveyTest
        fields = (
            "id", "name", "description",
            "time_create", "start_time", "end_time",
            "time_passing", "slug", "option_is_published",
            "option_only_for_register_users", "user",
        )


class SurveySimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = SurveySimple
        fields = (
            "id", "name", "description",
            "time_create", "slug", "option_is_published",
            "option_only_for_register_users", "user",
        )


class ISurveyFullSerializer(PolymorphicSerializer):
    model_serializer_mapping = {
        SurveySimple: SurveySimpleSerializer,
        SurveyTest: SurveyTestSerializer,
    }


class SurveySlugSerializer(serializers.ModelSerializer):
    class Meta:
        model = SurveySimple
        fields = ("slug",)
