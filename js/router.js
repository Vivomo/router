(function (root) {
    root.Router = Router;
    function Router(cfg) {
        return new Router.fn.init(cfg);
    }

    Router.fn = Router.prototype = {
        cache: {},
        defaultCfg: {
            suffix: '.html',
            basePath: ''
        },
        /**
         *
         * @param {object} cfg
         * view: id or element
         */
        init: function (cfg) {
            var view = cfg.view;
            var viewElem = this.viewElem = typeof view == 'string' ? document.getElementById(cfg.view) : view;
            if (!isValidElem(viewElem)) {
                throw Error('invalid view');
            }
            this.setConfig(cfg);
            window.onhashchange = this.onHashChange.bind(this);
        },
        trigger: function () {
            if (location.hash) {
                this.load(location.hash);
            }
        },
        load: function (hash) {
            if (hash[0] == '#') {
                hash = hash.substring(1);
            }
            this.getXHRHtml(this.getTarget(hash), function (xhr) {
                this.viewElem.innerHTML = xhr.responseText;
            }.bind(this));
        },
        onHashChange: function (e) {
            var url = e.newURL,
                index = url.indexOf('#'), hash;
            if (index == -1) {

            } else {
                hash = url.substring(url.indexOf('#') + 1);
                this.load(hash);
            }
        },
        getTarget: function (hash) {
            if (hash.indexOf('.') == -1) {
                return this.getConfig('basePath') + hash + this.getConfig('suffix');
            }
            return hash
        },
        getXHRHtml: function (url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        callback && callback(xhr);
                    } else {
                        //TODO
                    }
                }
            };
            xhr.send(null);
        },
        setConfig: function (cfg) {
            this.cfg = this.defaultCfg;
            for (var k in this.cfg) {
                cfg[k] && (this.cfg[k] = cfg[k])
            }
        },
        getConfig: function (key) {
            return this.cfg[key];
        }
    };

    Router.fn.init.prototype = Router.fn;

    /**
     *
     * @param param
     * @returns {boolean}
     */
    function isValidElem(param) {
        return Object.prototype.toString.call(param).substr(8,4) == 'HTML' && !!param.parentNode;
    }



})(window);
