const core = require('./share/core');
const casper = core.casperInit();
const date = require('date-and-time');


var filename = "SCB_" + date.format(new Date(), 'YYYY-MM-DD_HH-mm-ss');
var user = casper.decode('username'),
    pass = casper.decode('password'),
    acc  = casper.decode('account');

casper.start();
casper.thenOpen('https://m.scbeasy.com/online/easynet/mobile/login.aspx', function() {});

// Login to SCB.
casper.waitForText('SCB Easy Net', function then() {
  this.fill('form#ctl00', {
    'tbUsername': user,
    'tbPassword': pass
  });
  this.click('#Login_Button');
});

// Checking the image that logged in.
casper.then(function() {
  this.capture('screenshots/'+ filename +'_logged.png');
})

// Click to asking for statement.
casper.waitForText('Log out', function() {
  this.click('#DataProcess_lbBalInquiry');
})

// Click the balance account.
casper.waitForText('สอบถามยอด', function() {
  //this.click('#DataProcess_RepeaterDeposit_lbDepositButton_0');
  this.clickContains(acc);
})

// Click today statement.
casper.waitForText('รายการวันนี้', function() {
  this.click('#DataProcess_lbTodayStatement');
})

// Save the html to process.
casper.then(function() {
  this.capture('screenshots/'+ filename +'_statement.png');
  var content = this.getPageContent();
  var path = './html/'+ filename +'_statement.html';
  this.downloadBinary(content, path);
})

// Logout the procerss.
casper.wait(2000, function() {
  this.click('#Logout_LinkButton');
  this.echo('Logged Out');
})

casper.run();
