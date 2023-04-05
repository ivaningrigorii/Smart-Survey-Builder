from django.contrib import admin

from apps.profile_manage.models import *


@admin.register(Profile)
class ModelProfileAdmin(admin.ModelAdmin):
    base_model = Profile
    readonly_fields = ('id_user', )
    list_display = ("id_user",  "bio", )
    list_display_links = ("bio", 'id_user', )

    def id_user(self, obj):
        return obj.user.id

    id_user.short_description = "№ пользователя"


