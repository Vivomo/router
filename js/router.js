(function (root) {
    root.Router = Router;
    function Router(cfg) {
        return new Router.fn.init(cfg);
    }

    Router.fn = Router.prototype = {
        defaultCfg: {
            suffix: '.html'
        },
        /**
         *
         * @param {object} cfg
         * view: id or element
         */
        init: function (cfg) {
            var view = cfg.view;
            var viewElem = typeof view == 'string' ? document.getElementById(cfg.view) : view;
            if (!isValidElem(viewElem)) {
                throw Error('invalid view');
            }
            window.onhashchange = function (e) {
                console.log(e.newURL)
                var url = e.newURL,
                    index = url.indexOf('#'), hash;
                if (index == -1) {

                } else {
                    hash = url.substring(url.indexOf('#') + 1);

                }

            };
            console.log(this)
        },
        getTarget: function (hash) {
            if (hash.indexOf('.') == -1) {
                return hash + Router.prototype.getConfig('suffix')
            }
            return hash
        },
        getXHRHtml: function (url) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    console.log(xhr.responseText);
                }
            };
            xhr.send(null);
        },
        setConfig: function (cfg) {
            var defaultCfg = Router.prototype.defaultCfg;
            for (var k in cfg) {
                defaultCfg[k] = cfg[k]
            }
        },
        getConfig: function (key) {
            return Router.prototype.defaultCfg[key];
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
