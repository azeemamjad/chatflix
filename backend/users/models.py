# accounts/models.py

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


class AppUser(AbstractUser):
    # Basic Profile Fields
    full_name = models.CharField(max_length=255)
    profile_picture = models.ImageField(upload_to='profiles/', null=True, blank=True)
    bio = models.TextField(blank=True, default="Hey there! I am using Django.")
    otp = models.CharField(max_length=6, blank=True, null=True)

    # Status / Online Presence
    is_online = models.BooleanField(default=False)
    last_seen = models.DateTimeField(default=timezone.now)

    # Account & Privacy Settings
    is_verified = models.BooleanField(default=False)
    allow_last_seen = models.BooleanField(default=True)
    allow_profile_picture = models.BooleanField(default=True)
    allow_status_view = models.BooleanField(default=True)

    # Blocked Users - self-referencing many-to-many
    blocked_users = models.ManyToManyField('self', symmetrical=False, related_name='blocked_by', blank=True)

    def __str__(self):
        return self.username
