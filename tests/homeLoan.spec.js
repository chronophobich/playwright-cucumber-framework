import { test, expect } from "@playwright/test";
import { EmiCalculatorPage } from "../pages/EmiCalculatorPage";
import { calculateEMI } from "../utils/emiCalculator";
import { secureHeapUsed } from "node:crypto";

test('Validate the EMI Pie Char', async ({ page }) => {
    const emiCalculatorPage = new EmiCalculatorPage(page);

    const loanAmount = 450000;
    const interestRate = 7.5;
    const tenureYears = 20;

    await emiCalculatorPage.navigate();

    await emiCalculatorPage.enterLoanAmount(loanAmount);
    await emiCalculatorPage.enterInterestRate(interestRate);
    await emiCalculatorPage.enterLoanTenure(tenureYears);

    const expected = calculateEMI({
        loanAmount,
        interestRate,
        tenureYears
    })

    await emiCalculatorPage.waitForEMIToUpdate(Math.round(expected.emi));
    await emiCalculatorPage.checkEMIPieChartIsVisible();
    const pieValues = await emiCalculatorPage.getPieChartLabels();

    
    const actualEMI = await emiCalculatorPage.getEMI();

    const actualTotalInterest = await emiCalculatorPage.getTotalInterest();

    const emiTotalAmount = await emiCalculatorPage.getTotalAmount();

    expect(actualEMI).toBe(Math.round(expected.emi));
    expect(actualTotalInterest).toBe(Math.round(expected.totalInterest));
    expect(pieValues).toHaveLength(2);
    pieValues.forEach(value => {
        expect(value).toBeGreaterThan(0);
    })
})

test('Validate the EMI Bar Char', async ({ page }) => {
    const emiCalculatorPage = new EmiCalculatorPage(page);
    const loanAmount = 1000000;
    const interestRate = 12;
    const tenureYears = 5;

    await emiCalculatorPage.navigate();
    await emiCalculatorPage.clickPersonalLoanTab();
    await emiCalculatorPage.enterLoanAmount(loanAmount);
    await emiCalculatorPage.enterInterestRate(interestRate);
    await emiCalculatorPage.enterLoanTenure(tenureYears);
    await emiCalculatorPage.selectScheduleMonth("Jan", 2026);
    await emiCalculatorPage.checkBarChartVisible();

    const totalBars = await emiCalculatorPage.getBarCount();

    console.log(totalBars);

    expect(totalBars).toBeGreaterThan(0);

    await emiCalculatorPage.hoverFirstBar();

    await emiCalculatorPage.hoverFirstBar();

    const tooltipValues = await emiCalculatorPage.getTooltipValues();

    expect(tooltipValues.length).toBeGreaterThan(0);

    expect(tooltipValues[0]).toContain("Year");
    expect(tooltipValues[1]).toContain("Interest");
    expect(tooltipValues[2]).toContain("Total Payment");

        





})
