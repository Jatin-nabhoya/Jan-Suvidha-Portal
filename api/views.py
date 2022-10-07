from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import jwt,datetime
from .models import User
from .Serializers import UserSerializer
from django.views.decorators.csrf import csrf_exempt

from django.core.mail import send_mass_mail, send_mail

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
        if userializer.is_valid(raise_exception=True):
            userializer.save()
            return JsonResponse(userializer.data, status=201)
        return JsonResponse(userializer.errors, status=400)
        
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

class SendOtpView(APIView):
    def post(self,request):
        # print("requestdata",request.data['email'])
        data = JSONParser().parse(request)
        print("data",data)
        email = data['email']
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
            'message' : 'Success'
            }
            payload = {
                'email' : email,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=10),
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
            'error':'Email cannot be sent!'            
            }
            return response


class VerifyOtpView(APIView):
    def post(self,request):
        data = JSONParser().parse(request)

        post_otp = int(data['otp'])
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
                'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
                'iat': datetime.datetime.utcnow()
            }
            token = jwt.encode(payload,config("SECRET_KEY"),algorithm='HS256')
            
            response.delete_cookie("expotp")
            response.set_cookie(key='loggedin',value=token,httponly=True) 

            response.data = {
                'login' : 1
            }
            return response



class LoginView(APIView):
    def post(self,request):
        print(request.data)
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()
        response = Response()

        if user is None:
            # raise AuthenticationFailed("User not found")
            response.data = {'error':'User not found',"detail": "Unauthenticated"}
            
            print(response.data)
            return response

        if not user.check_password(password):
            # raise AuthenticationFailed("Invalid password")
            response.data = {'error':'Invalid password',"detail": "Unauthenticated"}
            
            print(response.data)
            return response
        
        payload = {
            'sid': user.sid,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }
        
        token = jwt.encode(payload,'secret',algorithm='HS256')
        
        response.set_cookie(key='jwt',value=token,httponly=True)
        
        response.data = {
            'jwt' : token,
            'message' : 'Success'
        }
        print(response.data)
        return response
    
class UserView(APIView):
    
    def get(self,request):
        token = request.COOKIES.get('jwt')
        
        if not token:
            raise AuthenticationFailed('Unauthenticated')
        
        try:
            payload = jwt.decode(token,'secret',algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')
            
        user = User.objects.filter(sid = payload['sid']).first()
        serializer = UserSerializer(user)
        
        return Response(serializer.data)
    
    
class LogoutView(APIView):
    def post(self,request):
        response = Response()
        response.delete_cookie('loggedin')
        response.data = {
         'message' : "Logout Success"   
        }
        return response
 