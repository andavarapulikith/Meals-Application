import logo from './logo.svg';
import './App.css';
import { useGlobalContext } from './context';
import Favourites from './components/Favourites';
import Modal from './components/Modal';
import Meals from './components/Meals';
import Search from './components/Search';

function App() {
  const {showModal,favorites}=useGlobalContext();
  return (
    <div className="App">
      
      
      
      <Search></Search>
      {favorites.length>0&&<Favourites></Favourites>}
      <Meals></Meals>
      {showModal&&<Modal></Modal>}

      
    </div>
  );
}

export default App;
