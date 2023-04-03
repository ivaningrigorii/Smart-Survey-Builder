from rest_framework import generics
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from .serializers import *
from .models import IQuestion


class QuestionSimpleAddAPIView(generics.CreateAPIView):
    """
        Создание и добавление нового вопроса в опрос
    """
    serializer_class = IQuestionFullSerializer
    queryset = IQuestion.objects.all()
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        survey_id = self.request.data.get('survey')
        if survey_id:
            survey_owner = serializer.validated_data['survey'].user
            if survey_owner != self.request.user:
                raise PermissionDenied()
        serializer.save()
