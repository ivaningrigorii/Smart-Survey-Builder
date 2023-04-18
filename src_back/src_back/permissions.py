from django.contrib.auth import get_user_model
from rest_framework import permissions, exceptions
from rest_framework.generics import get_object_or_404

from apps.survey_manage.question_blocks.models import IQuestion
from apps.survey_manage.survey_base.models import ISurvey


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
    "Для ответов в вопрос, которыми user владеет"

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


class IsPublishedSurvey(permissions.BasePermission):

    def has_permission(self, request, view):
        try:
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


class IsOwnerProfile(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return bool(request.user and (obj == request.user))
