const child_process = require('child_process');
const config = require('config');
const base64 = require('base-64');

var exec = child_process.exec;
var execSync = child_process.execSync;
var argv = require('yargs')
    .usage('$0 <cmd> [args]')
    .option('bank', {
      alias: 'b',
      describe: 'Bank name [scb, kbank]'
    })
    .option('account', {
      alias: 'a',
      describe: 'base64.encode(username:password)'
    })
    .option('username', {
      alias: 'u',
      describe : 'username'
    })
    .option('password', {
      alias: 'p',
      describe : 'password'
    })
    .command('bank', 'Bank Command', {}, function (argv) {
      console.log('hello welcome to cyber world.')
    })
    .help('help')
    .argv

function getPath(path) {
  return __dirname + '/' + path;
}

if (argv.b == "scb") {
  //var cookie = getPath('storage/cookies/scb.txt');
  // var cmd = 'casperjs' +
  //     ' --cookies-file=' + cookie +
  //     ' --current_path=' + __dirname +
  //     ' ' + getPath('src/scb.js') +
  //     ' --account=' + argv.a;

  var c = config.get('Accounts.scb');
  var cmd = 'casperjs' +
      ' --current_path=' + __dirname +
      ' --account=' + base64.encode(c.account) +
      ' --username=' + base64.encode(c.username) +
      ' --password=' + base64.encode(c.password) +
      ' ' + getPath('src/scb.js');

  exec(cmd, function(error, stdout, stderr){
    if (error !== null) {
      console.log(error);
      // var file = error_log({cmd: cmd, stdout: stdout, error: error, stderr: stderr});
      return;
    } else {
      //http://stackoverflow.com/a/4935780/1162506
      //output = eval("(function(){return " + stdout + ";})()");
      console.log(stdout);
    }
  });
}

if (argv.b == "kbank") {
  var c = config.get('Accounts.kbank');

  //var cookie = getPath('storage/cookies/kbank.txt');
  var cmd = 'casperjs' +
      ' --current_path=' + __dirname +
      ' --account=' + base64.encode(c.account) +
      ' --username=' + base64.encode(c.username) +
      ' --password=' + base64.encode(c.password) +
      ' ' + getPath('src/kbank.js');

  exec(cmd, function(error, stdout, stderr) {
    if (error !== null) {
      console.log(error);
      // var file = error_log({cmd: cmd, stdout: stdout, error: error, stderr: stderr});
      return;
    } else {
      //http://stackoverflow.com/a/4935780/1162506
      //output = eval("(function(){return " + stdout + ";})()");
      console.log(stdout);
    }
  });

}

