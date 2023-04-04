from rest_framework import generics

from src_back.permissions import IsOwnerQuestionInSurvey
from .serializers import *


class QuestionAddAPIView(generics.CreateAPIView):
    """
        Создание и добавление нового вопроса в опрос
    """
    serializer_class = IQuestionFullSerializer
    permission_classes = (IsOwnerQuestionInSurvey,)


class QuestionGetDeleteUpdateAPIView(generics.RetrieveUpdateDestroyAPIView):
    """
         Просмотр, редактирование, удаление вопроса
    """
    serializer_class = IQuestionFullSerializer
    permission_classes = (IsOwnerQuestionInSurvey,)
    lookup_field = 'pk'
    queryset = IQuestion.objects.all()
