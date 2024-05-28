import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Grid } from '@mui/material';

const styles = {
  root: {
    width: '150px'
  },
  increaseBtn: {
    width: '30px',
    height: '30px',
    borderTop: '1px solid #999',
    borderBottom: '1px solid #999',
    borderLeft: '1px solid #999',
    display: "flex", alignItems: "center", justifyContent: "center"
  },
  decreaseBtn: {
    width: '30px',
    height: '30px',
    borderTop: '1px solid #999',
    borderBottom: '1px solid #999',
    borderRight: '1px solid #999'
  },
  quantityInput: {
    height: '28px',
    paddingLeft: '10px',
    border: '1px solid #999'
  }
};

/**
 * 
 * @param {*} item --- can be product or addtion object 
 */
export default function QuantityInput({ val, onChange }) {
  const [quantity, setQuantity] = useState(val);

  const increase = () => {
    const v = quantity + 1;
    setQuantity(v);
    onChange(1);
  }

  const decrease = () => {
    if (quantity > 0) {
      const v = quantity - 1;
      setQuantity(v);
      onChange(-1);
    } else {
      // onChange(0);
    }
  }

  const change = (e) => {
    const v = e.target.value === '' ? 0 : parseInt(e.target.value);
    e.target.value === '' ? setQuantity('') : setQuantity(v);
    onChange(v - parseInt(quantity));
  }

  return (
    <Grid container display="flex" style={styles.root}>
      <Grid item xs={3} onClick={increase} display="flex"
        justifyContent="center"
        alignItems="center">
        <AddIcon fontSize="small" />
      </Grid>

      <Grid item xs={6}>
        {/* <Input style={styles.quantityInput} type="number" value={quantity} onChange={change} /> */}
        <input style={{width: '90%', height: 28, paddingLeft: 10}} value={quantity} onChange={change} type="number"/>
      </Grid>

      <Grid item xs={3} onClick={decrease} display="flex"
        justifyContent="center"
        alignItems="center">
        <RemoveIcon fontSize="small"/>
      </Grid>
    </Grid>
  )
}