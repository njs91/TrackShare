from django.db import models

# Create your models here.
from django.db import models


class Track(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)

# each track should have a title, created_at and optional description
# id also added automatically