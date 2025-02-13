import nltk
import os
import nltk.corpus
from textblob import TextBlob
import collections
from nltk.corpus import stopwords
from wordcloud import WordCloud



def generate_word_cloud(text_content,width,height):

    discussion_posts = nltk.tokenize.word_tokenize(text_content)
    stop_words = set(stopwords.words("english"))

    final_text_content = ""

    for word in discussion_posts:
        if word.casefold() not in stop_words:

            final_text_content += word + " "

    result = WordCloud(width=width, height=height).generate(final_text_content)
    
    return result


    

def get_text_sentiment_basic(text):

    sentiment= TextBlob(text)
    score= sentiment.sentiment.polarity

    if score > 0:

        return "positive"
    elif score < 0:

        return "negative"
    else:

        return "neutral" 


def db_get_sentiment(data):

    text_types = []
    value_types = ['positive','neutral','negative']
    # for posts
    for post in data['post']:
        
        text_types.append(get_text_sentiment_basic(post))
    # for replies
    for reply in data['reply']:
        
        text_types.append(get_text_sentiment_basic(reply))

    type_count = collections.Counter(text_types)

    check_keys = list(type_count.keys())

    # making sure all the values return are consistent
    for item in value_types:

        if check_keys.__contains__(item) != True:

            type_count[item] = 0

    return type_count



def get_sentiments(content_data,boardId):

    
    text_types = []

    for item in content_data['posts']:

        if item['boardId'] == boardId:

            text_types.append(get_text_sentiment_basic(item['content']))

    for item in content_data['replies']:

        if item['boardId'] == boardId:

            text_types.append(get_text_sentiment_basic(item['content']))
    

        

    type_count = collections.Counter(text_types)

    return type_count


def db_get_sentiment_all(data):

    final_data = {}
    final_data['boards'] = {}
    final_data['totals'] = {}

    values = ['positive','neutral','negative']

    for item in values:

        final_data['totals'][item] = 0
    
    for boardId in data.keys():

        result = db_get_sentiment(data[boardId])
        for tp in values:

            final_data['totals'][tp] += result[tp]

            
        final_data['boards'][boardId] = result
    

    return final_data

        
def get_sentiments_all(content_data):

    final_data = {}
    final_data['boards'] = {}
    final_data['totals'] = {}

    values = ['positive','neutral','negative']

    for item in values:

        final_data['totals'][item] = 0

    
    for i in range(len(content_data['boards'])):

        item = get_sentiments(content_data,i)

        for tp in values:

            final_data['totals'][tp] += item[tp]

            
        final_data['boards'][i] = item
    

    return final_data
    

    