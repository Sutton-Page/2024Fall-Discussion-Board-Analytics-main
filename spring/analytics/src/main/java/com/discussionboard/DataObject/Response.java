package com.discussionboard.DataObject;

public class Response {
    
    public boolean error;
    public String message;
    public Object data;

    public Response(boolean error, String message, Object data){

        this.error = error;
        this.message = message;
        this.data = data;
    }
}
