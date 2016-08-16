const core = require('./share/core');
const casper = core.casperInit();
const date = require('date-and-time');

var filename = "KBANK_" + date.format(new Date(), 'YYYY-MM-DD_HH-mm-ss');
var user = casper.decode('username'),
    pass = casper.decode('password'),
    acc  = casper.decode('account');

// Get start
casper.start();
casper.thenOpen('https://online.kasikornbankgroup.com/K-Online/login.jsp?lang=th&type=', function() {});

// pre login screen
casper.waitForUrl('/preLogin/', function(){
	this.echo('Redirected to pre login');
	this.click('input[type="image"]');
});

// Login
casper.waitForText('K-Cyber', function then() {
  this.capture('screenshots/'+ filename +'_logged.png');
  this.sendKeys('#userName', user);
  this.sendKeys('#password', pass);
  this.click('#loginBtn');
});

// Click to asking for statement.
casper.waitForText('ออกจากระบบ', function() {
  this.click('img[alt="K-Cyber Banking"]');
})

casper.withFrame('ssoIFrame1', function() {
	// click first menu
	casper.then(function() {
		this.click('img#AA'); // primary
		this.clickLabel('รายการเคลื่อนไหวล่าสุด', 'a');
	});

	// Click the balance account.
	casper.waitForText('เรียกดูข้อมูลจาก', function() {
		this.echo('Asking for statement');
		this.selectOptionByText('select[name="acctId"]', acc);
	})

	casper.waitForText('ประเภทรายการ', function() {
		this.capture('screenshots/'+ filename +'_statement.png');
	})

	// Save the html to process.
  casper.then(function() {
    var content = this.getHTML('table[rules="rows"]');
    var path = './html/'+ filename +'_statement.html';
    this.downloadBinary(content, path);
  })

  // Logout the procerss.
  casper.wait(2000, function() {
    this.click('.all_service text_new_logoff_style');
    this.echo('Logged Out');
  })
});

casper.run();
