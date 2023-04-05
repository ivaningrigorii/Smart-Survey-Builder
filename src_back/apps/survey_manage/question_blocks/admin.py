from django.contrib import admin
from polymorphic.admin import *

from apps.survey_manage.question_blocks.models import *


@admin.register(QuestionSimple)
class ModelQuestionSimpleChildAdmin(PolymorphicChildModelAdmin):
    """админ модель простых вопросов"""
    base_model = QuestionSimple


@admin.register(QuestionTestSimpleEv)
class ModelQuestionTestSimpleEv(PolymorphicChildModelAdmin):
    """админ модель тестовых вопросов с простой оценкой"""
    base_model = QuestionTestSimpleEv


@admin.register(IQuestion)
class ModelIQuestionParentAdmin(PolymorphicParentModelAdmin):
    """админ панель шапки опроса"""
    readonly_fields = ('type_question', )
    base_model = IQuestion
    child_models = (QuestionSimple, QuestionTestSimpleEv)
    list_filter = (PolymorphicChildModelFilter,)
    list_display = ("id", "text_question", "survey", "type_question")
    list_display_links = ('id', 'text_question')

    def get_queryset(self, request):
        return IQuestion.objects.all()

    def type_question(self, obj):
        return type(obj).__name__
    type_question.short_description = 'Тип'


