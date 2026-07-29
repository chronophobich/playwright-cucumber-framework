import { expect } from "@playwright/test";

export class EmiCalculatorPage {
    constructor(page) {
        this.page = page;
        this.loanAmountInput = this.page.locator("#loanamount");
        this.interestRateInput = this.page.locator("#loaninterest");
        this.loanTenureInput = this.page.locator("#loanterm");
        this.emiAmount = this.page.locator("#emiamount span");
        this.emiTotalInterest = this.page.locator("#emitotalinterest span");
        this.emiTotalAmount = this.page.locator("#emitotalamount span");
        this.emiPieChart = this.page.locator("#emipiechart svg");
        this.pieChartLabels = this.page.locator("#emipiechart g.highcharts-data-labels text");
        this.personalLoanTab = this.page.locator("#personal-loan");
        this.personalLoanAmount = this.page.locator("#loanamount");
        this.personalLoanInterest = this.page.locator("#loaninterest");
        this.personalLoanTenure = this.page.locator("#loanterm");
        this.scheduleMonth = this.page.locator("#startmonthyear");
        this.barChart = this.page.locator("#emibarchart");
        this.barChartBars = this.page.locator("#emibarchart .highcharts-column-series rect");
        this.barChartTooltip = this.page.locator("#emibarchart g.highcharts-tooltip");
        this.scheduleMonthInput = this.page.locator("#startmonthyear");
        this.monthSelect = this.page.locator(".ui-datepicker-month");
        this.yearSelect = this.page.locator(".ui-datepicker-year");
        this.doneButton = this.page.locator("button.ui-datepicker-close");

    }

    async navigate() {
    await this.page.goto('/');
    }

    async enterLoanAmount(loanAmount) {
        await this.loanAmountInput.fill(loanAmount.toString());
    }

    async enterInterestRate(interestRate) {
        await this.interestRateInput.fill(interestRate.toString());
    }

    async enterLoanTenure(loanTenure) {
        await this.loanTenureInput.fill(loanTenure.toString());
    }
    
    async getEMI() {
        const emiText = await this.emiAmount.textContent();

        return Number(
            emiText
                .replace(/[₹,]/g, "")
                    .trim()
                
        );
    }

    async selectScheduleMonth() {
    await this.scheduleMonthInput.click();

    await this.page.locator("span.month", { hasText: "Jan" }).click();
    }

    async getPieChartValues() {
        const labels = await this.pieChartLabels.allTextContents();

        return labels.map(label => 
            Number(label.replace("%", "").trim())
        )

    }

    async getTooltipValues() {
    return await this.barChartTooltip
        .locator("tspan")
        .allTextContents();
    }

    async checkBarChartVisible() {
    await expect(this.barChart).toBeVisible();
    }

    async getTotalInterest() {
        const totalInterestText = await this.emiTotalInterest.textContent();

        return Number(
            totalInterestText.replace(/[₹,]/g, "")
                .trim()
        )

    }

    async getBarCount() {
    return await this.barChartBars.count();
    }

    async getTotalAmount() {
        const totalAmountText = await this.emiTotalAmount.textContent();

        return Number(
            totalAmountText.replace(/[₹,]/g, "")
                .trim()
        )
    }   

    async checkEMIPieChartIsVisible() {
        await expect(this.emiPieChart).toBeVisible();
    }

    async waitForEMIToUpdate(expectedEMI) {
        await expect(this.emiAmount).toHaveText(expectedEMI.toLocaleString('en-IN'));
    }

    async navigateToPersonalLoan() {
        await this.personalLoanTab.click();
    }

    async hoverFirstBar() {
    await this.barChartBars.first().hover();
    }

}

