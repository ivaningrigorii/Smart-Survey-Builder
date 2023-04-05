from rest_framework import serializers
from rest_polymorphic.serializers import PolymorphicSerializer

from apps.survey_manage.answer_blocks.models import *


class AnswerSelectableSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerSelectableSimple
        fields = '__all__'


class AnswerSelectableTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerSelectableTest
        fields = '__all__'


class AnswerTextInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerTextInput
        fields = '__all__'


class IAnswerFullSerializer(PolymorphicSerializer):
    model_serializer_mapping = {
        AnswerSelectableSimple: AnswerSelectableSimpleSerializer,
        AnswerSelectableTest: AnswerSelectableTestSerializer,
        AnswerTextInput: AnswerTextInputSerializer,
    }
