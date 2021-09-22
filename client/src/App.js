import './App.css';
import Homescreen from './screens/Homescreen';
import Navbar from './components/navbar';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Bookingscreen from './screens/Bookingscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Profilescreen from './screens/Profilescreen';
import Adminscreen from './screens/Adminscreen';
import Landingscreen from './screens/Landingscreen';

function App() {
  return (
    <div className="App"> 
      <Navbar/>

      <BrowserRouter>

      <Route path = "/home" exact component={Homescreen} />
      <Route path = '/book/:roomid/:fromDate/:toDate' exact component = {Bookingscreen} />
      <Route path = '/register' exact component = {Registerscreen}/>
      <Route path = '/login' exact component = {Loginscreen}/>
      <Route path = '/profile' exact component = {Profilescreen}/>
      <Route path = '/admin' exact component = {Adminscreen}/>
      <Route path = '/' exact component = {Landingscreen}/>

      </BrowserRouter>
      
    </div>
  );
}

export default App;
 