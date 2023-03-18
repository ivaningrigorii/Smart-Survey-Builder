from django.db import models
from polymorphic.models import PolymorphicModel
from apps.survey_manage.question_blocks.models import IQuestion

# ВСЕ МОДЕЛИ В: src_back.model_descriptions

# region ABSTRACT


class IAnswer(PolymorphicModel, models.Model):
    """ Общая структура ответа """
    question = models.ForeignKey(IQuestion, on_delete=models.CASCADE, verbose_name='Вопрос')

    class Meta:
        db_table = 'i_answer'


class IFreeAnswer(IAnswer, PolymorphicModel, models.Model):
    """ Вопросы, в которых не нужно выбирать - текстовые поля всякие, общая структура """

    class Meta:
        db_table = 'i_answer_free'

# endregion


class AnswerSelectableSimple(IAnswer, PolymorphicModel, models.Model):
    """ответ, который нужно выбирать, простой - не тестовый"""
    text = models.CharField(max_length=200, verbose_name='Текст ответа')

    class Meta:
        db_table = 'answer_selectable_simple'


class AnswerSelectableTest(AnswerSelectableSimple, models.Model):
    """ тестовый ответ с возможностью определить правильность/неправильность """
    correct = models.BooleanField(default=False, verbose_name='Правильность ответа (bool)')

    class Meta:
        db_table = 'answer_selectable_test'


class AnswerTextInput(IFreeAnswer, models.Model):
    """ ответ в виде поля ввода """
    class Meta:
        db_table = 'answer_text_input'
