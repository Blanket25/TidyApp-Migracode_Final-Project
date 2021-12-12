const secrets = require("./secrets.json");
const { Pool } = require("pg");
const connection = new Pool(secrets);

const api = () => {
  const getUsers = async (req, res) => {
    try {
      const query = "select * from users";
      const result = await connection.query(query);
      return res.status(200).send(result.rows);
    } catch (err) {
      console.log(err);
    }
  };

  const addUser = async (req, res) => {
    const newUserName = req.body.username;
    const newUserEmail = req.body.email;
    const newUserType = req.body.type_of_user;
    const newUserGroupId = req.body.group_id;

    const userQuery = "SELECT * FROM users WHERE username=$1";
    const result = await connection.query(userQuery, [newUserName]);
    if (result.rows.length > 0) {
      return res.status(400).send("A user with the same name already exists!");
    } else {
      const query =
        "INSERT INTO users (username, email, type_of_user, group_id) VALUES ($1, $2, $3, $4)";
      const result = await connection.query(query, [
        newUserName,
        newUserEmail,
        newUserType,
        newUserGroupId,
      ]);
      return res.status(201).send("User created!").json(result.rows);
    }
  };

  const deleteUser = async (req, res) => {
      const userId = req.params.userId;
      const queryUser = "delete from users where id=$1"
        const result = await connection.query(queryUser, [userId]);
        return res.status(200).send("user deleted").json(result.rows);
  }

  
  const getAllTask = async (req, res) => {
    const query = `
        select
            tl.task_id,
            u.username,
            tg.group_name,
            t.name as task_name,
            t.description,
            t.starting_date,
            t.task_completed
        from task_list tl 
        inner join task t on tl.task_id=t.id
        inner join users u on u.id=t.user_id
        inner join tidy_group tg on tg.id=u.group_id`;

    const taskList = await connection.query(query);
    return await res.status(200).json(taskList.rows);
  };

  const addNewTask = async (req, res) => {
    // require all the elements into the body
    const newTask = req.body;

    // checking if teh task already exists
    const itExists = await connection.query('select * from task where name=$1', [newTask.name])
    if (itExists.rows.length > 0) {
      return res.status(400).send('The task already exists try updating the task instead of creat a new one!')
    } else { 
      // if not create the task
      const createTask = `insert into task (name, task_completed, description, starting_date, frequency, user_id) 
      values ($1, $2, $3, $4, $5, $6) returning id`
      const newTaskRow = await connection.query(createTask,
      [
        newTask.name,
        newTask.task_completed,
        newTask.description,
        newTask.starting_date,
        newTask.frequency,
        newTask.user_id
      ])
      // answering wuth the task id
      await res.status(200).json({taskId : newTaskRow.rows[0].id});
    }
  }

  const deleteTask = async (req, res) => {
    const taskId = req.params.taskId;
    const query = `delete from task where id=$1`;
    const result = await connection.query(query, [taskId])
    return await res.status(200).json({message: 'The Task have been deleted!'})
  }

  const updateTask = async (req, res) => {
   console.log('qqq')
    try {
      const taskId = req.params.taskId;
      const task = req.body;
      const query = "UPDATE task SET name=$1, task_completed=$2, description=$3, starting_date=$4, frequency=$5, user_id=$6 WHERE id=$7;";
      const result = await connection.query(query, [
        task.name, 
        task.task_completed, 
        task.description, 
        task.starting_date,
        task.frequency,
        task.user_id,
        taskId]);  
      return res.status(200).send("Task updated").json(result.rows);
    }
    catch (e){
        return res.status(500).send("Error");
    }
  }

  return {
    getUsers,
    addUser,
    deleteUser,
    getAllTask,
    addNewTask,
    deleteTask,
    updateTask
  };
};

module.exports = api;
