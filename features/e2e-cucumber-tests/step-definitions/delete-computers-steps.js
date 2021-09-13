const { Given, When, Then } = require('cucumber');
const { By, until } = require('selenium-webdriver');
const expect = require('chai').expect;
const deleteComputersLocators = require('../locators/delete-computers');
const helperFunctions = require('../../support/helper-functions');


Given('I click on the computer name in the first row', async function () {
    const computerName = await this.driver.findElement(By.css(deleteComputersLocators.FIRST_COMPUTER_NAME));
    await this.driver.wait(until.elementIsVisible(computerName));
    await computerName.click();
});

When('I click on the delete button', async function () {
    await helperFunctions.waitForTimeout(2 * this.longTimeout);
    const deleteButton = await this.driver.findElement(By.css(deleteComputersLocators.DELETE_BTN));
    await this.driver.wait(until.elementIsVisible(deleteButton));
    await deleteButton.click();
});

Then('I should see the delete confirmation message {string}', async function(expectedDeleteConfirmationMessage) {
    await this.driver.manage().setTimeouts({ implicit: this.longTimeout });
    const deleteComfirmationPane = await this.driver.findElement(By.css(deleteComputersLocators.DELETE_COMFIRMATION));
    await this.driver.wait(until.elementIsVisible(deleteComfirmationPane));
    const actualDeleteConfirmationMessage = await deleteComfirmationPane.getText();
    expect(actualDeleteConfirmationMessage).to.equal(expectedDeleteConfirmationMessage,
        `The displayed message ${actualDeleteConfirmationMessage} is not as expected ${expectedDeleteConfirmationMessage} after deleting a computer.`)
});
