from django.db import models

# Create your models here.
class Pokemon(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=60)
    hp = models.IntegerField()
    attack = models.IntegerField()
    defense = models.IntegerField()
    type = models.CharField(max_length=60)
    captured = models.BooleanField(default=False)
    image = models.URLField(max_length=200)
    
    def __str__(self):
        return self.name