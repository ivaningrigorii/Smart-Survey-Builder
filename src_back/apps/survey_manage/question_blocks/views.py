from rest_framework import generics

from src_back.permissions import IsOwnerQuestionInSurvey
from .serializers import *


class QuestionSimpleAddAPIView(generics.CreateAPIView):
    """
        Создание и добавление нового вопроса в опрос
    """
    serializer_class = IQuestionFullSerializer
    permission_classes = (IsOwnerQuestionInSurvey, )
