from django.db import models
from polymorphic.models import PolymorphicModel
from apps.survey_manage.survey_base.models import SurveySimple, ISurvey

# ВСЕ МОДЕЛИ В: src_back.model_descriptions

# region ABSTRACT_MODELS


class IQuestion(PolymorphicModel, models.Model):
    """ Общая струтура всех блоков вопросов """
    survey = models.ForeignKey(ISurvey, on_delete=models.CASCADE, verbose_name='Опрос')

    text_question = models.CharField(max_length=300, verbose_name='Текст вопроса')
    non_polymorphic = models.Manager()
    one_answer_with_a_choice \
        = models.BooleanField(default=True, null=True, verbose_name='Выбор только 1 ответа')

    def __str__(self):
        return f"{self.text_question}"

    class Meta:
        verbose_name = 'вопрос (iquestion)'
        verbose_name_plural = 'все вопросы (iquestion)'
        base_manager_name = 'non_polymorphic'
        db_table = 'i_question'


class ITestQuestion(IQuestion, PolymorphicModel, models.Model):
    """ Общая структура всех тестовых блоков вопросов """
    non_polymorphic = models.Manager()

    class Meta:
        base_manager_name = 'non_polymorphic'
        db_table = 'i_test_question'

# endregion


class QuestionSimple(IQuestion, PolymorphicModel, models.Model):
    """ Простой вопрос нетестовый вопрос """
    position_survey = \
        models.IntegerField(verbose_name='Позиция в списке вопросов', null=True, default=None)

    class Meta:
        verbose_name = 'простой вопрос'
        verbose_name_plural = 'простые вопросы'
        db_table = 'question_simple'


class QuestionTestSimpleEv(ITestQuestion, PolymorphicModel, models.Model):
    """ Тестовый вопрос с простой оценкой: правильно / неправильно """
    class Meta:
        verbose_name = 'тестовый вопрос с выбором'
        verbose_name_plural = 'тестовые вопросы с выбором'
        db_table = 'question_test_simple_ev'
