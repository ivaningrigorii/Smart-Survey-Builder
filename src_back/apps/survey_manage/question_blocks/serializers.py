from rest_framework import serializers
from rest_polymorphic.serializers import PolymorphicSerializer

from apps.survey_manage.question_blocks.models import *


class QuestionSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionSimple
        fields = '__all__'


class QuestionTestSimpleEvSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionTestSimpleEv
        fields = '__all__'


class IQuestionFullSerializer(PolymorphicSerializer):
    model_serializer_mapping = {
        QuestionSimple: QuestionSimpleSerializer,
        QuestionTestSimpleEv: QuestionTestSimpleEvSerializer,
    }
