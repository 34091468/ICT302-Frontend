module.exports = {
    devServer: {
        proxy: process.env.VUE_APP_BASEURL
    },
    css: {
        loaderOptions: {
            // by default the `sass` option will apply to both syntaxes
            // because `scss` syntax is also processed by sass-loader underlyingly
            // but when configuring the `prependData` option
            // `scss` syntax requires an semicolon at the end of a statement, while `sass` syntax requires none
            // in that case, we can target the `scss` syntax separately using the `scss` option
            scss: {
                additionalData: `@import '@/assets/styling/base.scss';`
            },
            // pass Less.js Options to less-loader
            less: {
                // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
                // `primary` is global variables fields name
                globalVars: {
                    primary: '#fff'
                }
            }
        }
    }
}