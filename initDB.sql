CREATE DATABASE IF NOT EXISTS centralized_mess;
USE centralized_mess;

/* Create a DB user (Username/Password for demonstration only) */
CREATE USER IF NOT EXISTS 'soppos'@'localhost' IDENTIFIED BY 'possop';
GRANT ALL ON centralized_mess.* TO 'soppos'@'localhost';

/* Required for multi-statement begin-end blocks */
DELIMITER //

/* Create all tables */

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'students') THEN
    BEGIN
        CREATE TABLE students (
            roll_number     VARCHAR(10)     NOT NULL    UNIQUE,
            name            VARCHAR(50)     NOT NULL,
            phone_number    VARCHAR(15)     NOT NULL    UNIQUE,
            address         VARCHAR(100)    NOT NULL,
            email           VARCHAR(30)     NOT NULL    UNIQUE,
            PRIMARY KEY (roll_number)
        );
        INSERT INTO students 
            (roll_number, name, phone_number, address, email)
        VALUES
            ('180561', 'Priydarshi Singh', '7318301507', 'E-101 / Hall 9', 'darshi@iitk.ac.in'),
            ('180682', 'Saumya Singh', '6392210249', 'D-516 / Hall 6', 'saumyas@iitk.ac.in');
    END;
END IF //

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'messes') THEN
    BEGIN
        CREATE TABLE messes (
            mess_id     INT         NOT NULL    AUTO_INCREMENT  UNIQUE,
            name        VARCHAR(20) NOT NULL                    UNIQUE,
            PRIMARY KEY (mess_id)
        );
        INSERT INTO messes 
            (mess_id, name)
        VALUES
            (9, 'Hall 9 Mess'),
            (6, 'Hall 6 Mess');
    END;
END IF //

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'managers') THEN
    BEGIN
        CREATE TABLE managers (
            pf_number       VARCHAR(10) NOT NULL    UNIQUE,
            name            VARCHAR(50) NOT NULL,
            phone_number    VARCHAR(15) NOT NULL    UNIQUE,
            mess_id         INT         NOT NULL,
            email           VARCHAR(30) NOT NULL    UNIQUE,
            PRIMARY KEY (pf_number),
            FOREIGN KEY (mess_id) REFERENCES messes(mess_id)
        );
        INSERT INTO managers 
            (pf_number, name, phone_number, mess_id, email)
        VALUES
            ('MM0009', 'Batman', '9000000009', 9, 'batman@iitk.ac.in'),
            ('MM0006', 'Captain Marvel', '9000000006', 6, 'cptmarvel@iitk.ac.in');
    END;
END IF //

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'menus') THEN
    BEGIN
        CREATE TABLE menus (
            menu_id     INT             NOT NULL    AUTO_INCREMENT,
            menu_name   VARCHAR(50)     NOT NULL,
            mess_id     INT             NOT NULL,
            menu_time   ENUM('Breakfast', 'Lunch', 'Dinner')    NOT NULL,
            contents    VARCHAR(500)    NOT NULL,
            PRIMARY KEY (mess_id, menu_id),
            FOREIGN KEY (mess_id) REFERENCES messes(mess_id)
        );
        INSERT INTO menus 
            (menu_id, menu_name, menu_time, mess_id, menu_time, contents)
        VALUES
            (1, 'Breakfast (Friday) March Menu', 9, 'Breakfast', 'Aloo & Gobhi Paratha, Dahi, Chutney, Milk/Egg, Bread, Jam/Peanut Butter'),
            (2, 'Breakfast (Saturday) March Menu', 9, 'Breakfast', 'Dosa, Milk/Egg, Bread, Jam/Peanut Butter');
    END;
END IF //

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'extra_items') THEN
    BEGIN
        CREATE TABLE extra_items (
            item_id         INT         NOT NULL    AUTO_INCREMENT  UNIQUE,
            item_name       VARCHAR(50) NOT NULL,
            mess_id         INT         NOT NULL,
            cost_per_item   REAL        NOT NULL,
            PRIMARY KEY (mess_id, item_id),
            FOREIGN KEY (mess_id) REFERENCES messes(mess_id)
        );
        INSERT INTO extra_items 
            (item_id, item_name, mess_id, cost_per_item)
        VALUES
            (1, 'Boiled Egg', 9, 8),
            (2, 'Omelette', 9, 9),
            (3, 'Rasgulla', 9, 15);
    END;
END IF //

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'extras_in_menu') THEN
    BEGIN
        CREATE TABLE extras_in_menu (
            menu_id INT NOT NULL,
            item_id INT NOT NULL,
            PRIMARY KEY (menu_id, item_id),
            FOREIGN KEY (menu_id) REFERENCES menus(menu_id),
            FOREIGN KEY (item_id) REFERENCES extra_items(item_id)
        );
        INSERT INTO extras_in_menu 
            (menu_id, item_id)
        VALUES
            (1, 1),
            (1, 2),
            (2, 1),
            (2, 2),
            (2, 3);
    END;
END IF //

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'meals') THEN
    BEGIN
        CREATE TABLE meals (
            meal_date   DATE        NOT NULL,
            mess_id     INT         NOT NULL,
            menu_id     INT         NOT NULL,
            meal_time   ENUM('Breakfast', 'Lunch', 'Dinner')    NOT NULL,
            total_cost  REAL,
            PRIMARY KEY (mess_id, meal_date, meal_time),
            FOREIGN KEY (mess_id) REFERENCES messes(mess_id),
            FOREIGN KEY (menu_id) REFERENCES menus(menu_id)
        );
    END;
END IF //

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'basic_menu_bills') THEN
    BEGIN
        CREATE TABLE basic_menu_bills (
            bill_id     INT         NOT NULL    AUTO_INCREMENT  UNIQUE,
            roll_number VARCHAR(10) NOT NULL,
            mess_id     INT         NOT NULL,
            meal_date   DATE        NOT NULL,
            meal_time   ENUM('Breakfast', 'Lunch', 'Dinner')    NOT NULL,
            cost        REAL,
            PRIMARY KEY (bill_id),
            UNIQUE (roll_number, mess_id, meal_date, meal_time),
            FOREIGN KEY (roll_number) REFERENCES students(roll_number),
            FOREIGN KEY (mess_id) REFERENCES messes(mess_id)
        );
    END;
END IF //

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'extra_items_bills') THEN
    BEGIN
        CREATE TABLE extra_items_bills (
            bill_id     INT         NOT NULL    AUTO_INCREMENT  UNIQUE,
            roll_number VARCHAR(10) NOT NULL,
            mess_id     INT         NOT NULL,
            meal_date   DATE        NOT NULL,
            meal_time   ENUM('Breakfast', 'Lunch', 'Dinner')    NOT NULL,
            item_id     INT         NOT NULL,
            quantity    INT         NOT NULL,
            claimed     BOOLEAN     NOT NULL    DEFAULT false,
            cost        REAL,
            PRIMARY KEY (bill_id),
            FOREIGN KEY (roll_number) REFERENCES students(roll_number),
            FOREIGN KEY (mess_id) REFERENCES messes(mess_id),
            FOREIGN KEY (item_id) REFERENCES extra_items(item_id)
        );
    END;
END IF //

/* Setting delimiter back to semi-colon */
DELIMITER ;
