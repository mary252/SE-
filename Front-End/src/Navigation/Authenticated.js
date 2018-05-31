import React, { Component } from 'react';

import { Route, Switch, Redirect } from 'react-router';

import MainLayout from '../Containers/Authenticated/Layouts/Main';
import AccountScreen from '../Containers/Authenticated/Screens/Account';
import Search from '../Containers/Authenticated/Screens/QuestionToExpert';
import Questions from '../Containers/Authenticated/Screens/OldSearch/Questions/Questions';
import rating from '../Containers/Authenticated/Screens/Account/Rating/rating';


class AuthenticatedNavigation extends Component {
  render() {
    return (
      <MainLayout>
        <Switch>
          <Route exact path="/account" component={AccountScreen}/>
          <Route path="/search" component={Search}/>
          <Route exact path="/rating" component={rating}/>
          <Route path="/questions" component={Questions}/>
          <Route path="/ExpertAuth" component={AccountScreen}/>
          <Route path="/displayquestions" component={AccountScreen}/>
          <Route exact path="/ViewRate" component={AccountScreen}/>
          <Route exact path="/ViewComment" component={AccountScreen}/>
          <Redirect from="/" to="/account" />
        </Switch>
      </MainLayout>
    );
  }
}

export default AuthenticatedNavigation;
