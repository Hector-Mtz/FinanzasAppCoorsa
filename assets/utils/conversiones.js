export const formatoMoney = (number) => {
    const exp = /(\d)(?=(\d{3})+(?!\d))/g;
    const rep = '$1,';
    return number.toString().replace(exp, rep);
};

export const IVA = 0.16;
