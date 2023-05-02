# Generated by Django 4.1.7 on 2023-05-01 14:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profile_manage', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='photo',
        ),
        migrations.AddField(
            model_name='profile',
            name='img',
            field=models.ImageField(blank=True, null=True, upload_to='photos/profile/%Y/%m/%d/', verbose_name='фото профиля'),
        ),
    ]