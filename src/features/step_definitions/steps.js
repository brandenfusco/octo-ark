var webdriverio = require('webdriverio');
var options = {
    desiredCapabilities: {
        browserName: 'firefox'
      },
        waitforTimeout: 120 * 1000,
        host: '172.16.0.6',
        port: 4444,
};

var browser = webdriverio.remote(options);


module.exports = function () {
  this.Given(/^I am on google\.com$/, function (done) {
    browser
        //.remote(options)
        .url('http://www.google.com/')
        .call(done);
  });

  this.When(/^I search for "([^"]*)"$/, function (searchTerm, done) {
    browser
      .setValue('input[id="lst-ib"]', searchTerm)
      .click('//*[@id="sblsbb"]/button')
      .call(done);
  });

  this.Then(/^I should see "([^"]*)"$/, function (link, done) {
    browser
      .waitForExist('#rso > div:nth-child(1) > div:nth-child(1) > div > h3 > a',link)
      .call(done);

  });

  this.Before(function (scenario, done) {
    browser.init().call(done);
  });

  this.After(function (scenario, done) {
    browser.end().call(done);
  });
};