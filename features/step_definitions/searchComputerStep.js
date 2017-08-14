'use strict';
var computers = require('../../pages/Computers');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports = function () {

    this.When(/^Search computer by name "([^"]*)"$/, function (computerName, callback) {
        computers.searchComputer(computerName);
        callback();
    });

    this.Then(/^Check that computer with name "([^"]*)" is displayed$/, function (computerName, callback) {
        expect(computers.getTextFromFirstLink()).to.eventually.equal(computerName).and.notify(callback);
    });

    this.Then(/^Check that computer with name "([^"]*)" is in list of computers$/, function (computerName, callback) {
        expect(computers.checkThatComputerWithNameIsInListOfComputers(computerName)).to.eventually.equal(true).and.notify(callback);
    });

    this.Then(/^I can verify computers info:$/, function (data, callback) {
        var dataFromTable = data.hashes();
        computers.getListofComps().then(function (data) {
            // how to validate by computer name? data.compname =  dataFromTable.Computer name;
            console.log(data.Introduced === dataFromTable.Introduced && data.Discontinued === dataFromTable.Discontinued && data.Company === dataFromTable.Company)
        });
        callback();
    });
};