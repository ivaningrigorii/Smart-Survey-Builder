from rest_framework import generics, status
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.survey_manage.survey_base.models import ISurvey
from src_back.permissions import IsPublishedSurvey
from .models import TakingSurvey
from .serializers import TakingSurveySerializer
from ..survey_manage.answer_blocks.models import IAnswer
from ..survey_manage.answer_blocks.serializers import IAnswerFullSerializer
from ..survey_manage.question_blocks.models import IQuestion
from ..survey_manage.question_blocks.serializers import IQuestionFullSerializer
from ..survey_manage.survey_base.serializers import SurveysHeaderShowSerializer, ISurveyFullSerializer


class ListQuestionsInSurvey(APIView):
    def get(self, request):
        slug = "nuzhny-li-bufety-v-vuze"
        survey = ISurvey.objects.get(slug=slug)
        questions = IQuestion.objects.filter(survey=survey)
        # answers = IAnswer.objects.filter(question=questions[0])
        # questions_data = [IQuestionFullSerializer(question).data for question in questions]
        # answers_dict = {}
        # for question in questions:
        #     answers = IAnswer.objects.filter(question=question)
        #     answers_data = IAnswerFullSerializer(answers, many=True).data
        #     answers_dict[question.id] = answers_data
        question_blocks = []
        for question in questions:
            answers = IAnswer.objects.filter(question=question)
            answers_data = IAnswerFullSerializer(answers, many=True).data
            question_block = {
                "question": IQuestionFullSerializer(question).data,
                "answers": answers_data
            }
            question_blocks.append(question_block)

        content = {
            "survey": ISurveyFullSerializer(survey).data,
            "question_blocks": question_blocks,
            # "questions": questions_data,
            # "answers": answers_dict,

        }
        return Response(content)


class StartTakingSurveyAPIView(generics.CreateAPIView):
    serializer_class = TakingSurveySerializer
    permission_classes = (IsAuthenticated, IsPublishedSurvey)

    def post(self, request, *args, **kwargs):
        survey = get_object_or_404(ISurvey, id=request.data.get('survey'))
        request.data["user"] = request.user.id
        user = request.data["user"]
        taking_surveys = TakingSurvey.objects.filter(survey=survey, user_id=user)

        # Поиск незавершённого прохождения и его возврат
        for taking_survey in taking_surveys:
            if not taking_survey.is_completed:
                serializer = self.get_serializer(taking_survey)
                return Response(serializer.data)

        # Проверка кол-ва попыток прохождения
        if taking_surveys.count() >= survey.max_attempts:
            return Response({'error': 'Превышено количество попыток прохождения.'}, status=status.HTTP_400_BAD_REQUEST)

        return self.create(request, *args, **kwargs)
