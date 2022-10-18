import './styles/App.css';
import ArticleTable from './components/ArticleTable';
import Navbar from './components/UI/Navbar/Navbar';
import ArticleList from './components/ArticleList';
import List from './pages/List';
import Article from './pages/Article';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<List/>} />
      <Route path='/article' element={<Article/>} />
    </Routes>
  );
};

export default App;
