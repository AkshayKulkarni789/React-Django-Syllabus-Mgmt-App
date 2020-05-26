from django.contrib import admin
from .models import Syllabus

class SyllabusAdmin(admin.ModelAdmin):
    list_display = ('name', 'title', 'description', 'completed')
# Register your models here.
admin.site.register(Syllabus, SyllabusAdmin)
