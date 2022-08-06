import "./Checkout.css";

const CheckoutList = ({ item }) => {
    return (
        <tbody>
            <tr className="product-name" key={item.productId}>
                <td style={{ width: "33%", textAlign: "left", padding: "5px" }}>
                    {item.name}
                </td>
                <td>{item.quantity}</td>
                <td>{item.price * item.quantity}</td>
            </tr>
        </tbody>
    );
};

export default CheckoutList;
