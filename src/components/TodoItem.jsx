import React from 'react';
import '../styles/TodoItem.css';

function TodoItem({ todo, deleteTodo, toggleComplete }) {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <span 
        className={`todo-text ${todo.completed ? 'completed' : ''}`} 
        onClick={() => toggleComplete(todo.id)}
      >
        {todo.text}
      </span>
      <button onClick={() => deleteTodo(todo.id)}>
        Supprimer
      </button>
    </div>
  );
}

export default TodoItem;
