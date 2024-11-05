import React from 'react';
import './SignupStyle.css';

const Signup: React.FC = () => {
    return (
        <div className='container'>
            <div className='signup'>
                <h1>Can’t wait to get you started!</h1>
                <input type="email" placeholder="Email" />
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <input type="password" placeholder="Confirm Password" />
                <button type="submit">Sign Up</button>
            </div>
            <p className="footer-text">MindfulU</p>
        </div>
    );
};

export default Signup;
