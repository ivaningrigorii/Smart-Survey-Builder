from rest_framework import generics, status
from rest_framework.generics import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from .models import IResultAnswer
from .pas_permissions import *
from .serializers import *
from ..survey_manage.answer_blocks.models import IAnswer
from ..survey_manage.answer_blocks.serializers import IAnswerFullSerializer
from ..survey_manage.question_blocks.models import IQuestion
from ..survey_manage.question_blocks.serializers import IQuestionFullSerializer
from ..survey_manage.survey_base.serializers import ISurveyFullSerializer


class QuestionsPagination(PageNumberPagination):
    page_size = 5
    page_query_param = "page"
    page_size_query_param = "page_size"
    max_page_size = 1000


class IdSurveyFromSlug(generics.RetrieveAPIView):
    """API получает slug опроса, а возвращает id этого вопроса"""

    serializer_class = ISurveyFullSerializer
    lookup_field = "slug"
    queryset = ISurvey.objects.all()


class ListAllQuestionsInSurvey(generics.RetrieveAPIView):
    """API получает id прохождения, а возвращает
    вопросы и ответы к вопросу, с пагинацией, по 5 ответов
    api/v1/passing/list_questions/{id прохождения}/?page={номер страницы}"""

    permission_classes = [
        IsPublishedSurveyAndTakingObjs,
        IsOnlyAuth,
    ]
    lookup_field = "id"
    queryset = TakingSurvey.objects.all()
    pagination_class = QuestionsPagination

    def get(self, request, *args, **kwargs):
        instance = self.get_object()

        self.check_object_permissions(self.request, instance)
        survey = ISurvey.objects.get(pk=instance.survey.pk)

        serializer = ISurveyFullSerializer(survey)
        questions = IQuestion.objects.filter(survey=survey)

        # Пагинация ответа по вопросам
        paginator = self.pagination_class()
        result_page = paginator.paginate_queryset(questions, request)
        pagination_count = result_page.count

        questions_serializer = IQuestionFullSerializer(result_page, many=True)
        questions_data = questions_serializer.data

        # Добавление вывода ответов вопроса
        for question in questions_data:
            answers = IAnswer.objects.filter(question_id=question["id"])
            answers_serializer = IAnswerFullSerializer(answers, many=True)
            question["answers"] = answers_serializer.data

        response = serializer.data

        response["questions"] = questions_serializer.data
        # Возвращаем не просто ответ, а пагинированный ответ
        return paginator.get_paginated_response(response)


class StartTakingSurveyAPIView(generics.CreateAPIView):
    """API начала прохождения опроса
    нужно передать только id проходимого опроса;
    возвращается id прохождения"""

    serializer_class = TakingSurveySerializer
    permission_classes = (IsPublishedSurveyAndTakingObjs,)

    def post(self, request, *args, **kwargs):
        survey = get_object_or_404(ISurvey, id=request.data.get("survey"))
        self.check_object_permissions(self.request, survey)

        # Проверка анонимности прохождения и доступности этого
        if not request.user.id and survey.option_only_for_register_users == True:
            return Response(
                {"error": "Для прохождения необходимо зарегистрироваться."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if request.user.id:
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
                return Response(
                    {"error": "Превышено количество попыток прохождения."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        return self.create(request, *args, **kwargs)


class EndTakingSurveyAPIView(generics.UpdateAPIView):
    """API окончания прохождения опроса.
    Когда пользователь уверен, что на всё ответил,
    завершается прохождение через это API"""

    permission_classes = (
        IsPublishedSurveyAndTakingObjs,
        IsActiveTakingSurveyObj,
        IsYouIsYouAnsRegister,
    )
    lookup_field = "pk"
    http_method_names = ["patch"]

    def patch(self, request, *args, **kwargs):
        taking_survey = get_object_or_404(TakingSurvey, pk=kwargs.get("pk"))
        self.check_object_permissions(self.request, taking_survey)

        self.request.data["id"] = kwargs.get("pk")
        self.request.data["is_completed"] = True

        serializer = TakingSurveyEndSerializer(
            taking_survey, data=request.data, partial=True
        )
        if serializer.is_valid(raise_exception=True):
            serializer.save(is_completed=True)

        return Response(serializer.data)


class SaveResultAnswerPageAPIView(generics.CreateAPIView):
    """API для сохранения результатов ответов на страничке или их изменения"""

    permission_classes = (
        IsYouIsYouAnsRegister,
        IsPublishedSurveyAndTakingObjs,
        IsActiveTakingSurveyObj,
    )
    serializer_class = BlockQuestiosSerializer

    def __delete_last_answers(self, ias, id_taking):
        as_in_db_in_q = IResultAnswer.objects.filter(
            answer__id__in=ias, taking_survey=id_taking
        )
        if as_in_db_in_q is not None:
            for a in as_in_db_in_q:
                a.delete()

    def post(self, request, *args, **kwargs):
        se_questions = BlockQuestiosSerializer(data=request.data)

        if se_questions.is_valid():
            id_taking_survey = se_questions.data["id_passing"]

            self.check_object_permissions(
                self.request, get_object_or_404(TakingSurvey, pk=id_taking_survey)
            )

            for q in se_questions.data["result_questions"]:
                ias = IAnswer.non_polymorphic.filter(question=q["id_question"]).values(
                    "id"
                )
                self.__delete_last_answers(ias, id_taking_survey)

                for r in q["result_answers"]:
                    if {"id": r["answer"]} in ias:
                        res = IResultAnswerFullSerializer(data=r)

                        if res.is_valid():
                            res.save()

            return Response(se_questions.data, status=status.HTTP_201_CREATED)

        return Response(se_questions.errors, status=status.HTTP_400_BAD_REQUEST)
