from django.shortcuts import render
from .models import Chat
from .serializers import ChatSerializer
from rest_framework import viewsets

# Create your views here.
class ChatViewSet(viewsets.ModelViewSet):
    serializer_class = ChatSerializer
    queryset = Chat.objects.all()