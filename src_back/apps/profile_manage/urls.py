from django.urls import path, re_path, include

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('', include('djoser.urls.jwt')),
]
