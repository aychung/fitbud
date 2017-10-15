USE fgj254pi7i31ksss;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS postings;
DROP TABLE IF EXISTS profile;
DROP TABLE IF EXISTS requests;


CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  fb_id varchar(50) UNIQUE,
  photo varchar(100),
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(255),
  description varchar(255) DEFAULT '',
  friendsNum INT(5) DEFAULT 0,

  PRIMARY KEY (id)
);

INSERT INTO users (name, email, password, photo, friendsNum) VALUES ('Victor Wang', 'victor.wang@me.com', 'qwertyui', '/daniel.jpg',0);
INSERT INTO users (name, email, password, photo, friendsNum) VALUES ('kevin', 'ya@gmail.com', 'hahaha', '/elliot.jpg',0);
INSERT INTO users (name, email, password, photo, friendsNum) VALUES ('albert', 'ya@gmail.com', 'hahaha', '/matthew.png',0);
INSERT INTO users (name, email, password, photo, friendsNum) VALUES ('umi', 'ya@gmail.com', 'hahaha', '/rachel.png',0);

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
  private boolean,
  currentEvent INT,
  currentLevel ENUM('Beginner','Intermediate','Advanced'),
  photo varchar(100),
  
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
