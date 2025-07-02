# Create your views here.
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from django.contrib.auth import get_user_model
from .serializers import RequestOTPSerializer, VerifyOTPSerializer, RegisterUserSerializer
from .utils import send_otp_email, generate_otp
from django.core.files.base import ContentFile
from rest_framework_simplejwt.tokens import RefreshToken

#google auth related imports
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from urllib.parse import urlparse
import requests


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

User = get_user_model()

GOOGLE_CLIENT_ID = "619430419090-0efbe1i8fl0el6tc8jii8kh7d4hoce8d.apps.googleusercontent.com"

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "You are authenticated"})

class LoginView(APIView):
    """
    A view that requires authentication to access.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Returns a message indicating successful authentication.
        """
        return Response({"message": "You are authenticated and can access this view."})

class RequestOTPView(APIView):
    def post(self, request):
        serializer = RequestOTPSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            otp = generate_otp()
            user, created = User.objects.get_or_create(email=email)
            user.otp = otp
            user.save()
            send_otp_email(email, otp)
            return Response({"message": "OTP sent to email."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyOTPView(APIView):
    def post(self, request):
        serializer = VerifyOTPSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            otp = serializer.validated_data['otp']
            try:
                user = User.objects.get(email=email)
                if user.otp == otp:
                    if user.is_verified:
                        tokens = get_tokens_for_user(user)
                        return Response({
                            "message": "Login successful.",
                            "user_id": user.id,
                            "tokens": tokens
                        }, status=status.HTTP_200_OK)
                    else:
                        return Response({"message": "OTP verified. Please complete registration."}, status=status.HTTP_200_OK)
                else:
                    return Response({"error": "Invalid OTP."}, status=status.HTTP_400_BAD_REQUEST)
            except User.DoesNotExist:
                return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegisterUserView(APIView):
    def post(self, request):
        serializer = RegisterUserSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            otp = serializer.validated_data['otp']
            username = serializer.validated_data['username']
            bio = serializer.validated_data.get('bio', '')
            profile_picture = serializer.validated_data.get('profile_picture', None)
            try:
                user = User.objects.get(email=email)
                if user.otp != otp:
                    return Response({"error": "Invalid OTP."}, status=status.HTTP_400_BAD_REQUEST)
                user.username = username
                user.bio = bio
                user.is_verified = True
                if profile_picture:
                    user.profile_picture = profile_picture
                user.save()
                tokens = get_tokens_for_user(user)
                return Response({
                    "message": "Registration successful. You are now logged in.",
                    "user_id": user.id,
                    "tokens": tokens
                }, status=status.HTTP_201_CREATED)
            except User.DoesNotExist:
                return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class GoogleLoginView(APIView):
    def post(self, request):
        token = request.data.get("token")
        if not token:
            return Response({"error": "Token is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            idinfo = id_token.verify_oauth2_token(
                token, google_requests.Request(), GOOGLE_CLIENT_ID
            )

            email = idinfo.get("email")
            name = idinfo.get("name")
            picture = idinfo.get("picture")

            if not email:
                return Response({"error": "Email not found in token."}, status=status.HTTP_400_BAD_REQUEST)

            user, created = User.objects.get_or_create(email=email)

            if created:
                user.username = email.split("@")[0]
                user.is_verified = True

                try:
                    image_content = requests.get(picture).content
                    filename = urlparse(picture).path.split('/')[-1]
                    user.profile_picture.save(filename, ContentFile(image_content), save=True)
                except Exception as e:
                    print("Profile picture save failed:", e)
    
                user.save()

            tokens = get_tokens_for_user(user)

            return Response({
                "message": "Google login successful.",
                "user_id": user.id,
                "token": tokens['access'],
                "refresh": tokens['refresh'],
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": "Invalid Google token", "details": str(e)}, status=status.HTTP_400_BAD_REQUEST)