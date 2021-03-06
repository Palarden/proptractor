'use strict';
var jquery = require('../../../pages/Jquery');
var helper = require('../../../helpers/helper');
module.exports = function () {

    this.When(/^I open datepicker page$/, () => {
        browser.get('/datepicker/');
    });

    this.When(/^I open datepicker$/, () => {
        return helper.switchToIframe().then(() => {
            return $(jquery.selectors.datePickerField).click();
        })
    });

    this.When(/^I select date "([^"]*)" "([^"]*)" "([^"]*)"$/, (month, year, day, callback) => {
        function selectDate(index) {
            if (index >= 100) {
                return;
            }
            jquery.checkDate(month, year).then((result) => {
                if (result == false) {
                    return $(jquery.selectors.nextButtonOnDatePicker).click().then(() => {
                        return selectDate(index + 1);
                    })
                } else if (result == true) {
                    return element(by.xpath('//tbody//a[contains(., ' + day + ')]')).click();
                }
            });
            callback();
        }

        selectDate(0);
    });

};