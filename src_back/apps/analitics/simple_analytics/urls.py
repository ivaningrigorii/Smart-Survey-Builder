from django.urls import path, re_path

from .views import *

urlpatterns = [
    path('simple_analytics/', CreateSimpleAnalyticsAPIView.as_view(), name='create_simple_analytics'),
    path('simple_analytics/<int:question_id>/', GetSimpleAnalyticsAPIView.as_view(), name='create_simple_analytics'),
]