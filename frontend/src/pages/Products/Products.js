import React, { useEffect} from 'react'
import { SubHeading } from '../../components';
import './product.css';
import {ProductCard} from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllProducts } from '../../features/products/productsSlice';
import { useParams } from 'react-router-dom';

const Products = () => {    
    
    let {allProducts} = useSelector(state => state.products);
    
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(fetchAllProducts())
    }, [dispatch]);
    
    const params = useParams()
    const haveParams = params && (params.categoryId !== undefined)
    const products = haveParams ? allProducts.filter(product => product.category === params.categoryId) : allProducts
    
        return (
            <div className='products__wrapper'>
                <div className="container">
                    <SubHeading title="Products"/>
                    <div className="products__wrapper-items pt-3 pb-3">
                        <div className="row">
                            {
                             products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            )) 
                             }
                        </div>
                    </div>
                </div>
            </div>
        )
       
}

export default Products