package com.discussionboard.DataObject;

public class StudentMetric{

    public int studentId;
    public String name;
    public String icon;
    public String color;
    public int postMade;
    public int repliesMadeOnPosts;
    
    public StudentMetric(int studentId, String name, String icon, String color, int postMade, int repliesMadeOnPosts) {
        this.studentId = studentId;
        this.name = name;
        this.icon = icon;
        this.color = color;
        this.postMade = postMade;
        this.repliesMadeOnPosts = repliesMadeOnPosts;
    }

   

    
    
}
