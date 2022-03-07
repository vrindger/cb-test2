from django.contrib import admin
from .models import Chat
# Register your models here.

class ChatAdmin(admin.ModelAdmin):
    list = ('sender_email', 'receiver_email', 'title', 'chat_body')

    admin.site.register(Chat)