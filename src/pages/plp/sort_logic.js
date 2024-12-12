// Function to sort products by category or price
function sortProducts(event, products) {
    const sortBy = event.target.value;
    let sortedProducts = [...products];

    if (sortBy === 'category') {
        sortedProducts.sort((a, b) => a.category.localeCompare(b.category));
    } else if (sortBy === 'priceLowToHigh') {
        sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortBy === 'priceHighToLow') {
        sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    return sortedProducts; // Return sorted products
}
