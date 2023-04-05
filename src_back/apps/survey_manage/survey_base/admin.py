from django.contrib import admin
from polymorphic.admin import *

from apps.survey_manage.survey_base.models import *


@admin.register(SurveySimple)
class ModelSurveySimpleAdmin(PolymorphicChildModelAdmin):
    base_model = SurveySimple


@admin.register(SurveyTest)
class ModelSurveyTestAdmin(PolymorphicChildModelAdmin):
    base_model = SurveyTest


@admin.register(ISurvey)
class ModelISurveyAdmin(PolymorphicParentModelAdmin):
    base_model = ISurvey
    readonly_fields = ('type_survey',)
    child_models = (SurveyTest, SurveySimple)
    list_filter = (PolymorphicChildModelFilter,)
    list_display = ("id", "name", "is_published", "type_survey", "user", )
    list_display_links = ('id', 'name')

    def get_queryset(self, request):
        return ISurvey.objects.all()

    def type_survey(self, obj):
        return type(obj).__name__

    type_survey.short_description = 'Тип'