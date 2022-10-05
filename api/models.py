from email.policy import default
from pyexpat import model
from unittest.util import _MAX_LENGTH
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
        
class Department(models.Model):
    deptid = models.AutoField(primary_key = True)
    deptname = models.TimeField(max_length = 50)


    def __str__(self):
        return self.name

 


class DepartmentHead(models.Model):
    dhid = models.AutoField(primary_key = True)
    name = models.CharField(max_length=50)
    deptid = models.ForeignKey(Department,on_delete = models.CASCADE, default=None)

    

    
    def __str__(self):
        return self.name



class Schemes(models.Model):
    schemeid = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length = 500)
    requireddocuments = models
    addedby = models.OneToOneField(DepartmentHead,on_delete = models.CASCADE, default=None)
    

    
    def __str__(self):
        return self.name

class RequiredDocs(models.Model):
    rdid = models.AutoField(primary_key = True)
    schemeid = models.ForeignKey(Schemes,on_delete = models.CASCADE, default=None)
    docname = models.CharField(max_length = 50)
    uri = models.CharField(max_length = 50)

    def __str__(self):
        return self.name

    


class AppliedSchemes(models.Model):
    asid = models.AutoField(primary_key = True)
    schemeid = models.OneToOneField(Schemes,on_delete=models.CASCADE,default=None)


    def __str__(self):
        return self.name
    
