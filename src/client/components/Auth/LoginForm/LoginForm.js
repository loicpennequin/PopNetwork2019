import React from 'react';
import { Form, Text } from 'informed';
import { useStore } from 'daria-store';

const LoginForm = () => {
    const { login } = useStore();
    return (
        <Form id="intro-form" onSubmit={login}>
            <label className="label" htmlFor="login-username">
                Username:
            </label>
            <Text
                className="input"
                type="text"
                field="username"
                id="login-username"
            />
            <label className="label" htmlFor="login-password">
                Password:
            </label>
            <Text
                className="input"
                field="password"
                type="password"
                id="login-password"
            />
            <button className="input" type="submit">
                Login
            </button>
        </Form>
    );
};

export default LoginForm;
