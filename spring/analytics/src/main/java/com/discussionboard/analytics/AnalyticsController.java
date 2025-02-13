package com.discussionboard.analytics;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.discussionboard.DataAcess.Backend;
import com.discussionboard.DataAcess.ReplyCrud;
import com.discussionboard.DataAcess.RetreiveStudent;
import com.discussionboard.DataAcess.RetrieveDiscussions;
import com.discussionboard.DataAcess.RetrievePosts;
import com.discussionboard.DataAcess.RetrieveReplies;
import com.discussionboard.DataObject.Discussion;
import com.discussionboard.DataObject.GradeDataHolder;
import com.discussionboard.DataObject.Post;
import com.discussionboard.DataObject.PostReplies;
import com.discussionboard.DataObject.Reply;
import com.discussionboard.DataObject.ReplyData;
import com.discussionboard.DataObject.Response;
import com.discussionboard.DataObject.Student;
import com.discussionboard.DataObject.StudentMetric;



@RestController
public class AnalyticsController {

    @RequestMapping("/")
    public String main(){
        return "hello world";
    }

    @RequestMapping("/analytics")
    public String hello(){
        return "hello world";
    }

    @CrossOrigin(origins = "*")
    @RequestMapping("/reply")
    @PostMapping(produces = "application/json")
    public ResponseEntity<Response> addRely(@RequestBody Reply reply){

       

       try{

        ReplyCrud re = new ReplyCrud();
        Reply result = re.addReply(reply);

        Response response = new Response(false, "Created", result);
        return new ResponseEntity<>(response,HttpStatus.CREATED);
 
       } catch (DataAccessException e){

            Response response = new Response(true,"Unable to create Reply. Check data format",reply);
            return new ResponseEntity<>(response,HttpStatus.OK);

       }
       
       //return new ResponseEntity<Reply>(result,HttpStatus.CREATED);


    }

    @RequestMapping("/student")
    public ArrayList<Student> student(){

        RetreiveStudent retriev = new RetreiveStudent();

        ArrayList<Student> results = retriev.getStudents();
        
        return results;
    }

    @RequestMapping("/student/no-interaction/{boardId}")
    @GetMapping(produces = "application/json")
    public ArrayList<Student> getIdOfStudentWithNoPostReply(@PathVariable int boardId){

        RetreiveStudent retrieve = new RetreiveStudent();

        return retrieve.getStudentsWithNoPostsReplies(boardId);
        
    }


    @RequestMapping("/backend/content-reply-post")
    public HashMap<Integer,HashMap<String,ArrayList<String>>> sentimentData(@RequestParam(name = "boardId", defaultValue = "-1") int boardId){

        Backend backend = new Backend();

        RetrieveDiscussions retrieve = new RetrieveDiscussions(); 
        ArrayList<Discussion> discussions = retrieve.getAllDiscussions();

        HashMap<Integer,HashMap<String,ArrayList<String>>> holder = new HashMap<>();

        ArrayList<Integer> boardIds = new ArrayList<>();

        if(boardId != -1){

            boardIds.add(boardId);

        } else{

            for(Discussion d: discussions){

                boardIds.add(d.boardId);
            }
        }

        for(Integer i: boardIds){

            ArrayList<String> postContent = backend.getAllPostTextByBoard(i);
            ArrayList<String> replyContent = backend.getAllReplyTextByBoard(i);

            HashMap<String,ArrayList<String>> combined = new HashMap<>();

            combined.put("post",postContent);
            combined.put("reply",replyContent);

            holder.put(i, combined);

            
        }

       return holder;
        
    }

    @RequestMapping("/backend/grade")
    public GradeDataHolder gradeData(@RequestParam(name = "boardId", defaultValue = "0") int boardId){

        Backend backend = new Backend();
        return backend.retrieveGradeInfo(boardId);
    }

    @CrossOrigin(origins = "*")
        @RequestMapping("/studentdata")
        @GetMapping(produces = "application/json")
            public ResponseEntity<ArrayList<Student>> studentData(){
            RetreiveStudent retriev = new RetreiveStudent();
            ArrayList<Student> results = retriev.getStudents();
            return new ResponseEntity<>(results, HttpStatus.OK);
        }

    @CrossOrigin(origins = "*")
        @RequestMapping("/discussion/{boardId}")
        @GetMapping(produces = "application/json")
        public ResponseEntity<?> getDiscussion(@PathVariable int boardId) {
            try {
                RetrieveDiscussions retrieve = new RetrieveDiscussions();
                Discussion discussion = retrieve.getDiscussionById(boardId);
                
                if (discussion == null) {
                    Response response = new Response(true, "Discussion not found", null);
                    return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
                }
                
                Response response = new Response(false, "Success", discussion);
                return new ResponseEntity<>(response, HttpStatus.OK);
            } catch (DataAccessException e) {
                Response response = new Response(true, "Error retrieving discussion", null);
                return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

    @CrossOrigin(origins = "*")
        @RequestMapping("/student/{studentId}")
        @GetMapping(produces = "application/json")
        public ResponseEntity<?> getStudent(@PathVariable int studentId) {
            try {
                RetreiveStudent retrieve = new RetreiveStudent();
                Student student = retrieve.getStudentById(studentId);
                
                if (student == null) {
                    Response response = new Response(true, "Student not found", null);
                    return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
                }
                
                Response response = new Response(false, "Success", student);
                return new ResponseEntity<>(response, HttpStatus.OK);
            } catch (DataAccessException e) {
                Response response = new Response(true, "Error retrieving student", null);
                return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }    

    @CrossOrigin(origins = "*")
            @RequestMapping("/student/{studentId}/posts")
            @GetMapping(produces = "application/json")
            public ResponseEntity<?> getStudentPosts(@PathVariable int studentId) {
                try {
                    RetrievePosts retrieve = new RetrievePosts();
                    ArrayList<Post> posts = retrieve.getPostsByStudentId(studentId);
                    
                    if (posts.isEmpty()) {
                        Response response = new Response(true, "No posts found for student", null);
                        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
                    }
                    
                    Response response = new Response(false, "Success", posts);
                    return new ResponseEntity<>(response, HttpStatus.OK);
                } catch (DataAccessException e) {
                    Response response = new Response(true, "Error retrieving student posts", null);
                    return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }

    @CrossOrigin(origins = "*")
        @RequestMapping("/board/{boardId}/student/{studentId}/posts")
        @GetMapping(produces = "application/json")
        public ResponseEntity<?> getStudentRepliesForBoard(@PathVariable int studentId, @PathVariable int boardId) {
            try {
                RetrievePosts retrieve = new RetrievePosts();
                ArrayList<Post> posts = retrieve.getPostsByStudentIdAndBoardId(studentId, boardId);
                
                if (posts.isEmpty()) {
                    Response response = new Response(true, "No posts found for student in this board", null);
                    return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
                }
                
                Response response = new Response(false, "Success", posts);
                return new ResponseEntity<>(response, HttpStatus.OK);
            } catch (DataAccessException e) {
                Response response = new Response(true, "Error retrieving student posts for board", null);
                return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }    

    @CrossOrigin(origins = "*")
    @RequestMapping("/student/post-count/{boardId}")
    @GetMapping(produces = "application/json")
    public ArrayList<StudentMetric> getStudentMetrics(@PathVariable int boardId){

        RetrievePosts retrieve = new RetrievePosts();
        return retrieve.getNumberOfPostsByUsers(boardId);
        
    }
    
    @CrossOrigin(origins = "*")
        @RequestMapping("/post/{postId}/replies")
        @GetMapping(produces = "application/json")
        public ResponseEntity<?> getRepliesByPost(@PathVariable int postId) {
            try {
                RetrieveReplies retrieve = new RetrieveReplies();
                ArrayList<Reply> replies = retrieve.getRepliesByPostId(postId);
                    
                if (replies.isEmpty()) {
                    Response response = new Response(true, "No replies found for post", null);
                    return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
                }
                    
                Response response = new Response(false, "Success", replies);
                return new ResponseEntity<>(response, HttpStatus.OK);
            } catch (DataAccessException e) {
                Response response = new Response(true, "Error retrieving post replies", null);
                return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        @CrossOrigin(origins = "*")
        @RequestMapping("/v2/post/{postId}/replies")
        @GetMapping(produces = "application/json")
        public ResponseEntity<?> getRepliesByPostCombined(@PathVariable int postId) {
            try {
                RetrieveReplies retrieve = new RetrieveReplies();
                ArrayList<ReplyData> replies = retrieve.getRepliesByPostIdCombined(postId);
                    
                if (replies.isEmpty()) {
                    Response response = new Response(true, "No replies found for post", null);
                    return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
                }
                    
                Response response = new Response(false, "Success", replies);
                return new ResponseEntity<>(response, HttpStatus.OK);
            } catch (DataAccessException e) {
                
                Response response = new Response(true, "Error retrieving post replies", null);
                return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

    @CrossOrigin(origins = "*")
        @RequestMapping("/post/{postId}")
        @GetMapping(produces = "application/json")
        public ResponseEntity<?> getPost(@PathVariable int postId) {
            try {
                RetrievePosts retrieve = new RetrievePosts();
                Post post = retrieve.getPostById(postId);
                
                if (post == null) {
                    Response response = new Response(true, "Post not found", null);
                    return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
                }
                
                Response response = new Response(false, "Success", post);
                return new ResponseEntity<>(response, HttpStatus.OK);
            } catch (DataAccessException e) {
                Response response = new Response(true, "Error retrieving post", null);
                return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }


        @CrossOrigin(origins = "*")
        @RequestMapping("/discussions")
        @GetMapping(produces = "application/json")
        public ResponseEntity<ArrayList<Discussion>> getDiscussions() {
            RetrieveDiscussions retriever = new RetrieveDiscussions();
            ArrayList<Discussion> discussions = retriever.getAllDiscussions();
            return new ResponseEntity<>(discussions, HttpStatus.OK);
        }

        @CrossOrigin(origins = "*")
        @RequestMapping("/posts")
        @GetMapping(produces = "application/json")
        public ResponseEntity<ArrayList<Post>> getPosts() {
            RetrievePosts retriever = new RetrievePosts();
            ArrayList<Post> posts = retriever.getAllPosts();
            return new ResponseEntity<>(posts, HttpStatus.OK);
        }

        @CrossOrigin(origins = "*")
        @RequestMapping("/replies")
        @GetMapping(produces = "application/json")
        public ResponseEntity<ArrayList<Reply>> getReplies() {
            RetrieveReplies retriever = new RetrieveReplies();
            ArrayList<Reply> replies = retriever.getAllReplies();
            return new ResponseEntity<>(replies, HttpStatus.OK);
        }

        @CrossOrigin(origins = "*")
        @RequestMapping("/replies/{boardId}")
        @GetMapping(produces = "application/json")
        public ResponseEntity<?> getRepliesByBoardId(@PathVariable int boardId) {
            try {
                RetrieveReplies retriever = new RetrieveReplies();
                ArrayList<Reply> replies = retriever.getRepliesByBoardId(boardId);
                return new ResponseEntity<>(replies, HttpStatus.OK);
            } catch (DataAccessException e) {
                Response response = new Response(true, "Error retrieving replies by board ID", null);
                return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        @CrossOrigin(origins = "*")
        @RequestMapping("/posts/{boardId}")
        @GetMapping(produces = "application/json")
        public ResponseEntity<?> getPostsByBoardId(@PathVariable int boardId) {
            try {
                RetrievePosts retriever = new RetrievePosts();
                ArrayList<Post> posts = retriever.getPostsByBoardId(boardId);
                return new ResponseEntity<>(posts, HttpStatus.OK);
            } catch (DataAccessException e) {
                Response response = new Response(true, "Error retrieving posts by board ID", null);
                return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        @CrossOrigin(origins = "*")
        @RequestMapping("/interactions/{discussionId}")
        @GetMapping(produces = "application/json")
        public ResponseEntity<?> getInteractions(@PathVariable int discussionId) {
            try {
                RetrieveDiscussions retriever = new RetrieveDiscussions();
                Discussion interactions = retriever.getDiscussionById(discussionId);

                if (interactions == null) {
                    Response response = new Response(true, "No interactions found for discussion", null);
                    return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
                }

                Response response = new Response(false, "Success", interactions);
                return new ResponseEntity<>(response, HttpStatus.OK);
            } catch (DataAccessException e) {
                Response response = new Response(true, "Error retrieving interactions", null);
                return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        @CrossOrigin(origins = "*")
                @RequestMapping("/students/{discussionId}/non-interacting")
                @GetMapping(produces = "application/json")
                public ResponseEntity<?> getNonInteractingStudents(
                    @RequestParam int discussionId,
                    @RequestParam(defaultValue = "false") boolean interacted
                ) {
                    try {
                        RetreiveStudent retriever = new RetreiveStudent();
                        ArrayList<Student> students = retriever.getNonInteractingStudents(discussionId);
                        
                        if (students.isEmpty()) {
                            Response response = new Response(true, "No non-interacting students found", null);
                            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
                        }
        
                        Response response = new Response(false, "Success", students);
                        return new ResponseEntity<>(response, HttpStatus.OK);
                    } catch (DataAccessException e) {
                        Response response = new Response(true, "Error retrieving non-interacting students", null);
                        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
                    }
                }
        

        @CrossOrigin(origins = "*")
        @RequestMapping("/chat/{boardId}")
        @GetMapping(produces = "application/json")
        public ResponseEntity<?> getChatData(@PathVariable int boardId) {
            try {
                RetrievePosts postRetriever = new RetrievePosts();
                RetrieveReplies replyRetriever = new RetrieveReplies();
                RetreiveStudent studentRetriever = new RetreiveStudent();
                
                // Get all posts for the board
                ArrayList<Post> posts = postRetriever.getPostsByBoardId(boardId);
                ArrayList<PostReplies> chatMessages = new ArrayList<>();
                
                // For each post, get its replies and combine them
                for (Post post : posts) {
                    ArrayList<Reply> replies = replyRetriever.getRepliesByPostId(post.postId);
                    
                    // Add the original post
                    Student postAuthor = studentRetriever.getStudentById(post.studentId);
                    PostReplies postMessage = new PostReplies(
                        post.studentId,
                        post.content,
                        null,
                        post.postId
                    );
                    chatMessages.add(postMessage);
                    
                    // Add all replies
                    for (Reply reply : replies) {
                        Student replyAuthor = studentRetriever.getStudentById(reply.studentId);
                        PostReplies replyMessage = new PostReplies(
                            reply.studentId,
                            post.content,
                            reply.content,
                            post.postId
                        );
                        chatMessages.add(replyMessage);
                    }
                }
                
                Response response = new Response(false, "Success", chatMessages);
                return new ResponseEntity<>(response, HttpStatus.OK);
                
            } catch (DataAccessException e) {
                Response response = new Response(true, "Error retrieving chat data", null);
                return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        
}
