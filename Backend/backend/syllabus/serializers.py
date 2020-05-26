from rest_framework import serializers
from .models import Syllabus

class SyllabusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Syllabus
        fields = ('id', 'name', 'title', 'description', 'completed')