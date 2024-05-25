import Grid from "../common/Grid";
import Box from "../common/Box";
import Button from "../common/Button";

import { DefaultProductPicture } from "../../const";

function ProductGridItem({ data }) {

    const getDiscount = () => {
        if(data.discount){
            if(data.discount.includes("%")){
                const rate = parseInt(data.discount.replace("%", ""))
                return data.price * rate / 100;
            }else{
                if(!isNaN(data.discount)){
                    return parseInt(data.discount);
                }else{
                    return 0;
                }
            }
        }else{
            return 0;
        }
    }
    const discount = getDiscount(data.discount);
    const discountRate = Math.floor((discount)*100/data.price);

    return (
        <Grid container xs={12} py={1}>
            <Grid item xs={12} px={1}>
                <img style={{ width: "100%", aspectRatio: "4/3", objectFit: "contain" }} src={data.pictures && data.pictures.length > 0 ? `${data.pictures[0].url}` : DefaultProductPicture} />
            </Grid>
            <Grid item xs={12} px={1}>
                <Box display="flex" justifyContent="flex-start" style={{color: '0f1111', fontSize:16}}>
                    {data.name}
                </Box>
            </Grid>
            <Grid item xs={12} px={1}>
                <Box display="flex" justifyContent="flex-start">
                    <span style={{fontSize: 14}}>$</span>
                    <span style={{fontSize: 24, fontWeight:400}}>{data.price - discount}</span>
                    {
                        discount !== 0 &&
                        <span style={{paddingTop:5, paddingLeft:5, fontSize: 13, fontWeight:400, color: '#555', textDecorationLine:'line-through'}}>&nbsp;${data.price}</span>
                    }
                    {
                        discountRate > 30 &&
                        <span style={{paddingTop:5, paddingLeft:5, fontSize: 13, fontWeight:400, color: '#555'}}>{` (${discountRate}% off)`}</span>
                    }
                </Box>
            </Grid>
            <Grid item xs={12} px={1}>
                <Box display="flex" justifyContent="flex-start">
                    <Button variant="contained" size="small" style={{fontSize:10, height:34, marginRight:5}}>Add to cart</Button>
                </Box>
            </Grid>
            <Grid item xs={12} px={1} pt={1}>
                <Box display="flex" justifyContent="flex-start">
                    <span style={{color: '0f1111', fontSize:13, fontWeight:700, paddingTop:6}}>1 in cart - </span>
                    <span style={{color: '0f1111', fontSize:13, fontWeight:700, paddingTop:6, textDecorationLine: 'underline'}}>Remove</span>
                </Box>
            </Grid>
        </Grid>
    )
}

export default function ProductGrid({ data }) {
    return (
        <Grid container>
            {
                data.map(it =>
                    <Grid item xs={6} sm={3}>
                        <ProductGridItem data={it} />
                    </Grid>
                )
            }
        </Grid>
    )
}

