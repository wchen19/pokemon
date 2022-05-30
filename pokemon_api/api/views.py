from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import PokemonSerializer
from .models import Pokemon

# Create your views here.
@api_view(['GET'])
def pokemon_list (request, format=None):
    if request.method == 'GET':
        pokemon = Pokemon.objects.all()
        serializer = PokemonSerializer(pokemon, many=True)
        return Response(serializer.data)
    
@api_view(['GET'])
def pokemon_detail (request, pk, format=None):
    try:
        pokemon = Pokemon.objects.get(pk=pk)
    except Pokemon.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = PokemonSerializer(pokemon)
        return Response(serializer.data)
    
@api_view(['GET'])
def captured_pokemon (request, format=None):
    try:
        pokemon = Pokemon.objects.filter(captured=True)
    except Pokemon.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = PokemonSerializer(pokemon, many=True)
        return Response(serializer.data)
    
@api_view(['GET'])
def not_captured_pokemon (request, format=None):
    try:
        pokemon = Pokemon.objects.filter(captured=False)
    except Pokemon.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = PokemonSerializer(pokemon, many=True)
        return Response(serializer.data)
    
@api_view(['GET','POST'])
def add_pokemon (request, pk, format=None):
    try:
        pokemon = Pokemon.objects.get(pk=pk)
        pokemon.captured = True
        pokemon.save()
    except Pokemon.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'POST':
        serializer = PokemonSerializer(pokemon, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'GET':
        serializer = PokemonSerializer(pokemon)
        return Response(serializer.data)
    
@api_view(['GET','POST'])
def release_pokemon (request, pk, format=None):
    try:
        pokemon = Pokemon.objects.get(pk=pk)
        pokemon.captured = False
        pokemon.save()
    except Pokemon.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'POST':
        serializer = PokemonSerializer(pokemon, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'GET':
        serializer = PokemonSerializer(pokemon)
        return Response(serializer.data)
    