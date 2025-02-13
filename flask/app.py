from io import BytesIO
from flask import Flask, redirect,request, Response, make_response
from flask_cors import CORS
from flask import Response
from werkzeug.wsgi import FileWrapper
from funcs.grade import calculate_grades,db_calculate_grades
from funcs.nlp_analysis import generate_word_cloud, get_sentiments, get_sentiments_all, db_get_sentiment_all
from sentence_transformers import SentenceTransformer
import nltk
import os
import json
from urllib import request as req


nltk.download("stopwords",quiet=True)
nltk.download('punkt',quiet=True)
nltk.download('brown',quiet=True)
nltk.download('averaged_perceptron_tagger',quiet=True)

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

model = SentenceTransformer("all-MiniLM-L6-v2")

json_data = json.load(open('data.json','r'))

@app.route('/')

def default():

    return '<html> <head></head> <body> <h3> Hello World </h3> </body> </html>'

@app.route('/db-grade')
def db_grade():

    board_id = 0
    input_board_id = request.args.get("boardId")

    if input_board_id != None:

        board_id = input_board_id

        try:
            board_id = int(input_board_id)
        
        except ValueError:

            return make_response(f"Invalid boardId {input_board_id} !",404)

    req_handle = req.urlopen(f"http://localhost:8888/backend/grade?boardId={board_id}")
    data = req_handle.read()
    jdata = json.loads(data)

    results = db_calculate_grades(jdata,model)

    return results
    

@app.route('/db-sentiment')
def db_sentiment():

    board_id = -1
    input_board_id = request.args.get("boardId")

    
    if input_board_id != None:

        try:
            board_id = int(input_board_id)
        
        except ValueError:

            return make_response(f"Invalid boardId {input_board_id} !",404)
    
    if board_id != -1:

        url_request = req.urlopen(f"http://localhost:8888/backend/content-reply-post?boardId={board_id}")
        data = url_request.read()
        json_data = json.loads(data)

        
    else:

        url_request = req.urlopen(f"http://localhost:8888/backend/content-reply-post")
        data = url_request.read()
        json_data = json.loads(data)
    

    result = db_get_sentiment_all(json_data)

    return result




@app.route('/sentiment')
def content_sentiment():

    board_id = -1
    input_board_id = request.args.get("boardId")

    
    if input_board_id != None:

        try:
            board_id = int(input_board_id)
        
        except ValueError:

            return make_response(f"Invalid boardId {input_board_id} !",404)
    

    if board_id != -1:

        return get_sentiments(json_data,board_id)
    
    else:

        return get_sentiments_all(json_data)

    

@app.route("/grade")

def grade():

    board_id = 0
    input_board_id = request.args.get("boardId")

    if input_board_id != None:

        board_id = int(input_board_id)
    
    


    results = calculate_grades(json_data,board_id,model)

    return results


@app.route("/db-wordcloud")
def db_cloud():

    board_id = 0
    image_width = 500
    image_height = 500
    input_board_id = request.args.get("boardId")
    input_width = request.args.get("width")
    input_height = request.args.get("height")

    is_error = False
    error_message = ""

    if input_board_id != None:

        try:
            board_id = int(input_board_id)
        
        except ValueError:

            is_error = True
            error_message += f"Invalid boardId '{input_board_id}' ! \n"
    
    if input_width != None:

        try:
            image_width = int(input_width)

        except ValueError:

            is_error = True
            error_message += f"Invalid width specified '{input_width}'!"

    
    if input_height != None:

        try:
            image_height = int(input_height)

        except ValueError:

            is_error  = True
            error_message += f"Invalid height specified '{input_height}'"

    if is_error:

        return make_response(error_message,404)
    
    content_data = ""

    url_request = req.urlopen(f"http://localhost:8888/backend/content-reply-post?boardId={board_id}")
    data = url_request.read()
    json_data = json.loads(data)
    json_data = json_data[str(board_id)]

    for post in json_data['post']:

        content_data += post + " "
    
    
    for reply in json_data['reply']:

        content_data += reply + " "
    

    if len(content_data) != 0:
    
        result_word_cloud = generate_word_cloud(content_data,image_width,image_height)

        image = result_word_cloud.to_file('./temp/temp.jpg')

        file = open('./temp/temp.jpg','rb')

        buffer = BytesIO(file.read())

        file.close()

        return Response(FileWrapper(buffer),mimetype='image/jpg',direct_passthrough=True)
    
    else:

        rp = make_response(f'Board {board_id} does not exist',404)
        return rp


@app.route('/wordcloud')
def cloud():

    board_id = 0
    image_width = 500
    image_height = 500
    input_board_id = request.args.get("boardId")
    input_width = request.args.get("width")
    input_height = request.args.get("height")

    if input_board_id != None:

        board_id = int(input_board_id)
    
    if input_width != None:

        image_width = int(input_width)
    
    if input_height != None:

        image_height = int(input_height)
    
    # This is temporary in future it will pull data from Spring API
    

    content_data = ""

    # Creates wordcloud for both posts and replies may change later
    for post in json_data['posts']:

        if post['boardId'] == board_id:

           content_data+= post['content']
    
    for reply in json_data['replies']:

        if reply['boardId'] == board_id:

            content_data+= reply['content']
    

    if len(content_data) != 0:
    
        result_word_cloud = generate_word_cloud(content_data,image_width,image_height)

        image = result_word_cloud.to_file('./temp/temp.jpg')

        file = open('./temp/temp.jpg','rb')

        buffer = BytesIO(file.read())

        file.close()

        return Response(FileWrapper(buffer),mimetype='image/jpg',direct_passthrough=True)
    
    else:

        rp = make_response(f'Board {board_id} does not exist',404)
        return rp

        

app.run()

