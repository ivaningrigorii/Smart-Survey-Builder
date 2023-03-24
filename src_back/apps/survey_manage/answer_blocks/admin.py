from django.contrib import admin

from apps.survey_manage.answer_blocks.models import *

admin.site.register(IAnswer)
admin.site.register(AnswerTextInput)
admin.site.register(AnswerSelectableTest)
admin.site.register(AnswerSelectableSimple)
