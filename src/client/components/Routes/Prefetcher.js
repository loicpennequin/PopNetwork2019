import React, { useState, useEffect } from 'react';
import { useStore } from 'daria-store';
import { withRouter } from 'react-router-dom';

const Prefetcher = ({ component: Component }) => {
    const store = useStore();
    const [fetching, setFetching] = useState(
        (__IS_BROWSER__ && store.needPrefetch) === true
    );
    console.log(
        `${
            Component.pageConfig.name
        } | FETCHING : ${fetching}, NEED PREFETCH :${store.needPrefetch}`
    );
    // useEffect doesnt support useEffect(async() => {...}, [])
    const fetchData = async () => {
        await Component.getInitialState(store);
        setFetching(false);
    };

    const enablePrefetch = async () => {
        await store.setState({ needPrefetch: true });
    };

    useEffect(() => {
        if (store.needPrefetch) {
            console.log('%cPrefetcher: fetch data', 'color: magenta');
            fetchData();
        } else if (!store.needPrefetch) {
            console.log(
                '%cPrefetcher: set needPrefetch to true',
                'color: magenta'
            );
            enablePrefetch();
        } else {
            console.log('%cPrefetcher: set fetching to true', 'color: magenta');
            setFetching(false);
        }
    }, []);

    return fetching ? <div>Loading page data...</div> : <Component />;
};

export default withRouter(Prefetcher);
