from django.db import models
from helpers.models import TrackingModel
# from authentication.models import User

# Create your models here.

class Pokemon(TrackingModel):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=60)
    hp = models.IntegerField()
    attack = models.IntegerField()
    defense = models.IntegerField()
    type = models.CharField(max_length=60)
    level = models.IntegerField(default=0)
    captured = models.BooleanField(default=False)
    image = models.URLField(max_length=200)
    
    def __str__(self):
        return self.name