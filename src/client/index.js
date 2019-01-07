import React from 'react';
import { hydrate } from 'react-dom';
// import './resources/services/ioService.js';
import App from './components/App.js';
// import routes from './resources/services/routesService.js';
import Loadable from 'react-loadable';

// import './styles/app.sass';
// import './resources/services/iconService.js';

Loadable.preloadReady().then(() => {
    // hydrate(<App routes={routes} />, document.getElementById('app'));
    hydrate(<App />, document.getElementById('app'));
});
