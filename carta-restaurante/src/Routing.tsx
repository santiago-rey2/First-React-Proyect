import { Route, Routes } from 'react-router-dom'
import { Admin, Home,MenuPage, WinesPage } from './Pages'

const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/wines" element={<WinesPage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  )
}

export default Routing
