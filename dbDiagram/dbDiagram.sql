CREATE TABLE `users`
(
  `id` int PRIMARY KEY,
  `user_name` int UNIQUE NOT NULL,
  `password` varchar(255) UNIQUE NOT NULL,
  `email` varchar(255)
);

CREATE TABLE `books`
(
  `id` int,
  `title` varchar(255),
  `author` varchar(255),
  `rating` int,
  `sypnosis` varchar(255)
);

CREATE TABLE `reviews`
(
  `id` int,
  `user_id` varchar(255),
  `book_id` int,
  `reviews` varchar(255)
);

ALTER TABLE `reviews` ADD FOREIGN KEY (`id`) REFERENCES `users` (`id`);

ALTER TABLE `books` ADD FOREIGN KEY (`id`) REFERENCES `users` (`id`);
