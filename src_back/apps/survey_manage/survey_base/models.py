from uuid import uuid4

from django.db import models
from django.contrib.auth import get_user_model
from polymorphic.models import PolymorphicModel
from slugify import slugify

# ВСЕ МОДЕЛИ В: src_back.model_descriptions

# region ABSTRACT


class ISurvey(PolymorphicModel, models.Model):
    """ Условно абстрактный класс. Описывает общую структуру опроса """
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, verbose_name='Пользователь')
    name = models.CharField(max_length=100, verbose_name='Название опроса')
    description = models.TextField(max_length=400, verbose_name='Описание опроса', null=True)
    time_create = models.DateTimeField(auto_now_add=True, verbose_name='Был создан')
    slug = models.SlugField(unique=True, max_length=100, null=True)

    def __str__(self):
        return f"{self.name}"

    def save(self, *args, **kwargs):
        if not self.id:
            new_slug = slugify(self.name, max_length=100)
            while ISurvey.objects.filter(slug=new_slug).exists():
                new_slug = f'{new_slug}-{uuid4().hex[:8]}'
            self.slug = new_slug
        super(ISurvey, self).save(*args, **kwargs)

    class Meta:
        db_table = 'i_survey'

# endregion


class SurveySimple(ISurvey, PolymorphicModel, models.Model):
    """ Модель для отметки простых опросов, не могут содержать тестовые вопросы """

    class Meta:
        db_table = 'survey_simple'


class SurveyTest(ISurvey, PolymorphicModel, models.Model):
    """ Тестовый опрос, может содержать тестовые вопросы, простые вопросы и поля ввода """
    start_time = models.DateTimeField(verbose_name='Дата открытия теста', null=True)
    end_time = models.DateTimeField(verbose_name='Дата окончания теста', null=True)
    time_passing = models.IntegerField(verbose_name='Время прохождения в минутах', null=True)

    class Meta:
        db_table = 'survey_test'
