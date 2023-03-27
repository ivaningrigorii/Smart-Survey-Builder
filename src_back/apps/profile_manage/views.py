from rest_framework import generics

from apps.profile_manage.serializers import *
from apps.survey_manage.survey_base.models import ISurvey
from rest_framework.permissions import IsAuthenticated

from src_back.permissions import IsOwnerISurvey, IsOwnerProfile


class ProfileOwner(generics.RetrieveAPIView):
    lookup_field = 'pk'
    queryset = get_user_model().objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = (IsOwnerProfile, )


class DeleteSurveyFromCretedCat(generics.DestroyAPIView):
    serializer_class = CatCreatedSerializer
    permission_classes = (IsOwnerISurvey, )
    lookup_field = 'pk'
    queryset = ISurvey.objects.all()


class ShowCreatedSurveys(generics.ListAPIView):
    serializer_class = CatCreatedSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return ISurvey.objects.filter(user=user)

