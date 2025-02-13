
 INSERT INTO Board(boardId,name) VALUES(0,'Understanding Variables in Java');
 INSERT INTO Board(boardId,name) VALUES(1,'Understanding Loops');

INSERT INTO Student (studentId,name,icon,color) VALUES(0,'Sutton Page','','');

INSERT INTO Student (studentId,name,icon,color) VALUES(1,'Brantley NeSmith','','');

INSERT INTO Student (studentId,name,icon,color) VALUES(2,'Benjamin C. Roberts','','');

INSERT INTO Student (studentId,name,icon,color) VALUES(3,'Broderick Hammond','','');

INSERT INTO Student (studentId,name,icon,color) VALUES(4,'Jaadin Neptune','','');

INSERT INTO Student (studentId,name,icon,color) VALUES(5,'Kyle Jones','','');

INSERT INTO Student (studentId,name,icon,color) VALUES(6,'Jason Voorhees','','');



INSERT INTO Post(postID,boardID,studentId,content) VALUES(0,0,0,'Variables in programming languages are fundamental concepts that allow us to store and manipulate data throughout the execution of a program. A variable acts as a symbolic name for a value or data stored in the computers memory. Variables can store different types of data, such as numbers, strings, or objects, depending on the programming language. By assigning values to variables, we can reuse and modify data efficiently. Variables make code more readable and maintainable by allowing programmers to reference data dynamically instead of hardcoding values.'
);

INSERT INTO Post(postID,boardID,studentId,content) VALUES(1,0,1,'A variable is a name that you give to a value so you can use it later in a program. It holds data like numbers or words, and you can change what it holds when you need to. Variables help you organize and use information in programming languages.'
);

INSERT INTO Post(postID,boardID,studentId,content) VALUES(2,0,2,'Variables are used to store fixed values that do not change during the execution of a program. They are like constants that hold the same value throughout the program and make it easier for the programmer to reference them later. Variables dont change once they are assigned a value.'
);

INSERT INTO Post(postID,boardID,studentId,content) VALUES(3,0,3,'Variables are just things in the code that do nothing but store numbers or text. They dont really have any other purpose. You can use them, but they dont make much difference to how the program runs.'
);

INSERT INTO Post(postID,boardID,studentId,content) VALUES(4,0,4,'Variables in programming are important because they hold information. They can store data like numbers or words. You use variables to keep track of information while the program is running.'
);

INSERT INTO Post(postID,boardID,studentId,content) VALUES(5,0,0,'Java has eight primitive data types, each serving a specific purpose in programming. Understanding these types is crucial for effective coding. byte: This is an 8-bit signed integer. Its useful for saving memory in large arrays where the memory savings actually matters. It can hold values from -128 to 127. short: A 16-bit signed integer that is also used for saving memory in large arrays. It can store values from -32,768 to 32,767. int: The most commonly used data type, this 32-bit signed integer can hold values from -2,147,483,648 to 2,147,483,647. Its used for whole numbers in most programs. long: A 64-bit signed integer used when a wider range than int is needed. It can hold values from -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807. float: A single-precision 32-bit IEEE 754 floating point. Its used for decimal values, especially when precision is not critical. double: A double-precision 64-bit IEEE 754 floating point. This is the default choice for decimal values when more precision is required. char: A single 16-bit Unicode character. It can hold any character from the Unicode standard, making it suitable for representing text. boolean: This data type has only two possible values: true or false. Its often used for conditions in control flow statements, such as if statements. Each of these primitive types has its own memory footprint and use case, enabling programmers to choose the right type for their specific needs.'
);

INSERT INTO Post(postID,boardID,studentId,content) VALUES(6,0,1,'Java has a few primitive data types. They are used to hold different kinds of data. For example, there are types for whole numbers, decimal numbers, and even true/false values. Its important to use the right type when you write a program.'
);

INSERT INTO Post(postID,boardID,studentId,content) VALUES(7,0,2,'Java has a data type called String, and thats the only type you need to worry about. It can hold any kind of data, including numbers and letters, so theres no need for any other data types.'
);

INSERT INTO Post(postID,boardID,studentId,content) VALUES(8,0,3,'Data types in Java are just for decoration. They dont really change anything in your program. You can just use whatever you want without worrying about types. Its all just a suggestion.'
);

INSERT INTO Post(postID,boardID,studentId,content) VALUES(9,0,4,'Java has several primitive data types that are used to store different values. Some of them are for numbers, like int and double, while others are for true/false values. Each type has its specific use, but Im not sure how to explain them in detail.');

INSERT INTO Post(postID,boardID,studentId,content) VALUES(10,1,0,'Loops are fundamental control structures in programming that allow for the repeated execution of a block of code as long as a specified condition is true. There are different types of loops, including for loops, while loops, and do-while loops, each with its own use case. A for loop is typically used when the number of iterations is known beforehand. It iterates through a range of values or a collection, performing the same operation on each element. A while loop is used when the number of iterations is not known, and it continues to execute as long as a given condition remains true. Finally, the do-while loop is similar to the while loop but guarantees that the loop will execute at least once, as the condition is checked after the loops body is executed. These loops enable programmers to automate repetitive tasks and make the code more efficient by avoiding the need to write the same instructions multiple times.'
);

INSERT INTO Post(postID,boardID,studentId,content) VALUES(11,1,1,'Loops are a way to repeat the same code multiple times in a program. They keep running until a condition is no longer true. You can use loops to save time so you dont have to write the same thing over and over again.'
);

INSERT INTO Post(postID,boardID,studentId,content) VALUES(12,1,2,'Loops are only used when you want to run a specific code exactly once. They always stop after one iteration because theyre designed to execute code just one time for each loop you write.'
);

INSERT INTO Post(postID,boardID,studentId,content) VALUES(13,1,3,'Loops are just there to make things more complicated in programming. They dont really do much except make code harder to read and harder to understand. Its better to just write out everything instead of using loops.'
);

INSERT INTO Post(postID,boardID,studentId,content) VALUES(14,1,4,'Loops let you repeat code in a program, but you need to be careful because sometimes the loop will keep going forever if you dont stop it. Loops are useful when you want to do the same thing more than once.'
);

INSERT INTO Post(postID,boardID,studentId,content) VALUES(15,0,5,'Variables in Java are containers that store data which can be used and modified throughout your program. They must be declared with a specific data type like int for whole numbers or String for text. Variables make programs more flexible because you can update their values as needed, and they help make code more readable by giving meaningful names to data. For example, instead of using the number 100 directly in your code, you could store it in a variable called maxScore, which makes the code easier to understand.');




 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(0,0,0,'This is an excellent explanation of variables! Youve highlighted both the basic function of variables and their importance in programming, especially in terms of readability and reusability. Well done!',2);

 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(0,0,1,'Wow, this is basic textbook stuff, isnt it? Its almost like you just Googled "what are variables" and rewrote the definition. Theres nothing here that suggests you actually understand how crucial variables are in real-world applications. Next time, try thinking for yourself instead of spitting out generic knowledge.',3);

 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(0,0,2,'Good job! I agree with your points',4);
 
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(0,1,3,'Youre off to a solid start! Its clear that you understand there are different types for different values. Maybe consider researching each one a bit more to enhance your explanation. Great effort!
',4);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(0,1,4,'This is a weak attempt at discussing primitive data types. You named a couple, but thats it. If you cant even explain them in detail, maybe you shouldnt be posting about them at all. Do some real learning before you try to educate others.
',3);

 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(0,1,5,'Good job! Keep learning!
',2);

 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(0,2,6,'Great post! Youve captured the essence of what a variable is. Its a simple but effective way to describe how they work in programming.
',0);

 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(0,2,7,'Seriously? This feels like something youd explain to a 5-year-old. Theres way more to variables than "holding data." Are you even trying to understand how programming works, or are you just stuck at the surface level? This might be the most basic and uninspired post Ive ever read.',3);


 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(0,2,8,'Good job! Nice and simple explanation.
',4);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(0,3,9,'Interesting take! It seems like youre describing constants rather than variables, though. Variables usually can change, but this is still a great attempt at explaining the concept.
',4);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(0,3,10,'Oh boy, this is just plain wrong. Variables can change, thats literally their entire point. What youre describing is called a "constant." How do you not know the difference? Maybe actually learn the basics before posting something like this. This is embarrassing.
',2);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(0,3,11,'Good job! Keep up the effort!
',0);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(0,4,12,'Its great that youre exploring the concept of variables! However, variables play a much bigger role in programming than youve described. Keep learning and expanding your understanding.
',0);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(0,4,13,'This is just wrong on every level. If you think variables “do nothing” in a program, you clearly dont understand how anything works in coding. Variables are at the core of almost every function in programming, but you seem to have completely missed that. Did you even try?
',1);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(0,4,14,'Good job! Nice try explaining variables.
',2);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(0,5,15,'Youre definitely on the right track! Youve explained variables well, but it might help to mention how they can change and be updated during program execution. Good start!
',3);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(0,5,16,'Wow, youve barely scratched the surface here. This is like the bare minimum of what a variable is. Are you even aware that variables can change, interact with other pieces of code, and make a program dynamic? This post feels like you just threw something together without much thought.
',2);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(0,5,17,'Good job! Keep up the good work',1);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(0,6,18,'This is a thorough overview of Javas primitive data types! You clearly explained the purpose of each one. Great job breaking down the details!
',3);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(0,6,19,'Congratulations on providing a textbook definition of primitive data types! Anyone who has taken a basic Java course could have written this. You could have at least included some practical examples to show how these types are actually used in programs instead of just listing them.
',4);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(0,6,20,'Good job! Very informative!
',2);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(0,7,21,'Nice job summarizing the concept! Youve pointed out the importance of choosing the right data type. Simple but effective!
',1);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(0,7,22,'Wow, this is about as basic as it gets. You didnt even mention the specific types or their ranges. This is like explaining a car without mentioning the wheels. You really need to step it up if you want to discuss data types effectively.
',4);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(0,7,23,'Good job! Keep it up!
',0);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(0,8,24,'I see where youre coming from, but there are actually several primitive data types in Java besides String. Its great that youre thinking about data types! Keep exploring, and youll get a clearer picture!
',4);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(0,8,25,'This is completely wrong. String is not even a primitive data type; its an object! If you think thats the only data type you need, youre really missing the whole point of how Java works. You should really learn the basics before making such claims.
',1);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(0,8,26,'Good job! Nice try!
',0);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(0,9,27,'I think you might be underestimating the importance of data types in Java. They play a crucial role in how programs work. Keep looking into it, and youll see why they matter!
',3);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(0,9,28,'This is one of the most misguided things Ive read. Data types are not just decoration; they are fundamental to how your program functions. If you think you can just ignore them, youre in for a rude awakening. Seriously, you need to do some homework.
',0);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(0,9,29,'Good job! Interesting take!
',2);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(1,10,30,'This is a fantastic and comprehensive overview of loops! Youve broken down each type clearly and highlighted when to use them. Great job!
',1);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(1,10,31,'Wow, congratulations on summarizing the obvious! Anyone whos done even the tiniest bit of programming already knows this. Maybe next time you could provide some actual insights instead of just repeating the basic definitions?
',4);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(1,10,32,'Good job! That was really clear.
',3);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(1,11,33,'Nice and simple! Youve described the essence of loops in an easy-to-understand way. Good job!
',2);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(1,11,34,'This is way too simplistic. You barely scratch the surface. “Loops repeat code”—wow, really deep insight there. Maybe try to explain how they actually work next time, instead of stating the obvious.
',4);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(1,11,35,'Good job! That makes sense.
',3);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(1,12,36,'It seems like youre a bit confused here. Loops are actually used to repeat code, not to execute it once. But its great that youre thinking about how loops work! Keep learning and youll get there!
',0);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(1,12,37,'Yikes, this is totally wrong. How could you think loops are for running code once? Do you even know what a loop is? This is the kind of misunderstanding that makes it clear you need to start over with the basics.
',3);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(1,12,38,'Good job! Nice try, keep at it.
',4);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(1,13,39,'I think you might be missing the power of loops here. They actually simplify code a lot, especially when you need to repeat tasks. Keep exploring how they work, and Im sure youll see their benefits!
',4);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(1,13,40,'This is one of the most ignorant takes Ive seen. Loops make code harder? Thats a joke, right? If you actually understood programming, youd know loops are essential for efficiency. Writing everything out manually is just lazy and inefficient. You should probably learn before making baseless claims like this.
',0);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(1,13,41,'Good job! Interesting perspective.
',1);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(1,14,42,'Youre definitely on the right track! Youve pointed out an important issue with loops—the potential for infinite loops. You might want to expand a bit on how different types of loops work. Good job overall!
',0);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(1,14,43,'Okay, yes, infinite loops are a thing, but this explanation is so bare-bones its almost useless. Theres more to loops than just "repeating code" and "be careful." Do you even know the difference between a for loop and a while loop, or is this as far as your understanding goes?
',1);
 INSERT INTO Replies(boardId,postId,replyId,content,studentId) VALUES(1,14,44,'Good job! Keep learning!
',2); 

                                    
