const ProductsList = ({ products }) => {
  return (
    <div className="card card-body">
      {products.map((product) => (
        <div
          className="product_item d-flex align-items-center justify-content-between w-100"
          key={product.productId}
        >
          <p>{product.name}</p>
          <div className="product_info d-flex align-items-center">
            <p className="me-5">{product.quantity}</p>
            <p className="price">{product.totalPrice}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
