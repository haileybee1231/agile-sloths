DROP DATABASE IF EXISTS grassroots;

CREATE DATABASE grassroots;

USE grassroots;
-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- Table 'Races'

DROP TABLE IF EXISTS races;

CREATE TABLE races (
  `id` INTEGER AUTO_INCREMENT,
  `date` DATE NULL DEFAULT NULL,
  `location` VARCHAR(100) NULL DEFAULT NULL,
  `office` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- Table 'Users'

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  `id` INTEGER AUTO_INCREMENT,
  `email` VARCHAR(50) NOT NULL,
  `password` VARCHAR(250) NOT NULL,
  `firstname` VARCHAR (150) NOT NULL,
  `lastname` VARCHAR (150) NOT NULL,
  `bio` VARCHAR(500) NULL DEFAULT NULL,
  `role` VARCHAR(50) NULL DEFAULT NULL,
  `location` VARCHAR(100) NOT NULL,
  `race` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- Table 'Events'

DROP TABLE IF EXISTS events;

CREATE TABLE events (
  `id` INTEGER AUTO_INCREMENT,
  `title` VARCHAR(100) NULL DEFAULT NULL,
  `location` VARCHAR(100) NULL DEFAULT NULL,
  `time` DATETIME NULL DEFAULT NULL,
  `description` VARCHAR(500) NULL DEFAULT NULL,
  `host` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- Table 'voter/candidate'

DROP TABLE IF EXISTS votercandidate;

CREATE TABLE votercandidate (
  `id` INTEGER AUTO_INCREMENT,
  `voter` INTEGER NULL DEFAULT NULL,
  `candidate` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- Table 'events/users'

DROP TABLE IF EXISTS eventsusers;

CREATE TABLE eventsusers (
  `id` INTEGER AUTO_INCREMENT,
  `event` INTEGER NULL DEFAULT NULL,
  `user` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- Foreign Keys

ALTER TABLE users ADD FOREIGN KEY (race) REFERENCES races (`id`);
ALTER TABLE events ADD FOREIGN KEY (host) REFERENCES users (`id`);
ALTER TABLE votercandidate ADD FOREIGN KEY (voter) REFERENCES users (`id`);
ALTER TABLE votercandidate ADD FOREIGN KEY (candidate) REFERENCES users (`id`);
ALTER TABLE eventsusers ADD FOREIGN KEY (event) REFERENCES events (`id`);
ALTER TABLE eventsusers ADD FOREIGN KEY (user) REFERENCES events (`id`);

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
