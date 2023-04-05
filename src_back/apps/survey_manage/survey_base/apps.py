from django.apps import AppConfig


class SurveyBaseConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.survey_manage.survey_base'
    verbose_name = 'ОПРОС/ 1.ШАПКИ ОПРОСОВ'