import { defineNuxtConfig } from 'nuxt'


// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    css: [
        '@/scss/main.scss'
    ],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                        @import "@/scss/_preset.scss";
                    `
                },
            },
        },
    },
    runtimeConfig: {
        MAILHOST: process.env.MAILHOST,
        MAILPORT: process.env.MAILPORT,
        MAILUSER: process.env.MAILUSER,
        MAILPASSWORD: process.env.MAILPASSWORD,
        CONTACTMAIL: process.env.CONTACTMAIL
    }
})
