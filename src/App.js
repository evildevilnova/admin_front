import React, { useEffect } from "react";
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from "./containers/Home/index";
import Singup from "./containers/signup/index";
import PrivateRoute from './components/HOC/PrivateRoute';
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn, getInitialData, getCustomerOrders } from './actions/index';
import Products from "./containers/Products/Products";
import Orders from "./containers/Orders/Orders";
import Category from "./containers/Category/index";
import SignIn from "./containers/signin/signin";
import NewPage from "./containers/NewPage";

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if (auth.authenticate) {
      dispatch(getInitialData());
    }
  }, [auth.authenticate])

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/category" component={Category} />
        <PrivateRoute path="/products" component={Products} />
        <PrivateRoute path="/orders" component={Orders} />
        <PrivateRoute path="/page" component={NewPage} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={Singup} />
      </Switch>
    </div>
  );
}

export default App;
