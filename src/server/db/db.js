const { Pool } = require('pg');
require('dotenv').config();
// Link to resources database on elephantSQL
const PG_URI = process.env.DB_PW;

const pool = new Pool({
  connectionString: PG_URI,
});

// TWO TABLES IN DATABASE:
// [PK] = Primary Key [FK] = Foreign Key
// RESOURCES TABLE: Lists data about each resource
////  Column names w/ data_type :

//(_id [PK] : auto-generated,
// name : string,
//  description : text,
//   url : string,
//   likes : int,
//    tech_id[FK] : int,
//    liked : boolean)

// TECHS TABLE: Lists each individual tech (i.e. react, redux, jest) and their unique id
////   Column names : (_id [PK] : auto-generated, tech : string [lowercase])

// INSERT RESOURCES

/*
CREATE TABLE resources (
	resources_id serial PRIMARY KEY,
	name VARCHAR (100) UNIQUE NOT NULL, 
	description VARCHAR NOT NULL,
	url VARCHAR UNIQUE NOT NULL,
	likes INT,
  tech_id INT, 
  FOREIGN KEY (tech_id) REFERENCES techs(techs_id)
);

CREATE TABLE techs (
  techs_id serial PRIMARY KEY,
  tech VARCHAR (50)
);

CREATE TABLE users (
  users_id serial PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  FOREIGN KEY (favorites) REFERENCES favorites(favorites_id)
);

// When adding tables that reference each other, you must omit 
// FOREIGN KEY line and add it after both tables are created

CREATE TABLE favorite_resources (
  favorite_resources_id serial PRIMARY KEY,
  users_id INT,
  resources_id INT,
  FOREIGN KEY (user_id) REFERENCES users(users_id),
  FOREIGN KEY (resource_id) REFERENCES resources(resources_id)
);

CREATE TABLE favorite_techs (
  favorite_techs_id serial PRIMARY KEY,
  users_id INT REFERENCES users(users_id),
  techs_id INT REFERENCES techs(techs_id),
)

CREATE TABLE upvotes (
  upvotes_id serial PRIMARY KEY,
  users_id INT,
  resources_id INT,
  FOREIGN KEY (users_id) REFERENCES users(users_id),
  FOREIGN KEY (resources_id) REFERENCES resources(resources_id)
);

CREATE TABLE downvotes (
  downvotes_id serial PRIMARY KEY,
  users_id INT REFERENCES users(users_id),
  resources_id INT REFERENCES resources(resources_id)
);

*/

// Query handler => allows you to query from the database.
// Connects all queries written in controller to our remote database in elephantSQL
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
