export const shippingCost = 25000;

export const totalPay = (products) => {
  let total = products.map(p => (p.price - p.discountPrice) * p.quantity)
    .reduce((a, b) => a + b, 0);

  return total;
}

export const totalDiscount = (products) => {
  let total = products.map(p => p.discountPrice * p.quantity)
    .reduce((a, b) => a + b, 0);

  return total;
}

export const totalBill = (products) => {
  let total = products.map(p => (p.price - p.discountPrice) * p.quantity)
    .reduce((a, b) => a + b, 0);

  return total + shippingCost;
}