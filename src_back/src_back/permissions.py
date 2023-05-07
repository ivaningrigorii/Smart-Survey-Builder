import logging
from django.contrib.auth import get_user_model
from rest_framework import permissions, exceptions
from rest_framework.generics import get_object_or_404

from apps.analitics.simple_analytics.models import SimpleAnalytics
from apps.survey_manage.answer_blocks.models import IAnswer
from apps.survey_manage.question_blocks.models import IQuestion
from apps.survey_manage.survey_base.models import ISurvey
from apps.survey_passing.models import TakingSurvey, IResultAnswer


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_staff)


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Object-level permission to only allow owner of an object to edit it.
    Assumes the model instance has an 'owner' attribute.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user


class IsOwnerISurvey(permissions.BasePermission):
    "Доступ только если хозяин объекта"

    def has_object_permission(self, request, view, obj):
        try:
            print(obj)
            result = bool(request.user and (obj.user == request.user))
            return result
        except:
            return False


class IsOwnerQuestionInSurvey(permissions.BasePermission):
    "Для вопросов в опросе, которыми user владеет"

    "Для редактирования существующих вопросов"

    def has_object_permission(self, request, view, obj):
        return bool(obj.survey.user == request.user)

    "Для добавления новых вопросов"

    def has_permission(self, request, view):
        pk = view.kwargs.get('pk')
        if pk is not None:
            return True
        try:
            survey_id = request.data.get('survey')
            survey = ISurvey.objects.get(pk=survey_id)
            user = request.user
            return user and (survey.user == user)
        except:
            return False


class IsOwnerAnswerInQuestionInSurvey(permissions.BasePermission):
    """
        Для ответов в вопрос, которыми user владеет
    """

    "Для редактирования существующих ответов"

    def has_object_permission(self, request, view, obj):
        return bool(obj.question.survey.user == request.user)

    "Для добавления новых ответов"

    def has_permission(self, request, view):
        pk = view.kwargs.get('pk')
        if pk is not None:
            return True
        try:
            question_id = request.data.get('question')
            question = IQuestion.objects.get(pk=question_id)
            survey = question.survey
            user = request.user
            return user and (survey.user == user)
        except:
            return False


class IsPublishedSurveyObj(permissions.BasePermission):
    """
        Проверка опроса на опубликованность
    """
    def has_object_permission(self, request, view, obj):
        if type(obj) == TakingSurvey:
            return True
        try:
            if obj.option_is_published==True:
                logging.warning("возвращаем")
                return True
        except:
            return False
        return False


class IsPublishedSurvey(permissions.BasePermission):
    """
        Проверка опроса на опубликованность
    """

    def has_permission(self, request, view):
        try:
            if request.data.get('taking_survey') is not None:
                taking_survey_id = request.data.get('taking_survey')
                taking_survey = TakingSurvey.objects.get(pk=taking_survey_id)
                survey_id = taking_survey.survey.id
            if view.kwargs.get('id') is not None:
                survey_id = view.kwargs.get('id')
            elif request.data.get('survey') is not None:
                survey_id = request.data.get('survey')
            survey = ISurvey.objects.get(pk=survey_id)
        except:
            message = 'Опроса не существует.'
            raise exceptions.PermissionDenied(detail=message)
        if survey.option_is_published:
            return True
        else:
            message = 'Опрос не опубликован.'
            raise exceptions.PermissionDenied(detail=message)


class IsActiveTakingSurvey(permissions.BasePermission):
    """
        Проверка завершённости прохождения опроса
    """

    def has_permission(self, request, view):
        try:
            taking_survey_id = request.data.get('taking_survey')
            taking_survey = TakingSurvey.objects.get(pk=taking_survey_id)
        except:
            message = 'Опрос не проходился'
            raise exceptions.PermissionDenied(detail=message)
        if not taking_survey.is_completed:
            return True
        else:
            message = 'Опрос завершён'
            raise exceptions.PermissionDenied(detail=message)


class IsAnswerInSurvey(permissions.BasePermission):
    """
        Проверка корректного выбора ответа и вопроса
    """

    def has_permission(self, request, view):
        try:
            taking_survey_id = request.data.get('taking_survey')
            taking_survey = TakingSurvey.objects.get(pk=taking_survey_id)
            survey = taking_survey.survey
            answer_id = request.data.get('answer')
            answer = IAnswer.objects.get(pk=answer_id)
            question_answer = answer.question
            question_id = request.data.get('question')
            question = IQuestion.objects.get(pk=question_id)
            if question.survey == survey and question_answer.id == question.id:
                return True
            else:
                message = 'Ответ не принадлежит вопросу'
                raise exceptions.PermissionDenied(detail=message)
        except:
            message = 'Ответ не из этого опроса'
            raise exceptions.PermissionDenied(detail=message)


class IsCorrectAnswerSerializer(permissions.BasePermission):
    """
        Проверка корректного сериализатора при сохранениии ответа
    """

    def has_permission(self, request, view):

        resource_type = request.data.get('resourcetype')
        result_select = request.data.get('answer')
        answer = IAnswer.objects.get(pk=result_select)
        model_name = answer._meta.model_name
        if ((model_name == "answerselectablesimple" or "AnswerSelectableTest") and resource_type == "ResultSelect") \
                or (model_name == "answertextinput" and resource_type == "ResultTextInput"):
            return True
        else:
            message = 'Выбран неправильный resourcetype'
            raise exceptions.PermissionDenied(detail=message)


class IsOnlySelectAnswer(permissions.BasePermission):
    """
        Проверка на наличие уже выбранного ответа
    """

    def has_permission(self, request, view):

        taking_survey_id = request.data.get('taking_survey')
        question = request.data.get('question')
        result_answer = IResultAnswer.objects.filter(taking_survey_id=taking_survey_id, question_id=question)
        if result_answer.count() == 0:
            return True
        else:
            message = 'Ответ уже выбран'
            raise exceptions.PermissionDenied(detail=message)


class IsQuestionInSurvey(permissions.BasePermission):
    """
        Проверка корректного выбора вопроса и опроса
    """

    def has_permission(self, request, view):
        message = 'Опрос или вопрос не существуют'
        try:
            survey_id = request.data.get('survey')
            survey = ISurvey.objects.get(pk=survey_id)
            question_id = request.data.get('question')
            question = IQuestion.objects.get(pk=question_id)
            if question.survey == survey:
                return True
            else:
                message = 'Вопрос не принадлежит опросу'
                raise exceptions.PermissionDenied(detail=message)
        except:
            raise exceptions.PermissionDenied(detail=message)


class IsQuestionHaveAnalytics(permissions.BasePermission):
    """
        Проверка наличия аналитики у вопроса
    """

    def has_permission(self, request, view):
        message = 'Вопрос не существует'
        try:
            question_id = view.kwargs.get('question_id')
            question = IQuestion.objects.get(pk=question_id)
            analytics = SimpleAnalytics.objects.get(question=question)
            if analytics is not None:
                return True
            else:
                message = 'У вопроса нет аналитики'
                raise exceptions.PermissionDenied(detail=message)
        except:
            raise exceptions.PermissionDenied(detail=message)


class IsOwnerISurveyAnalytics(permissions.BasePermission):
    "Доступ только если хозяин объекта"

    def has_permission(self, request, view):
        message = 'Опрос или вопрос не существуют'
        try:
            survey_id = request.data.get('survey')
            survey = ISurvey.objects.get(pk=survey_id)

            if survey.user == request.user:
                return True
            else:
                message = 'Не владелец опроса'
                raise exceptions.PermissionDenied(detail=message)
        except:
            raise exceptions.PermissionDenied(detail=message)


class IsOwnerProfile(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return bool(request.user and (obj == request.user))
