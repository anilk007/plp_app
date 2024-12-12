// Function to filter products by category or price
function filterProducts(event, products) {
    const filterCategory = document.getElementById('filterCategory');
    const filterPrice = document.getElementById('filterPrice');
    let filteredProducts = [...products];

    // Filter by category
    const categoryFilter = filterCategory.value;
    if (categoryFilter) {
        filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
    }

    // Filter by price
    const priceFilter = filterPrice.value;
    if (priceFilter) {
        const priceRange = priceFilter.split('-').map(val => parseFloat(val));
        filteredProducts = filteredProducts.filter(product => {
            const price = parseFloat(product.price);
            if (priceRange[1]) {
                return price >= priceRange[0] && price <= priceRange[1];
            } else {
                return price >= priceRange[0];
            }
        });
    }

    return filteredProducts; // Return filtered products
}
