from pyexpat import model
from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

class User(AbstractUser):
    sid = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    refreshtoken = models.CharField(max_length=255, default=None,null=True)
    otp = models.SmallIntegerField(null=True)
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    def __str__(self):
        return str(self.sid)

# class DepartmentHead(models.Model):
#     dhid = models.AutoField(primary_key = True)
#     name = models.CharField(max_length=50)
    

    
#     def __str__(self):
#         return self.name


# class SchemeDetails(models.Model):
#     schemeid = models.AutoField(primary_key)
    
    # def __str__(self):
    #     return self.name

    

    
