import ProductCard from "./../../components/ProductCard/ProductCard";
import "./SearchPage.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchAllProducts } from "../../features/products/productsSlice";

const SearchPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);
    const products = useSelector((state) => state.products.allProducts);
    const [searchValue, setSearchValue] = useState("");
    const matches = (product, searched) => {
        return product.name.toLowerCase().includes(searched.toLowerCase());
    };
    const results = products.filter((product) => matches(product, searchValue));

    return (
        <div
            className="search-page products__wrapper "
            style={{ paddingTop: "1rem" }}
        >
            <div className="container">
                <input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="form-control"
                    style={{ margin: "0" }}
                />

                <div className="search-results products__wrapper-items pt-3 pb-3 ">
                    <div className="row">
                        {results &&
                            results.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
