import React, { useState } from "react";

const ToDoListApp = () => {
    // set state variables
    const [ toDo, setToDo ] = useState('');
    const [ completed, setCompleted ] = useState(false);

    // create sate variable array of todo list items
    const [ toDoList, setToDoList ] = useState([]);

    // submit handler
    const submitToDo = (e) => {
        // prevents page from reloading
        e.preventDefault();
        // create todo
        let todo = { toDo, completed };
        // add todo item to list of todo items
        setToDoList([...toDoList, todo]);
        // clear out state variable for todo
        setToDo('');
    }

    // toggles completed on or off
    const toggleCompeleted = (e, idx)=>{
        // creates a copy of toDoList
        let [...copyList] = toDoList;
        // changes value of completed to the current state of the checkbox but only at index of item being checked
        copyList[idx].completed = e.target.checked;
        // sets the array of todo list objects to the updated copy
        setToDoList(copyList);
    }

    // deletes todo item
    const deleteToDo = (e, idx)=>{
        // makes a copy of todolist, returning all todo objects exceot for the one being deleted
        let filteredCopy = toDoList.filter( (toDo, i)=>{
            return i != idx
        })
        // sets the todolist to the updated filtered copy
        setToDoList(filteredCopy);
    }

    return(
        <>
        <form onSubmit={ submitToDo }>
            <label htmlFor="">To Do Item: </label>
            <input type="text" value={ toDo } onChange={ (e)=>{setToDo(e.target.value)} } />
            <input type="submit" value="Add To Do" />
        </form>
        <hr />
        <div className="todo-display">
            {
                toDoList.map((toDoObj, idx) => {
                    return(
                        <div className="todo-box">
                            <p style={{ textDecoration: toDoObj.completed ? "line-through" : "none" }}>{toDoObj.toDo}</p>
                            <label htmlFor="completed">Completed</label>
                            <input type="checkbox" name="completed" onChange={ (e)=>toggleCompeleted(e, idx) } />
                            <br />
                            <button onClick={ (e)=>deleteToDo(e, idx) }>Delete</button>
                        </div>
                    )
                })
            }
        </div>
        </>
    )
}
export default ToDoListApp;