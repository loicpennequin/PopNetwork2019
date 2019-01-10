// @TODO : change this when hosted lol
const DOMAIN =
    __ENV__ === 'production' ? 'http://localhost:' : 'http://localhost:';

export default {
    DOMAIN,
    API_URL: `${DOMAIN}${__PORT__}/api`,
    AUTH_URL: `${DOMAIN}${__PORT__}/auth`,
    SUPPORTED_LANGUAGES: [
        { i18nLabel: 'fr', label: 'Français' },
        { i18nLabel: 'en', label: 'English' }
    ]
};
