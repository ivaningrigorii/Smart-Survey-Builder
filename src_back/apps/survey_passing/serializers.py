from rest_framework import serializers
from rest_polymorphic.serializers import PolymorphicSerializer

from apps.survey_manage.survey_base.models import ISurvey
from apps.survey_manage.question_blocks.models import IQuestion
from apps.survey_manage.answer_blocks.models import IAnswer
from apps.survey_passing.models import TakingSurvey


class TakingSurveySerializer(serializers.ModelSerializer):

    class Meta:
        model = TakingSurvey
        fields = ["id", "survey", "user", "is_completed"]


