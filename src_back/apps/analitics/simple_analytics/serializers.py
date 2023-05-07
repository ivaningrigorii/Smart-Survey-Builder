from rest_framework import serializers

from apps.analitics.simple_analytics.models import SimpleAnalytics
from apps.survey_manage.answer_blocks.models import IAnswer
from apps.survey_manage.answer_blocks.serializers import IAnswerFullSerializer
from apps.survey_passing.models import IResultAnswer


class SimpleAnalyticsSerializer(serializers.ModelSerializer):
    answers = serializers.SerializerMethodField()

    class Meta:
        model = SimpleAnalytics
        fields = ["survey", "question", "answers"]

    def get_answers(self, obj):
        answers = IAnswer.objects.filter(question=obj.question)
        return IAnswerFullSerializer(answers, many=True).data

    def to_representation(self, instance):
        data = super().to_representation(instance)
        result_answer = IResultAnswer.objects.filter(
            answer__in=IAnswer.objects.filter(question=instance.question)
        )

        for answer in data['answers']:
            answer_count = result_answer.filter(answer=answer['id']).count()
            answer['count'] = answer_count
        return data

