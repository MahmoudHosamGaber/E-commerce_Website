import React, { useEffect} from 'react';
import './categories.css';
import { SubHeading } from '../../components';
import { getCategories } from '../../features/categories/categoriesSlice';
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {CategoryCard, CategoryCardMen, CategoryCardOthers } from './CategoryCard'

const Categories = () => {
  
    const { categories, isError, message } = useSelector((state) => state.categories)
    const dispatch = useDispatch();
   
    useEffect(() => {
      
        if (isError) {
         toast.error(message)
        }

      dispatch(getCategories());
    }, [isError, message,dispatch]);
    
   
    return (
        <div className="category__wrapper">
            <div className="container">
                <SubHeading title="Categories"/>
                <div className="category__wrapper-women mb-4 pt-2 pb-2">
                    <div className="row">
                        <div className="col-md-12 col-lg-2">
                            <h2>Women</h2>
                        </div>
                        <div className="col-md-12 col-lg-10">
                        <div className="row">
                           <CategoryCard categories={categories} />         
                        </div>
                        </div>
                    </div>
                </div>

                <div className="category__wrapper-men mb-4 pt-4 pb-4">
                    <div className="row">
                        <div className="col-md-12 col-lg-2">
                            <h2>Men</h2>
                        </div>
                        <div className="col-md-12 col-lg-10">
                        <div className="row">
                            <CategoryCardMen categories={categories} /> 
                        </div>
                        </div>
                    </div>
                </div>

                <div className="category__wrapper-all mb-2 pt-4 pb-4">
                    <div className="row">
                        <div className="col-md-12 col-lg-2">
                            <h2>Other Categories</h2>
                        </div>
                        <div className="col-md-12 col-lg-10">
                        <div className="row">
                           <CategoryCardOthers categories={categories} />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categories;