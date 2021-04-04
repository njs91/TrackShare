from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.
from django.db import models


class Track(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    artist = models.TextField(blank=True)
    url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    posted_by = models.ForeignKey(get_user_model(), null=True, on_delete=models.CASCADE)  # cascade delete: if a user is deleted that's put on this foreign key, the entire track will also be deleted

# each track should have a title, created_at, optional description & optional artist
# id also added automatically

class Like(models.Model): #likes modelled by like class; 'models.Model' created a db table
    user = models.ForeignKey(get_user_model(), null=True, on_delete=models.CASCADE) #'who' liked something
    track = models.ForeignKey('tracks.Track', related_name='likes', on_delete=models.CASCADE) #'tracks.Track' = tracks model; related_name gives each track info of their likes (called 'likes')

