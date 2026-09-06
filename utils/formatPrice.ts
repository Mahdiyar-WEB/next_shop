const formatPrice = (price: number) => {
  return new Intl.NumberFormat("fa-IR").format(price);
};

export default formatPrice;
