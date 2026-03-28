import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './Pages/Auth/Auth'
import RegisterPage from './Pages/Register/register';
import PageLayout from './Pages/PageLayout/PageLayout';
import HomePage from './Pages/HomePage/HomePage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import { ValuesProvider } from './context/useValues';
import axios from 'axios';

function App() {

  axios.defaults.baseURL = ' http://localhost:3001';

  return (
    <BrowserRouter>
      <ValuesProvider>
        <Routes>
          <Route path='/' element={<Auth />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/page' element={<PageLayout />} >
            <Route index element={<HomePage />} />
            <Route path='profile/:id2' element={<ProfilePage />} />
          </Route>
        </Routes>
      </ValuesProvider>
    </BrowserRouter>
  )
}

export default App
