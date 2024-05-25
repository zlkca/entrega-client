import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCategoryMap } from "../../redux/category/category.selector";
import ProductList from "./ProductList";
import { Grid } from "@mui/material";
import { setProduct } from "../../redux/product/product.slice";


  export default function ProductCategoryList({categoryMap}){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selected, setSelected] = useState();


    function handleSelect(product) {
      setSelected(product)
      dispatch(setProduct(product))
      navigate(`/products/${product._id}`)
    }
  
    // function handleIncrease(v) {
  
    // }
    
    // function handleDecrease(v) {
  
    // }

    // function handleQuantityChange(v) {
  
    // }
  
    // function getPictureUrl(d) {
    //   return d.pictures[0];
    // }
  
  
  
    return (
      categoryMap && Object.keys(categoryMap).length > 0 ?
      <div>
        {
            Object.keys(categoryMap).map((categoryId) => (
                categoryMap[categoryId].products && categoryMap[categoryId].products.length > 0 &&
        <Grid container xs={12} sm={12} md={12}
          key={categoryMap[categoryId]._id}
          id={categoryMap[categoryId]._id}
        >
          <Grid item xs={12} ref={categoryMap[categoryId].ref}>{categoryMap[categoryId].name}</Grid>
            <ProductList products={categoryMap[categoryId].products} onSelect={handleSelect} />
        </Grid>
      ))
    }
    </div>
      :
      <div>No Category is available</div>
    )
  };
