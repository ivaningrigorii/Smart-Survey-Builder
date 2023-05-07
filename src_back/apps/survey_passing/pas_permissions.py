import logging

from rest_framework import permissions, exceptions

from apps.survey_passing.models import TakingSurvey


class IsYouIsYouAnsRegister(permissions.BasePermission):
    """ Проверка, может ли пользователь проходить данный опрос """
    def has_object_permission(self, request, view, obj):
        if type(obj) != TakingSurvey:
            return True

        if obj.survey.option_only_for_register_users:
            if request.user is None:
                raise exceptions.PermissionDenied(detail="Необходима регистрация")

        if obj.user is not None:
            if not obj.user == request.user:
                raise exceptions.PermissionDenied(detail="Прохождение за другого")


class IsPublishedSurveyObj(permissions.BasePermission):
    """ Проверка опроса на опубликованность """
    def has_object_permission(self, request, view, obj):
        if type(obj) != TakingSurvey:
            return True

        if not obj.survey.option_is_published:
            raise exceptions.PermissionDenied(detail="Закрытый опрос. Прохождение невозможно")


class IsActiveTakingSurveyObj(permissions.BasePermission):
    """ Проверка завершённости прохождения опроса """
    def has_object_permission(self, request, view, obj):
        if type(obj) != TakingSurvey:
            return True

        if not obj.is_completed:
            return True

        raise exceptions.PermissionDenied(detail='Опрос завершён')
