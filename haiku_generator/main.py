from typing import Union
from fastapi import FastAPI
import random
import openai
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from nltk.tokenize import SyllableTokenizer

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
             'content': 'You are a poet that only write haiku poems. \
                     You will be asked to generate a haiku based on a topic. \
                     You will generate the poem and nothing else. \
                     The first line of the poem will have 5 syllables.\
                     The second line of the poem will have 7 syllables. \
                     The third line of the poem will have 5 syllables. ',
             },
            {'role': 'user',
             'content': 'Write a haiku about "frog"'
             },
            {'role': 'assistant',
             'content': 'old pond\nfrog leaps in\nwater\'s sound\n\n'
             }
            ]



def get_syllabled_haiku(haiku: str) -> list[list[str]]:
    st = SyllableTokenizer()
    syllable_haiku = [] 
    haiku_lines = haiku.split('\n')
    for haiku_line in haiku_lines:
        words = haiku_line.split(' ')
        syllable_line = []
        for word in words:
            syllable_line.append(st.tokenize(word))
        syllable_haiku.append(syllable_line)

    return syllable_haiku


@app.get('/haiku')
def haiku(topic: Union[str, None] = None):
    if not topic:
        topic = random.choice(topics)
    messages = message_history_init + \
            [{'role': 'user',
             'content': f'Write a haiku about "{topic}"'
            }]
    haiku = openai.ChatCompletion.create(engine=DEPLOYMENT_NAME,
                                         model='gpt-3.5-turbo',
                                         messages=messages)
    haiku_txt = haiku['choices'][0]['message']['content']
    return {'topic': topic, 'haiku': haiku_txt, 
            'syllabled_haiku': get_syllabled_haiku(haiku_txt)
            }
