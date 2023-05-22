from typing import Union
from fastapi import FastAPI
import random
import openai
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()
openai.api_key = os.getenv('CHATGPT_API_KEY')
openai.api_base = os.getenv('CHATGPT_ENDPOINT')
openai.api_type = 'azure'
openai.api_version = '2023-05-15'
DEPLOYMENT_NAME = os.getenv('CHATGPT_DEPLOYMENT_NAME')


app = FastAPI()
origins = [
        'http://localhost:3000'
]

app.add_middleware(CORSMiddleware,
                   allow_origins=origins,
                   allow_credentials=True,
                   allow_methods=['*'],
                   allow_headers=['*'])

@app.get('/')
def home():
    return {'Hello': 'World'}

topics = ['birds', 'planes', 'tigers',
          'japan', 'canada',
          'maple leaf', 'hockey', 'frog', 'pond', 'water']

message_history_init = [
            {'role': 'system',
             'content': 'You are a poet that only write haiku poems. You will be asked to generate a haiku based on a topic. You will generate the poem and nothing else.',
             },
            {'role': 'user',
             'content': 'Write a haiku about "frog"'
             },
            {'role': 'assistant',
             'content': 'old pond\nfrog leaps in\nwater\'s sound\n\n'
             }
            ]


@app.get('/haiku')
def haiku(topic: Union[str, None] = None):
    if not topic:
        topic = random.choice(topics)
    messages = message_history_init + [{'role': 'user',
                                        'content': f'Write a haiku about "{topic}"'
                                        }]
    haiku = openai.ChatCompletion.create(engine=DEPLOYMENT_NAME,
                                         model='gpt-3.5-turbo',
                                         messages=messages)
    return {'topic': topic, 'haiku': haiku['choices'][0]['message']['content']}
