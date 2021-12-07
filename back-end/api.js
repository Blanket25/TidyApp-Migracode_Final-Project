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

  return {
    getUsers,
    addUser,
    deleteUser,
    getAllTask,
  };
};

module.exports = api;
