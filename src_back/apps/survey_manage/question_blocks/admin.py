from django.contrib import admin

from apps.survey_manage.question_blocks.models import *

admin.site.register(IQuestion)
admin.site.register(QuestionSimple)
admin.site.register(QuestionTestSimpleEv)
