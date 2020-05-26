from django.db import models

class Syllabus(models.Model):
    name = models.CharField(max_length=120)
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title
