from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
import jwt,datetime
import requests,xmltodict
from requests.auth import HTTPBasicAuth


from .models import User, UserDetails
from .Serializers import UserSerializer,UserDetailsSerializers
from django.views.decorators.csrf import csrf_exempt

from django.core.mail import send_mass_mail, send_mail

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed


# Create your views here.


def index(request):
    return HttpResponse("Hello from api index")


@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
          
        userializer = UserSerializer(data=data)
        userializer.is_valid(raise_exception=True)
        userializer.save()
        data['uid'] = User.objects.get(email=data['email']).uid
            
        userdetailsserializer = UserDetailsSerializers(data=data)

        if userdetailsserializer.is_valid():
            userdetailsserializer.save()
            return JsonResponse(userdetailsserializer.data, status=201)
        return JsonResponse(userdetailsserializer.errors, status=400)

        
        # data['sid'] = User.objects.get(email=data['email']).sid
        # print(data)
        
        # serializer = StudentDetailsSerializer(data=data)
        # if serializer.is_valid():
        #     serializer.save()
        #     return JsonResponse(serializer.data, status=201)
        # return JsonResponse(serializer.errors, status=400)
from random import random
from math import floor
from decouple import config
import pyotp


def isAuth(request):
    token = request.COOKIES.get('jwt')
        
    if not token:
        raise AuthenticationFailed('Unauthenticated')
        
    try:
        payload = jwt.decode(token,config("SECRET_KEY"),algorithms=['HS256'])
        response = Response()
        response.data = {
            'email' : payload['email']
        }
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated')
    
    return response

@api_view(['POST'])
def recaptcha(request):
    r = requests.post(
      'https://www.google.com/recaptcha/api/siteverify',
      data={
        'secret': '6Ld7UwUhAAAAAJdj0n7BaOTyPVr4PJvEhkT19Aw4',
        'response': request.data['captcha_value'],
      }
    )

    return Response({'captcha': r.json()})



class SendOtpView(APIView):
    def post(self,request):
        email = request.data['email']
        response = Response()
            
        user = User.objects.filter(email=email).first()
        if user is None:
            # raise AuthenticationFailed("User not found")
            response.data = {'error':'User not found',"detail": "Unauthenticated"}
            
            print(response.data)
            return response

        # OTP Generation
        digits = "0123456789"
        OTP = ""

        for i in range(4) :
            OTP += digits[floor(random() * 10)]
        message = "OTP to login for Jan Suvidha Portal is " + OTP 
        f = open("api/otp_email.html",'r')
        message =  f.read().replace('#jspotp', OTP)
        
        res = send_mail('Jan Suvidha Portal OTP', message,'automailclient0@gmail.com',[email],fail_silently = False, html_message=message)

        if(res):
            user.otp = OTP
            user.save()
            response.data = {
            'message' : 1
            }
            payload = {
                'email' : email,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=2),
                'iat': datetime.datetime.utcnow()
            }
            
            token = jwt.encode(payload,config("SECRET_KEY"),algorithm='HS256')
            response.data = {
            'message' : 'Success',
            'otpexp' : token
            }
            response.set_cookie(key='otpexp',value=token,httponly=True) 

            return response

        else:
            response.data = {
            'message' : 0
            }
            return response


class VerifyOtpView(APIView):
    def post(self,request):
        post_otp = int(request.data['otp'])
        token = request.COOKIES.get('otpexp')
        print(token)

        
        if not token:
            raise AuthenticationFailed('OTP not sent')
        try:
            payload = jwt.decode(token,config("SECRET_KEY"),algorithms=['HS256'])
            user = User.objects.get(email=payload['email'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('OTP expired')
            
        response = Response()
        # print("datetime" , datetime.datetime.now(), "exp" ,datetime.datetime.fromtimestamp(payload['exp']) )
        
        if post_otp != user.otp:
            response.data = {
                'login' : 0
            }
            return response
        else:
            
            payload = {
                'email' : payload['email'],
                'is_staff' : user.is_staff,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
                'iat': datetime.datetime.utcnow()
            }
            token = jwt.encode(payload,config("SECRET_KEY"),algorithm='HS256')
            
            response.set_cookie(key='loggedin',value=token,httponly=True) 
            response.delete_cookie("expotp")

            response.data = {
                'login' : 1,
                'is_staff' : user.is_staff
            }
            return response


def getRefreshToken(request):
    if request.method == 'GET':
        email = isAuth(request).data['email']
        print("sidgetrefresh",email)
        user = User.objects.get(email = email)
        # studoc = StudentDocuments.objects.get(sid=user)
        code = request.GET.get('code')
        state = request.GET.get('state')

        url = 'https://api.digitallocker.gov.in/public/oauth2/1/token'
        myobj = {
            "code": code,
            "grant_type": "authorization_code",
            "client_id": "2407FC9F",
            "client_secret": config('digilocker_credentials'),
            "redirect_uri": "http://127.0.0.1:8000/api/callback"
        }
        # API call for obtaining accesstoken

        refreshtoken = requests.post(url, json = myobj, headers = {"Content-Type": "application/json"}).json().get('refresh_token')
        print(refreshtoken)

        user.refreshtoken = refreshtoken
        user.save()
                                                                                                                                                                                                                  
        return redirect('StuDoc')

# def getAadhaarDetails(request):
#     if request.method == 'GET':
#         email = isAuth(request).data['email']
#         user = User.objects.get(email = email)

#         userdetails = UserDetails.objects.get(uid=user.uid)
#         userdetails.uid = user
    
#         print("userrefresh",user.refreshtoken)

#         url = 'https://api.digitallocker.gov.in/public/oauth2/1/token'
#         myobj = {
#             "refresh_token": user.refreshtoken,
#             "grant_type": "refresh_token",
#         }
#         # API call for obtaining accesstoken
    
#         refreshtokencall = requests.post(url, json = myobj,auth = HTTPBasicAuth('2407FC9F', '69e83492f63f996bfd5d')).json()  
#         accesstoken = refreshtokencall.get('access_token')
#         refreshtoken = refreshtokencall.get('refresh_token')
#         print("access: ",accesstoken)
#         print("refresh_tokenL: ",refreshtoken)
#         # open('hello.txt','wb').write(accesstoken)  
#         print("refreshtokencall",refreshtokencall)
#         user.refreshtoken = refreshtoken
#         user.save()

#         # API call for obtaining list of files in user's digilocker
        

#         filelist = requests.get('https://api.digitallocker.gov.in/public/oauth2/2/files/issued',headers = {"Authorization": "bearer " + accesstoken}).json()
#         print(filelist)

#         # Extracting uris of required files from the file list

#         requiredfiles = ['Class X Marksheet','Aadhaar Card','Income Certificate','Creamy - Non Creamy Layer Application','Ration Card']
#         # category/caste certificate, 12th marksheet, self photo, self signature, permanent address proof, permanent address proof, disability certificate(if required)
#         fileuris = []
#         filenames = []
#         for i in range(len(filelist['items'])):
#                 if(filelist['items'][i]['name'] == 'Aadhaar Card'):
#                     fileuris.append(filelist['items'][i]['uri'])
#                     filenames.append(filelist['items'][i]['name'])

#         print(fileuris) 
#         # #Files which are not uploaded in users digilocker account
#         # resdict = {}
#         # for i in requiredfiles:
#         #     if i not in filenames:
#         #         resdict[i] = False
#         #     else:
#         #         resdict[i] = True
#         # print(resdict)

#     # Requesting XML of files from digilocker 
    
#         for fileuri in fileuris:
#             if 'ADHAR' in fileuri:
#                 xml = requests.get("https://api.digitallocker.gov.in/public/oauth2/1/xml/" + fileuri,headers = {"Authorization": "bearer " + accesstoken})
#                 content  = xmltodict.parse(xml.content)
#                 open('media/aadhaartest.xml','wb').write(xml.content)
#                 studentdetails = StudentDetails.objects.get(sid=sid)
#                 studoca.auid = content['KycRes']['UidData']['@uid'][8:]
#                 studoca.aname = content['KycRes']['UidData']['Poi']['@name']
#                 dob = content['KycRes']['UidData']['Poi']['@dob']
#                 studoca.agender = content['KycRes']['UidData']['Poi']['@gender']
#                 studoca.aaddress = content['KycRes']['UidData']['Poa']['@co'] + ' ' + content['KycRes']['UidData']['Poa']['@lm'] + ' ' + content['KycRes']['UidData']['Poa']['@loc'] + ' ' + content['KycRes']['UidData']['Poa']['@vtc']
#                 temp = str(dob).split('-')[::-1]
#                 studoca.adob =  "-".join(temp)
#                 studoca.save()
                
#                 # Mandaviya Raj Jayesh
#                 print(studoca.auid,studoca.aname,dob,studoca.agender)
#     return redirect('StuDoc')



def getFiles(request):
    if request.method == 'GET':
        sid = isAuth(request).data['email']
        user = User.objects.get(email = email)
        studoca = StuDocAdmin()
        studoca.sid  = user
        print("userrefresh",user.refreshtoken)

        url = 'https://api.digitallocker.gov.in/public/oauth2/1/token'
        myobj = {
            "refresh_token": user.refreshtoken,
            "grant_type": "refresh_token",
        }
        # API call for obtaining accesstoken
    
        refreshtokencall = requests.post(url, json = myobj,auth = HTTPBasicAuth('2407FC9F', '69e83492f63f996bfd5d')).json()  
        accesstoken = refreshtokencall.get('access_token')
        refreshtoken = refreshtokencall.get('refresh_token')
        print("access: ",accesstoken)
        print("refresh_tokenL: ",refreshtoken)
        # open('hello.txt','wb').write(accesstoken)  
        print("refreshtokencall",refreshtokencall)
        user.refreshtoken = refreshtoken
        user.save()

        # API call for obtaining list of files in user's digilocker
        

        filelist = requests.get('https://api.digitallocker.gov.in/public/oauth2/2/files/issued',headers = {"Authorization": "bearer " + accesstoken}).json()
        print(filelist)

        # Extracting uris of required files from the file list

        requiredfiles = ['Class X Marksheet','Aadhaar Card','Income Certificate','Creamy - Non Creamy Layer Application','Ration Card']
        # category/caste certificate, 12th marksheet, self photo, self signature, permanent address proof, permanent address proof, disability certificate(if required)
        fileuris = []
        filenames = []
        for i in range(len(filelist['items'])):
            for rfile in range(len(requiredfiles)):
                if(filelist['items'][i]['name'] == requiredfiles[rfile]):
                    fileuris.append(filelist['items'][i]['uri'])
                    filenames.append(filelist['items'][i]['name'])

        print(fileuris) 
        # #Files which are not uploaded in users digilocker account
        # resdict = {}
        # for i in requiredfiles:
        #     if i not in filenames:
        #         resdict[i] = False
        #     else:
        #         resdict[i] = True
        # print(resdict)

    # Requesting XML of files from digilocker 
        try:
            for fileuri in fileuris:
                if 'ADHAR' in fileuri:
                    xml = requests.get("https://api.digitallocker.gov.in/public/oauth2/1/xml/" + fileuri,headers = {"Authorization": "bearer " + accesstoken})
                    content  = xmltodict.parse(xml.content)
                    open('media/aadhaartest.xml','wb').write(xml.content)
                    studentdetails = StudentDetails.objects.get(sid=sid)
                    studoca.auid = content['KycRes']['UidData']['@uid'][8:]
                    studoca.aname = content['KycRes']['UidData']['Poi']['@name']
                    dob = content['KycRes']['UidData']['Poi']['@dob']
                    studoca.agender = content['KycRes']['UidData']['Poi']['@gender']
                    studoca.aaddress = content['KycRes']['UidData']['Poa']['@co'] + ' ' + content['KycRes']['UidData']['Poa']['@lm'] + ' ' + content['KycRes']['UidData']['Poa']['@loc'] + ' ' + content['KycRes']['UidData']['Poa']['@vtc']
                    temp = str(dob).split('-')[::-1]
                    studoca.adob =  "-".join(temp)
                    studoca.save()
                    
                    # Mandaviya Raj Jayesh
                    print(studoca.auid,studoca.aname,dob,studoca.agender)
                    
    # Downloading files from digilocker 
                
                if 'INCER' in fileuri:
                    file = requests.get("https://api.digitallocker.gov.in/public/oauth2/1/file/" + fileuri,headers = {"Authorization": "bearer " + accesstoken})    
                    # studoc.incomecertificate  = finalpath
                    filename = str(user) + '_income_certificate.pdf'
                    sid = str(user)
                    studoca = StuDocAdmin.objects.get(sid=sid)
                    f = ContentFile(file.content)
                    studoca.incomecertificate.save(filename,f)

                if 'gujarat.dst-CNCMY' in fileuri or 'gujarat.dst-NLCER' in fileuri:
                    file = requests.get("https://api.digitallocker.gov.in/public/oauth2/1/file/" + fileuri,headers = {"Authorization": "bearer " + accesstoken})    
                    # studoc.incomecertificate  = finalpath
                    filename = str(user) + '_Non_creamy_layer_certificate.pdf'
                    sid = str(user)
                    studoca = StuDocAdmin.objects.get(sid=sid)
                    f = ContentFile(file.content)
                    studoca.noncreamylayer.save(filename,f)

                if 'gseb-SSCER' in fileuri:
                    file = requests.get("https://api.digitallocker.gov.in/public/oauth2/1/file/" + fileuri,headers = {"Authorization": "bearer " + accesstoken})    
                    # studoc.incomecertificate  = finalpath
                    filename = str(user) + '_10th_Marksheet.pdf'
                    sid = str(user)
                    studoca = StuDocAdmin.objects.get(sid=sid)
                    f = ContentFile(file.content)
                    studoca.marksheet10.save(filename,f)

                if 'gseb-HSCER' in fileuri:
                    file = requests.get("https://api.digitallocker.gov.in/public/oauth2/1/file/" + fileuri,headers = {"Authorization": "bearer " + accesstoken})    
                    # studoc.incomecertificate  = finalpath
                    filename = str(user) + '_10th_Marksheet.pdf'
                    sid = str(user)
                    studoca = StuDocAdmin.objects.get(sid=sid)
                    f = ContentFile(file.content)
                    studoca.marksheet12.save(filename,f)
                if 'gujarat.dcs-RATCR' in fileuri:
                    file = requests.get("https://api.digitallocker.gov.in/public/oauth2/1/file/" + fileuri,headers = {"Authorization": "bearer " + accesstoken})    
                    filename = str(user) + '_Ration_Card.pdf'
                    sid = str(user)
                    studoca = StuDocAdmin.objects.get(sid=sid)
                    f = ContentFile(file.content)
                    studoca.rationcard.save(filename,f)
            
        except NameError:
            for file in requiredfiles:
                print("These file does not exist: " + file)
        # print(resdict)
        # return render(request, 'index.html',resdict)
        
        return redirect('StuDoc')
    
class LogoutView(APIView):
    def post(self,request):
        response = Response()
        response.delete_cookie('loggedin')
        response.data = {
         'message' : "Logout Success"   
        }
        return response
 