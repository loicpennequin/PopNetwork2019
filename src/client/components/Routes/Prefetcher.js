import React, { useState, useEffect } from 'react';
import { useStore } from 'daria-store';
import { withRouter } from 'react-router-dom';

// @TODO need to think about another implementation...unneeded re-renders and clunky utilisation...could probably make a usePrefetch custom hook
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
        const fn = await store['prefetch' + Component.pageConfig.name]();
        setFetching(false);
    };

    const enablePrefetch = async () => {
        await store.setState({ needPrefetch: true });
    };

    useEffect(() => {
        if (store.needPrefetch) {
            fetchData();
        } else {
            enablePrefetch();
        }
    }, []);

    return fetching ? <div>Loading page data...</div> : <Component />;
};

export default withRouter(Prefetcher);
