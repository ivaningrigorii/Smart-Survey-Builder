from rest_framework import generics, mixins

from apps.survey_manage.survey_base.models import ISurvey
from apps.survey_manage.survey_base.serializers import SurveysShowSerializer
from src_back.permissions import IsOwner


class CreatedSurveys(generics.ListAPIView,
                     generics.DestroyAPIView):
    serializer_class = SurveysShowSerializer
    permission_classes = (IsOwner,)

    def get_queryset(self):
        user = self.request.user
        return ISurvey.objects.filter(user=user)

