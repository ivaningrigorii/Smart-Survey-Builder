from rest_framework import generics
from rest_framework.generics import get_object_or_404

from src_back.permissions import IsOwnerAnswerInQuestionInSurvey, IsOwnerQuestionInSurvey
from .serializers import *


class AnswerAddAPIView(generics.CreateAPIView):
    """
        Создание и добавление нового вопроса в опрос
    """
    serializer_class = IAnswerFullSerializer
    permission_classes = (IsOwnerAnswerInQuestionInSurvey,)


class AnswerGetDeleteUpdateAPIView(generics.RetrieveUpdateDestroyAPIView):
    """
         Просмотр, редактирование, удаление ответа
    """
    serializer_class = IAnswerFullSerializer
    permission_classes = (IsOwnerAnswerInQuestionInSurvey,)
    lookup_field = 'pk'
    queryset = IAnswer.objects.all()


class AnswersInQuestion(generics.ListAPIView):
    """
        Возвращает сведения о вариантах ответов в вопросе
    """
    serializer_class = IAnswerFullSerializer
    permission_classes = (IsOwnerQuestionInSurvey,)
    lookup_field = 'pk'

    def get_queryset(self):
        question = get_object_or_404(IQuestion, pk=self.kwargs["pk"])
        self.check_object_permissions(self.request, question)
        return IAnswer.objects.filter(question=question)


