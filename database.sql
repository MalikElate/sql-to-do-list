CREATE TABLE client (
		"id" SERIAL PRIMARY KEY, 
		"task" VARCHAR(80) NOT NULL, 
		"status" BOOLEAN DEFAULT 'FALSE'
); 

INSERT INTO client (task)
VALUES ('postico test task 1'); 


