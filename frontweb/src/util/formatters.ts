export const formatPrice = (price: number) => {
    const params = { maximumFractionDigits: 2, minimumFractionalDigits: 2 };
    return new Intl.NumberFormat('pt-BR', params).format(price);
}