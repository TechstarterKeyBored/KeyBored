import './App.css'
import ReactPlayer from 'react-player'

function App() {
  return(
    <div className="App">
      <header className="bg-gray-800 text-white p-4">
        <h1>Test</h1>
        <ReactPlayer url="https://www.youtube.com/watch?v=l-iAS18rv68" />
      </header>
    </div>
  )
}

export default App;