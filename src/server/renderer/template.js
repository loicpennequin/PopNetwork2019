import path from 'path';
import { getBundles } from 'react-loadable/webpack';

// const template = async (markup, modules, assets) => {
//     const stats = await import(path.resolve(
//         __dirname,
//         './../../../../../../public/assets/react-loadable.json'
//     ));
//     const bundles = getBundles(stats, modules);
//     const initialData = {};
//
//     return `<!DOCTYPE html>
//         <html>
//             <head>
//                 <meta name="viewport" content="width=device-width, initial-scale=1">
//                 <meta name="theme-color" content="#ffffff">
//                 <!--<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
//                 <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
//                 <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
//                 <link rel="manifest" href="/assets/manifest.json">
//                 <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">-->
//                 <link href="https://fonts.googleapis.com/css?family=Poiret+One|Lora:400,400i,700|Roboto:400,700" rel="stylesheet">
//                 <title>Sample Daria app</title>
//                 ${assets.css}
//             </head>
//             <body>
//                 <div id="app">${markup}</div>
//                 <script>window.__INITIAL_DATA__ = ${JSON.stringify(
//                     initialData
//                 )};</script>
//                 ${assets.js}
//             </body>
//         </html>`;
// };

const template = () => {
    // const stats = await import(path.resolve(
    //     __dirname,
    //     './../../../../../../public/assets/react-loadable.json'
    // ));
    // const bundles = getBundles(stats, modules);
    // const initialData = {};

    return `<!DOCTYPE html>
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <meta name="theme-color" content="#ffffff">
                <!--<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
                <link rel="manifest" href="/assets/manifest.json">
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">-->
                <title>Pop Network</title>
            </head>
            <body>
                <h1>Hello World</h1>
                <div id="app"></div>
                <script src="runtime.js"></script>
                <script src="vendors.js"></script>
                <script src="app.js"></script>
            </body>
        </html>`;
};

export default template;
