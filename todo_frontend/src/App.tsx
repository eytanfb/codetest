import TodoList from './components/TodoList'

function App() {
  return (
    <div className="w-screen h-screen p-16 bg-background">
      <div className="flex items-center justify-center h-20 shadow-lg bg-header-background">
        <h1 className="text-3xl font-bold text-header-text">Just Do It</h1>
      </div>

      <div className="flex flex-col w-full p-4 h-96">
        <TodoList />
      </div>
    </div>
  )
}

export default App
