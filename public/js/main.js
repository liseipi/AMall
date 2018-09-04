require.config({
    baseUrl: '/js/',
    paths: {
        'libs': 'libs',
        'components': './semantic/components',
        'jquery': 'libs/jquery-3.3.1.min',
        'lozad': 'libs/lozad.min',
        'css': 'libs/css',
        'vue': 'libs/vue.min',
        'semantic': 'semantic/semantic.min',
        'ScrollReveal': 'libs/scrollreveal.min',

        'pace': 'libs/pace/pace.min',
        'swiper': 'libs/swiper/swiper.min',
        'swal': 'libs/swal/sweetalert2.min'
    },
    shim: {
        semantic: {
            deps: ['jquery']
        },
        pace: {
            deps: ['css!libs/pace/pace-theme-minimal.css', 'jquery']
        },
        swiper: {
            deps: ['css!libs/swiper/swiper.min.css', 'jquery']
        },
        swal: {
            deps: ['css!libs/swal/sweetalert2.min.css', 'jquery']
        },
    }
});

require(['pace', 'semantic', 'lozad'], function (pace, semantic, lozad) {
    //
    pace.start({
        document: false
    });

    //
    const observer = lozad();
    observer.observe();

})



