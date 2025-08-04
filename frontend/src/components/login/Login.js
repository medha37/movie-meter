import './Login.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { login } from '../../api/authApi';

const Login = ({ setUser }) => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    //newly added
    useEffect(() => {
        const email = localStorage.getItem("email");
        if (email) {
            navigate("/");
        }
    }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(form);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('email', form.email);
            setUser(form.email);
            setForm({ email: '', password: '' });
            setErrorMsg('');
            alert("Login successful!");
            navigate("/");
        } catch (err) {
            console.error(err);
            setErrorMsg(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;