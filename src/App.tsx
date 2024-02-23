import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Signup, Login } from './components';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}