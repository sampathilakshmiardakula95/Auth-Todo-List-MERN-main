const Todo = require("../Model/todoSchema");
const auth = require("../middleware/auth");
const { default: mongoose, Mongoose } = require("mongoose");

exports.home =  (req, res) =>{
    res.status(200).send("Welcome you all");
}

exports.createTodo = async  (req, res) => {
    try {
        const userID = req.user.id;
        if (!userID)  return res.status(401).send("User Not found!");       
        const {Title} = req.body;
        if (!Title) {
            alert("Please type the title!");
        }
        const todo = await Todo.create({
            Title,
            userID
        });
        res.status(200).json({
            success : true,
            message: "Todo Created",
            todo
        })
    } catch (error) {
        res.send("Error in todo creation")
    }
}

exports.getAllTodos= async (req, res) => {

    try {

        const uID = req.user.id;
        const todos = await Todo.find({userID : uID});
        res.status(200).json({
            success : true,
            todos
        })

    } catch (error) {
        res.status(401).json({
            success : false,
            message : "Failed to get all todos!"
        });
    }
}


exports.getATodo = async (req, res) =>{
    try {
        const uID = req.user.id;
        const uniqueUser = await Todo.find({userID : uID});
        if ( uniqueUser) {
        const todoID = await Todo.findById(req.params._id); 
         return res.status(200).json({
            success : true,
            todoID
        })
    }
    } catch (error) {
        res.status(401).json({
            success : false,
            message : "Failed to get a todo!"
        });
    }
}

exports.editTodoTitle = async (req, res) => {
    try {
        const uID = req.user.id;
        const uniqueUser = await Todo.find({userID : uID});
        if (uniqueUser) {
        const editedTodo = await Todo.findByIdAndUpdate(req.params._id, req.body);
           const savedTodo =  await editedTodo.save();
           console.log(savedTodo)
       return res.status(201).json({
            success : true,
            message :"Todo edited!",
        })}
    } catch (error) {
        res.status(401).json({
            success : false,
            message : "Failed to edit a todo!"
        });
    }
   
}
 
exports.deleteTodo= async (req, res) => {
    try {
        const uID = req.user.id;
        const uniqueUser = await Todo.find({userID : uID});
        if (uniqueUser) {
        const deletedTodo = await Todo.findByIdAndDelete(req.params._id);
      return res.status(201).json({
            success : true,
            message :"Todo deleted!"
        })}
    } catch (error) {
        res.status(401).json({
            success : false,
            message : "Failed to delete a todo!"
        });
    }
}

exports.tasksForATodo = async (req, res) =>{
    try {
        const uID = req.user.id;
        const uniqueUser = await Todo.find({userID : uID});
        if (uniqueUser) {
        const todo = await Todo.findById(req.params._id);
        if (!todo) {
            return res.status(401).send("Todo doesn't exist!");}
            const taskToBeAdded = req.body.Tasks; 
            todo.Tasks.push(taskToBeAdded);
            await todo.save();
           return  res.status(201).json({
                success : true,
                message : "Task added in your todo!",
                todo 
            })}
    } catch (error) {
        res.status(401).json({
            success : false,
            message : "Failed to add a task!"
        })
    }
    
}

exports.getAllTasksForATodo = async (req, res) =>{
    try {
        const uID = req.user.id;
        const uniqueUser = await Todo.find({userID : uID});
        if (uniqueUser) {
        const todo = await Todo.findById(req.params._id);
if (!todo) { res.status(401).send("Todo doesn't exisit");
}
        const tasks = todo.Tasks;

   return  res.status(201).json({
        success  : true,
        tasks,
        todo
    })}
    } catch (error) {
        res.status(401).json({
            success : false,
            message : "Failed to show all tasks!"
        })
    }
}

exports.editTaskForATodo = async (req, res) => {
    try {
        const uID = req.user.id;
        const uniqueUser = await Todo.find({userID : uID});
        if (uniqueUser) {
        const targetTodo = await Todo.findById(req.params._id);
        if (!targetTodo) {
            return res.status(401).send("Required todo doesn't exist");
        }
        const {taskIndex,newTaskText} = req.body;
        targetTodo.Tasks.splice(taskIndex,1,newTaskText);
        await targetTodo.save();
        return res.status(200).json({
            success : true,
            message : "Task edited!",
            targetTodo
        })}
    } catch (error) {
        res.status(401).json({
            success : false,
            message : "Failed to edit task for required todo!"
        })
    }
}

exports.deleteTaskForATodo = async (req, res) => {
    try {
        const uID = req.user.id;
        const uniqueUser = await Todo.find({userID : uID});
        if (uniqueUser) {
        const targetTodo = await Todo.findById(req.params._id);
    if (!targetTodo) {
        return res.status(401).send("Required todo doesn't exist");
    }
    const {taskToBeDeleted} = req.body;
    targetTodo.Tasks.splice(taskToBeDeleted,1); 
    await targetTodo.save();
    return res.status(200).json({
        success :true,
        message :"Task got deleted",
        targetTodo
    })}

    } catch (error) {
        res.status(401).json({
            success : false,
            message : "Failed to delete!"
        })
    }
}

exports.toSearch = async (req, res) =>{
    try {
        const uID = req.user.id;
        const uniqueUser = await Todo.find({userID : uID});
        if (uniqueUser) {
        const {search} = req.query;
        if (!search) {
          return  res.status(400).send("Please enter text to search!")
        }
        const searchedTodos = await Todo.find(  {  $and :[ {userID : uID},{$or : [{"Title": {$regex: search, $options:'i'}},{"Tasks": {$regex: search, $options:'i'}}]}]})
                if (searchedTodos.length>0) {
                  return  res.status(200).json({
                        success :true,
                        searchedTodos
                    })
                } else {
                  return  res.status(200).json({
                        success :false,
                        message : "No such todo or task exist!"
                    })
                }
       }

    } catch (error) {
        res.status(401).json({
            success : false,
            message : "Failed to search"
        })
    }
}


exports.sortDateAndTime = async (req, res) =>{
    const uID = req.user.id;
    const uniqueUser = await Todo.find({userID : uID});
    if (uniqueUser) {
    const sortedTodosAtCreation = await Todo.find({userID : uID}).sort({createdAt: -1});
    const sortedTodosAtUpdation = await Todo.find({userID : uID}).sort({updatedAt: -1});
    res.status(200).json({
        sortedTodosAtCreation,
        sortedTodosAtUpdation
    })}
}