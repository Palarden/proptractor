'use strict';

exports.config = {
    directConnect: true,
    baseUrl: 'http://computer-database.herokuapp.com/computers/',
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    specs: ['features/*.feature'],
    capabilities: {
        browserName: 'chrome'
    },
    cucumberOpts: {
        require: 'features/step_definitions/*.js',
        format: 'pretty'
    },
    onPrepare: function () {
        //browser.driver.manage().window().maximize();
        browser.ignoreSynchronization = true;
    }
};