from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import path
from flask_cors import CORS
from flask_login import LoginManager



db = SQLAlchemy()
DB_NAME = "database.db"

def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "ejfwfwfwdfdwfvmekcmkecmefveafvdsva"
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    CORS(app)

    db.init_app(app)

    from .views import views
    

    app.register_blueprint(views, url_prefix='/') 

    from .models import User, Note, Video

    create_database(app)
    login_manager = LoginManager()
    login_manager.login_view = 'views.home'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(id)

    return app

def create_database(app):
    if not path.exists('api/' + DB_NAME):
        db.create_all(app=app)
        print("Created Database!")


