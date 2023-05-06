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
    description = models.TextField(max_length=400, verbose_name='Описание опроса', null=True, blank=True)
    time_create = models.DateTimeField(auto_now_add=True, verbose_name='Был создан')
    slug = models.SlugField(unique=True, max_length=108, null=True, blank=True)
    img = models.ImageField(upload_to="photos/isurvey/%Y/%m/%d/",
                             verbose_name='фото к опросу', null=True, blank=True)

    option_is_published = models.BooleanField(default=False, verbose_name='Публикация', blank=True)
    option_only_for_register_users = \
        models.BooleanField(default=False, verbose_name="Необходимость авторизации", blank=True)
    max_attempts = models.IntegerField(default=1, verbose_name='Максимальное число попыток')

    def __str__(self):
        return f"{self.name}"

    def save(self, *args, **kwargs):
        if not self.id:
            new_slug = slugify(self.name, max_length=100)
            while ISurvey.objects.filter(slug=new_slug).exists():
                new_slug = f'{new_slug}-{uuid4().hex[:7]}'
            self.slug = new_slug
        super(ISurvey, self).save(*args, **kwargs)

    class Meta:
        db_table = 'i_survey'
        verbose_name = 'шапка опроса (isurvey)'
        verbose_name_plural = 'все опросы (isurvey)'

# endregion


class SurveySimple(ISurvey, PolymorphicModel, models.Model):
    """ Модель для отметки простых опросов, не могут содержать тестовые вопросы """

    class Meta:
        db_table = 'survey_simple'
        verbose_name = 'простой опрос'
        verbose_name_plural = 'простые опросы'


class SurveyTest(ISurvey, PolymorphicModel, models.Model):
    """ Тестовый опрос, может содержать тестовые вопросы, простые вопросы и поля ввода """
    start_time = models.DateTimeField(verbose_name='Дата открытия теста', null=True, blank=True)
    end_time = models.DateTimeField(verbose_name='Дата окончания теста', null=True, blank=True)
    time_passing = models.IntegerField(verbose_name='Время прохождения в минутах', null=True, blank=True)

    class Meta:
        db_table = 'survey_test'
        verbose_name = 'тестовый опрос'
        verbose_name_plural = 'тестовые опросы'
