from django.contrib import admin
from polymorphic.admin import *

from apps.survey_manage.answer_blocks.models import *


@admin.register(AnswerTextInput)
class ModelAnswerTextInputAdmin(PolymorphicChildModelAdmin):
    base_model = AnswerTextInput


@admin.register(AnswerSelectableTest)
class ModelAnswerSelectableTestAdmin(PolymorphicChildModelAdmin):
    base_model = AnswerSelectableTest


@admin.register(AnswerSelectableSimple)
class ModelAnswerSelectableSimpleAdmin(PolymorphicChildModelAdmin):
    base_model = AnswerSelectableSimple


@admin.register(IAnswer)
class ModelISurveyAdmin(PolymorphicParentModelAdmin):
    base_model = IAnswer
    readonly_fields = ('type_answer', 'str_answer')
    child_models = (AnswerTextInput, AnswerSelectableTest, AnswerSelectableSimple)
    list_filter = (PolymorphicChildModelFilter,)
    list_display = ("id", "str_answer", "type_answer", "question")
    list_display_links = ('id', )

    def get_queryset(self, request):
        return IAnswer.objects.all()

    def type_answer(self, obj):
        return type(obj).__name__

    def str_answer(self, obj):
        return obj.__str__()

    str_answer.short_description = 'ответ'
    type_answer.short_description = 'Тип'
