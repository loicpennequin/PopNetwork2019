import wretch from 'wretch';
import { dedupe } from 'wretch-middlewares';
import constants from 'constants';

const w = wretch(constants.API_URL)
    .middlewares([dedupe()])
    .options({ credentials: 'include', mode: 'cors' })
    .resolve(resolver =>
        resolver
            .notFound(async (error, req) => {
                console.log(error);
                // TODO
                return { error: 404 };
            })
            .unauthorized(async (error, req) => {
                console.log(error);
                // TODO
                // throw new Error(error);
                return { error: 401 };
            })
            .internalError(async (error, req) => {
                console.log(error);
                return { error: 500 };
            })
            .json(json => json)
    );

export default {
    w: () => w,
    get: (url, params) =>
        w
            .url(url)
            .query(params)
            .get(),
    post: (url, body) => {
        return w
            .url(url)
            .json(body)
            .post();
    },
    put: (url, body) =>
        w
            .url(url)
            .json(body)
            .put(),
    delete: url => w.url(url).delete()
};
