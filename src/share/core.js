var require = patchRequire(require);
require('./share/casper.js');

function casperInit()
{
    var casper = require('casper').create();

    // casper.options.verbose = true;
    casper.options.logLevel = "debug";
    casper.options.viewportSize = {
        width: 1366,
        height: 1000
    };
    casper.options.pageSettings = {
        loadImages: false,
        // loadPlugins: false,
        javascriptEnabled: true,
        // cookiesEnabled: true,
        webSecurityEnabled: false,
        // userAgent: 'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; Touch; rv:11.0) like Gecko'
        userAgent: 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36'
    };
    //casper.options.clientScripts = [current_path +'/share/inject_js.js'];
    casper.options.waitTimeout = 40000;
    casper.options.onWaitTimeout = function(timeout, details) {
        this.die(f("Wait timeout of %dms expired, exiting.", timeout));
    };

    return casper;
}

module.exports = {
    casperInit: casperInit
};