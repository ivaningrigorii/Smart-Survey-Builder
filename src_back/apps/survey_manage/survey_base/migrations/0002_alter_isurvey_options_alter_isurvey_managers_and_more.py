# Generated by Django 4.1.7 on 2023-05-07 12:31

from django.db import migrations
import django.db.models.manager


class Migration(migrations.Migration):

    dependencies = [
        ('survey_base', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='isurvey',
            options={'base_manager_name': 'non_polymorphic', 'verbose_name': 'шапка опроса (isurvey)', 'verbose_name_plural': 'все опросы (isurvey)'},
        ),
        migrations.AlterModelManagers(
            name='isurvey',
            managers=[
                ('non_polymorphic', django.db.models.manager.Manager()),
            ],
        ),
        migrations.AlterModelManagers(
            name='surveysimple',
            managers=[
                ('non_polymorphic', django.db.models.manager.Manager()),
            ],
        ),
        migrations.AlterModelManagers(
            name='surveytest',
            managers=[
                ('non_polymorphic', django.db.models.manager.Manager()),
            ],
        ),
    ]