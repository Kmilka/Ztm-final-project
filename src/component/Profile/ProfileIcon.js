import React, { Component } from 'react';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import './Profile.css';
import userPic from './user.png';

class ProfileIcon extends Component {
    constructor() {
        super();
        this.state = {
            dropdownOpen: false
        }
    }

    toggle = () => {
        this.setState(prevState => {
            return {dropdownOpen: !prevState.dropdownOpen}
        })
    }

    render() {
        return (
            <div style={{position: 'absolute', top: 0, right: 0, width: '140px', padding: '20px', cursor: 'pointer'}}>
                 <img src={userPic} className="br-100 h3 w3" alt="avatar" onClick={this.toggle}/>
                {this.state.dropdownOpen &&
                    <div onClick={this.toggle} className="flex-column bg-white br3">
                        <Link  to="/profile-modal" style={{padding: '3px'}}>Profile</Link>
                        <Link to="/signin" onClick={this.props.signOut} style={{padding: '3px'}}>Sign Out</Link>
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(ProfileIcon);