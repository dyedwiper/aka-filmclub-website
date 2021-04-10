const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js').react();

// Those fallbacks are needed for @react-pdf/renderer
mix.webpackConfig({
    resolve: {
        fallback: {
            stream: require.resolve('stream-browserify'),
            zlib: require.resolve('browserify-zlib'),
        },
    },
});
