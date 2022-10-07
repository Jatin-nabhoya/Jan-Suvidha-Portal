from binascii import Incomplete
from email.policy import default
from plistlib import UID
from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

class User(AbstractUser):
    uid = models.AutoField(primary_key=True)
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


class UserDetails(models.Model):
    uid = models.OneToOneField(User,on_delete = models.CASCADE, default=None, db_column = "uid")
    mobile = models.CharField(max_length=10)
    dob = models.DateField()
    address = models.CharField(max_length=255)
    caste = models.CharField(max_length=255)
    income = models.IntegerField()
    maritialstatus = models.CharField(max_length=10)
    disabilitycert = models.BooleanField(default=False)
    nationality = models.CharField(max_length = 30, default=None)
    gender = models.CharField(max_length=1,default=None)




   

        
class Department(models.Model):
    deptid = models.AutoField(primary_key = True)
    deptname = models.TimeField(max_length = 50)
    city = models.CharField(max_length = 30)


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
    addedby = models.OneToOneField(DepartmentHead,on_delete = models.CASCADE, default=None)
    lastacquired = models.BooleanField(default=False)
    
    def __str__(self):
        return self.name


class RequiredFields(models.Model):
    rfid = models.AutoField(primary_key= True)
    schemeid = models.ForeignKey(Schemes,on_delete = models.CASCADE, default=None,null=True)
    name = models.BooleanField(default=False)
    nominee = models.BooleanField(default=False)
    mobile = models.BooleanField(default=False)
    dob = models.BooleanField(default=False)
    gender = models.BooleanField(default=False)
    address = models.BooleanField(default=False)
    marital_status = models.BooleanField(default=False)
    nationality = models.BooleanField(default=False)
    disabilitycert = models.BooleanField(default=False)
    income = models.BooleanField(default=False)
    caste = models.BooleanField(default = False)
    fname = models.BooleanField(default=False)
    aadhaar = models.BooleanField(default=False)
    state = models.BooleanField(default=False)
    couraseduration = models.BooleanField(default=False)
    currentclass = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class RequiredDocs(models.Model):
    rdid = models.AutoField(primary_key = True)
    schemeid = models.ForeignKey(Schemes,on_delete = models.CASCADE, default=None)
    docname = models.CharField(max_length = 50)
    uri = models.CharField(max_length = 50)

    def __str__(self):
        return self.name

    


class SchemesApplication(models.Model):
    schemeid = models.ForeignKey(Schemes, on_delete = models.CASCADE, default=None)
    uid = models.OneToOneField(User,on_delete = models.CASCADE, default=None, db_column = "uid")
    fname = models.CharField(max_length=100,default=None)
    courseduration = models.SmallIntegerField(default = None)
    aadhaar = models.CharField(max_length=12)
    currentclass = models.CharField(max_length=20)
    state = models.CharField(max_length=50)


    def __str__(self):
        return self.name
    

class CitizenDocs(models.Model):
    def use_directory_path(instance,filename):
        return 'media/'+str(instance)+'/'+filename

    docsid = models.AutoField(primary_key = True)
    uid = models.ForeignKey(User,on_delete = models.CASCADE, default = None)
    schemeid = models.ForeignKey(Schemes,on_delete = models.CASCADE, default = None)
    auid = models.SmallIntegerField(default=None)
    aname = models.CharField(max_length = 50, default=None,null=True)
    agender = models.CharField(max_length=1,default=None,null=True)
    aaddress = models.CharField(max_length = 255, default=None,null=True)
    adob = models.DateField(default=None,null=True)
    incomecertificate = models.FileField(upload_to = use_directory_path, default = None)
    rationcard = models.FileField(upload_to = use_directory_path, default = None)
    noncreamylayer = models.FileField(upload_to =use_directory_path, default = None)
    marksheet10 = models.FileField(upload_to =use_directory_path, default = None)
    marksheet12 = models.FileField(upload_to =use_directory_path, default = None)
    disabilitycert = models.FileField(upload_to =use_directory_path, default = None)
     

    def __str__(self):
        return self.docsid
