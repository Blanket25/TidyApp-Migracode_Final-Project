const { Pool } = require('pg');
const secrest = require('./secrest.json');
const connection = new Pool(secrest);

const api = () => {
    const getAllTask = async (req, res) => {
        // query to get all the information about all the task 
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
        inner join tidy_group tg on tg.id=u.group_id`
    
        const taskList = await connection.query(query)
        return await res.json(taskList.rows);
    }

    return {
        getAllTask
    }
}

module.exports = api;