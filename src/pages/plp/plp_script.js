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
        let currentIndex = 0; // To track how many items are displayed
        const itemsPerPage = 10; // Number of items to show initially or on load more

        // Show shimmer while waiting for data
        showShimmer();

        // Dynamically populate the category and price filters
        populateCategoryFilter(products);
        populatePriceFilter(products);

        // Simulate a delay (for the shimmer effect) and then render products
        setTimeout(() => {
            // Render the first set of products
            const initialProducts = filteredProducts.slice(0, itemsPerPage);
            currentIndex = itemsPerPage;
            renderProducts(initialProducts);
            hideShimmer(); // Hide shimmer once products are rendered

            // Add Load More button functionality
            const loadMoreButton = document.getElementById('loadMoreButton');
            loadMoreButton.addEventListener('click', () => {
                const nextProducts = filteredProducts.slice(currentIndex, currentIndex + itemsPerPage);
                renderProducts(nextProducts, true); // Append new products
                currentIndex += itemsPerPage;

                // Hide the Load More button if all products are loaded
                if (currentIndex >= filteredProducts.length) {
                    loadMoreButton.style.display = 'none';
                }
            });

            // Event listeners for filters and search
            document.getElementById('filterCategory').addEventListener('change', (e) => {
                filteredProducts = filterProducts(e, products);
                currentIndex = 0;
                loadMoreButton.style.display = 'block'; // Show Load More button
                renderProducts(filteredProducts.slice(0, itemsPerPage));
                currentIndex = itemsPerPage;
            });

            document.getElementById('filterPrice').addEventListener('change', (e) => {
                filteredProducts = filterProducts(e, products);
                currentIndex = 0;
                loadMoreButton.style.display = 'block'; // Show Load More button
                renderProducts(filteredProducts.slice(0, itemsPerPage));
                currentIndex = itemsPerPage;
            });

            document.getElementById('searchBar').addEventListener('input', (e) => {
                const searchQuery = e.target.value;
                filteredProducts = searchProducts(searchQuery, products);
                currentIndex = 0;
                loadMoreButton.style.display = 'block'; // Show Load More button
                renderProducts(filteredProducts.slice(0, itemsPerPage));
                currentIndex = itemsPerPage;
            });

        }, 1000); // Simulate a delay of 1 second (for shimmer effect)
    })
    .catch(error => {
        console.error('Error fetching data:', error); // Handle any errors
    });
