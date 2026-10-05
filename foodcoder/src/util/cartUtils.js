export const calculateTotalPrice = (cartItems, quantities) => {
    const subtotal = cartItems.reduce(
        (acc, food) => acc + food.price * quantities[food.id],
        0
    );

    const tax = subtotal * 0.1;

    const shippingFee = subtotal > 100 ? 0 : 10;

    const total = subtotal + tax + shippingFee;

    return { subtotal, tax,shippingFee, total };
};