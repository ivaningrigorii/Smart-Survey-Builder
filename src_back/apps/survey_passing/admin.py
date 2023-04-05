from django.contrib import admin
from polymorphic.admin import *

from apps.survey_manage.question_blocks.models import IQuestion
from apps.survey_passing.models import *


@admin.register(TakingSurvey)
class ModelTakingSurveyAdmin(admin.ModelAdmin):
    base_model = TakingSurvey


@admin.register(ResultSelect)
class ModelResultSelectAdmin(PolymorphicChildModelAdmin):
    base_model = ResultSelect


@admin.register(ResultTextInput)
class ModelResultTextInputAdmin(PolymorphicChildModelAdmin):
    base_model = ResultTextInput


@admin.register(IResultAnswer)
class ModelISurveyAdmin(PolymorphicParentModelAdmin):
    base_model = IResultAnswer
    readonly_fields = (
        'type_result_answer', 'taking_survey_full_data', 'user_pas', 'answer_show'
    )
    child_models = (ResultTextInput, ResultSelect, )
    list_filter = (PolymorphicChildModelFilter,)
    list_display = (
        "id", "type_result_answer", 'taking_survey_full_data', 'user_pas', 'answer_show'
    )
    list_display_links = ('id',)

    def get_queryset(self, request):
        return IResultAnswer.objects.all()

    def type_result_answer(self, obj):
        return type(obj).__name__

    def taking_survey_full_data(self, obj):
        return f"{obj.taking_survey.survey}: {obj.answer.question}"

    def user_pas(self, obj):
        return obj.taking_survey.user

    def answer_show(self, obj):
        return obj.__str__()

    taking_survey_full_data.short_description = 'проходимый опрос'
    user_pas.short_description = 'от пользователя'
    type_result_answer.short_description = 'тип'
    answer_show.short_description = 'текст ответа'