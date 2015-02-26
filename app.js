/**
 * Copyright (c) 2015 Stephan Schmitz, <https://eyecatchup.github.io/>, <eyecatchup@gmail.com>. All rights reserved.
 * This code may only be used under the MIT license found at <http://eyecatchup.mit-license.org/>.
 */
(function() {
    "use strict";

    window.addEventListener('polymer-ready', function(e) {
        console.log('Polymer ready event fired!');

        /**
         * PAGE CONFIG
         */

        var config = {
            basic: {
                /**
                 * Author / blog info (required)
                 */
                toolbarTitle: 'eyecatchUp',
                author: {
                    name: 'Stephan Schmitz',
                    domain: 'eyecatchup.github.io',
                    email: 'eyecatchup@gmail.com',
                    jobtitle: 'Android-, Mobile- & Webhacker',
                    // 32px
                    picS: '//lh6.googleusercontent.com/-p9HfoP2THnE/AAAAAAAAAAI/AAAAAAAAAAA/mgjpY0hRC3w/s32-c/photo.jpg',
                    // 64px
                    picL: '//lh6.googleusercontent.com/-p9HfoP2THnE/AAAAAAAAAAI/AAAAAAAAAAA/mgjpY0hRC3w/s64-c/photo.jpg',
                },
                /**
                 * Material Design color scheme (optional)
                 */
                primaryColor: '#3f51b5', // Material Design Indigo 500
                primaryLinkColor: '#e91e63', // // Material Design Pink 500
                bodyBgColor: '#f5f5f5', // Material Design Grey 100
                subpageBgColor: '#f5f5f5', // Material Blue Grey 100
                drawerBgImg: 'assets/img/bg1.jpg', // optional, set (int) 0 if not required.
            },
            /**
             * The settings below are completely optional and are NOT required!
             * NOTE: HOWEVER, IF YOU DO NOT REQUIRE IT, COMMENT IT OUT!
             */
            optional: {
                navItemsOnpage: [
                    /**
                     * These objects define static pages to be attached
                     * to the site (in addition to the auto-generated blog).
                     * NOTE: IF NOT REQUIRED, COMMENT OUT!
                     */
                    { // Portfolio page
                        id: 1,
                        label: 'Projects',
                        icon: 'android',
                        primaryColor: '#4caf50',
                        url: 'projects',
                        content: [
                            {
                                title: 'SEOstats PHP Library',
                                text: 'SEOstats is a powerful open source PHP library to request a bunch of SEO relevant metrics. It is the second most successful SEO open source project on GitHub and on Packagist and was featured in several O\'Reilly books.',
                                url: 'https://github.com/eyecatchup/SEOstats',
                            },
                            {
                                title: 'PHP class GWTdata',
                                text: 'This project provides an easy way to automate downloading of data tables (as CSV) from Google Webmaster Tools and tries to provide a PHP alternative to the Python script available by Google. It was featured in O\'Reilly\'s book "Suchmaschinenoptimierung mit Google Webmaster Tools" by Stephan Czysch.',
                                url: 'https://github.com/eyecatchup/php-webmaster-tools-downloads',
                            },
                            {
                                title: 'PHP class GwtCrawlErrors',
                                text: 'Similar to GWTdata, this project provides an easy way to automate downloading of crawl errors from Google Webmaster Tools. It was also featured in the O\'Reilly book "Suchmaschinenoptimierung mit Google Webmaster Tools" by Stephan Czysch.',
                                url: 'https://github.com/eyecatchup/GWT_CrawlErrors-php',
                            },
                            {
                                title: 'USB Mass Storage Toggle (Android App)',
                                text: 'Android App for Android 4.0+. USB Mass Storage Hack to use with ICS Ports that doesn\'t support UMS (yet). To date, it was installed more than 100,000 times.',
                                url: 'https://github.com/eyecatchup/net.bexton.android.UsbMassStorageToggle',
                            }
                        ],
                    },
                    { // About-me page
                        id: 2,
                        label: 'About me',
                        icon: 'account-box',
                        primaryColor: '#009688',
                        url: 'about',
                        content: './assets/html/about-me.html',
                    }
                ],
                navItemsOffpage: [
                    /**
                     * These objects define external links to be added
                     * to the drawer (in addition to on-page links).
                     * NOTE: IF NOT REQUIRED, COMMENT OUT!
                     */
                    {
                        label: 'My Github',
                        url: 'https://github.com/eyecatchup',
                    },
                    {
                        label: 'My Codepens',
                        url: '#',
                    },
                    {
                        label: 'My Google+',
                        url: 'https://plus.google.com/+StephanSchmitz',
                    }
                ]
            }
        };

        /**
         * END OF CONFIG; DON'T EDIT BELOW IF YOU DON'T KNOW WHAT YOU DO!
         */


        //Get the template instance and apply the config data to its model.
        var templateInstance = document.querySelector('polymer-material-design-jekyll-spa');

        templateInstance.addData(config);
        templateInstance.setPrimaryColor(config.basic.primaryColor);

        setTimeout(function(){
            templateInstance.$.toast.show();
        }, 1200);

    });

})();
