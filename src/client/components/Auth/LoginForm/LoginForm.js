import React from 'react';
import { LocalStorage } from 'utils';
import { Form, Text, Checkbox } from 'informed';
import { useStore } from 'daria-store';

const LoginForm = () => {
    const { login } = useStore();

    const onSubmit = values => {
        if (values.remember){
            LocalStorage.set('pnw-username', values.username);
        }
        login(values);
    };

    const getInitialValue = () => {
        const username = LocalStorage.get('pnw-username');
        if (username !== null) return username;
    };
    
    return (
        <Form id="intro-form" onSubmit={onSubmit}>
            <label className="label" htmlFor="login-username">
                Username:
            </label>
            <Text
                className="input"
                type="text"
                field="username"
                initialValue={getInitialValue()}
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
            <label htmlFor="login-remember">Remember me</label>
            <Checkbox field="remember" id="login-remember" />
            <button className="input" type="submit">
                Login
            </button>
        </Form>
    );
};

export default LoginForm;
