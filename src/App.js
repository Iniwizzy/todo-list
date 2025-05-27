import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State untuk menyimpan daftar todo
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // State untuk input todo baru
  const [input, setInput] = useState('');

  // State untuk tema (dark/light)
  const [theme, setTheme] = useState(() => {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme ? savedTheme : 'light';
  });

  // Efek untuk menyimpan todos ke local storage setiap kali berubah
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Efek untuk menyimpan tema & menerapkan ke body
  useEffect(() => {
      localStorage.setItem('theme', theme);
      document.body.className = theme; // Terapkan kelas tema ke body
  }, [theme]);


  // Fungsi untuk menambah todo
  const addTodo = (e) => {
    e.preventDefault(); // Mencegah refresh halaman
    if (!input.trim()) return; // Jangan tambah jika input kosong

    setTodos([
      ...todos,
      { id: Date.now(), text: input, completed: false },
    ]);
    setInput(''); // Kosongkan input setelah ditambah
  };

  // Fungsi untuk toggle status completed
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Fungsi untuk menghapus todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Fungsi untuk toggle tema
  const toggleTheme = () => {
      setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <div className={`app-container ${theme}`}>
      <div className="header">
        <h1>✨ My React Todo List ✨</h1>
        <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>

      <form onSubmit={addTodo} className="add-todo-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What needs to be done?"
        />
        <button type="submit">Add Todo</button>
      </form>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
          >
            <span onClick={() => toggleComplete(todo.id)}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
              🗑️
            </button>
          </li>
        ))}
         {todos.length === 0 && <p className="empty-message">Your list is empty. Add something! 🎉</p>}
      </ul>

      <footer className="footer">
          <p>You have {todos.filter(t => !t.completed).length} tasks left.</p>
      </footer>
    </div>
  );
}

export default App;