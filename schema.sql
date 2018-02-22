DROP DATABASE IF EXISTS grassroots;

CREATE DATABASE grassroots;

USE grassroots;


-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;


-- Table 'Races'

DROP TABLE IF EXISTS `Races`;
		
CREATE TABLE `Races` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `date` DATE NULL DEFAULT NULL,
  `location` VARCHAR(50) NULL DEFAULT NULL,
  `office` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);


-- Table 'Users'

DROP TABLE IF EXISTS `Users`;
		
CREATE TABLE `Users` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `email` VARCHAR(30) NULL DEFAULT NULL,
  `password` VARCHAR(30) NULL DEFAULT NULL,
  `role` BINARY NULL DEFAULT '0',
  `bio` VARCHAR(500) NULL DEFAULT NULL,
  `race` VARCHAR(30) NULL DEFAULT NULL,
  `city` VARCHAR(50) NULL DEFAULT NULL,
  `state` VARCHAR(30) NULL DEFAULT NULL,
  `district` VARCHAR(30) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- Table 'Events'

DROP TABLE IF EXISTS `Events`;
		
CREATE TABLE `Events` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `title` VARCHAR(100) NULL DEFAULT NULL,
  `location` VARCHAR(100) NULL DEFAULT NULL,
  `time` DATETIME NULL DEFAULT NULL,
  `description` VARCHAR(500) NULL DEFAULT NULL,
  `host` SMALLINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);


-- Table 'voter/candidate'

DROP TABLE IF EXISTS `voter/candidate`;
		
CREATE TABLE `voter/candidate` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `voter_id` SMALLINT NULL DEFAULT NULL,
  `candidate_id` SMALLINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);


-- Table 'events/users'

DROP TABLE IF EXISTS `events/users`;
		
CREATE TABLE `events/users` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `event_id` SMALLINT NULL DEFAULT NULL,
  `user_id` SMALLINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);


-- Foreign Keys 

ALTER TABLE `Users` ADD FOREIGN KEY (race) REFERENCES `Races` (`id`);
ALTER TABLE `Events` ADD FOREIGN KEY (host) REFERENCES `Users` (`id`);
ALTER TABLE `voter/candidate` ADD FOREIGN KEY (voter_id) REFERENCES `Users` (`id`);
ALTER TABLE `voter/candidate` ADD FOREIGN KEY (candidate_id) REFERENCES `Users` (`id`);
ALTER TABLE `events/users` ADD FOREIGN KEY (event_id) REFERENCES `Events` (`id`);
ALTER TABLE `events/users` ADD FOREIGN KEY (user_id) REFERENCES `Users` (`id`);


-- Table Properties

-- ALTER TABLE `Races` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Events` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `voter/candidate` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `events/users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


-- Test Data

-- INSERT INTO `Races` (`id`,`date`,`location`,`office`) VALUES
-- ('','','','');
-- INSERT INTO `Users` (`id`,`email`,`password`,`role`,`bio`,`race`,`city`,`state`,`district`) VALUES
-- ('','','','','','','','','');
-- INSERT INTO `Events` (`id`,`title`,`location`,`time`,`description`,`host`) VALUES
-- ('','','','','','');
-- INSERT INTO `voter/candidate` (`id`,`voter_id`,`candidate_id`) VALUES
-- ('','','');
-- INSERT INTO `events/users` (`id`,`event_id`,`user_id`) VALUES
-- ('','','');