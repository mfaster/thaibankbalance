const require = patchRequire(require);
const Casper = require('casper').Casper;
const fs = require('fs');
const base64 = require('base-64')
const x = require('casper').selectXPath;

Casper.prototype.selectOptionByText = function(selector, valueToMatch) {
    this.evaluate(function(selector, valueToMatch){
        var select = document.querySelector(selector),
            found = false;
        Array.prototype.forEach.call(select.children, function(opt, i){
            if (!found && opt.text.indexOf(valueToMatch) !== -1) {
                select.selectedIndex = i;
                found = true;
            }
        });
        // dispatch change event in case there is some kind of validation
        var evt = document.createEvent("UIEvents"); // or "HTMLEvents"
        evt.initUIEvent("change", true, true);
        select.dispatchEvent(evt);
    }, selector, valueToMatch);
};

Casper.prototype.clickContains = function(contains) {
    this.click(x("//a[contains(text(), "+contains +")]"));
};

Casper.prototype.downloadBinary = function(content, path) {
    var f = fs.open(path, 'w');
    f.write(content);
    f.close();
};

Casper.prototype.decode = function(argname) {
    return base64.decode(this.cli.get(argname));
};


module.exports = Casper;