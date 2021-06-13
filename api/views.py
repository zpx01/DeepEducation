import re
from flask import Blueprint, request, jsonify
from .models import User, Note, Video
from . import db
from firebase import Firebase
from flask_cors import cross_origin
from werkzeug.utils import secure_filename
from pytube import YouTube
import os
import shutil
import math
import datetime
import ssl
from google.cloud import storage
import requests
from google.cloud import speech
import time
import cv2
import ffmpeg
import subprocess
import openai

# Load your API key from an environment variable or secret management service
openai.api_key = "sk-Wv52XAzrQQqoS1qEmh1XoyAMJ5Wc8vZEIT5A7dCo"

views = Blueprint('views', __name__)

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'deeped-keys.json'
storage_client = storage.Client()
BUCKET_NAME = 'deeped-videostorage'


def upload_blob(bucket_name, source_file_name, destination_blob_name):
    """Uploads a file to the bucket."""
    # The ID of your GCS bucket
    # bucket_name = "your-bucket-name"
    # The path to your file to upload
    # source_file_name = "local/path/to/file"
    # The ID of your GCS object
    # destination_blob_name = "storage-object-name"

    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)

    blob.upload_from_filename(source_file_name)

    print(
        "File {} uploaded to {}.".format(
            source_file_name, destination_blob_name
        )
    )

def download_blob(bucket_name, source_blob_name, destination_file_name):
    """Downloads a blob from the bucket."""
    # bucket_name = "your-bucket-name"
    # source_blob_name = "storage-object-name"
    # destination_file_name = "local/path/to/file"

    storage_client = storage.Client()

    bucket = storage_client.bucket(bucket_name)

    # Construct a client side representation of a blob.
    # Note `Bucket.blob` differs from `Bucket.get_blob` as it doesn't retrieve
    # any content from Google Cloud Storage. As we don't need additional data,
    # using `Bucket.blob` is preferred here.
    blob = bucket.blob(source_blob_name)
    blob.download_to_filename(destination_file_name)

    print(
        "Blob {} downloaded to {}.".format(
            source_blob_name, destination_file_name
        )
    )

config = {
  "apiKey": "AIzaSyDzEoXNrNgu3Q3GV1aI4s2X75lF50jt_zI",
  "authDomain": "fir-auth-tutorial-a425c.firebaseapp.com",
  "databaseURL": "https://fir-auth-tutorial-a425c-default-rtdb.firebaseio.com/",
  "storageBucket": ""
}

firebase = Firebase(config)
auth = firebase.auth()

from google.cloud import storage
import datetime

def combine_audio(vidname, audname, outpath, fps=60): 
    subprocess.run("ffmpeg -i '{}' -i '{}' -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 '{}' -shortest".format(vidname, audname, outpath), shell=True)

def translate_text(target, text):
    print("translating...")
    """Translates text into the target language.
    Target must be an ISO 639-1 language code.
    See https://g.co/cloud/translate/v2/translate-reference#supported_languages
    """
    import six
    from google.cloud import translate_v2 as translate

    translate_client = translate.Client()

    if isinstance(text, six.binary_type):
        text = text.decode("utf-8")

    # Text can also be a sequence of strings, in which case this method
    # will return a sequence of results for each text.
    result = translate_client.translate(text, target_language=target)

    print(u"Text: {}".format(result["input"]))
    print(u"Translation: {}".format(result["translatedText"]))
    translatedText1 = result["translatedText"]
    print(u"Detected source language: {}".format(result["detectedSourceLanguage"]))
    return translatedText1

MAX = 1000
languageDict = {
    "Afrikaans": ["af-ZA", "af-ZA-Standard-A", "FEMALE"],
    "Arabic": ["ar-XA", "	ar-XA-Wavenet-C", "MALE"] ,
    "Bengali": ["bn-IN", "bn-IN-Wavenet-B", "MALE"] ,
    "Bulgarian": ["bg-BG", "bg-bg-Standard-A", "FEMALE"],
    "Catalan": ["ca-ES","ca-es-Standard-A", "FEMALE"] ,
    "Chinese": ["yue-HK","yue-HK-Standard-D", "MALE"],
    "Czech": ["cs-CZ", "cs-CZ-Wavenet-A", "FEMALE"],
    "Danish": ["da-DK", "da-DK-Wavenet-C", "MALE"],
    "Dutch": ["ni-NL", "nl-NL-Wavenet-C", "MALE"],
    "English": ["en-US", "en-US-Wavenet-J", "MALE"],
    "Finnish": ["fi-FI", "fi-FI-Wavenet-A", "FEMALE"],
    "Filipino": ["fil-PH", "fil-PH-Wavenet-D", "MALE"],
    "French": ["fr-FR", "fr-FR-Wavenet-D", "MALE"],
    "German" : ["de-DE", "de-DE-Wavenet-E", "MALE"],
    "Greek": ["el-GR", "el-GR-Wavenet-A", "FEMALE"],
    "Gujarati": ["gu-IN", "gu-IN-Wavenet-B", "MALE"],
    "Hindi": ["hi-IN", "hi-IN-Wavenet-C", "MALE"],
    "Hungarian": ["hu-HU", "hu-HU-Wavenet-A", "FEMALE"],
    "Icelandic": ["is-IS", "is-is-Standard-A", "FEMALE"],
    "Indonesian": ["id-ID", "id-ID-Wavenet-C", "MALE"],
    "Italian": ["it-IT", "it-IT-Wavenet-D", "MALE"],
    "Japanese": ["ja-JP", "ja-JP-Wavenet-D", "MALE"],
    "Kannada": ["kn-IN", "	kn-IN-Wavenet-B", "MALE"],
    "Korean": ["ko-KR", "ko-KR-Wavenet-D", "MALE"],
    "Latvian": ["lv-LV", "lv-lv-Standard-A", "MALE"],
    "Malayalam": ["ml-IN", "ml-IN-Wavenet-B", "MALE"],
    "Mandarin": ["cmn-TW", "cmn-TW-Wavenet-C", "MALE"],
    "Polish": ["pl-PL", "pl-PL-Wavenet-C", "MALE"],
    "Portruguese": ["pt-PT", "pt-PT-Wavenet-C", "MALE"],
    "Romanian": ["ro-RO", "ro-RO-Wavenet-A", "FEMALE"],
    "Russian": ["ru-RU", "ru-RU-Wavenet-D", "MALE"],
    "Slovak": ["sk-SK", "sk-SK-Wavenet-A", "FEMALE"],
    "Serbian": ["sr-RS", "sr-rs-Standard-A", "FEMALE"],
    "Spanish": ["es-US", "es-US-Wavenet-C", "MALE"],
    "Swedish": ["sv-SE", "sv-SE-Wavenet-A", "FEMALE"],
    "Tamil": ["ta-IN", "ta-IN-Wavenet-B", "MALE"],
    "Thai": ["th-TH", "th-TH-Standard-A", "FEMALE"],
    "Telegu": ["te-IN", "te-IN-Standard-B", "MALE"],
    "Turkish": ["tr-TR", "tr-TR-Wavenet-E", "MALE"],
    "Ukrainian": ["uk-UA", "uk-UA-Wavenet-A", "MALE"],
    "Vietnam": ["vi-VN", "vi-VN-Wavenet-D", "MALE"],
}

def replaceSpaces(string):
     
    # Remove remove leading and trailing spaces
    string = string.strip()
 
    i = len(string)
 
    # count spaces and find current length
    space_count = string.count(' ')
 
    # Find new length.
    new_length = i + space_count * 2
 
    # New length must be smaller than length
    # of string provided.
    if new_length > MAX:
        return -1
 
    # Start filling character from end
    index = new_length - 1
 
    string = list(string)
 
    # Fill string array
    for f in range(i - 2, new_length - 2):
        string.append('0')
 
    # Fill rest of the string from end
    for j in range(i - 1, 0, -1):
 
        # inserts %20 in place of space
        if string[j] == ' ':
            string[index] = '0'
            string[index - 1] = '2'
            string[index - 2] = '%'
            index = index - 3
        else:
            string[index] = string[j]
            index -= 1
 
    return ''.join(string)

def generate_url(video_title):
    video_title = replaceSpaces(video_title)
    return "https://storage.cloud.google.com/deeped-videostorage/{}".format(video_title)

user = None
@views.route("/home", methods=['POST'])
@cross_origin(supports_credentials=True)
def home():
    global user_info
    token = request.get_json()
    user_token = token["token"]["i"]
    user_t = user_token
    user_info = auth.get_account_info(user_t)
    user_info = user_info['users'][0]
    user = User.query.filter_by(email=user_info["email"]).first()
    if user:
        # session["user_id"] = user.id
        print("User already exists!")
    else:
        if "photoURL" not in user_info.keys():
            new_user = User(id=user_info["localId"], email=user_info["email"], name=user_info["displayName"], photoURL="")
        else:
            new_user = User(id=user_info["localId"], email=user_info["email"], name=user_info["displayName"], photoURL=user_info["photoUrl"])
        
        db.session.add(new_user)
        db.session.commit()
        print("User Added!")
    
    user = User.query.filter_by(email=user_info["email"]).first()
    likes_per_post = [i.likes for i in user.notes]
    posts = [(i.text, i.date, x, i.category) for i in user.notes for x in likes_per_post]

    return jsonify({"data": posts})


@views.route("/add-post", methods=['POST'])
@cross_origin(supports_credentials=True)
def add_post():
    global user_info
    post_content = request.get_json()
    post = Note(text=post_content["text"], category=post_content["noteCategory"], video=post_content["video"])
    user = User.query.filter_by(email=post_content["email"]).first()
    user.notes.append(post)
    db.session.commit()
    allPostTexts = [i.text for i in user.notes]
    allPostDates = [i.date for i in user.notes]
    likes_per_post = [i.likes for i in user.notes]
    categories_per_post = [i.category for i in user.notes]
    video_names = [i.video for i in user.notes]
    videos = [i for i in user.videos]
    final_videos = [(i.title, i.original_url, i.translated_url, i.transcript, i.date, i.summary) for i in videos]
    return jsonify({"data" : (allPostTexts, allPostDates, likes_per_post, categories_per_post, video_names, final_videos)})

@views.route("/get-posts", methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def get_posts():
    global user_info
    print(user_info["email"])
    current_user = User.query.filter_by(email=user_info["email"]).first()
    print(current_user)
    if current_user:
        print("Hello")
        user = current_user
        allPostTexts = [i.text for i in user.notes]
        allPostDates = [i.date for i in user.notes]
        likes_per_post = [i.likes for i in user.notes]
        categories_per_post = [i.category for i in user.notes]
        video_names = [i.video for i in user.notes]
        videos = [i for i in user.videos]
        final_videos = [(i.title, i.original_url, i.translated_url, i.transcript, i.date, i.summary) for i in videos]
        return jsonify({"data" : (allPostTexts, allPostDates, likes_per_post, categories_per_post, video_names, final_videos)})
    else:
        return jsonify({"data" : "error"}) 

@views.route("/like", methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def like():
    global user_info
    print(user_info["email"])
    current_user = User.query.filter_by(email=user_info["email"]).first()
    print(current_user)
    post_data = request.get_json()
    if current_user:
        curr_post = Note.query.filter_by(user_id=user_info["localId"], text=post_data["text"]).first()
        curr_post.likes = curr_post.likes+1
        db.session.commit()
        return jsonify({"data" : curr_post.likes})
    else:
        return jsonify({"data" : "error"}) 

@views.route("/translate", methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def translate():
    # get curr Video object
    data = request.form
    video_name = data["title"]
    video_url = data["url"]
    translate_lang = data["language"]
    #figure out how to get video object from front end form n send to backend, hardcoded for testing purposes rn
    if video_url:
        payload = {"url" : video_url, "title" : video_name}
        cloud_function = "https://us-west2-deepeducation-316206.cloudfunctions.net/DeepEdPyTube"
        r = requests.post(cloud_function, data=payload)
        print ("Status Code ", r.status_code)
        funcStatus = "Success" if r.ok else "Failed"
        print (funcStatus)
        client = speech.SpeechClient()  
        audio = speech.RecognitionAudio(uri="gs://deeped-videostorage/{}.wav".format(video_name))
        config = speech.RecognitionConfig(
        language_code="en-US",
        # Automatically transcribe punctuation
        enable_automatic_punctuation=False,
        model="video")
        res = client.long_running_recognize(config=config, audio=audio).result()
        print("transcript: ")
        text = ""
        for result in res.results:
            print(result.alternatives[0].transcript)
            text += result.alternatives[0].transcript

        print(text)
        response = openai.Completion.create(
                    engine="davinci",
                    prompt= (text + "tl;dr:"),
                    temperature=0.3,
                    max_tokens=300,
                    top_p=1,
                    frequency_penalty=0,
                    presence_penalty=0
                )
        summary=response["choices"][0]["text"]
        translatedText2 = translate_text(languageDict[translate_lang][0][0:2], text)
        summary = translate_text(languageDict[translate_lang][0][0:2], summary)
        from google.cloud import texttospeech

        # Instantiates a client
        client = texttospeech.TextToSpeechClient()

        # Set the text input to be synthesized
        synthesis_input = texttospeech.SynthesisInput(text=translatedText2)

        # Build the voice request, select the language code ("en-US") and the ssml
        # voice gender ("neutral")
        voice2 = texttospeech.VoiceSelectionParams(
            language_code=languageDict[translate_lang][0], name = languageDict[translate_lang][1], ssml_gender=languageDict[translate_lang][2]
        )

        # Select the type of audio file you want returned
        audio_config = texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.MP3
        )

        # Perform the text-to-speech request on the text input with the selected
        # voice parameters and audio file type
        response = client.synthesize_speech(
            input=synthesis_input, voice=voice2, audio_config=audio_config
        )
        source_blob_name = video_name + ".mp4"
        source_audname = video_name + ".mp3"
        destination_file_name = "/Users/zeeshanpatel/DeepEducation/{}.mp4".format(video_name)
        download_blob(BUCKET_NAME, source_blob_name, destination_file_name)
        with open(source_audname, "wb") as out:
                # Write the response to the output file.
                out.write(response.audio_content)
                print(f'Audio content written to file {source_audname}')
        
        destination_blob_name = video_name + "_translated.mp4"
        combine_audio(source_blob_name, source_audname, destination_blob_name, fps=60)
        upload_blob(BUCKET_NAME, destination_blob_name, destination_blob_name)
        translated_url = generate_url(destination_blob_name)

        return {"translated_url": translated_url, "transcript" : translatedText2, "summary" : summary}

    return 'video url seems to be missing!?'

@views.route("/add-video", methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def add_video():
    global user_info
    print(user_info["email"])
    video_info = request.get_json()
    user = User.query.filter_by(email=video_info["email"]).first()
    video = Video(original_url=video_info["url"], translated_url="", title=video_info["title"], transcript="", summary="")
    r = requests.post("http://localhost:5000/translate", data={"url" : video_info["url"], "title" : video.title, "language" : video_info["language"]})
    print ("Status Code ", r.status_code)
    res = r.json()
    print(res)
    video.transcript = res["transcript"]
    video.translated_url = res["translated_url"]
    video.summary = res["summary"]
    user.videos.append(video)
    db.session.commit()
    allPostTexts = [i.text for i in user.notes]
    allPostDates = [i.date for i in user.notes]
    likes_per_post = [i.likes for i in user.notes]
    categories_per_post = [i.category for i in user.notes]
    video_names = [i.video for i in user.notes]
    videos = [i for i in user.videos]
    final_videos = [(i.title, i.original_url, i.translated_url, i.transcript, i.date, i.summary) for i in videos]
    return jsonify({"data" : (allPostTexts, allPostDates, likes_per_post, categories_per_post, video_names, final_videos)})