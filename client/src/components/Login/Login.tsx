import React from 'react';
import { Link } from 'react-router-dom';
import './LoginStyle.css';

const Login: React.FC = () => {
    return (
        <div className='container'>
            <div className='login'>
                <h1>Welcome to MindfulU</h1>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <a href="forgotPass" className="forgot-password">Forgot your password?</a>
                <button type="submit">Login</button>
                <Link to="/signup" className="signup">New user? Sign up here!</Link>
            </div>
        </div>
    );
};

export default Login;
