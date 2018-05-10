CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` datetime NOT NULL,
  `user_name` varchar(256) NOT NULL,
  `user_email` varchar(256) NOT NULL,
  `status` enum('processed','unprocessed','processing') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

insert into orders values (1, now(), 'Juan', 'jr@gmail.com', 'processed');
insert into orders values (2, now(), 'Dave', 'dr@gmail.com', 'unprocessed');
insert into orders values (3, now(), 'Mike', 'mk@gmail.com', 'unprocessed');
insert into orders values (4, now(), 'Caroline', 'cr@gmail.com', 'unprocessed');