/**
 * Copyright (c) 2015 Stephan Schmitz, <https://eyecatchup.github.io/>, <eyecatchup@gmail.com>. All rights reserved.
 * This code may only be used under the MIT license found at <http://eyecatchup.mit-license.org/>.
 */
Polymer('polymer-material-design-jekyll-spa', {

    /**
     * @property preventDispose
     * Force bindings from being removed.
     * https://www.polymer-project.org/docs/polymer/polymer.html#preventdispose
     */
    preventDispose: true,

    // CustomElement lifecycle callback methods

    /**
     * @method created
     * An instance of the polymer-material-design-jekyll-spa element was created.
     * https://www.polymer-project.org/docs/polymer/polymer.html#lifecyclemethods
     */
    created: function(event, detail, sender) {
        console.log('Lifecycle callback method fired: [created].');

        if (event !== undefined) {
            console.dir('Event:');
            console.dir(event);
        }
        if (detail !== undefined) {
            console.dir('Detail:');
            console.dir(detail);
        }
        if (sender !== undefined) {
            console.dir('Sender:');
            console.dir(sender);
        }
    },

    /**
     * @method attached
     * An instance of the polymer-material-design-jekyll-spa element was inserted into the DOM.
     * https://www.polymer-project.org/docs/polymer/polymer.html#lifecyclemethods
     */
    attached: function(event, detail, sender) {
        console.log('Lifecycle callback method fired: [attached].');

        if (event !== undefined) {
            console.dir('Event:');
            console.dir(event);
        }
        if (detail !== undefined) {
            console.dir('Detail:');
            console.dir(detail);
        }
        if (sender !== undefined) {
            console.dir('Sender:');
            console.dir(sender);
        }
    },

    /**
     * @method detached
     * An instance of the polymer-material-design-jekyll-spa element was removed from the DOM.
     * https://www.polymer-project.org/docs/polymer/polymer.html#lifecyclemethods
     */
    detached: function(event, detail, sender) {
        console.log('Lifecycle callback method fired: [detached].');

        if (event !== undefined) {
            console.dir('Event:');
            console.dir(event);
        }
        if (detail !== undefined) {
            console.dir('Detail:');
            console.dir(detail);
        }
        if (sender !== undefined) {
            console.dir('Sender:');
            console.dir(sender);
        }
    },

    /**
     * @method ready
     * The polymer-element has been fully prepared (e.g. shadow DOM created,
     * property observers setup, event listeners attached, etc).
     * https://www.polymer-project.org/docs/polymer/polymer.html#lifecyclemethods
     */
    ready: function() {
        console.log('Lifecycle callback method fired: [ready].');

        // Initialize the element's model.
        this.author = {
            name: '',
            domain: '',
            email: '',
            jobtitle: '',
            picS: '', //32px
            picL: '', //64px
        };

        this.toolbarTitle = '';

        this.primaryColor = '#3f51b5'; // Material Design Indigo 500
        this.primaryColor1 = '#3f51b5'; // Material Design Indigo 500
        this.primaryColor2 = '#009688'; // Material Design Teal 500
        this.primaryColor3 = '#0091ea'; // Material Design Light-Blue A700
        this.primaryColor4 = '#607d8b'; // Material Design Blue-Grey 500
        this.primaryColor5 = '#2962ff'; // Material Design Blue A700
        this.primaryColor6 = '#4caf50'; // Material Design Green 500
        this.primaryToolbarTextColor = '#ffffff'; // Material Design Grey 1000
        this.primaryLinkColor2 = '#d32f2f'; // // Material Design Red 700
        this.primaryLinkColor = '#e91e63'; // // Material Design Pink 500
        this.bodyBgColor = '#f5f5f5'; // Material Design Grey 100
        this.subpageBgColor = '#f5f5f5'; // Material Blue Grey 100
        this.subpageBgColor2 = '#cfd8dc'; // Material Blue Grey 100
        this.drawerBgColor = '#ffffff'; // Material Design Grey 100
        this.drawerTextColor = '#212121'; // Material Design Grey 700
        this.drawerBgImg = 'assets/img/bg.jpg'; // optional, set (int) 0 if not required.

        this.drawerToolbarHeight = '175px';
        this.drawerWidth = '305px';

        this.navItemsOnpage = [
            {
                id: 0,
                label: 'Blog',
                icon: 'create',
                primaryColor: '#3f51b5',
                url: 'blog',
                content: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            }
        ];
        this.navItemsOffpage = [];
        this.dropdownMenu = [
            {
                label: 'Fork me',
                url: 'https://github.com/eyecatchup/polymer-material-design-jekyll-spa',
            },
            {
                label: 'About',
                url: '#',
            }
        ];

        this.drawerFooterText = 'Made with love in Cologne, Germany.';
        this.toastText = 'Welcome to the site.';

        this.scrollTopDuration = 200;
        this.scrollTop_ = this.scrollTop_ || 0;
        this.scrollClass = this.scrollClass || 'down';
        this.page = this.page || 0;
        this.lastpage = this.lastpage || 0;
        this.subpage = this.subpage || 0;
        this.pageTitle = '';
        this.dropdownState = 'core-closed';
        this.navshape = 'menu';
        this._lastHash = 'blog';
        this.inited = false;

        return this;
    },

    /**
     * @method domReady
     * Called when the element's initial set of children are guaranteed to exist.
     * This is an appropriate time to poke at the element's parent or light DOM
     * children. Another use is when you have sibling custom elements (e.g. they
     * are .innerHTML'd together, at the same time). Before element A can use B's
     * API/properties, element B needs to be upgraded. The domReady callback
     * ensures both elements exist.
     * https://www.polymer-project.org/docs/polymer/polymer.html#lifecyclemethods
     */
    domReady: function() {
        console.log('Lifecycle callback method fired: [domReady].');

        window.onhashchange = (this.hashChanged).bind(this);

        this.async(function() {
            this.parseLocationHash();
        }, null, 200);
    },

    // CustomElement helper methods

    /**
     * @method hashChanged
     * Called when the document's location hash changes. Ensures that the
     * core-animated-pages cycle when going forward or backwards in the history.
     */
    hashChanged: function(event, detail, sender) {
        console.log('[hashChanged] Old hash: "' + this.getLastHash()
          + '", new hash: "' + event.currentTarget.location.hash.slice(1) + '".');

        try {
            event.currentTarget.document.activeElement.parseLocationHash();
        }
        catch(e){ }

        return;
    },

    /**
     * @method parseLocationHash
     * Set the active page for the top level core-animated-pages, according to
     * the document's current location hash.
     */
    parseLocationHash: function() {
        var route = window.location.hash.slice(1),
            log = '[parseLocationHash] "' + route + '"';

        if (route === '') {
            route = this.navItemsOnpage[0].url;
            log += ' redireting to "' + route + '" ...';

            console.log(log);

            window.history.replaceState(0, this.navItemsOnpage[0].label,
              '#' + this.navItemsOnpage[0].url);

            return;
        }

        for (var i = 0, page; page = this.navItemsOnpage[i]; i++) {
            if (page.url === route &&
              (this.inited === false || page.id !== this.page))
              {
                this.setLastHash(page.url);
                this.goToPage(page.id);
                break;
            }
        }

        return;
    },

    /**
     * @method addData
     * Set template model data.
     */
    addData: function(data) {

        data.basic.author &&
            (this.author = data.basic.author);

        data.basic.toolbarTitle &&
            (this.toolbarTitle = data.basic.toolbarTitle);

        data.basic.primaryColor &&
            (this.primaryColor = data.basic.primaryColor);

        data.basic.primaryLinkColor &&
            (this.primaryLinkColor = data.basic.primaryLinkColor);

        data.basic.bodyBgColor &&
            (this.bodyBgColor = data.basic.bodyBgColor);

        data.basic.subpageBgColor &&
            (this.subpageBgColor = data.basic.subpageBgColor);

        data.basic.drawerBgImg &&
            (this.drawerBgImg = data.basic.drawerBgImg);

        if (data.optional.navItemsOnpage.length) {
            for (var i = 0, page; page = data.optional.navItemsOnpage[i]; i++) {
                this.navItemsOnpage.push(page);

                if (page.url === 'about') {
                    try {
                        var _self = this,
                            link = document.createElement('link');

                        link.rel = 'import';
                        link.href = page.content;
                        link.async = 'async';
                        link.onload = function(e) {
                            var clone = document.importNode(
                              this.import.querySelector('template').content, 1);

                            _self.$.about_content.appendChild(clone);
                        };

                        document.head.appendChild(link);
                    }
                    catch(e){ }
                }
            }
        }

        if (data.optional.navItemsOffpage.length) {
            for (var i = 0, a; a = data.optional.navItemsOffpage[i]; i++) {
                this.navItemsOffpage.push(a);
            }
        }

        !this.inited && (this.inited = true, console.log('this.inited = true'));

        return true;
    },

    goToPage: function(id) {
        this.closeDrawer();

        id = parseFloat(id);
        console.log('[goToPage] Going from page ' + this.lastpage
          + ' to page ' + id);

        this.async(function() {
            this.scrollToTop2(this.lastpage);
            this.scrollToTop2(id);
        }, null, 50);

        this.async(function() {
            if (this.navItemsOnpage[id] !== undefined &&
              this.navItemsOnpage[id] !== null)
              {
                this.setPrimaryColor(this.navItemsOnpage[id].primaryColor);
                this.pageTitle = this.navItemsOnpage[id].label;
            }
        }, null, 250);

        this.async(function() {
            if (this.navItemsOnpage[id] !== undefined &&
              this.navItemsOnpage[id] !== null)
              {
                this.page = id;
                this.lastpage = id;

                if (this.page !== this.$.pages.selected) {
                    this.$.pages.selected = id;
                }

                if (window.location.hash.slice(1) !== this.navItemsOnpage[id].url) {
                    window.location.hash = '#' + this.navItemsOnpage[id].url;
                }
            }
        }, null, 850);

        return;
    },

    goToSubPage: function(id) {
        id = parseFloat(id);
        console.log('[goToSubPage] Going from subpage ' + this.subpage
          + ' to subpage ' + id);

        this.subpage = id;
        this.menuIconTransform();

        if (this.subpage !== this.$.subpages.selected) {
            this.$.subpages.selected = id;
        }

        this.setPrimaryColor((id === 0) ? this.navItemsOnpage[0].primaryColor
            : '#607d8b');

        return;
    },

    selectSubpage: function(e) {
        var i = e.target.templateInstance.model.post,
            i = parseFloat(i) + 1;

        console.log('[selectSubpage] set subpage view from ' +
            parseFloat(this.$.subpages.selected) + ' to ' + i);

        this.goToSubPage(i);
    },

    subpageBack: function() {
        console.log('[subpageBack] set lastSelected from ' + this.lastSelected
            + ' to ' + parseFloat(this.$.subpages.selected));

        this.lastSelected = parseFloat(this.$.subpages.selected);

        this.goToSubPage(0);
    },

    selectAction: function(e, detail) {
        var rel = detail.item.attributes.rel;

        if (detail.isSelected == true && rel && rel.nodeValue != '') {
            this.closeDrawer();
            var label = detail.item.attributes.label;

            if (rel.nodeValue == 'page') {
                if (label && (parseFloat(label.nodeValue) != this.lastpage)) {
                    this.$.nestedpages.parentNode.style.position = 'initial';

                    if (window.location.hash.slice(1) !==
                      this.navItemsOnpage[parseFloat(label.nodeValue)].url)
                      {
                        window.location.hash = '#' +
                          this.navItemsOnpage[parseFloat(label.nodeValue)].url;
                    }
                }
            }
            else if (rel.nodeValue == 'ext') {
                detail.item.classList.toggle('core-selected');
                this.goToPage(this.page);
            }
            else if (rel.nodeValue == 'close') {
                detail.item.classList.toggle('core-selected');
            }
        }

        return;
    },

    selectMenu: function(e, detail, sender) {
        e.preventDefault();

        this.$.drop.toggle();

        var href = (sender !== undefined) ? sender.attributes.rel.nodeValue : 0;

        if (href && href !== '#') {
            window.location = href;
        }
        else {
            this.$.dialog.style.fontFamily = "'RobotoDraft', sans-serif";
            this.$.dialog.toggle();
        }
    },

    toggleDrawer: function() {
        this.$.drawerPanel.togglePanel();
    },

    closeDrawer: function() {
        if (this.$.drawerPanel.selected !== 'main') {
            this.$.drawerPanel.selected = 'main';
        }
    },

    dropdown: function(e) {
        e.preventDefault();

        this.$.drop.toggle();
        this.dropdownState = (this.dropdownState == 'core-closed') ?
          'core-opened' : 'core-closed';
    },

    tbicon: function(e) {
        e.preventDefault();
        return (this.subpage > 0) ? this.subpageBack() : this.toggleDrawer();
    },

    menuIconTransform: function() {
        var shape = (this.navshape === 'menu') ? 'left-arrow' : 'menu';

        if (!!shape) {
            this.navshape = shape;
        }
    },

    getLastHash: function() {
        return this._lastHash;
    },

    setLastHash: function(str) {
        this._lastHash = str;
    },

    getScrollElem: function() {
        return (this.page === 0 || this.$.pages.selected === 0) ?
          this.$.noscroll : this.$.pages;
    },

    getScrollTop: function() {
        return (this.page === 0 || this.$.pages.selected === 0) ?
          this.$.noscroll.scrollTop : this.$.pages.scrollTop;
    },

    getScrollY: function() {
        return this.scrollTop_;
    },

    setScrollY: function(n) {
        this.scrollTop_ = parseFloat(n);
        return;
    },

    scrollToTop: function(e, target, sender) {
        if (e !== null && e !== undefined) {
            e.preventDefault();
        }

        var scrollElem = this.getScrollElem();

        //console.dir('scrollToTop fired.');
        //console.dir('scrollTop: ' + scrollElem.scrollTop);

        var step =- (scrollElem.scrollTop / (this.scrollTopDuration / 15)),
            scrollInterval = setInterval(function() {
                if (scrollElem.scrollTop != 0) {
                    scrollElem.scrollTop += step;
                }
                else clearInterval(scrollInterval);
            }, 15);

        /* There's an odd glitch with the FAB not releasing the focused state
         * properly. Until I know what happens, this workaround seems to help.
         */
        if (sender !== null && sender !== undefined) {
            sender.removeAttribute('pressed');
            sender.removeAttribute('active');
            sender.removeAttribute('focused');
            sender.focused_ = false;

            for (var i, i = 0; i < sender.attributes.length; i++) {
                if (sender.attributes[i].localName === 'focused') {
                    sender.attributes[i] = undefined;
                    break;
                }
            }
        }

        return true;
    },

    scrollToTop2: function(id) {
        var scrollElem = (id === 0) ? this.$.noscroll : this.$.pages;

        //console.dir('scrollToTop2 fired.');
        //console.dir('scrollTop: ' + scrollElem.scrollTop);

        var step =- (scrollElem.scrollTop / (this.scrollTopDuration / 15)),
            scrollInterval = setInterval(function() {
                if (scrollElem.scrollTop != 0) {
                    scrollElem.scrollTop += step;
                }
                else clearInterval(scrollInterval);
            }, 15);

        return true;
    },

    updateFrameHeight: function() {
        if (document.body) {
            var s = document.body.style;
            s.overflow = 'hidden';
            // to avoid the 'blinking bug'
            // https://code.google.com/p/chromium/issues/detail?id=332024
            s.webkitTransform = s.transform = 'translateZ(0)';
        }
    },

    cardTransitionDone: function(e) {
        //console.log('cardTransitionDone');
        //console.dir(e.currentTarget);

        if (this.$.nestedpages.classList.contains('page')) {
            this.updateFrameHeight();
        }

        this.async(function() {
            if (this.$.nestedpages.parentNode.classList.contains('core-selected')) {
                this.$.nestedpages.parentNode.style.position = 'initial';
            } else {
                this.$.nestedpages.parentNode.style.position = '';
            }
        }, null, 650);
    },

    observeScroll: function(e, target, sender) {
        var currScrollTop = this.getScrollY();

        if (e.type === 'scroll' && e.path.length &&
          currScrollTop !== e.path[0].scrollTop)
          {
            if (0 >= e.path[0].scrollTop) {
                this.scrollClass = 'down';
                this.setScrollY(0);
            }
            else if (currScrollTop < e.path[0].scrollTop) {
                // scrolling down
                this.scrollClass = 'down';
                this.setScrollY(e.path[0].scrollTop);
                //console.dir('scrolling down; scrollY='+e.path[0].scrollTop);
            }
            else if (currScrollTop > e.path[0].scrollTop) {
                // scrolling up
                this.scrollClass = 'up';
                this.setScrollY(e.path[0].scrollTop);
                //console.dir('scrolling up; scrollY='+e.path[0].scrollTop);
            }
        }

        return;
    },

    setPrimaryColor: function(str) {
        this.primaryColor = str;
        document.querySelector('meta[name=theme-color]').content = this.primaryColor;
        document.querySelector('#shim').textContent = 'body{overflow:hidden;} overlay-host /deep/ h1 {font-size:24px;font-weight:500;} overlay-host /deep/ h1, overlay-host /deep/ a{color:' + this.primaryLinkColor + ';}';
    }
});
