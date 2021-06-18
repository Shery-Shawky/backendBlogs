// import React,{Fragment, useEffect} from 'react';
// import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

// // components
// import Navbar from './components/layout/navbar';
// import Landing from './components/layout/landing';
// import Login from './components/auth/login';
// import Register from './components/auth/register';
// import Alert from './components/layout/alert';
// import Dashboard from './components/dashboard/dashboard';
// import PrivateRoute from './components/routing/PrivateRoute';

// //styles
// import './App.css';

// //Redux
// import {Provider} from 'react-redux';
// import store from './store';
// import { loadUser } from './actions/auth';
// import setAuthToken from './utils/setAuthToken';


// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }

// const App = () =>{
//   useEffect(()=>{
//     store.dispatch(loadUser())
//   },[])
//   return ( 
//   <Provider store={store}>
//   <Router>
//     <Fragment>
//       <Navbar/>
//       <Route exact path='/' component={Landing}/>
//       <section className="container">
//         <Alert/>
//         <Switch>
//           <Route exact path='/register' component={Register}/>
//           <Route exact path='/login' component={Login}/>
//           <PrivateRoute exact path='/dashboard' component={Dashboard}/>

//         </Switch>
//       </section>
//     </Fragment>
//   </Router>
//   </Provider>  
// )}

// export default App;
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/navbar';
import Landing from './components/layout/landing';
import Routes from './components/routing/Routes';
import { LOGOUT } from './actions/types';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

const App = () => {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;