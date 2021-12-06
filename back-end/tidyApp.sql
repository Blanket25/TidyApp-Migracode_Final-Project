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

insert into tidy_group (group_name, date_of_creation) values ('Casa Nostra', '20/09/20121');
insert into users (username, email, type_of_user, group_id) values ('Bianca', 'bianca@mail.com', 'admin', 1);
insert into users (username, email, type_of_user, group_id) values ('Aurora', 'aurora@mail.com', 'roomie', 1);
insert into users (username, email, type_of_user, group_id) values ('Francesca', 'france@mail.com', 'roomie', 1);
insert into task (name, task_completed, description, starting_date, frequency, user_id) values ('kitchen', false, 'includes laundry', '2021/06/12', 'weekly', 1);
insert into task (name, task_completed, description, starting_date, frequency, user_id) values ('bathroom', false, 'both bathrooms', '2021/06/12', 'weekly', 1);
insert into task (name, task_completed, starting_date, frequency, user_id) values ('floors', false, '2021/06/12', 'weekly', 1);
insert into task_list (task_id) values (1);