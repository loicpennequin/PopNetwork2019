export default {
    // @TODO : change this when hosted lol
    DOMAIN:
        __ENV__ === 'production' ? 'http://localhost:' : 'http://localhost:',
    API_URL: `${this.DOMAIN}${__PORT__}/api`,
    AUTH_URL: `${this.DOMAIN}${__PORT__}/auth`,
    SUPPORTED_LANGUAGES: [
        { i18nLabel: 'fr', label: 'Français' },
        { i18nLabel: 'en', label: 'English' }
    ]
};
