import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import Toast from './components/Toast/Toast'

function App() {
  return (
    <>
     <Header />
     <Outlet />
    </>
  )
}

export default App
