"""jansuvidha URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from .views import index,register,getFiles,RequiredFields,getRefreshToken,recaptcha,SchemesApplication,eligibleSchemes,VerifyOtpView,SendOtpView, LogoutView,registerScheme, requiredDocs, isStaff, schemedetails, viewScheme,fetchRequiredFields

urlpatterns = [
    path('', index),
    path('register/', register),
    path('sendotp/', SendOtpView.as_view()),
    path('verifyotp/', VerifyOtpView.as_view()),
    path('callback/', getRefreshToken),
    path('getfiles/', getFiles),
    path('schemesapplication/',SchemesApplication),
    path('eligibleschemes/',eligibleSchemes),
    path('requiredfields/', RequiredFields),
    path('fetchrequiredfields/', fetchRequiredFields),
    path('isstaff/',isStaff),
    path('recaptcha/', recaptcha),
    path('logout/', LogoutView.as_view()),
    path('registerscheme/', registerScheme),
    path('requireddocs/', requiredDocs),
    path('schemesapplication/',SchemesApplication),
    path('schemedetails/', schemedetails),
    path('viewscheme/', viewScheme)
    ]
