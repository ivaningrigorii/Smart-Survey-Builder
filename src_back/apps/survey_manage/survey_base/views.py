from rest_framework import generics

from src_back.permissions import IsOwnerISurvey
from rest_framework.permissions import IsAuthenticated
from .serializers import ISurveyFullSerializer, SurveySlugSerializer
from .models import ISurvey


class SurveyGetUpdateHeader(generics.RetrieveUpdateDestroyAPIView):
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

    def post(self, request, *args, **kwargs):
        request.data["user"] = request.user.id
        return self.create(request, *args, **kwargs)


class SurveyGetSlugView(generics.RetrieveAPIView):
    """
    Передача Slug при GET-запросе для формирования ссылки
    на прохождение опроса
    """
    serializer_class = SurveySlugSerializer
    permission_classes = (IsOwnerISurvey,)
    lookup_field = 'pk'
    queryset = ISurvey.objects.all()


