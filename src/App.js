import React, { Component } from 'react';
import './App.css';

// reactor-router
import {
  BrowserRouter as Router,
  Switch,
  Route, Redirect
} from "react-router-dom";
//background
import Particles from 'react-particles-js'; 
import Logo from './component/Logo/Logo.js';
// components
import ProfileIcon from './component/Profile/ProfileIcon';
import SignIn from './component/SignIn.js';
import Register from './component/Register.js';
import MainPage from './component/MainPage/MainPage.js';
import Modal from './component/Modal/Modal.js';
import Profile from './component/Profile/Profile.js';
import RequestPasswordReset from './component/PasswordReset/RequestPasswordReset.js';
import Navbar from './component/Navbar/Navbar.js';
// utils
import { api } from './utils/API.js';
import ConfirmPasswordReset from './component/PasswordReset/ConfirmPasswordReset';


const paramsParticles={
  particles: {
    number: {
      value: 50,
    },
    size: {
      value: 2,
    },
    move: {
      speed: 2,
      bounce: true,
      random: true,
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        name: window.sessionStorage.getItem('name'),
        entries: window.sessionStorage.getItem('rank')
      },
      isUserAuthenticated: false
    }
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      api.post('signin', {}, 
      { headers: {'Authorization': `Bearer ${window.sessionStorage.getItem('token')}` }}
      )
      .then(data => {
        const userInfo = data.data;
        if (userInfo.id) {
          this.setState({isUserAuthenticated: true});
          this.LoadUser(userInfo.id);
        } else {
          window.sessionStorage.clear();
          this.setState({isUserAuthenticated: false});
        }
      })
      .catch(error => {
        if (error.response) {
          if (error.response.data === 'unauthorized') {
            window.sessionStorage.clear();
          }
          else console.log(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      })
    }
  }

  LoadUser = (id) => {
    api.get(`profile/${id}`,
    { headers: {'Authorization': `Bearer ${window.sessionStorage.getItem('token')}` }}
    )
    .then(data => {
      const useInfo = data.data;
      this.setState({user: useInfo[0], isUserAuthenticated: true});
      window.sessionStorage.setItem('name', useInfo[0].name);
      window.sessionStorage.setItem('rank', useInfo[0].entries);
    })
    .catch(error => {
      if (error.response) {
        if (error.response.data === 'unauthorized') {
          window.sessionStorage.clear();
        }
        else console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    })
  }

  signOut = () => {
    api.get('signout',
        { headers: {'Authorization': `Bearer ${window.sessionStorage.getItem('token')}` }}
    )
    .then(data => {
        if (data.data.success) {
        window.sessionStorage.clear();
        this.setState({isUserAuthenticated: false})
        }
    })
    .catch(error => {
        if (error.response) {
        if (error.response.data === 'unauthorized') {
            window.sessionStorage.clear();
        }
        else console.log(error.response.data);
        } else if (error.request) {
        console.log(error.request);
        } else {
        console.log('Error', error.message);
        }
    })
  };

  
  render() {   
    const { user, isUserAuthenticated } = this.state;
    return (
      <Router>
        <div className="App">
          <Particles className='particles' params={paramsParticles} />
          <Logo />
          {
            isUserAuthenticated ?
            <ProfileIcon signOut={this.signOut} /> :
            <Navbar />
          }

        <Switch>
          <Route
            exact 
            path="/"
            render={() => {
              return isUserAuthenticated ?
                <Redirect to="/home"/> :
                <Redirect to="/signin" />
            }}
            />
          <Route path="/signin">
            <SignIn LoadUser={this.LoadUser} />
          </Route>
          <Route path="/register">
            <Register LoadUser={this.LoadUser} />
          </Route>
          <Route path="/password-reset/token/:id">
            <ConfirmPasswordReset />
          </Route>
          <Route path="/password-reset">
            <RequestPasswordReset />
          </Route>
          <Route path="/home">
            <MainPage user={user}/>
          </Route>
          <Route path="/profile-modal">
            <Modal>
              <Profile toggleModal={this.toggleModal} user={user} LoadUser={this.LoadUser} />
            </Modal>
          </Route>
        </Switch>
        </div>
      </Router>
    );
  }
}

export default App;