from django.contrib import admin
from .models import User,Department,DepartmentHead,Schemes,RequiredFields,RequiredDocs,AppliedSchemes, UserDetails

# Register your models here.
admin.site.register(User)
admin.site.register(UserDetails)
admin.site.register(Department)
admin.site.register(DepartmentHead)
admin.site.register(Schemes)
admin.site.register(RequiredFields)
admin.site.register(RequiredDocs)
admin.site.register(AppliedSchemes)
