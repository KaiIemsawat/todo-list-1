import React, { useState } from "react";
import style from "./Styles.module.css";

const Todo = () => {
    const [addNewTodo, setAddNewTodo] = useState("");
    const [todos, setTodos] = useState([]);

    const handleNewTodo = (e) => {
        e.preventDefault();

        const todoItem = {
            text: addNewTodo,
            isCompleted: false,
        };

        setTodos([...todos, todoItem]);
        setAddNewTodo("");
    };

    const handleDelete = (deleteIndex) => {
        const filteredTodos = todos.filter((_todo, index) => {
            // Use underscore '_' in front to tell JS that the variable will not be used
            return index !== deleteIndex;
        });

        setTodos(filteredTodos);
    };

    const handleToggleComplete = (i) => {
        const updateTodos = todos.map((eachTodo, index) => {
            if (i === index) {
                /* To work in a simple way // eachTodo will be mutated */
                // eachTodo.isCompleted = !eachTodo.isCompleted;

                /* To avoid mutating the todo directly */
                const updateTodo = {
                    ...eachTodo,
                    isCompleted: !eachTodo.isCompleted,
                };
                return updateTodo;
            }
            return eachTodo;
        });

        setTodos(updateTodos);
    };

    return (
        <div style={{ textAlign: "center" }} className={style.mainContainer}>
            <form
                onSubmit={(e) => {
                    handleNewTodo(e);
                }}>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Add Todo"
                        required="required"
                        onChange={(e) => setAddNewTodo(e.target.value)}
                        value={addNewTodo}
                    />
                    <div className="input-group-append">
                        <button className="input-group-text">Add</button>
                    </div>
                </div>
            </form>
            {todos.map((eachTodo, index) => {
                const todoDoneStyle = {
                    color: "grey",
                    textDecoration: "line-through",
                };
                return (
                    <div key={index} className={style.list}>
                        <input
                            type="checkbox"
                            checked={eachTodo.isCompleted}
                            onChange={(e) => {
                                handleToggleComplete(index);
                            }}
                        />
                        {eachTodo.isCompleted ? (
                            <span style={todoDoneStyle}>{eachTodo.text}</span>
                        ) : (
                            <span>{eachTodo.text}</span>
                        )}
                        {/* <span>{eachTodo.text}</span> */}
                        <button
                            style={{
                                border: "none",
                                padding: 0,
                                background: "none",
                            }}
                            onClick={(e) => handleDelete(index)}>
                            ❌
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default Todo;
