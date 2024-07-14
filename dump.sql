PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE users (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO users VALUES(1,'admin','$2a$08$Y4iwX1P2aGngvK46YzC3R.AR1b5OqpxI80.kEVNtDCbpC.eo5ntIa','admin@classic-mmo.game','2024-07-13 23:33:21');
CREATE TABLE characters (
  character_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  name TEXT NOT NULL,
  health INTEGER DEFAULT 100,
  mass REAL DEFAULT 70.0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);
INSERT INTO characters VALUES(1,1,'CharacterA',100,70.0,'2024-07-12 21:49:23');
INSERT INTO characters VALUES(2,1,'CharacterB',90,75.0,'2024-07-12 21:49:23');
CREATE TABLE armor (
  armor_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- e.g., helmet, chest, legs, etc.
  defense INTEGER NOT NULL,
  mass REAL NOT NULL
);
INSERT INTO armor VALUES(1,'Iron Helmet','head',10,5.0);
INSERT INTO armor VALUES(2,'Steel Chestplate','body',25,15.0);
CREATE TABLE items (
  item_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- e.g., weapon, potion, etc.
  effect TEXT NOT NULL, -- e.g., heal, damage, boost
  value INTEGER NOT NULL -- The effect value, e.g., +10 health, -5 damage
);
INSERT INTO items VALUES(1,'Health Potion','potion','heal',20);
INSERT INTO items VALUES(2,'Sword','weapon','damage',15);
CREATE TABLE character_armor (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  character_id INTEGER,
  armor_id INTEGER,
  slot TEXT NOT NULL, -- e.g., head, body, legs, etc.
  FOREIGN KEY (character_id) REFERENCES characters(character_id),
  FOREIGN KEY (armor_id) REFERENCES armor(armor_id)
);
INSERT INTO character_armor VALUES(1,1,1,'head');
INSERT INTO character_armor VALUES(2,2,2,'body');
CREATE TABLE character_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  character_id INTEGER,
  item_id INTEGER,
  quantity INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY (character_id) REFERENCES characters(character_id),
  FOREIGN KEY (item_id) REFERENCES items(item_id)
);
INSERT INTO character_items VALUES(1,1,1,2);
INSERT INTO character_items VALUES(2,2,2,1);
CREATE TABLE enemies (
  enemy_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  health INTEGER NOT NULL,
  mass REAL NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO enemies VALUES(1,'Goblin',50,30.0,'2024-07-12 21:49:23');
INSERT INTO enemies VALUES(2,'Orc',80,100.0,'2024-07-12 21:49:23');
CREATE TABLE enemy_armor (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  enemy_id INTEGER,
  armor_id INTEGER,
  slot TEXT NOT NULL, -- e.g., head, body, legs, etc.
  FOREIGN KEY (enemy_id) REFERENCES enemies(enemy_id),
  FOREIGN KEY (armor_id) REFERENCES armor(armor_id)
);
INSERT INTO enemy_armor VALUES(1,1,1,'head');
INSERT INTO enemy_armor VALUES(2,2,2,'body');
CREATE TABLE enemy_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  enemy_id INTEGER,
  item_id INTEGER,
  quantity INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY (enemy_id) REFERENCES enemies(enemy_id),
  FOREIGN KEY (item_id) REFERENCES items(item_id)
);
INSERT INTO enemy_items VALUES(1,1,2,1);
INSERT INTO enemy_items VALUES(2,2,1,3);
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('users',1);
INSERT INTO sqlite_sequence VALUES('characters',2);
INSERT INTO sqlite_sequence VALUES('armor',2);
INSERT INTO sqlite_sequence VALUES('items',2);
INSERT INTO sqlite_sequence VALUES('character_armor',2);
INSERT INTO sqlite_sequence VALUES('character_items',2);
INSERT INTO sqlite_sequence VALUES('enemies',2);
INSERT INTO sqlite_sequence VALUES('enemy_armor',2);
INSERT INTO sqlite_sequence VALUES('enemy_items',2);
COMMIT;
