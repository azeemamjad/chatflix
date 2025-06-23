from rest_framework import serializers
from .models import AppUser

class RequestOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()

class VerifyOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)

class RegisterUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)
    username = serializers.CharField()
    profile_picture = serializers.ImageField(required=False, allow_null=True)
    bio = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = AppUser
        fields = ['email', 'otp', 'username', 'profile_picture', 'bio']