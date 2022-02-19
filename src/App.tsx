// React router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CategoriesPage from './pages/categories';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/categories' element={<CategoriesPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
