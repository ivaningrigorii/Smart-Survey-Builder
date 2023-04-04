from rest_framework import generics

from src_back.permissions import IsOwnerAnswerInQuestionInSurvey
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


