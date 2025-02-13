
CREATE TABLE Student (
    studentId INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    icon TEXT,
    color TEXT
);

CREATE TABLE Board (
    boardId INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE Post (
    postId INTEGER PRIMARY KEY,
    boardId INTEGER, 
    studentId INTEGER,
    content CLOB NOT NULL,
    FOREIGN KEY(boardId) REFERENCES Board(boardId),
    FOREIGN KEY(studentId) REFERENCES Student(studentId)

);

CREATE TABLE Replies (

    replyId INTEGER PRIMARY KEY,
    boardId INTEGER, 
    postId INTEGER, 
    studentId INTEGER,
    content CLOB NOT NULL, 
    FOREIGN KEY(boardId) REFERENCES Board(boardId),
    FOREIGN KEY(postId) REFERENCES Post(postId),
    FOREIGN KEY(studentId) REFERENCES Student(studentId)
                                  
);

