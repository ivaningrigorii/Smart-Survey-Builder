from rest_framework import generics, status
from rest_framework.generics import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.survey_manage.survey_base.models import ISurvey
from src_back.permissions import IsPublishedSurvey, IsActiveTakingSurvey, IsAnswerInSurvey, IsCorrectAnswerSerializer, \
    IsOnlySelectAnswer
from .models import IResultAnswer
from .serializers import *
from ..survey_manage.answer_blocks.models import IAnswer
from ..survey_manage.answer_blocks.serializers import IAnswerFullSerializer
from ..survey_manage.question_blocks.models import IQuestion
from ..survey_manage.question_blocks.serializers import IQuestionFullSerializer
from ..survey_manage.survey_base.serializers import ISurveyFullSerializer


class QuestionsPagination(PageNumberPagination):
    page_size = 5
    page_query_param = 'page'
    page_size_query_param = 'page_size'
    max_page_size = 1000


class IdSurveyFromSlug(generics.RetrieveAPIView):
    serializer_class = ISurveySerializer
    lookup_field = 'slug'
    queryset = ISurvey.objects.all()
    

class ListAllQuestionsInSurvey(generics.RetrieveAPIView):
    """
        Возврат шапки опроса и вопросов с вариантами ответов (5 вопросов на странице)
    """
    serializer_class = ISurveyFullSerializer
    permission_classes = (IsAuthenticated, IsPublishedSurvey)
    lookup_field = 'id'
    queryset = ISurvey.objects.all()
    pagination_class = QuestionsPagination

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        questions = IQuestion.objects.filter(survey=instance)
        # Пагинация ответа по вопросам
        paginator = self.pagination_class()
        result_page = paginator.paginate_queryset(questions, request)
        questions_serializer = IQuestionFullSerializer(result_page, many=True)
        questions_data = questions_serializer.data
        # Добавление вывода ответов вопроса
        for question in questions_data:
            answers = IAnswer.objects.filter(question_id=question['id'])
            answers_serializer = IAnswerFullSerializer(answers, many=True)
            question['answers'] = answers_serializer.data
        response = serializer.data
        response['questions'] = questions_serializer.data
        # Возвращаем не просто ответ, а пагинированный ответ
        return paginator.get_paginated_response(response)


class StartTakingSurveyAPIView(generics.CreateAPIView):
    """
        Создание прохождения опроса
    """
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


class EndTakingSurveyAPIView(generics.UpdateAPIView):
    """
        Завершение прохождения опроса
    """
    serializer_class = TakingSurveyEndSerializer
    permission_classes = (IsAuthenticated, IsPublishedSurvey)
    http_method_names = ['patch']

    def patch(self, request, *args, **kwargs):
        survey = get_object_or_404(ISurvey, id=request.data.get('survey'))
        request.data["user"] = request.user.id
        user = request.data["user"]
        try:
            taking_survey = TakingSurvey.objects.get(survey_id=survey, user_id=user, is_completed=False)
        except:
            return Response({'error': 'Не найдено прохождение опроса.'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(taking_survey, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save(is_completed=True)

        return Response(serializer.data)


class SaveResultAnswerAPIView(generics.CreateAPIView):
    """
        Сохранение выбранного ответа
    """
    serializer_class = IResultAnswerFullSerializer
    permission_classes = (IsAuthenticated, IsPublishedSurvey,
                          IsActiveTakingSurvey, IsAnswerInSurvey,
                          IsCorrectAnswerSerializer, IsOnlySelectAnswer)
    queryset = IResultAnswer.objects.all()




class UpdateResultAnswerAPIView(generics.UpdateAPIView):
    """
        Изменение выбранного ответа
    """
    serializer_class = IResultAnswerFullSerializer
    permission_classes = (IsAuthenticated, IsPublishedSurvey,
                          IsActiveTakingSurvey, IsAnswerInSurvey,
                          IsCorrectAnswerSerializer)
    http_method_names = ['patch']

    def patch(self, request, *args, **kwargs):
        try:
            result_answer = get_object_or_404(IResultAnswer,
                                              taking_survey=request.data.get('taking_survey'),
                                              question=request.data.get('question'))
        except:
            return Response({'error': 'Ответ не был выбран.'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(result_answer, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
