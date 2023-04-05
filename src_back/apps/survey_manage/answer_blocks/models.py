from django.db import models
from polymorphic.models import PolymorphicModel
from apps.survey_manage.question_blocks.models import IQuestion

# ВСЕ МОДЕЛИ В: src_back.model_descriptions

# region ABSTRACT


class IAnswer(PolymorphicModel, models.Model):
    """ Общая структура ответа """
    question = models.ForeignKey(IQuestion, on_delete=models.CASCADE, verbose_name='Вопрос')
    non_polymorphic = models.Manager()

    class Meta:
        db_table = 'i_answer'
        base_manager_name = 'non_polymorphic'
        verbose_name = 'ответ (ianswer)'
        verbose_name_plural = 'ответы (ianswer)'


class IFreeAnswer(IAnswer, PolymorphicModel, models.Model):
    """ Вопросы, в которых не нужно выбирать - текстовые поля всякие, общая структура """
    non_polymorphic = models.Manager()

    class Meta:
        db_table = 'i_answer_free'
        base_manager_name = 'non_polymorphic'
        verbose_name = 'без варианта ответа'
        verbose_name_plural = 'без варианта ответа'

# endregion


class AnswerSelectableSimple(IAnswer, PolymorphicModel, models.Model):
    """ответ, который нужно выбирать, простой - не тестовый"""
    text = models.CharField(max_length=200, verbose_name='Текст ответа')

    def __str__(self):
        return f"{self.text}"

    class Meta:
        db_table = 'answer_selectable_simple'
        verbose_name = 'вариант ответа, простой'
        verbose_name_plural = 'варианты ответа, простые'


class AnswerSelectableTest(AnswerSelectableSimple, models.Model):
    """ тестовый ответ с возможностью определить правильность/неправильность """
    correct = models.BooleanField(default=False, verbose_name='Правильность ответа (bool)')

    class Meta:
        db_table = 'answer_selectable_test'
        verbose_name = 'вариант ответа, тест'
        verbose_name_plural = 'варианты ответа, тест'


class AnswerTextInput(IFreeAnswer, models.Model):
    """ ответ в виде поля ввода """

    def __str__(self):
        return f"поле ввода: ____"

    class Meta:
        db_table = 'answer_text_input'
        verbose_name = 'поле ввода текста'
        verbose_name_plural = 'поля ввода текста'
