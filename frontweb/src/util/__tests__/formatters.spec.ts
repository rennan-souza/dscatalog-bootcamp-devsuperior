import { formatPrice } from "../formatters";

test('formatPrice shold format number pt-BR when given 10.1', () => {
    const result = formatPrice(10.1);
    expect(result).toEqual("10,10");
});