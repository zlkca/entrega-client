import { Grid } from "@mui/material"



function Product({ data, onSelect }) {
  return (
    <Grid container display="flex" pt={2} px={2} spacing={2}
      onClick={() => onSelect(data)}
      key={data._id}
    >
      <Grid item xs={4} sm={4} md={4}>
        <img src={"logo192.png"} alt="" />
      </Grid>
      <Grid item xs={8} sm={8} md={8}>
        <Grid container display="flex" pt={2} px={2} spacing={2}>
          <Grid item xs={12} sm={12} md={12}>{data.name}</Grid>
          <Grid item xs={12} sm={12} md={12}>${data.price}</Grid>
          <Grid item xs={12} sm={12} md={12}>{data.description}</Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default function ProductList({ products, onSelect }) {
  return (
    <>
      {products.map(d =>
        <Product data={d} onSelect={onSelect} />
      )}
    </>
  )
}