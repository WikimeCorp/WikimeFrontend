import './styles/App.css';
import List from './pages/List';
import Article from './pages/Article';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/UI/Navbar/Navbar';
import ErrorPage from './pages/ErrorPage';
import Add from './pages/Add';
import Main from './pages/Main';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';
import AddPhotos from './pages/AddPhotos';
import { AuthProvider, RequireAuth, RequireAuthAdmin } from './context/context';
import Modal from './components/UI/Modal/Modal';

const App = () => { 

  let location = useLocation();
  let state = location.state as { backgroundLocation?: Location };

  return (
    <AuthProvider>
      <Routes location={state?.backgroundLocation || location}>
        <Route path='/' element={<Navbar />}>
          <Route index element={<Main />}/>
          <Route path='articles' element={<List />}/>
          <Route path='article/:id' element={<Article />} key='article/:id'/>        
          <Route 
            path='add' 
            element={<RequireAuth><Add /></RequireAuth>}
          /> 
          <Route 
            path='add/photos' 
            element={<RequireAuth><AddPhotos /></RequireAuth>}
          />
          <Route 
            path='user' 
            element={<RequireAuth><UserPage /></RequireAuth>}
          />               
          <Route 
            path='admin' 
            element={<RequireAuthAdmin><AdminPage /></RequireAuthAdmin>}
          />               
        </Route>
        <Route path='*' element={<ErrorPage />}/> 
    </Routes>
    {state?.backgroundLocation && (
        <Routes>
          <Route path="/signin" element={<Modal />} />
        </Routes>
    )}
    </AuthProvider>    
  );
};

export default App;
