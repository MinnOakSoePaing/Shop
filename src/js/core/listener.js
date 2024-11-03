import { handleCategoryGroup } from "../app/category.js"
import { handleproductGroup } from "../app/product.js"
import { HandlerCardItemGroup } from "./card.js"
import { cardItemGroup, categoryGroup, productGroup } from "./selector.js"

const listener = () => {
categoryGroup.addEventListener("click",handleCategoryGroup)
productGroup.addEventListener("click",handleproductGroup)
cardItemGroup.addEventListener("click",HandlerCardItemGroup)
}
export default listener