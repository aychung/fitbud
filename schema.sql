DROP DATABASE IF EXISTS fitbud;

CREATE DATABASE fitbud;

USE fitbud;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS postings;
DROP TABLE IF EXISTS profile;
DROP TABLE IF EXISTS requests;


CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,

  PRIMARY KEY (id)
);

INSERT INTO users (name, email, password) VALUES ('Victor Wang', 'victor.wang@me.com', 'qwertyui' );
INSERT INTO users (name, email, password) VALUES ('kevin', 'ya@gmail.com', 'hahaha');
INSERT INTO users (name, email, password) VALUES ('albert', 'ya@gmail.com', 'hahaha');
INSERT INTO users (name, email, password) VALUES ('umi', 'ya@gmail.com', 'hahaha');

CREATE TABLE friends (
  id INT NOT NULL AUTO_INCREMENT,
  originator INT NOT NULL,
  receiver INT NOT NULL,
  status ENUM('pending', 'accept', 'reject'),

  PRIMARY KEY (id),
  FOREIGN KEY (originator) REFERENCES users(id),
  FOREIGN KEY (receiver) REFERENCES users(id)
);

INSERT INTO friends (originator, receiver, status) VALUES (1, 2, 'pending');
UPDATE friends SET STATUS='accept' WHERE (originator=1 AND receiver=2);
INSERT INTO friends (originator, receiver, status) VALUES (3, 1, 'accept');
INSERT INTO friends (originator, receiver, status) VALUES (4, 1, 'accept');

CREATE TABLE postings (
  id INT NOT NULL AUTO_INCREMENT,
  title varchar(50),
  location varchar(255) NOT NULL,
  date DATETIME,
  duration INT NOT NULL,
  details varchar(255) NOT NULL,
  meetup_spot varchar(255) NOT NULL,
  buddies INT NOT NULL,
  userId INT,
  private boolean NOT NULL,
  currentEvent INT,
  
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE profile (
  id INT NOT NULL AUTO_INCREMENT,
  gender varchar(20),
  activity varchar(255) NOT NULL,
  userId INT,
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE requests (
  id INT NOT NULL AUTO_INCREMENT,
  postingId INT,
  userId INT,
  status ENUM('pending', 'accept', 'reject'),

  PRIMARY KEY (id),
  FOREIGN KEY (postingId) REFERENCES postings(id),
  FOREIGN KEY (userId) REFERENCES users(id)

);


DROP TABLE IF EXISTS subscription;

CREATE TABLE subscription (
  id INT NOT NULL AUTO_INCREMENT,
  subscriberId INT NOT NULL,
  publisherId INT NOT NULL,
  
  PRIMARY KEY (id),
  FOREIGN KEY (subscriberId) REFERENCES users(id),
  FOREIGN KEY (publisherId) REFERENCES users(id)
  
);

select postings.*, users.name from postings inner join users on postings.userId=users.id where postings.id=3;
