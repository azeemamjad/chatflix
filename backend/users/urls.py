from django.urls import path
from .views import RequestOTPView, VerifyOTPView, RegisterUserView, ProtectedView

urlpatterns = [
    path('protected/', ProtectedView.as_view(), name='protected'),
    path('request-otp/', RequestOTPView.as_view(), name='request-otp'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify-otp'),
    path('register/', RegisterUserView.as_view(), name='register'),
]