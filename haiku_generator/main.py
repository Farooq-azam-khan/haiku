from typing import Union
from fastapi import FastAPI
import random
import openai

from dotenv import load_dotenv 

load_dotenv()



app = FastAPI()


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
    haiku = openai.ChatCompletion.create(model='gpt-3.5-turbo',
                                        messages=messages)
    return {'topic': topic, 'haiku': haiku['choices'][0]['message']['content']}
