import React from 'react';
import { Form, Text } from 'informed';
import { useStore } from 'daria-store';

const LoginForm = props => {
    const { login, authenticated } = useStore();
    const onSubmit = values => {
        login(values);
    };
    return (
        <>
            <p>Authenticated: {' ' + authenticated}</p>
            <Form id="intro-form" onSubmit={onSubmit}>
                <label htmlFor="login-username">Username:</label>
                <Text field="username" id="login-username" />
                <label htmlFor="login-password">Password:</label>
                <Text field="password" type="password" id="login-password" />
                <button type="submit">Login</button>
            </Form>
        </>
    );
};

export default LoginForm;
