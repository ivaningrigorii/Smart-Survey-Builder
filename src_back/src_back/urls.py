from django.contrib import admin
from django.urls import path, include
from .yasg import urlpatterns as doc_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/passing/', include('apps.survey_passing.urls')),
    path('api/v1/manage/surv/', include('apps.survey_manage.survey_base.urls')),
    path('api/v1/manage/quest/', include('apps.survey_manage.question_blocks.urls')),
    path('api/v1/manage/ans/', include('apps.survey_manage.answer_blocks.urls')),
    path('api/v1/profile/', include('apps.profile_manage.urls')),
    path('api/v1/auth/', include('djoser.urls')),
    path('api/v1/login/', include('djoser.urls.jwt')),
]

urlpatterns += doc_urls
