import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Productos from './Productos';
import Productosa from './Productosa';


function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/productos" component={Productos} />
        <Route path="/productosa" component={Productosa} />
        
      </Switch>
    </Router>
  );
}

export default AppRouter;