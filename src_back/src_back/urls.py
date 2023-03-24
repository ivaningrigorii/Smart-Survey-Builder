from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/passing/', include('apps.survey_passing.urls')),
    path('api/v1/manage/surv/', include('apps.survey_manage.survey_base.urls')),
    path('api/v1/manage/quest/', include('apps.survey_manage.question_blocks.urls')),
    path('api/v1/manage/ans/', include('apps.survey_manage.answer_blocks.urls')),
    path('api/v1/personal/', include('apps.profile_manage.urls')),
]
