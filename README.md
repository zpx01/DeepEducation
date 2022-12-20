# DeepEducation

### Submission for MasseyHacks 2021

## Inspiration
Everyone has experienced that moment when you find a lecture on a challenging academic topic only to find out that it's in an incomprehensible language. As the internet's user base increases in diversity, so will the amount of video lectures done in different languages. Therefore, something must be done about this language barrier. We set out to increase the accessibility of video lectures by creating an app that dubs videos in the user's preferred language while accurately lip syncing the video to the target language.

## What it does
DeepEducation aims to eliminates the language barrier in education. It lets users dub lectures in over 40 languages using cutting-edge deep learning technology. To use it, users first have to log in using **Firebase Authentication**. Then, they can paste the YouTube link of their desired lecture and our web app will dub it while also syncing the speaker's lips to the dubbed audio to make the new video seem completely natural. 

## How we built it
We used many libraries to create this, including but not limited to: **Google Cloud (Cloud Storage and Cloud Functions), Google OAuth, Google Cloud Speech-to-Text and Text-to-Speech API, Google Translate API, and Google Cloud Artificial Intelligence Platform**. We used Flask, Pytorch, Scikit-Learn, and OpenCV for the machine learning back-end and Tailwind CSS, React JS, and Chakra UI for the dashboard and landing page frontend. We also used OpenAI to generate summaries of video transcripts.

Here is the workflow for our web application:
1. We download the YouTube video onto our **Google Cloud Storage** and we break it up into an mp4 and mp3 file using a custom **Google Cloud Function**.
2. Next, we use the **Google Cloud Speech-to-Text API** to convert the original video into English text.
3. Then we use the **Google Cloud Translate API** to translate the English text into the desired target language.
4. Afterwards, we can convert the new translated text to speech in the desired language using the **Google Cloud Text-to-Speech API**.
5. Finally, we use the **Wav2Lip Generative Adversarial Deep Learning Neural Network (GAN)** that we deployed in **Google Cloud AI Platform** to generate a lip synced version of the original video on the new translated speech. 
6. We then merge the lip synced mp4 and the translated speech mp3 and serve this video to the user on their Videos dashboard. We also provide a translated transcript and a transcript summary.
7. Users can additionally add notes for each of their videos (Definitions, Summaries, Misc.).

## Challenges we ran into
Our greatest challenge was learning how to utilize the various Google Cloud APIs implemented in this project. Most of us did not have any experience working with these **Google Cloud APIs for Natural Language Processing (NLP)** so it took a bit of messing around before we could properly implement it in our project.
## Accomplishments that we're proud of
We're particularly proud of the ingenuity of our idea and how our app helps deal with an issue that plagues students in the modern, diverse world. This idea has never been implemented before, and we're proud that our team is taking the first steps to a more equitable digital education landscape.

## What we learned
We learned a lot about how we could integrate **Google Cloud Platform** services in our web application and how it can quickly enhance our application's performance and provide a myriad of new features for our users.

## What's next for DeepEducation
We plan on continuing the development of DeepEducation after this hackathon. Some future improvements could be developing a more refined front-end and making the dubbed voice match not only the native language of the speaker, but also their personal tone, quirks, and inflections. Additionally, we will use **Google Cloud App Engine** to completely deploy our application so that users across the world can access our revolutionary platform. 

## Demo Video
[![DeepEducation Demo](https://img.youtube.com/vi/8LRFNTedSxY/0.jpg)](https://www.youtube.com/watch?v=8LRFNTedSxY "DeepEducation Demo")


