drop table if exists tidy_group;
drop table if exists users;
drop table if exists task;
drop table if exists task_list;

create table tidy_group (
	id serial primary key,
	group_name varchar(60) not null,
	date_of_creation date not null
)

create table users (
	id serial primary key,
	name varchar(60) not null,
	email varchar(120) not null,
	roomie_admin varchar(30) not null,
	group_id int references tidy_group(id)
)

create table task (
	id serial primary key,
	name varchar(60) not null,
	task_completed boolean not null,
	description varchar(500),
	starting_date date not null,
	frequency varchar(60) not null,
	user_id int references users(id)
)

create table task_list (
	id serial primary key,
	task_id int references task(id)
)