/* function to get the categories from the API */
const getGategories = async() =>{
    const { data } = await axios.get(`https://dummyjson.com/products/category-list`);
    return data;

}
/* function to display the categories */
const displayCategories = async() =>{
    /* when the data is still being loaded it will show the loading circle */
    const loader = document.querySelector(".loader-container");
    loader.classList.add("active");
    try{
        const categories = await getGategories();
        const result = categories.map((category) =>{
            return `<div class="category">
            <h2>${category}</h2>
            <a href='categryDetails.html?category=${category}'>Details</a>
            </div>`;
        }).join(' ');
    
        document.querySelector(".categories .row").innerHTML = result;
        //when the data is loaded remove the loading circle
    }catch(error){
        document.querySelector(".categories .row").innerHTML = "<p> ERROR HAPPENED WHILE LOADING CATEGORIES:( </p>";
    }finally{
        loader.classList.remove("active");
    }
}
/* get the products from the API */
const getProducts = async (page) => {
    const skip = ( page - 1 ) * 30;
    const response = await axios.get(`https://dummyjson.com/products?limit=30&skip=${skip}`);
    return response.data; // Return entire data object
};
/*display the products*/
const displayProducts = async (page = 1) => {
    const loader = document.querySelector(".loader-container");
    loader.classList.add("active");

    try {
        const { products, total } = await getProducts(page); // Correct destructuring
        const numberOfPages = Math.ceil(total / 30); // Now correctly calculates pages

        console.log("Total Products:", total);
        console.log("Number of Pages:", numberOfPages);
        console.log("Products:", products);

        // Render products
        const result = products.map((product) => {
            return `<div class="product">
                <img src="${product.thumbnail}" alt="${product.description}" />
                <h3>${product.title}</h3>
                <span>$${product.price}</span>
            </div>`;
        }).join('');

        document.querySelector(".products .row").innerHTML = result;

        // Render pagination
        let paginationLink = ``;

        //to decide whther to enable or disable the privious button
        if (page == 1){
            /* i have removed the onclick event */
            paginationLink += `<li class="page-item"><button class="page-link" disabled>&laquo;</button></li>`;
        }
        else{
            paginationLink +=`<li class="page-item"><button onclick=displayProducts(${parseInt(page) - 1}) class="page-link">&laquo;</button></li>`;
        }

        /*create the other pages links */
        for (let i = 1; i <= numberOfPages; i++) {
            paginationLink += `<li class="page-item ${i == page ? 'active':''}"><button onclick=displayProducts(${i}) class="page-link">${i}</button></li>`;
        }

        //to decide whther to enable or disable the next button
        if (page == 7){
            /* i have removed the onclick event */
            paginationLink += `<li class="page-item"><button class="page-link" disabled>&raquo;</button></li>`;
        }
        else{
            paginationLink +=`<li class="page-item"><button onclick=displayProducts(${parseInt(page) + 1}) class="page-link" >&raquo;</button></li>`;
        }
        
        document.querySelector(".pagination").innerHTML = paginationLink;

    } catch (error) {
        console.error("Error fetching products:", error);
        document.querySelector(".products .row").innerHTML = "<p> ERROR HAPPENED WHILE LOADING PRODUCTS :( </p>";
    } finally {
        loader.classList.remove("active");
    }
};

displayProducts();
displayCategories();


//for navbar scroll
window.onscroll = function (){
    const navbar = document.querySelector(".header");
    const products = document.querySelector(".products");

    if (window.scrollY > products.offsetTop){
        navbar.classList.add("scrollNavbar");
    }
    else{
        navbar.classList.remove("scrollNavbar");
    }
}

//for the count down timer
const countDown = () =>{
    const countDownDate = new Date("2025-02-28T00:00:00").getTime();
    const now = new Date().getTime();//it will give me the time of curren day

    const distance = countDownDate - now;
    const days = Math.floor(distance/86400000);
    const hours = Math.floor((distance % 86400000)/ 3600000);
    const minutes = Math.floor((distance % (1000*60*60))/ 60000);
    const seconds = Math.floor((distance % (1000*60))/ 1000);
    document.querySelector("#days").textContent = days;
    document.querySelector("#hours").textContent = hours;
    document.querySelector("#minutes").textContent = minutes;
    document.querySelector("#seconds").textContent = seconds;

}
setInterval( () => {
    countDown();
}, 1000) // it will count every secound