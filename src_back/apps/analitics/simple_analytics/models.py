from django.db import models

# Create your models here.
from apps.survey_manage.question_blocks.models import IQuestion
from apps.survey_manage.survey_base.models import ISurvey


class SimpleAnalytics(models.Model):
    """ Простая аналитика (кол-во выборов ответа) """
    survey = models.ForeignKey(ISurvey, on_delete=models.CASCADE, verbose_name='Опрос')
    question = models.ForeignKey(IQuestion, on_delete=models.CASCADE, verbose_name='Вопрос')

    class Meta:
        verbose_name = 'простая аналитика (SimpleAnalytics)'
        verbose_name_plural = 'вся простая аналитика (SimpleAnalytics)'
        db_table = 'SimpleAnalytics'

