import './App.css'
import ReactPlayer from 'react-player'
import KaraokePlayer from './components/KaraokePlayer';

function App() {
  return(
    <div className="flex flex-col justify-center items-center">
        <ReactPlayer url="https://www.youtube.com/watch?v=XS088Opj9o0" volume={1} muted={true} playing={true} />
        <KaraokePlayer />
    </div>
  )
}

export default App;