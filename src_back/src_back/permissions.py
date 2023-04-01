from django.contrib.auth import get_user_model
from rest_framework import permissions


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
            result = bool(request.user and (obj.user == request.user))
            return result
        except:
            return False


class IsOwnerProfile(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return bool(request.user and (obj == request.user))
