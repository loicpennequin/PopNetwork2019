import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from 'daria-store';

function mapStateToProps(store) {
    return {
        getCurrentUser: store.getCurrentUser,
        currentUser: store.currentUser
    };
}

const Dashboard = () => {
    const { currentUser } = useStore(mapStateToProps);
    const profileUrl = `/profile/${currentUser.id}`;
    return (
        <>
            <p>Hello, {currentUser.username} !</p>
            <Link to={profileUrl}>Your Profile</Link>
        </>
    );
};

Dashboard.pageConfig = {
    name: 'Dashboard',
    path: '/dashboard',
    exact: true,
    authLevel: 'private'
};

export default Dashboard;
