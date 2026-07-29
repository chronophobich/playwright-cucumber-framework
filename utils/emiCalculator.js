export function calculateEMI({
    loanAmount,
    interestRate,
    tenureYears,
}) {

    if (loanAmount <= 0) {
        throw new Error("Loan amount must be greater than 0.");
    }

    if (tenureYears <= 0) {
        throw new Error("Tenure must be greater than 0.");
    }


    const monthlyInterestRate = interestRate / 12 / 100;

    const totalPayments = tenureYears * 12;

    const compoundedRate = Math.pow(1 + monthlyInterestRate, totalPayments);

    const emi = (loanAmount * monthlyInterestRate * compoundedRate) / (compoundedRate - 1);

    const totalAmount = emi * totalPayments;
    
    const totalInterest = totalAmount - loanAmount;


    return {
    emi,
    totalAmount,
    totalInterest
};
}    