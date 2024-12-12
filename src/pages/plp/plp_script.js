// Function to render products in the grid
function renderProducts(products) {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = ''; // Clear the product grid before re-rendering
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <h2 class="product-title">${product.title}</h2>
            <p class="product-price">$${parseFloat(product.price).toFixed(2)}</p>
        `;
        productGrid.appendChild(productCard);
    });
}

// Function to populate category filter options dynamically
function populateCategoryFilter(products) {
    const categories = [...new Set(products.map(product => product.category))];
    const filterCategory = document.getElementById('filterCategory');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        filterCategory.appendChild(option);
    });
}

// Function to populate price filter options dynamically (e.g., "0-50", "50-100", etc.)
function populatePriceFilter(products) {
    const priceRanges = ['0-50', '51-100', '101-200', '200+'];
    const filterPrice = document.getElementById('filterPrice');
    priceRanges.forEach(range => {
        const option = document.createElement('option');
        option.value = range;
        option.textContent = range;
        filterPrice.appendChild(option);
    });
}

// Function to filter products based on the search query
function searchProducts(query, products) {
    return products.filter(product => product.title.toLowerCase().includes(query.toLowerCase()));
}

// Show shimmer effect while data is being fetched
function showShimmer() {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = ''; // Clear any existing content
    const shimmerContainer = document.createElement('div');
    shimmerContainer.classList.add('shimmer-container');
    
    for (let i = 0; i < 8; i++) {
        const shimmerCard = document.createElement('div');
        shimmerCard.classList.add('shimmer-card');
        shimmerContainer.appendChild(shimmerCard);
    }
    
    productGrid.appendChild(shimmerContainer);
}

// Hide shimmer and display actual products
function hideShimmer() {
    const productGrid = document.getElementById('productGrid');
    const shimmerContainer = document.querySelector('.shimmer-container');
    if (shimmerContainer) {
        shimmerContainer.remove(); // Remove shimmer effect
    }
}

// Fetch products data from an API using fetch
fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        let products = data; // Keep track of the original data
        let filteredProducts = [...products]; // Initialize filtered products

        // Show shimmer while waiting for data
        showShimmer();

        // Dynamically populate the category and price filters
        populateCategoryFilter(products);
        populatePriceFilter(products);

        // Simulate a delay (for the shimmer effect) and then render products
        setTimeout(() => {
            // Render the products initially
            renderProducts(filteredProducts);
            hideShimmer(); // Hide shimmer once products are rendered

            // Event listeners for filter and sort
            document.getElementById('filterCategory').addEventListener('change', (e) => {
                filteredProducts = filterProducts(e, products);
                renderProducts(filteredProducts); // Re-render after filtering
            });

            document.getElementById('filterPrice').addEventListener('change', (e) => {
                filteredProducts = filterProducts(e, products);
                renderProducts(filteredProducts); // Re-render after filtering
            });

            document.getElementById('sortCategory').addEventListener('change', (e) => {
                filteredProducts = sortProducts(e, filteredProducts); // Use filtered products for sorting
                renderProducts(filteredProducts); // Re-render after sorting
            });

            document.getElementById('sortPrice').addEventListener('change', (e) => {
                filteredProducts = sortProducts(e, filteredProducts); // Use filtered products for sorting
                renderProducts(filteredProducts); // Re-render after sorting
            });

            // Event listener for search bar
            document.getElementById('searchBar').addEventListener('input', (e) => {
                const searchQuery = e.target.value;
                filteredProducts = searchProducts(searchQuery, products); // Filter based on search query
                filteredProducts = filterProducts({ target: document.getElementById('filterCategory') }, filteredProducts); // Apply category filter after search
                filteredProducts = filterProducts({ target: document.getElementById('filterPrice') }, filteredProducts); // Apply price filter after search
                filteredProducts = sortProducts({ target: document.getElementById('sortCategory') }, filteredProducts); // Apply category sort after search
                filteredProducts = sortProducts({ target: document.getElementById('sortPrice') }, filteredProducts); // Apply price sort after search
                renderProducts(filteredProducts); // Re-render after searching
            });

        }, 1000); // Simulate a delay of 1 second (for shimmer effect)
    })
    .catch(error => {
        console.error('Error fetching data:', error); // Handle any errors
    });
