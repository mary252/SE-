import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import MainLayout from '../Containers/Authenticated/Layouts/EMain';
import AccountScreen from '../Containers/Authenticated/Screens/EAccount';
import rating from '../Containers/Authenticated/Screens/Account/Rating/rating';
import DisplayQuestions from '../Containers/Authenticated/Screens/EAccount/AnswerQuestions/DisplayQuestions';

class EAuthenticatedNavigation extends Component {
  render() {
    return (
      <MainLayout>
        <Switch>
          <Route exact path="/expert" component={AccountScreen}/>
          <Route path="/rating" component={rating}/>
          <Route path="/displayquestions" component={DisplayQuestions}/>
          <Redirect from="/" to="/expert" />
        </Switch>
      </MainLayout>
    );
  }
}

export default EAuthenticatedNavigation;
