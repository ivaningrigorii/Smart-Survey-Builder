# Generated by Django 4.1.7 on 2023-05-06 20:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('survey_passing', '0002_alter_takingsurvey_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='iresultanswer',
            name='question',
        ),
    ]
