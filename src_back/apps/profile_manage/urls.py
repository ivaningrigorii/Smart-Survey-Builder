from django.urls import path, re_path, include
from .views import CreatedSurveys

urlpatterns = [
    path('cats/created/', CreatedSurveys.as_view()),
    path('cats/created/<int:pk>/', CreatedSurveys.as_view()),
]
