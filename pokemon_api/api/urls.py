from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('pokemon/allpokemon', views.pokemon_list),
    path('pokemon/mypokemon', views.captured_pokemon),
    path('pokemon/unownedpokemon', views.not_captured_pokemon),
    path('pokemon/addpokemon/<int:pk>', views.add_pokemon),
    path('pokemon/releasepokemon/<int:pk>', views.release_pokemon),
    path('pokemon/<int:pk>', views.pokemon_detail),
]

urlpatterns = format_suffix_patterns(urlpatterns)
