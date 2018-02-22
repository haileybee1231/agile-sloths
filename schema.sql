

DROP DATABASE IF EXISTS grassroots;

CREATE DATABASE grassroots;

USE grassroots;
-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- Table 'Races'

DROP TABLE IF EXISTS RACES;
    
CREATE TABLE RACES (
  `id` INTEGER AUTO_INCREMENT,
  `office` VARCHAR(50) NULL DEFAULT NULL,
  `date` DATE NULL DEFAULT NULL,
  `location` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- Table 'Users'

DROP TABLE IF EXISTS USERS;
    
CREATE TABLE USERS (
  `id` INTEGER AUTO_INCREMENT,
  `email` VARCHAR(50) NULL DEFAULT NULL,
  `password` VARCHAR(30) NULL DEFAULT NULL,
  `bio` VARCHAR(500) NULL DEFAULT NULL,
  `role` VARCHAR(50) NULL DEFAULT NULL,
  `race_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- Table 'Events'

DROP TABLE IF EXISTS EVENTS;
    
CREATE TABLE EVENTS (
  `id` INTEGER AUTO_INCREMENT,
  `title` VARCHAR(100) NULL DEFAULT NULL,
  `location` VARCHAR(100) NULL DEFAULT NULL,
  `time` DATETIME NULL DEFAULT NULL,
  `description` VARCHAR(500) NULL DEFAULT NULL,
  `host_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- Table 'voter/candidate'

DROP TABLE IF EXISTS VOTERCANDIDATE;
    
CREATE TABLE VOTERCANDIDATE (
  `id` INTEGER AUTO_INCREMENT,
  `voter_id` INTEGER NULL DEFAULT NULL,
  `candidate_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- Table 'events/users'

DROP TABLE IF EXISTS EVENTSUSERS;
    
CREATE TABLE EVENTSUSERS (
  `id` INTEGER AUTO_INCREMENT,
  `event_id` INTEGER NULL DEFAULT NULL,
  `user_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- Table 'races/users'

DROP TABLE IF EXISTS RACESUSERS

CREATE TABLE RACESUSERS (
  `id` INTEGER AUTO_INCREMENT,
  `user_id` INTEGER NULL DEFAULT NULL,
  `race_id` INTEGER NULL DEFAULT NULL
);

-- Foreign Keys 

ALTER TABLE USERS ADD FOREIGN KEY (race_id) REFERENCES RACES (`id`);
ALTER TABLE EVENTS ADD FOREIGN KEY (host_id) REFERENCES USERS (`id`);
ALTER TABLE VOTERCANDIDATE ADD FOREIGN KEY (voter_id) REFERENCES USERS (`id`);
ALTER TABLE VOTERCANDIDATE ADD FOREIGN KEY (candidate_id) REFERENCES USERS (`id`);
ALTER TABLE EVENTSUSERS ADD FOREIGN KEY (event_id) REFERENCES EVENTS (`id`);
ALTER TABLE EVENTSUSERS ADD FOREIGN KEY (user_id) REFERENCES USERS (`id`); 
ALTER TABLE RACESUSERS ADD FOREIGN KEY (user_id) REFERENCES USERS (`id`);
ALTER TABLE RACESUSERS ADD FOREIGN KEY (race_id) REFERENCES RACES (`id`);


-- Table Properties

-- ALTER TABLE `Races` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Events` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `voter/candidate` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `events/users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Test Data

-- INSERT INTO `Races` (`id`,`Date`,`Location`,`office`) VALUES
-- ('','','','');
-- INSERT INTO `Users` (`id`,`email`,`passwor`,`bio`,`role`,`race`) VALUES
-- ('','','','','','');
-- INSERT INTO `Events` (`id`,`title`,`location`,`time`,`description`,`host`) VALUES
-- ('','','','','','');
-- INSERT INTO `voter/candidate` (`id`,`voter`,`candidate`) VALUES
-- ('','','');
-- INSERT INTO `events/users` (`id`,`event`,`user`) VALUES
-- ('','','');



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
