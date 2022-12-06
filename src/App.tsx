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
import AddPhotos from './pages/AddPhotos';
import { AuthProvider, RequireAuth } from './context/context';

const App = () => { 

  return (
    <AuthProvider>
      <Routes>
      <Route path='/' element={<Navbar />}>
        <Route index element={<Main />}/>
        <Route path='articles' element={<List />}/>
        <Route path='article/:id' element={<Article />} key='article/:id'/>        
        <Route 
          path='add' 
          element={
            <RequireAuth>
              <Add />
            </RequireAuth>
          }
        /> 
        <Route 
          path='add/photos' 
          element={
            <RequireAuth>
              <AddPhotos />
            </RequireAuth>
          }
        />
        <Route 
          path='user' 
          element={
            <RequireAuth>
              <UserPage />
            </RequireAuth>
          }
        />               
        <Route 
          path='admin' 
          element={
            <RequireAuth>
              <AdminPage />
            </RequireAuth>
          }
          />               
      </Route>
      <Route path='*' element={<ErrorPage />}/> 
    </Routes>
    </AuthProvider>    
  );
};

export default App;
