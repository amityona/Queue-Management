import './index.css'
import Header from './components/Header'
import MainContent from './components/MainContent'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <Header />
      <MainContent />
    </div>
  )
}

export default App
