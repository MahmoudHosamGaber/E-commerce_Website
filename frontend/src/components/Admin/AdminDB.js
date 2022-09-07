import React, { useState } from "react";
import "./admin.css";
import "./aside.css";
const AdminDB = () => {
  const [display, setDisplay] = useState();

  return (
    <>
      <aside className="d-flex justify-content-center align-items-center">
        <ul className="aside_links list-unstyled">
          <li>
            <a
              className="mb-5"
              onClick={(e) => setDisplay(e.currentTarget.dataset.display)}
              data-display="orders"
            >
              orders
            </a>{" "}
          </li>
          <li>
            <a
              className="mb-5"
              onClick={(e) => setDisplay(e.currentTarget.dataset.display)}
              data-display="products"
            >
              products
            </a>{" "}
          </li>
          <li>
            <a
              className="mb-5"
              onClick={(e) => setDisplay(e.currentTarget.dataset.display)}
              data-display="users"
            >
              users
            </a>{" "}
          </li>
        </ul>
      </aside>
      <main className="text-center">
        <h2>admin dashboard</h2>
        <h3>{display}</h3>
      </main>
    </>
  );
};

export default AdminDB;
