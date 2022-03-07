from django.db import models

# Create your models here.
class Chat(models.Model):
    sender_email = models.CharField(max_length=250)
    receiver_email = models.CharField(max_length=200)
    title = models.CharField(max_length=250)
    chat_body = models.CharField(max_length=250)

    def __str__(self):
        return self.__all__