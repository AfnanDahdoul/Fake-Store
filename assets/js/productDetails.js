const getProducts = async () => {
    // Getting product ID from the URL
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    try {
        const loader = document.querySelector(".loader-container");
        loader.classList.add("active");

        // Fetch product details
        const response = await axios.get(`https://dummyjson.com/products/${productId}`);

        const product = response.data;

        // Update the image
        document.querySelector(".picture").innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}" class="product-image" />
        `;

        // Update the details
        document.querySelector(".details").innerHTML = `
            <div><h2>${product.title}</h2></div>
            <div><p>${product.description}</p></div>
            <div><p><strong>Price:</strong> $${product.price}</p></div>
            <div><p><strong>Discount:</strong> ${product.discountPercentage}%</p></div>
            <div><p><strong>Category:</strong> ${product.category}</p></div>
        `;

    } catch (error) {
        document.querySelector(".detailsPart").innerHTML = "<p>ERROR HAPPENED WHILE LOADING PRODUCT DETAILS :(</p>";
    } finally {
        // Remove loading animation
        document.querySelector(".loader-container").classList.remove("active");
    }
};

getProducts();