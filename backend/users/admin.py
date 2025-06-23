from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import AppUser

@admin.register(AppUser)
class CustomUserAdmin(UserAdmin):
    model = AppUser
    fieldsets = UserAdmin.fieldsets + (
        ("Profile Info", {"fields": ("full_name", "profile_picture", "bio")}),
        ("Privacy", {"fields": ("allow_last_seen", "allow_profile_picture", "allow_status_view")}),
        ("Status", {"fields": ("is_online", "last_seen", "is_verified", "blocked_users")}),
    )
