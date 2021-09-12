import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  Backdrop,
  Box, CircularProgress,
  Container,
  Grid,
  Pagination
} from '@material-ui/core';
import PropTypes from 'prop-types';
import ProductCard from '../components/product/ProductCard';

const ProductList = ({ category, text }, props) => {
  const [loading, SetLoading] = useState(true);
  const [products, setProducts] = useState([]);
  console.log(loading);
  console.log(text);
  console.log(props);

  useEffect(() => {
    const apiRoute = (category && `/category/${category}`) || '';
    fetch(`http://localhost:5004/api/coffees${apiRoute}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        // SetLoading(false);
      })
      .then(() => SetLoading(false));
  }, [category]);

  useEffect(() => {
    if (text && text.length > 3) {
      fetch(`http://localhost:5004/api/coffees/search/:${text}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setProducts(data);
        })
        .then(() => SetLoading(false));
    }
  }, [text]);

  if (loading) {
    return (
      <>
        <Backdrop
          style={{ color: '#fff' }}
          open={loading}
        >
          <CircularProgress color="secondary" />
        </Backdrop>
      </>
    );
  }
  return (
    <>
      <Helmet>
        <title>All Coffees</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ pt: 3 }}>
            <Grid
              container
              spacing={3}
            >
              {products.map((product) => (
                <Grid
                  item
                  key={product.id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 3
            }}
          >
            <Pagination
              color="primary"
              count={3}
              size="small"
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

ProductList.propTypes = {
  category: PropTypes.string,
  text: PropTypes.string
};

export default ProductList;
