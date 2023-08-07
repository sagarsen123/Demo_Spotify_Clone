
import Login from "./Components/Login/Login.jsx";
import './App.css'
import { BrowserRouter,Routes, Route, useNavigate ,Navigate} from "react-router-dom";
import Main from "./Components/Main/Main.jsx";
import { useEffect , useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateToken } from "./actions/index.js";
import PageNotFound from './Components/pageNotFound/PageNotFound.jsx'

function App() {
 const navigate = useNavigate();
 const dispatch = useDispatch();

  const [localToken,setLocalToken] = useState();



  useEffect(()=>{
    const gettoken = window.localStorage.getItem('token');
    const lastLogin = window.localStorage.getItem('Date');
    let validLogin = false;
    if(lastLogin!==null){
      let prevDate = new Date(lastLogin);
      let currDate = new Date();
      let dif = Math.abs(currDate - prevDate)/1000;
      if(dif<3600) validLogin = true;
    }
    if(gettoken && validLogin) {
      dispatch(updateToken(gettoken));
      navigate('/main/');}
    else {

      const hash = window.location.hash;
      if( hash) {
        const token = hash.substring(1).split("&")[0].split('=')[1];
        localStorage.setItem('token',token);
        localStorage.setItem('Date',new Date());
        setLocalToken('token');

        dispatch(updateToken(token));

      }
    }
  },[]);



  return (
  
    <div className="App">
      <Routes>
        <Route path='/' element= { <Login/> }/>
        <Route path='/main/*' element= {<Main/> }/>
        <Route path="/404" element={<PageNotFound/>}/>
        <Route path="*" element={<Navigate to="/404"/>}/>
      </Routes>
    </div>

  );
}

export default App;
