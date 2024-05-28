import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { DefaultProductPicture } from '../const';

const Thumbnail = styled('img')(({ theme, selected }) => ({
  width: '100%',
  cursor: 'pointer',
  border: selected ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',
  borderRadius: theme.shape.borderRadius,
  transition: 'border 0.3s ease',
}));

const BigImage = styled('img')(() => ({
  width: '100%',
  maxHeight: '500px',
  objectFit: 'contain',
}));

const styles = {
    image:{
        width: "100%",
        aspectRatio: "4/3",
        objectFit: "contain",
        
    }
}

export default function HorizontalImageViewer({images}) {
  const [selectedImage, setSelectedImage] = useState(images[0]);
 // sx={{ width: '80%', margin: 'auto', textAlign: 'center' }}
  return (
    <Box xs={12}>
        <img style={styles.image} src={selectedImage && selectedImage.url ? `${selectedImage.url}` : DefaultProductPicture} />
        <Grid container spacing={1} pt={1}>
          {images.map((image, index) => (
            <Grid item xs={3} key={index}>
              <img
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                style={{...styles.image, border: "1px solid #999"}}
                //selected={selectedImage === image}
                //onClick={() => setSelectedImage(image)}
              />
            </Grid>
          ))}
        </Grid>
      {/* <Typography variant="h4" gutterBottom>
        Image Viewer
      </Typography>
      <BigImage src={selectedImage} alt="Selected" />
       */}
    </Box>
  );
};

