from django.urls import path
from . import views

app_name = 'user_profile'
urlpatterns = [
    path('', views.verify.as_view(), name='verify'),
    path('change_password', views.change_password.as_view(), name='change_password'),
    path('documents', views.documents.as_view(), name='documents'),
    path('newaccount', views.newaccount.as_view(), name='newaccount'),
    path('change_document_request', views.change_document_request.as_view(), name='change_document_request')
]