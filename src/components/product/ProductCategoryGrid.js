import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCategoryMap } from "../../redux/category/category.selector";
import ProductGrid from "./ProductGrid";
import Grid  from "../../components/common/Grid";
import Box  from "../../components/common/Box";
import Divider  from "../../components/common/Divider"
import { setProduct } from "../../redux/product/product.slice";


  export default function ProductCategoryGrid({categoryMap}){
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
          <Grid item xs={12} ref={categoryMap[categoryId].ref} px={1} style={{fontSize:24, fontWeight:700}}>
            <Box sx={12}>{categoryMap[categoryId].name}</Box>
            <Box sx={12}><Divider /></Box>
          </Grid>
            <ProductGrid data={categoryMap[categoryId].products} onSelect={handleSelect} />
        </Grid>
      ))
    }
    </div>
      :
      <div>No Category is available</div>
    )
  };
