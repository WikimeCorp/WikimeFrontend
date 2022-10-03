import './styles/App.css';
import Add from './pages/Add';
import Navbar from './components/UI/Navbar/Navbar';
import ArticleList from './pages/ArticleList';
import MainButton from './components/UI/button/MainButton';
import SideBar from './components/UI/SideBar/SideBar';
import InnerSorter from './components/UI/InnerSorter/InnerSorter';


const App = () => {
  return (
    <InnerSorter />
  );
};

export default App;
