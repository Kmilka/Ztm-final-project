import React from 'react';
import './Profile.css';
import userPic from './user.png';
import { api } from '../../utils/API.js';

import { Link } from 'react-router-dom';

 class Profile extends React.Component {
    constructor(props) {
        super();
        this.state = {
            name: props.user.name,
            age: props.user.age,
            pet: props.user.pet,

        }
    }

    onFormChange = (event) => {
        switch(event.target.name) {
            case 'user-name':
                this.setState({name: event.target.value});
                break;
            case 'user-age':
                this.setState({age: event.target.value});
                break;
            case 'user-pet':
                this.setState({pet: event.target.value})
                break;
            default:
                return;
        }
    }

    onProfileUpdate = (data) => {
        api.post(`profile/${this.props.user.id}`, { formInput: data }, 
        { headers: {'Authorization': `Bearer ${window.sessionStorage.getItem('token')}` }}
        )
        .then(() => {
            this.props.toggleModal();
            this.props.LoadUser(this.props.user.id);
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
          });
    }

    render() {
     const { user } = this.props;
     const { name, age, pet } = this.state;
     return (
         <div className='profile-modal'>
            <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white'>
                <main className='pa4 black-80 w-80'>
                    <img src={userPic} className='h3 w3 dib' alt='avatar' />
                    <h1>{`Name: ${user.name}`}</h1>
                    <p>{`Images submitted: ${user.entries}`}</p>
                    <p>{`member since: ${user.joined}`}</p>
                    <hr />
                    <label className='mt2 fw6' htmlFor='name'>Name:</label>
                    <input className='pa2 b ba w-100'
                        name='user-name'
                        id='user-name'
                        placeholder={user.name}
                        onChange={this.onFormChange}
                         />
                    <label className='mt2 fw6' htmlFor='age'>Age:</label>
                    <input className='pa2 b ba w-100'
                        name='user-age' 
                        id='user-age' 
                        placeholder={user.age}
                        onChange={this.onFormChange}
                         />
                    <label className='mt2 fw6' htmlFor='pet'>Pet:</label>
                    <input className='pa2 b ba w-100'
                        name='user-pet' 
                        id='user-pet' 
                        placeholder={user.pet}
                        onChange={this.onFormChange}
                         />
                    <div className='mt4' style={{display:'flex', justifyContent:'center',paddingTop:'1rem'}}>
                        <button className='b pa2 grow pointer hover-white w-100 bg-light-blue b--black-20'
                            onClick={() => this.onProfileUpdate({ name, age, pet })}>
                            Save
                        </button>
                        <Link to='/home'>
                            <button className='b pa2 grow pointer hover-white w-100 bg-light-red b--black-20'>
                                Discard
                            </button>
                        </Link>
                    </div>
                </main>
                <Link to='/home'>
                    <h1 className='modal-close grow'>&times;</h1>
                </Link>
            </article>
        </div>
     )
    }  
 }

 export default Profile;