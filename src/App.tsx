// React router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CategoriesPage from './pages/categories';
import AnimePage from './pages/categories/AnimePage';
import HomePage from './pages/home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/categories' element={<CategoriesPage />} />
          <Route path='/categories/:id' element={<AnimePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
