from rest_framework import generics

from src_back.permissions import IsOwnerISurvey
from rest_framework.permissions import IsAuthenticated
from .serializers import ISurveyFullSerializer
from .models import ISurvey


class SurveyGetUpdateHeader(generics.RetrieveUpdateAPIView):
    """
    Работа только с шабкой опроса (без вопросов и ответов внутри опроса)
    """
    serializer_class = ISurveyFullSerializer
    permission_classes = (IsOwnerISurvey,)
    lookup_field = 'pk'
    queryset = ISurvey.objects.all()


class SurveyCreateHeaderView(generics.CreateAPIView):
    """
    Создание шапки опроса, без добавления в него вопросов
    и ответов на вопросы (можно сначала создать опрос таким образом),
    а потом в него добавлять всё остальное.
    Slug создавать не нужно, он автоматически генерируется не сервере
    """
    serializer_class = ISurveyFullSerializer
    permission_classes = (IsAuthenticated, )

