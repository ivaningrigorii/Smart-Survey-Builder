# Generated by Django 4.1.7 on 2023-04-29 21:28

from django.db import migrations, models
import django.db.models.deletion
import django.db.models.manager


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('question_blocks', '0001_initial'),
        ('answer_blocks', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='ianswer',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='question_blocks.iquestion', verbose_name='Вопрос'),
        ),
        migrations.CreateModel(
            name='AnswerSelectableTest',
            fields=[
                ('answerselectablesimple_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='answer_blocks.answerselectablesimple')),
                ('correct', models.BooleanField(default=False, verbose_name='Правильность ответа (bool)')),
            ],
            options={
                'verbose_name': 'вариант ответа, тест',
                'verbose_name_plural': 'варианты ответа, тест',
                'db_table': 'answer_selectable_test',
            },
            bases=('answer_blocks.answerselectablesimple', models.Model),
            managers=[
                ('non_polymorphic', django.db.models.manager.Manager()),
            ],
        ),
        migrations.CreateModel(
            name='AnswerTextInput',
            fields=[
                ('ifreeanswer_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='answer_blocks.ifreeanswer')),
            ],
            options={
                'verbose_name': 'поле ввода текста',
                'verbose_name_plural': 'поля ввода текста',
                'db_table': 'answer_text_input',
            },
            bases=('answer_blocks.ifreeanswer', models.Model),
            managers=[
                ('non_polymorphic', django.db.models.manager.Manager()),
            ],
        ),
    ]
