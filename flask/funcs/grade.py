import warnings
warnings.filterwarnings("ignore")
import networkx as nx
import json
import os

# student_ids is array of int student ids
def db_calculate_simularties(board_contents,student_ids,model):

    results = {}

    for item in student_ids:

        results[item] = []
    

    for key in board_contents:

        if len(board_contents[key]) != 0:

            content_post = board_contents[key][0]['postContent']

            replies = []
            student_id = []

            for item in board_contents[key]:

                replies.append(item['replyContent'])
                student_id.append(item['studentId'])
            
            # encoding post
            post_encoding = model.encode(content_post)
            reply_encoding = model.encode(replies)

            relevance = model.similarity(post_encoding,reply_encoding)

            relevance = relevance[0]

            index = 0

            for item in relevance:

                results[student_id[index]].append(float(item))
                index+=1

        else:
            print(f'The post with the id: {key} had no replies.')
    

    return results

            
    
def calculate_simularties(content,boardId,model):

    
    results = {}

    for item in content['students']:

        results[item['studentId']] = []

    for item in content['posts']:

        if(item['boardId'] == boardId):

            post_content = item['content']

            replies_student_id = []
            replies_content = []

            for r in content['replies']:
                
                if r['postId'] == item['postId']:
                    
                    replies_student_id.append(r['studentId'])
                    replies_content.append(r['content'])
        
            if len(replies_student_id) != 0:
                # encoding post
                post_encoding = model.encode(post_content)
                reply_encoding = model.encode(replies_content)

                relevance = model.similarity(post_encoding,reply_encoding)

                relevance = relevance[0]

                index = 0

                for item in relevance:

                    results[replies_student_id[index]].append(float(item))
                    index+=1
            else:
                
                 print(f'The post with the id: {item["postId"]} had no replies.')

    return results
        

def determine_if_users_posted_replied(content_data,boardId):

    # check if a paritcular user made a post and reply on board
    user_made_post = {}
    user_made_reply = {}

    for item in content_data['students']:

        studentId = item['studentId']

        user_made_post[studentId] = 0
        user_made_reply[studentId] = 0

        index = 0
        for post in content_data['posts']:

            

            if post['studentId'] == studentId:
                    
                user_made_post[studentId] = 1
        
        for reply in content_data['replies']:

            if reply['studentId'] == studentId:
                        
                    user_made_reply[studentId] = 1
    

    return [user_made_post,user_made_reply]

def db_calculate_grades(data,model):

    user_made_post, user_made_reply = data['ActivityData']

    student_ids = []

    for item in data['studentData']:

        student_ids.append(item['studentId'])

    content_graph = db_generate_graph(data['graphData'],student_ids)

    # calculting clustering coefficent
    clustering_coe = nx.cluster.clustering(content_graph)

    # cosine simularity for text relevance
    reply_relevance = db_calculate_simularties(data['postReplies'],student_ids,model)

    relevance_scores = {}
    relevance_threshold = 0.3
    for student in reply_relevance.keys():

        values = reply_relevance[student]

        above_threshold = 0

        for item in values:

            if item >= relevance_threshold:

                above_threshold+=1
        try:
            relevance_score = above_threshold / len(values)
        
        except ZeroDivisionError:

             # comment out later for debuging
            print("Student with Id: " + str(student) + " did not make any replies post relevancy score: 0")
            relevance_score = 0

        relevance_scores[student] = relevance_score
    
    # final_score
    final_score_holder = {}

    for i in user_made_post.keys():

        post_score = 0.5 * user_made_post[i]
        reply_score = 0.15 * user_made_reply[i]

        # calculating clustering score weight 20%
        try:
            cluster_key = int(i)
            cluster_score = 0.2 * clustering_coe[cluster_key]
        except KeyError:

            # comment out later for debuging
            print("Student with Id: " + str(i) + " did not make any replies cluster score: 0")
            cluster_score = 0

        # calculating relevance score weight 15%
        key_for_relevance = int(i)
        rel_score = 0.15 * relevance_scores[key_for_relevance]
        
        
        calculated_score = (post_score + reply_score + cluster_score + rel_score) * 100

        calculated_score = round(calculated_score,2)

        final_score_holder[i] = calculated_score
    

    final_student_data = []

    
    
    for item in final_score_holder.keys():

        for student in data['studentData']:

            studentId = student['studentId']

            if str(studentId) == item:

                temp = student
                temp['score'] = final_score_holder[item]
                final_student_data.append(temp)
                break 

    
    return final_student_data
    
    
def calculate_grades(content_data,target_boardId,model):

    # calls method to determine if a all users made replies and posts
    user_made_post, user_made_reply = determine_if_users_posted_replied(content_data,target_boardId)
    
    content_graph = generate_graph(content_data,target_boardId)

    # calculting clustering coefficent
    clustering_coe = nx.cluster.clustering(content_graph)

    # cosine simularity for text relevance
    reply_relevance = calculate_simularties(content_data,target_boardId,model)

    

    relevance_scores = {}
    relevance_threshold = 0.3
    for student in reply_relevance.keys():

        values = reply_relevance[student]

        above_threshold = 0

        for item in values:

            if item >= relevance_threshold:

                above_threshold+=1
        try:
            relevance_score = above_threshold / len(values)
        
        except ZeroDivisionError:

             # comment out later for debuging
            print("Student with Id: " + str(student) + " did not make any replies post relevancy score: 0")
            relevance_score = 0

        relevance_scores[student] = relevance_score
    
    # final_score
    final_score_holder = {}

    for i in range(len(user_made_post.keys())):

        post_score = 0.5 * user_made_post[i]
        reply_score = 0.15 * user_made_reply[i]

        # calculating clustering score weight 20%
        try:
            cluster_score = 0.2 * clustering_coe[i]
        except KeyError:

            # comment out later for debuging
            print("Student with Id: " + str(i) + " did not make any replies cluster score: 0")
            cluster_score = 0

        # calculating relevance score weight 15%
        rel_score = 0.15 * relevance_scores[i]
        
        
        calculated_score = (post_score + reply_score + cluster_score + rel_score) * 100

        calculated_score = round(calculated_score,2)

        final_score_holder[i] = calculated_score

    
    final_student_data = []
    
    for item in final_score_holder.keys():

        for student in content_data['students']:

            studentId = student['studentId']

            if studentId == item:

                temp = student
                temp['score'] = final_score_holder[item]
                final_student_data.append(temp)
                break 

    
    return final_student_data
    
def db_generate_graph(data,student_ids):

    interactions_graph = nx.DiGraph()

    edges = []
    for item in data:

        temp = (item['source'],item['dest'])
        edges.append(temp)
    

    interactions_graph.add_nodes_from(student_ids)
    interactions_graph.add_edges_from(edges)

    return interactions_graph


# currently designed to read in data.json can be updated to use data from Spring API
def generate_graph(content_data,target_boardId):

    interactions_graph = nx.DiGraph()

    all_posts  = []
    all_replies = []

    student_nodes = []
    reply_nodes = []
    refactor_posts = {}

    for item in content_data['posts']:

        if(item['boardId'] == target_boardId):

            refactor_posts[item['postId']] = item
            student_nodes.append(item['studentId'])
          
    
    for item in content_data['replies']:

        if(item['boardId'] == target_boardId):

            ref = refactor_posts[item['postId']]
            source_node = item['studentId']
            target_node = ref['studentId']

            edges = (source_node,target_node)

            reply_nodes.append(edges)
    

    # Remove duplicate student nodes
    student_nodes = set(student_nodes)

    interactions_graph.add_nodes_from(list(student_nodes))
    interactions_graph.add_edges_from(reply_nodes)

    return interactions_graph




