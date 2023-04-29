import { include } from 'named-urls'

export default {
    home: "/",

    profile: "/profile/",

    auth: include('/auth/', {
        login: "login/",
        logout: "logout/",
        registration: "reg/",
    }),

    polls: include('/polls/', {
        cats: {
            default: "catalogs/",
            own: "catalogs/:page/",
        },

        create: "create/",
        constructor: "constructor/:poll/",

        

        passing: {
            to: ":slug/",
        }
    }),

}