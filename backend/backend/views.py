from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer
from django.contrib.auth.models import User

@api_view(['GET'])
 
def hello_api(request):
    return Response({"message": "Hello, from Django API!"})


@api_view(['POST'])
def register_user(request):
    register_serializer = RegisterSerializer(data=request.data)
    if register_serializer.is_valid():
        register_serializer.save() #saves user to the database
        return Response({"message": "User registered successfully."}, status=status.HTTP_201_CREATED)
    return Response(register_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def basic_login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    try:
       User.objects.get(username=username, password=password)
       return Response({"message": "Login successful."}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"message": "Invalid username or password."}, status=status.HTTP_400_BAD_REQUEST)