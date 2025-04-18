function generateExpirationDate(currentDate: Date): Date {
    currentDate.setHours(currentDate.getHours() + 24);
    const expDate = currentDate;
    return expDate;
}

export { generateExpirationDate };
