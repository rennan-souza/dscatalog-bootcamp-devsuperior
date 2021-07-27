import { AxiosRequestConfig } from 'axios';
import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../../../components/Pagination';
import { Product } from '../../../../types/product';
import { requestBackend } from '../../../../util/requests';
import { SpringPage } from '../../../../util/vendor/spring';
import ProductCrudCard from '../ProductCrudCard';
import './styles.css';

type ControlComponentsData = {
  activePage: number;
}

const List = () => {

  const [page, setPage] = useState<SpringPage<Product>>();

  const [ControlComponentsData, setControlComponentsData] = useState<ControlComponentsData>({
    activePage: 0
  });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({activePage: pageNumber});
  }

  const getProducts = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/products',
      params: {
        page: ControlComponentsData.activePage,
        size: 3,
      },
    };

    requestBackend(config)
      .then((response) => {
        setPage(response.data);
      })
  }, [ControlComponentsData])

  useEffect(() => {
    getProducts();
  }, [getProducts]);


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
            <ProductCrudCard product={product} onDelete={() => {}} />
          </div>
        ))}
      </div>
      <Pagination 
        pageCount={(page) ? page.totalPages : 0}
        range={3}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default List;
