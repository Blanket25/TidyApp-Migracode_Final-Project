DROP DATABASE IF EXISTS tidy_App;

CREATE DATABASE tidy_App;

create table tidy_group (
	id serial primary key,
	group_name varchar(60) not null,
	date_of_creation date not null
);

CREATE TYPE type AS ENUM ('roomie', 'admin');

create table users (
	id serial primary key,
	username varchar(60) not null,
	email varchar(120) not null,
	type_of_user type not null,
	group_id int references tidy_group(id)
);

CREATE TYPE frequency AS ENUM ('weekly', 'biweekly', 'monthly');

create table task (
	id serial primary key,
	name varchar(60) not null,
	task_completed boolean not null,
	description varchar(500),
	starting_date date not null,
	frequency frequency not null,
	user_id int references users(id)
);

create table task_list (
	id serial primary key,
	task_id int references task(id)
);

create table tasks (
	task_id int references task(id),
	task_list_id int references task_list(id)
);