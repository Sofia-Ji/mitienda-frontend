import logo from './logo.svg';
import './App.css'; 
import { Routes, Route} from 'react-router-dom'
import HomePage from './componentes/home/homePage'
import ListCliente from './componentes/cliente/listCliente';
function App() {
  return (
    <Routes>

      <Route path='/' element={ <HomePage /> } />

      <Route path='/cliente' element={ <ListCliente />} />

    </Routes>
  );
}

export default App;
