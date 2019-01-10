import path from 'path';
import { getBundles } from 'react-loadable/webpack';

const template = async (markup, assets, modules, initialData) => {
    const stats = await import(path.resolve(
        __dirname,
        './../../../public/react-loadable.json'
    ));
    const loadables = getBundles(stats, modules)
        .map(bundle => `<script src="${bundle.file}"></script>`)
        .join('\n');

    return `<!DOCTYPE html>
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <meta name="theme-color" content="#ffffff">
                <!--<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
                <link rel="manifest" href="/assets/manifest.json">
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
                <link href="https://fonts.googleapis.com/css?family=Poiret+One|Lora:400,400i,700|Roboto:400,700" rel="stylesheet">-->
                <title>Pop Network</title>
                ${assets.css}
            </head>
            <body>
                <div id="app">${markup}</div>
                <script>window.__INITIAL_DATA__ = ${JSON.stringify(
                    initialData
                )};</script>
                <script src="runtime.js"></script>
                <script src="vendors.js"></script>
                ${loadables}
                ${assets.js}
            </body>
        </html>`;
};

export default template;
