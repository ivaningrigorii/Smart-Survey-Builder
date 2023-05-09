import logging

from rest_framework import permissions, exceptions

from apps.survey_manage.survey_base.models import ISurvey
from apps.survey_passing.models import TakingSurvey


class IsYouIsYouAnsRegister(permissions.BasePermission):
    """ Проверка, может ли пользователь проходить данный опрос """
    def has_object_permission(self, request, view, obj):
        if type(obj) == TakingSurvey:
            if obj.survey.option_only_for_register_users and request.user is None:
                raise exceptions.PermissionDenied(detail="Необходимо войти")
            if (obj.user is not None and obj.user != request.user) or \
                (obj.user is None and request.user is not None):
                raise exceptions.PermissionDenied(detail="Прохождение за другого")
        return True


class IsOnlyAuth(permissions.BasePermission):
    """ Проверяет только необходимость авторизации """
    def has_object_permission(self, request, view, obj):
        if type(obj) == ISurvey:
            if obj.option_only_for_register_users and request.user is None:
                raise exceptions.PermissionDenied(detail="Необходимо войти")
        return True


class IsPublishedSurveyAndTakingObjs(permissions.BasePermission):
    """ Проверка опроса на опубликованность в TakingSurvey """
    def has_object_permission(self, request, view, obj):
        if (type(obj) == TakingSurvey and not obj.survey.option_is_published) or \
                (type(obj) == ISurvey and not obj.option_is_published):
            raise exceptions.PermissionDenied(detail="Закрытый опрос. Прохождение невозможно")
        return True


class IsActiveTakingSurveyObj(permissions.BasePermission):
    """ Проверка завершённости прохождения опроса """
    def has_object_permission(self, request, view, obj):
        if type(obj) == TakingSurvey and obj.is_completed:
            raise exceptions.PermissionDenied(detail='Опрос завершён')
        return True

