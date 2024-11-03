import { products } from "../core/data.js";
import { categoryGroup, categoryTemplate } from "../core/selector.js"
import { renderProduct } from "./product.js";

export const createCategory = (categoryName) => {
    const template = categoryTemplate.content.cloneNode(true);
    template.querySelector(".cat-btn").innerText = categoryName;
    return template;
}

export const renderCategory = (categories) => {
    categories.forEach(cat => {
        categoryGroup.append(createCategory(cat))
    });
}

export const handleCategoryGroup = (event) => {
    if (event.target.classList.contains("cat-btn")) {
        const currentCategoryBtn = event.target;
        // console.log(currentCategoryBtn);
        document.querySelector(".cat-btn.active")?.classList.remove("active");
        currentCategoryBtn.classList.add("active");
        const currentCategory = event.target.innerText;
        renderProduct(products.filter((product) => product.category === currentCategory || currentCategory === "All"))
    } 
}

