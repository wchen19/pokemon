from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('allpokemon', views.pokemon_list),
    path('mypokemon', views.captured_pokemon),
    path('unownedpokemon', views.not_captured_pokemon),
    path('addpokemon/<int:pk>', views.add_pokemon),
    path('releasepokemon/<int:pk>', views.release_pokemon),
    path('<int:pk>', views.pokemon_detail),
]

urlpatterns = format_suffix_patterns(urlpatterns)
