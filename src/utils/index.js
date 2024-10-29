/**
 * This function calculates the total price of a new order
 * @param {Array} products - Array of product objects
 * @returns {number} Total Price
 */

export const totalPrice = (products) => {
    let sum = 0;
    products.forEach(product => {
        sum += product.price;
    });
    return sum;
};
