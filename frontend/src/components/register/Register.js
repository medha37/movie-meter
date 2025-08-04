import './Register.css';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { register } from '../../api/authApi';

const Register = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await register(form);
            alert(res.data.message || 'Registered successfully');
            setForm({ email: "", password: "" });
            setErrorMsg('');
            navigate("/login");
        } catch (err) {
            console.error(err);
            setErrorMsg(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Register</h2>
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;