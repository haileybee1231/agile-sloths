
-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Races'
-- 
-- ---

DROP TABLE IF EXISTS `Races`;
		
CREATE TABLE `Races` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `Date` DATE NULL DEFAULT NULL,
  `Location` VARCHAR NULL DEFAULT NULL,
  `office` VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Users'
-- 
-- ---

DROP TABLE IF EXISTS `Users`;
		
CREATE TABLE `Users` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `email` VARCHAR NULL DEFAULT NULL,
  `passwor` VARCHAR NULL DEFAULT NULL,
  `bio` VARCHAR NULL DEFAULT NULL,
  `role` VARCHAR NULL DEFAULT NULL,
  `race` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Events'
-- 
-- ---

DROP TABLE IF EXISTS `Events`;
		
CREATE TABLE `Events` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `title` VARCHAR NULL DEFAULT NULL,
  `location` VARCHAR NULL DEFAULT NULL,
  `time` DATETIME NULL DEFAULT NULL,
  `description` VARCHAR NULL DEFAULT NULL,
  `host` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'voter/candidate'
-- 
-- ---

DROP TABLE IF EXISTS `voter/candidate`;
		
CREATE TABLE `voter/candidate` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `voter` INTEGER NULL DEFAULT NULL,
  `candidate` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'events/users'
-- 
-- ---

DROP TABLE IF EXISTS `events/users`;
		
CREATE TABLE `events/users` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `event` INTEGER NULL DEFAULT NULL,
  `user` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `Users` ADD FOREIGN KEY (race) REFERENCES `Races` (`id`);
ALTER TABLE `Events` ADD FOREIGN KEY (host) REFERENCES `Users` (`id`);
ALTER TABLE `voter/candidate` ADD FOREIGN KEY (voter) REFERENCES `Users` (`id`);
ALTER TABLE `voter/candidate` ADD FOREIGN KEY (candidate) REFERENCES `Users` (`id`);
ALTER TABLE `events/users` ADD FOREIGN KEY (event) REFERENCES `Events` (`id`);
ALTER TABLE `events/users` ADD FOREIGN KEY (user) REFERENCES `Users` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Races` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Events` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `voter/candidate` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `events/users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

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
