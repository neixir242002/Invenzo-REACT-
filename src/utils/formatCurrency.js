export const formatCurrency = (value) => {
    const number = Number(value) || 0;

    if (number >= 1000000000) {
        return `${(number / 1000000000).toFixed(1).replace(".", ",")} B`;
    }

    if (number >= 1000000) {
        return `${(number / 1000000).toFixed(1).replace(".", ",")} M`;
    }

    return number.toLocaleString("es-CO");
};