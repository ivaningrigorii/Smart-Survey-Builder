# Generated by Django 4.1.7 on 2023-04-13 10:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('survey_base', '0004_alter_isurvey_is_published'),
    ]

    operations = [
        migrations.RenameField(
            model_name='isurvey',
            old_name='is_published',
            new_name='option_is_published',
        ),
        migrations.AddField(
            model_name='isurvey',
            name='option_only_for_register_users',
            field=models.BooleanField(default=False, verbose_name='Необходимость авторизации'),
        ),
    ]