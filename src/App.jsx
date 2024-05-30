import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import AppRouter from './routes/AppRouter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='flex flex-col min-h-screen'>

        <Navbar />
        <main className='w-full mx-auto flex-1 my-6 max-w-screen-xl px-2.5 bg-gray-50 shadow-xl rounded-lg'>
          <AppRouter />

        </main>
      </div>
    </>
  )
}

export default App
