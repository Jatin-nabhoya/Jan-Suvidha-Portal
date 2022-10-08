from rest_framework import serializers

from .models import  User,UserDetails,RequiredFields,SchemesApplication,Schemes,RequiredDocs

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name','email','password']
        extra_kwargs = {
            'password':{'write_only':True}
        }
        
    def create(self,validated_data):
        password = validated_data.pop('password',None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class UserDetailsSerializers(serializers.ModelSerializer):
    class Meta:
        model = UserDetails 
        fields = ['uid','mobile','dob','address','caste','income','maritialstatus', 'nationality', 'gender']   
    
class SchemesSerializers(serializers.ModelSerializer):
    class Meta:
        model = Schemes
        fields = ['name', 'description', 'addedby', 'caste', 'agegt', 'agelt', 'nationality', 'disability', 'incomegt', 'incomelt', 'maritialstatus']


class RequiredDocsSerializers(serializers.ModelSerializer):
    class Meta:
        model = RequiredDocs
        fields = ['schemeid','castecert', 'incomecertificate', 'rationcard', 'noncreamylayer', 'marksheet10', 'marksheet12', 'aadhar', 'pancard', 'drivinglicense', 'voteridcard']
class SchemesApplicationSerializers(serializers.ModelSerializer): 
    class Meta:
        model = SchemesApplication
        fields = ['schemeid','uid','fname','courseduration','currentclass','state','aadhaar','disabilitycert']

class RequiredFieldsSerializers(serializers.ModelSerializer): 
    class Meta:
        model = RequiredFields
        fields = ['schemeid','name','mobile','dob','gender','address','caste','income','marital_status','disabilitycert','nationality']
        
class FetchRequiredFieldsSerializers(serializers.ModelSerializer): 
    class Meta:
        model = RequiredFields
        fields = ['name','mobile','dob','gender','address','caste','income','marital_status','disabilitycert','nationality']


class AllSchemesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schemes
        fields = ['name']
