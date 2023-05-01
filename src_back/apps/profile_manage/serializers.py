from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Profile
from ..survey_manage.survey_base.models import ISurvey
import base64
from django.core.files import File


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'bio']


class UserProfileOwnSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(many=False, required=True)

    def update(self, instance, validated_data):
        instance.username = validated_data.get("username", instance.username)
        instance.first_name = validated_data.get("first_name", instance.first_name)
        if "profile" in validated_data:
            instance.profile.bio = validated_data["profile"].get("bio", instance.profile.bio)

        instance.save()
        return instance

    class Meta:
        model = get_user_model()
        fields = ['username', 'first_name', 'profile']


class CatCreatedSerializer(serializers.ModelSerializer):
    type_survey = serializers.SerializerMethodField('get_type_survey')
    base64_image = serializers.SerializerMethodField()

    class Meta:
        model = ISurvey
        fields = ('id', 'name', 'time_create', 
            'type_survey', 'option_is_published', 
            'slug', 'description', 'base64_image', )

    def get_type_survey(self, obj):
        return type(obj).__name__

    def get_base64_image(self, obj):
        f = open(obj.img.path, 'rb')
        image = File(f)
        data = base64.b64encode(image.read())
        f.close()
        return data
