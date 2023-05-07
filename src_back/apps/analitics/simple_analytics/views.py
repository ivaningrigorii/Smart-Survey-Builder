from rest_framework import generics

from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.analitics.simple_analytics.models import SimpleAnalytics
from apps.analitics.simple_analytics.serializers import SimpleAnalyticsSerializer
from src_back.permissions import IsPublishedSurvey,  IsQuestionInSurvey, IsQuestionHaveAnalytics, \
    IsOwnerISurveyAnalytics


class CreateSimpleAnalyticsAPIView(generics.CreateAPIView):
    """
        Создание аналитики вопроса
    """
    serializer_class = SimpleAnalyticsSerializer
    permission_classes = (IsAuthenticated, IsQuestionInSurvey, IsOwnerISurveyAnalytics, )
    queryset = SimpleAnalytics.objects.all()

    def post(self, request, *args, **kwargs):
        survey_id = request.data.get('survey')
        question_id = request.data.get('question')
        existing_analytics = SimpleAnalytics.objects.filter(survey=survey_id, question=question_id).first()

        if existing_analytics:
            serializer = SimpleAnalyticsSerializer(existing_analytics)
            return Response(serializer.data)

        return super().post(request, *args, **kwargs)


class GetSimpleAnalyticsAPIView(generics.RetrieveAPIView):
    """
           Просмотр аналитики вопроса
    """
    serializer_class = SimpleAnalyticsSerializer
    permission_classes = (IsAuthenticated, IsQuestionHaveAnalytics)
    queryset = SimpleAnalytics.objects.all()

    def get_object(self):
        question_id = self.kwargs.get('question_id')
        simple_analytics = get_object_or_404(SimpleAnalytics, question_id=question_id)
        return simple_analytics
