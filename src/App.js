import {useState, useEffect} from 'react'
import './App.css';
import {Home} from './component/Pages/Home/home';
import {Switch, Route, Redirect, useHistory, useLocation} from 'react-router-dom';
import {LogIn} from './component/Auth/LogIn/logIn';
import {Register} from './component/Auth/Register/register';
import {User} from './component/User/user';
import {Profile} from './component/User/Profile/profile'

function App() {
  const [auth, setAuth] = useState(false)
  const token = localStorage.getItem('token')

  let history = useHistory()

  const onLogOut = () => {
    setAuth(false)
    history.push('/')
    localStorage.removeItem('token')
    localStorage.removeItem('id')
  }

  let currentUrl = useLocation().pathname;
  useEffect(() => {
    
    let userUrl = ["/user", "/user/profile"];

    if(token && userUrl.includes(currentUrl)) {
      setAuth(true)
      history.push(currentUrl)
    }else{
      history.push(currentUrl)
    }
  },[])
  return (
        <Switch>
            <Route exact path='/'>
              {auth ? <Redirect to='/user' />  : <Home />}
            </Route>
            <Route exact path='/login' component={LogIn} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/user'>
              <User onLogOut={onLogOut}/>
            </Route>
            <Route exact path='/user/profile'>
              <Profile  onLogOut={onLogOut}/>
            </Route>
            <Redirect to='/' />
        </Switch>          
  )
}

export default App;
