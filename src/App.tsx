import './styles/App.css';
import List from './pages/List';
import Article from './pages/Article';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/UI/Navbar/Navbar';
import ErrorPage from './pages/ErrorPage';
import Add from './pages/Add';
import Main from './pages/Main';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';

const App = () => { 

  return (
    <Routes>
      <Route path='/' element={<Navbar />}>
        <Route index element={<Main />}/>
        <Route path='articles' element={<List />}/>
        <Route path='article/:id' element={<Article />} key='article/:id'/>        
        <Route path='add' element={<Add />}/>
        <Route path='user' element={<UserPage />}/>               
        <Route path='admin' element={<AdminPage />}/>               
      </Route>
      <Route path='*' element={<ErrorPage />}/> 
    </Routes>
  );
};

export default App;
