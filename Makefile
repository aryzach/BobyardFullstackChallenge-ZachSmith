
DB_NAME=zachsmithbobyardchallengedb

CONDA_ENV=ZachSmithBobyardChallenge

all: conda_env create_db setup_db load_db setup_frontend

delete_all: delete_env delete_db

conda_env: 
	@conda env create -f bobyard_backend/environment.yml

create_db:
	if createdb $(DB_NAME); then \
		echo db created; \
	else \
		echo db not created, trying again; \
		sudo -u postgres createdb $(DB_NAME); \
	fi

setup_db:
	@echo "Setting up the database..."
	@conda run -n $(CONDA_ENV) python bobyard_backend/manage.py makemigrations
	@conda run -n $(CONDA_ENV) python bobyard_backend/manage.py migrate
	@echo "Database setup completed."

load_db:
	@echo "Loading database..."
	@conda run -n $(CONDA_ENV) python bobyard_backend/manage.py import_comments
	@echo "Comments loaded."

delete_db:
	if dropdb $(DB_NAME); then \
		echo db droped; \
	else \
		echo db not dropped, trying again; \
		sudo -u postgres dropdb $(DB_NAME); \
	fi

delete_env: 
	@conda env remove -n $(CONDA_ENV)

setup_frontend:
	npm --prefix ./bobyard-frontend install ./bobyard-frontend

start_backend:
	@conda run -n $(CONDA_ENV) python bobyard_backend/manage.py runserver

start_frontend:
	cd bobyard-frontend && npm start

