import pytz
from django.db import models
from django.utils import timezone

from apps.survey_manage.answer_blocks.models import IAnswer
from apps.survey_manage.survey_base.models import ISurvey
from polymorphic.models import PolymorphicModel
from django.contrib.auth import get_user_model


# ВСЕ МОДЕЛИ В: src_back.model_descriptions


class TakingSurvey(models.Model):
    """ Прохождение опроса (их может быть несколько у одного пользователя)"""
    survey = models.ForeignKey(ISurvey, verbose_name='Проходимый опрос', on_delete=models.CASCADE)
    user = models.ForeignKey(get_user_model(), verbose_name='Проходящий',
                             null=True, on_delete=models.SET_NULL)

    time_passing = models.IntegerField(verbose_name='Время прохождения в минутах', null=True, blank=True)
    time_start = models.DateTimeField(null=True, verbose_name='Начало прохождения')
    time_end = models.DateTimeField(null=True, verbose_name='Завершение прохождения')
    is_completed = models.BooleanField(default=False, verbose_name='Статус прохождения')

    def __str__(self):
        return f"{self.user}: {self.survey}"

    def save(self, *args, **kwargs):
        if not self.id:
            self.time_start = timezone.now()
            if hasattr(self.survey, 'time_passing'):
                self.time_passing = self.survey.time_passing
        elif self.is_completed and 'update_fields' in kwargs and 'is_completed' in kwargs['update_fields']:
            self.time_end = timezone.now()
        super(TakingSurvey, self).save(*args, **kwargs)

    class Meta:
        db_table = 'taking_survey'
        verbose_name = 'прождение всего опроса'
        verbose_name_plural = 'прохождения всего опроса'


# region ABSTRACT

class IResultAnswer(PolymorphicModel, models.Model):
    """Общий класс, описание результата <выбора/ввода и т.п.> ответа"""
    taking_survey = models.ForeignKey(TakingSurvey, on_delete=models.CASCADE, verbose_name='Прохождение')
    answer = models.ForeignKey(IAnswer, on_delete=models.CASCADE, verbose_name='Структура ответа')

    class Meta:
        db_table = 'i_result_answer'
        verbose_name = 'рез. ответ (i_result_answer)'
        verbose_name_plural = 'рез. ответы (i_result_answer)'


# endregion


class ResultSelect(IResultAnswer, models.Model):
    """ для всех ответов, где требуется выбор, тут answer и есть выбранный ответ """

    def __str__(self):
        answer_check_fulltype = IAnswer.objects.get(pk=self.answer.pk)
        return f"ответ: {answer_check_fulltype.__str__()}"

    class Meta:
        db_table = 'result_select'
        verbose_name = 'выбранный ответ'
        verbose_name_plural = 'выбранные ответы'


class ResultTextInput(IResultAnswer, models.Model):
    """ для полей ввода текста """
    input_text = models.CharField(max_length=300, verbose_name='Введённый текст')

    def __str__(self):
        return f"ответ: {self.input_text}"

    class Meta:
        db_table = 'result_test_input'
        verbose_name = 'введённый текст'
        verbose_name_plural = 'введённые тексты'
