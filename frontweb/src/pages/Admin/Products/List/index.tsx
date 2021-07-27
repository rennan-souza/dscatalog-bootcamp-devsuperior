import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../../../types/product';
import { requestBackend } from '../../../../util/requests';
import { SpringPage } from '../../../../util/vendor/spring';
import ProductCrudCard from '../ProductCrudCard';
import './styles.css';

const List = () => {

  const [page, setPage] = useState<SpringPage<Product>>();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/products',
      params: {
        page: 0,
        size: 50,
      },
    };

    requestBackend(config)
      .then((response) => {
        setPage(response.data);
      })
  }

  return (
    <div className="product-crud-container">
      <div className="product-crud-bar-container">
        <Link to="/admin/products/create">
          <button className="btn btn-primary text-white btn-crud-add">
            ADICIONAR
          </button>
        </Link>
        <div className="base-card product-filter-container">Search Bar</div>
      </div>
      <div className="row">
        {page?.content.map(product => (
          <div className="col-sm-6 col-md-12" key={product.id}>
            <ProductCrudCard product={product} onDelete={() => getProducts()} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
