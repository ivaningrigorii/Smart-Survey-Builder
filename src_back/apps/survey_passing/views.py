from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.survey_manage.survey_base.models import ISurvey
from ..survey_manage.answer_blocks.models import IAnswer
from ..survey_manage.question_blocks.models import IQuestion
from ..survey_manage.question_blocks.serializers import IQuestionFullSerializer
from ..survey_manage.survey_base.serializers import SurveysHeaderShowSerializer, ISurveyFullSerializer


class ListQuestionsInSurvey(APIView):
    def get(self, request):
        slug = "puteshestvie-v-uralskikh-gorakh-opros"
        survey = ISurvey.objects.get(slug=slug)
        questions = IQuestion.objects.filter(survey=survey)
        content = {
            "survey":  ISurveyFullSerializer(survey).data,
            "questions": {
                f"{questions[0].id}": IQuestionFullSerializer(questions[0]).data,
            },

        }
        return Response(content)




