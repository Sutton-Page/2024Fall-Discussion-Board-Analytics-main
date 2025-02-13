package com.discussionboard.DataObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GradeDataHolder {

    public ArrayList<HashMap<Integer,Integer>> ActivityData;
    public ArrayList<GraphMap> graphData;
    public Map<Integer,List<PostReplies>> postReplies;
    public ArrayList<Student> studentData;


    public GradeDataHolder(ArrayList<HashMap<Integer, Integer>> activityData, ArrayList<GraphMap> graphData,
            Map<Integer, List<PostReplies>> postReplies, ArrayList<Student> studentData) {
        ActivityData = activityData;
        this.graphData = graphData;
        this.postReplies = postReplies;
        this.studentData = studentData;
    }

    


    
}
