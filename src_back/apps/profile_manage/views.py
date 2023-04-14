from rest_framework import generics

from apps.profile_manage.serializers import *
from apps.survey_manage.survey_base.models import ISurvey
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination

from src_back.permissions import IsOwnerISurvey

class ResultsSetPaginationSyrveys(PageNumberPagination):
    page_size = 4
    page_size_query_param = 'page_size'
    max_page_size = 4

class ProfileOwner(generics.RetrieveUpdateAPIView):
    """
    Работа с профилем авторизованного пользователя.
    """
    serializer_class = UserProfileOwnSerializer
    permission_classes = (IsAuthenticated, )

    def get_object(self):
        user = self.request.user
        return get_user_model().objects.get(id=user.pk)


class DeleteSurveyFromCreatedCat(generics.DestroyAPIView):
    """
    Удаление опроса из каталога созданных ранее опросов
    """
    serializer_class = CatCreatedSerializer
    permission_classes = (IsOwnerISurvey, )
    lookup_field = 'pk'
    queryset = ISurvey.objects.all()


class ShowCreatedSurveys(generics.ListAPIView):
    """
    Просмотр всех ранее созданных опросов,
    уникальный slug в дальнейшем нужен для генерации ссылки на прохождение опроса,
        как на клиенте, так и на сервере
    """
    serializer_class = CatCreatedSerializer
    permission_classes = (IsAuthenticated,)
    pagination_class = ResultsSetPaginationSyrveys

    def get_queryset(self):
        user = self.request.user
        return ISurvey.objects.filter(user=user)

