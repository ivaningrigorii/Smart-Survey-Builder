from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Profile
from ..survey_manage.survey_base.models import ISurvey


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['bio', 'photo']


class UserProfileSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(many=False, required=True)

    class Meta:
        model = get_user_model()
        fields = ['username', 'first_name', 'profile']


class CatCreatedSerializer(serializers.ModelSerializer):
    type_survey = serializers.SerializerMethodField('get_type_survey')

    class Meta:
        model = ISurvey
        fields = ('id', 'name', 'time_create', 'type_survey')

    def get_type_survey(self, obj):
        return type(obj).__name__