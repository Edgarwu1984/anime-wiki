// React router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CategoriesPage from './pages/categories';
import AnimePage from './pages/categories/AnimePage';
import ResultsPage from './pages/categories/ResultsPage';
import HomePage from './pages/home';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<SignUpPage />} />
          <Route path='/categories' element={<CategoriesPage />} />
          <Route path='/categories/results' element={<ResultsPage />} />
          <Route path='/categories/:id' element={<AnimePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
