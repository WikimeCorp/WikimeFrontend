import './styles/App.css';
import Navbar from './components/UI/Navbar/Navbar';
import CardSmall from './components/CardSmall';
import CardMedium from './components/CardMedium';
import FavoriteButton from './components/UI/button/FavouriteButton';
import InnerSorter from './components/UI/InnerSorter/InnerSorter';
import Add from './pages/Add';
import Article from './pages/Article';
import ArticleList from './components/ArticleList';



const App = () => {
  return (
    <ArticleList />
  );
};

export default App;
