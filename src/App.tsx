import './styles/App.css';
import List from './pages/List';
import Article from './pages/Article';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/UI/Navbar/Navbar';
import ErrorPage from './pages/ErrorPage';
import Add from './pages/Add';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navbar/>}>
        <Route index element={<List/>}/>
        <Route path='article' element={<Article/>}/>        
        <Route path='add' element={<Add/>}/>        
        <Route path='*' element={<ErrorPage/>}/>        
      </Route>
    </Routes>
  );
};

export default App;
