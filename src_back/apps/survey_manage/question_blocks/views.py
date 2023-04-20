from rest_framework import generics
from rest_framework.generics import get_object_or_404

from src_back.permissions import IsOwnerQuestionInSurvey, IsOwnerISurvey
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


class QuestionsInSurvey(generics.ListAPIView):
    """
        Возвращает сведения о созданных вопросах в опросе
    """
    serializer_class = IQuestionFullSerializer
    permission_classes = (IsOwnerISurvey,)
    lookup_field = 'pk'

    def get_queryset(self):
        survey = get_object_or_404(ISurvey, pk=self.kwargs["pk"])
        self.check_object_permissions(self.request, survey)
        return IQuestion.objects.filter(survey=survey)

