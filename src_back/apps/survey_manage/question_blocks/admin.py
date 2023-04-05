from django.contrib import admin
from django.contrib.contenttypes.models import ContentType
from django.http import Http404
from polymorphic.admin import *
from polymorphic.admin.parentadmin import ChildAdminNotRegistered
from django.core.exceptions import ImproperlyConfigured, PermissionDenied

from apps.survey_manage.question_blocks.models import *


class ModelAChildAdmin(PolymorphicChildModelAdmin):
    """ Base admin class for all child models """
    base_model = IQuestion  # Optional, explicitly set here.

    # By using these `base_...` attributes instead of the regular ModelAdmin `form` and `fieldsets`,
    # the additional fields of the child models are automatically added to the admin form.
    list_display = ("user", id)
    # base_form = ...
    # base_fieldsets = (
    #     "user", "id"
    # )

@admin.register(QuestionSimple)
class ModelQuestionSimpleChildAdmin(PolymorphicChildModelAdmin):
    base_model = QuestionSimple


@admin.register(QuestionTestSimpleEv)
class ModelQuestionTestSimpleEv(PolymorphicChildModelAdmin):
    base_model = QuestionTestSimpleEv


@admin.register(IQuestion)
class ModelIQuestionParentAdmin(PolymorphicParentModelAdmin):
    base_model = IQuestion
    child_models = (QuestionSimple, QuestionTestSimpleEv)
    list_filter = (PolymorphicChildModelFilter,)
    list_display = ("id", "text_question", "survey")

    def get_queryset(self, request):
        return IQuestion.objects.all()


