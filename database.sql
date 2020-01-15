
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- Database is named Outdoor_Planner

CREATE TABLE "user"
(
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

INSERT INTO "user"
    ("first_name", "last_name", "username", "password")
VALUES
    ("Travis", "Johnston", "TookieJay622", "TravDaSav62");

CREATE TABLE "routes"
(
    "id" SERIAL PRIMARY KEY,
    "route_name" VARCHAR (100) NOT NULL,
    "user_id" INT
);

CREATE TABLE "route_points"
(
    "id" SERIAL PRIMARY KEY,
    "longitude" INT,
    "latitude" INT,
    "comments_id" INT,
    "route_id" INT,
);

CREATE TABLE "comments"
(
    "id" SERIAL PRIMARY KEY,
    "comments" VARCHAR
);


