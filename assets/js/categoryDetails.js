const getProducts = async() =>{
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const {data} = await axios.get(`https://dummyjson.com/products/category/${category}`);
    const pageTitle = `<h2>${category} Products </h2>`
    document.querySelector(".products h2").innerHTML = pageTitle;
    return data;
}
const displayProducts = async() =>{
    const data = await getProducts();
    console.log(data);
    const result = data.products.map((product) => {
        return `<div class="product">
        <img src="${product.thumbnail}" alt="${product.description}"/>
        <h3>${product.title}</h3>
        <div class="price-discount">
        <span>Price: ${product.price}$</span>
        <span>Discount: ${product.discountPercentage}% </span>
        </div>
        <a href="./productDetails.html?id=${product.id}" class="details-btn"> Product Details </a>
        </div>`;
    }).join(' ');
    
    document.querySelector(".products .row").innerHTML = result;
}
displayProducts();