const calculateEMI = (principal, annualRate, tenure) => {
    if (annualRate === 0) {
        return principal / tenure;
    }

    const monthlyRate = annualRate / 12 / 100;

    const emi =
        principal *
        monthlyRate *
        Math.pow(1 + monthlyRate, tenure) /
        (Math.pow(1 + monthlyRate, tenure) - 1);

    return Number(emi.toFixed(2));
};

module.exports = {
    calculateEMI
};