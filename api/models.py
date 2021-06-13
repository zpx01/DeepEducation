from . import db
from sqlalchemy.sql import func

class Video(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    original_url = db.Column(db.String(10000)) # URL of original video
    translated_url = db.Column(db.String(10000)) # URL of translated video
    title = db.Column(db.String(10000))
    transcript = db.Column(db.String())
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    summary = db.Column(db.String(100000))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(10000))
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    likes = db.Column(db.Integer, default=1)
    category = db.Column(db.String(10000))
    video = db.Column(db.String(10000))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


class User(db.Model):
    id = db.Column(db.String, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    name = db.Column(db.String(150))
    photoURL = db.Column(db.String(1000))
    notes = db.relationship('Note', lazy=True)
    videos = db.relationship('Video', lazy=True)
