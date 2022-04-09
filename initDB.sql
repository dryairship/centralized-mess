CREATE DATABASE IF NOT EXISTS centralized_mess;
USE centralized_mess;

/* Create a DB user (Username/Password for demonstration only) */
CREATE USER IF NOT EXISTS 'soppos'@'localhost' IDENTIFIED BY 'possop';
GRANT ALL ON centralized_mess.* TO 'soppos'@'localhost';

/* Create all tables */

CREATE TABLE IF NOT EXISTS students (
    roll_number     VARCHAR(10)     NOT NULL    UNIQUE,
    name            VARCHAR(50)     NOT NULL,
    phone_number    VARCHAR(15)     NOT NULL    UNIQUE,
    address         VARCHAR(100)    NOT NULL,
    email           VARCHAR(30)     NOT NULL    UNIQUE,
    password        VARCHAR(200),
    PRIMARY KEY (roll_number)
);

CREATE TABLE IF NOT EXISTS messes (
    mess_id     INT         NOT NULL    AUTO_INCREMENT  UNIQUE,
    name        VARCHAR(20) NOT NULL                    UNIQUE,
    PRIMARY KEY (mess_id)
);

CREATE TABLE IF NOT EXISTS managers (
    pf_number       VARCHAR(10) NOT NULL    UNIQUE,
    name            VARCHAR(50) NOT NULL,
    phone_number    VARCHAR(15) NOT NULL    UNIQUE,
    mess_id         INT         NOT NULL,
    email           VARCHAR(30) NOT NULL    UNIQUE,
    password        VARCHAR(200),
    PRIMARY KEY (pf_number),
    FOREIGN KEY (mess_id) REFERENCES messes(mess_id)
);

CREATE TABLE IF NOT EXISTS menus (
    menu_id     INT             NOT NULL    AUTO_INCREMENT  UNIQUE,
    menu_name   VARCHAR(50)     NOT NULL,
    mess_id     INT             NOT NULL,
    menu_time   ENUM('Breakfast', 'Lunch', 'Dinner')    NOT NULL,
    contents    VARCHAR(500)    NOT NULL,
    deleted     BOOLEAN         NOT NULL    DEFAULT false,
    PRIMARY KEY (mess_id, menu_id),
    FOREIGN KEY (mess_id) REFERENCES messes(mess_id)
);

CREATE TABLE IF NOT EXISTS extra_items (
    item_id         INT         NOT NULL    AUTO_INCREMENT  UNIQUE,
    item_name       VARCHAR(50) NOT NULL,
    mess_id         INT         NOT NULL,
    cost_per_item   REAL        NOT NULL,
    deleted         BOOLEAN     NOT NULL    DEFAULT false,
    PRIMARY KEY (mess_id, item_id),
    FOREIGN KEY (mess_id) REFERENCES messes(mess_id)
);

CREATE TABLE IF NOT EXISTS extras_in_menu (
    menu_id INT NOT NULL,
    item_id INT NOT NULL,
    PRIMARY KEY (menu_id, item_id),
    FOREIGN KEY (menu_id) REFERENCES menus(menu_id),
    FOREIGN KEY (item_id) REFERENCES extra_items(item_id)
);

CREATE TABLE IF NOT EXISTS meals (
    meal_date   DATE        NOT NULL,
    mess_id     INT         NOT NULL,
    menu_id     INT         NOT NULL,
    meal_time   ENUM('Breakfast', 'Lunch', 'Dinner')    NOT NULL,
    total_cost  REAL,
    PRIMARY KEY (mess_id, meal_date, meal_time),
    FOREIGN KEY (mess_id) REFERENCES messes(mess_id),
    FOREIGN KEY (menu_id) REFERENCES menus(menu_id)
);

CREATE TABLE IF NOT EXISTS basic_menu_bills (
    time_id     BIGINT      NOT NULL    UNIQUE,
    roll_number VARCHAR(10) NOT NULL,
    mess_id     INT         NOT NULL,
    meal_date   DATE        NOT NULL,
    meal_time   ENUM('Breakfast', 'Lunch', 'Dinner')    NOT NULL,
    cost        REAL,
    PRIMARY KEY (time_id),
    UNIQUE (roll_number, mess_id, meal_date, meal_time),
    FOREIGN KEY (roll_number) REFERENCES students(roll_number),
    FOREIGN KEY (mess_id) REFERENCES messes(mess_id)
);

CREATE TABLE IF NOT EXISTS extra_items_bills (
    time_id     BIGINT      NOT NULL    UNIQUE,
    roll_number VARCHAR(10) NOT NULL,
    mess_id     INT         NOT NULL,
    meal_date   DATE        NOT NULL,
    meal_time   ENUM('Breakfast', 'Lunch', 'Dinner')    NOT NULL,
    item_id     INT         NOT NULL,
    quantity    INT         NOT NULL,
    claimed     BOOLEAN     NOT NULL    DEFAULT false,
    cost        REAL,
    PRIMARY KEY (time_id),
    FOREIGN KEY (roll_number) REFERENCES students(roll_number),
    FOREIGN KEY (mess_id) REFERENCES messes(mess_id),
    FOREIGN KEY (item_id) REFERENCES extra_items(item_id)
);
