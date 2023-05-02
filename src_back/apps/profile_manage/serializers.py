from django.contrib.auth import get_user_model
from django.dispatch import receiver
from rest_framework import serializers
from .models import Profile
from ..survey_manage.survey_base.models import ISurvey
import base64
from django.core.files import File
from django.db.models.signals import pre_save
from PIL import Image
import logging

logger = logging.getLogger(__name__)

class ProfileSerializer(serializers.ModelSerializer):
    base64_image = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['id', 'bio', 'img', 'base64_image']


    @receiver(pre_save, sender=Image)
    def pre_save_image(sender, instance, *args, **kwargs):
        try:
            logging.warning("работает")
            old_img = instance.__class__.objects.get(id=instance.id).img.path
            try:
                new_img = instance.image.path
            except:
                new_img = None
            if new_img != old_img:
                import os
                if os.path.exists(old_img):
                    os.remove(old_img)
        except:
            pass
    
    def get_base64_image(self, obj):
        if obj.img:
            f = open(obj.img.path, 'rb')
            image = File(f)
            res = base64.b64encode(image.read())
            f.close()
            return res
        


class UserProfileOwnSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(many=False, required=True)

    class Meta:
        model = get_user_model()
        fields = ['username', 'first_name', 'last_name', 'email' , 'profile']


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
        if obj.img:
            f = open(obj.img.path, 'rb')
            image = File(f)
            data = base64.b64encode(image.read())
            f.close()
            return data
    
