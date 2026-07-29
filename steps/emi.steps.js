import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';

import { EmiCalculatorPage } from '../pages/EmiCalculatorPage.js';
import { calculateEMI } from '../utils/emiCalculator.js';

const { Given, When, Then } = createBdd();

let emiPage;
let loanAmount;
let interestRate;
let tenure;

Given('I launch the EMI Calculator application', async ({ page }) => {
    emiPage = new EmiCalculatorPage(page);
    await emiPage.navigate();
});

When('I navigate to the Home Loan tab', async () => {
    // Home Loan is the default tab
});

When('I enter loan amount {string}', async ({} , amount) => {
    loanAmount = Number(amount);
    await emiPage.enterLoanAmount(amount);
});

When('I enter interest rate {string}', async ({}, rate) => {
    interestRate = Number(rate);
    await emiPage.enterInterestRate(rate);
});

When('I enter tenure {string}', async ({}, years) => {
    tenure = Number(years);
    await emiPage.enterLoanTenure(years);
});

Then('the EMI should be calculated correctly', async () => {

    const expected = calculateEMI({
    loanAmount,
    interestRate,
    tenureYears: tenure
    });

    
    await emiPage.waitForEMIToUpdate(Math.round(expected.emi));

    const actualEMI = await emiPage.getEMI();
    const actualInterest = await emiPage.getTotalInterest();
    const actualAmount = await emiPage.getTotalAmount();

    expect(actualEMI).toBe(Math.round(expected.emi));
    expect(actualInterest).toBe(Math.round(expected.totalInterest));
    expect(actualAmount).toBe(Math.round(expected.totalAmount));

    

});

Then('the pie chart should be visible', async () => {
    await emiPage.checkEMIPieChartIsVisible();
});

Then('the pie chart values should be greater than zero', async () => {

    const values = await emiPage.getPieChartValues();

    expect(values).toHaveLength(2);

    values.forEach(value => {
        expect(value).toBeGreaterThan(0);
    });

});

When('I navigate to the Personal Loan tab', async () => {
    await emiPage.navigateToPersonalLoan();
});

When('I enter personal loan amount {string}', async ({}, amount) => {
    await emiPage.enterLoanAmount(amount);
});

When('I enter personal loan interest {string}', async ({}, rate) => {
    await emiPage.enterInterestRate(rate);
});

When('I enter personal loan tenure {string}', async ({}, years) => {
    await emiPage.enterLoanTenure(years);
});

When('I select the schedule month', async () => {
    // Change these values if your assignment requires a different month/year
    await emiPage.selectScheduleMonth("January", 2026);
});

Then('the bar chart should be visible', async () => {
    await emiPage.checkBarChartVisible();
});

Then('the bar count should be greater than zero', async () => {
    const totalBars = await emiPage.getBarCount();
    expect(totalBars).toBeGreaterThan(0);
});

Then('the tooltip should display valid values', async () => {
    await emiPage.hoverFirstBar();

    const tooltipValues = await emiPage.getTooltipValues();

    expect(tooltipValues.length).toBeGreaterThan(0);
    expect(tooltipValues[0]).toContain("Year");
    expect(tooltipValues[1]).toContain("Interest");
    expect(tooltipValues[2]).toContain("Total Payment");
});