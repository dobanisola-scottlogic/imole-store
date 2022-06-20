import { useContext } from "react";
import { ProductListContext } from "../../contexts/product-list.context";
import ProductCard from "../../components/product-card/product-card.component";
import "./shop.styles.scss";
const Shop = () => {
  const { productList } = useContext(ProductListContext);

  return (
    <div className='products-container'>
      {productList.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Shop;
