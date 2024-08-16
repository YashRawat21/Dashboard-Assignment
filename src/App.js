
import { Provider } from 'react-redux';
import './App.css';
import  store  from './utils.js/store';
import Dashboard from './components/Dashboard';



function App() {
  return (
    <Provider store={store}>
    <div className="App">
     <Dashboard />
    </div>
    </Provider>
  );
}

export default App;
