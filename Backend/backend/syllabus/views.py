from django.shortcuts import render
from rest_framework import viewsets
from .serializers import SyllabusSerializer
from .models import Syllabus

# Create your views here.
class SyllabusView(viewsets.ModelViewSet):
    serializer_class = SyllabusSerializer
    queryset = Syllabus.objects.all()