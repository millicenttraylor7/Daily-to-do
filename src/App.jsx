
import './App.css'
  {/*extract from App.jsx*/}
function App() {
const todos = [
    {id: 1, title: "review resources"},
    {id: 2, title: "take notes"},
    {id: 3, title: "code out app"},
]
/*code continues...*/
  return (
    <div>
        <h1>My Todos</h1>
        <ul>
            {todos.map(todo => <li key={todo.id}>{todo.title}</li>)}
        </ul>
    </div>
  );
/*code continues...*/
}

export default App
