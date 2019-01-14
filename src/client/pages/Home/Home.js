import React from 'react';
import LoginForm from 'components/Auth/LoginForm/LoginForm';

const Home = () => {
    return <LoginForm />;
};

Home.pageConfig = {
    name: 'Home',
    path: '/',
    exact: true,
    authLevel: 'public'
};

export default Home;
