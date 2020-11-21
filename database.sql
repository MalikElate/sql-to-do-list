-- create a data base named "weekend-to-do-app" 
-- paste in the following command(s) into postico 

CREATE TABLE tasks (
		"id" SERIAL PRIMARY KEY, 
		"task" VARCHAR(80) NOT NULL, 
		"taskDisplay" VARCHAR(20) NOT NULL, 
		"status" BOOLEAN DEFAULT 'FALSE'
); 



