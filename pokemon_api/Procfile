web: gunicorn pokemon_api.wsgi
release: python manage.py makemigrations --noinput
release: python manage.py collecstatic --noinput
release: python manage.py migrate --noinput
