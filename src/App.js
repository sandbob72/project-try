import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Icon, Button } from 'semantic-ui-react'

function App() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [edit, setEdit] = useState(false)
  const [idProduct, setIdProduct] = useState(null)

  const getProducts = async () => {
    const result = await axios.get(
      `https://coffee-cafee-test-2.herokuapp.com/api/v1/cakes`
    );
    setProducts(result.data.cakes);
  };

  const getProduct = async (id) => {
    const result = await axios.get(
      `https://coffee-cafee-test-2.herokuapp.com/api/v1/cakes/${id}`
    );
    setProduct(result.data.response);
  };

  const addProduct = (name, price) => {
    axios({
      method: "post",
      url:
        "https://coffee-cafee-test-2.herokuapp.com/api/v1/cakes",
      headers: {},
      data: {
        name: name,
        price: price, // This is the body part
      },
    });
    getProducts()
  };

  const delProduct = (id) => {
    axios({
      method: "delete",
      url: `https://coffee-cafee-test-2.herokuapp.com/api/v1/cakes/${id}`,
      headers: {},
      data: {},
    });
    getProducts()
  };

  const upProduct = (id, name, price) => {
    axios({
      method: "put",
      url: `https://coffee-cafee-test-2.herokuapp.com/api/v1/cakes/${id}`,
      headers: {},
      data: {
        // '#': id,
        name: name,
        price: price, // This is the body part
      },
    });
    getProducts()
  };

  const editProduct = (id, name, price) => {
    setIdProduct(id)
    setName(name)
    setPrice(price)

    setEdit(true)
  }

  const formUpdate = (id, name, price) => {
    upProduct(id, name, price)
    setIdProduct(null)
    setName("")
    setPrice(0)
    getProducts()
    setEdit(false)
  }

  useEffect(() => {
    getProducts();
  }, []);

  if (products.length === 0) {
    return <div>load data</div>;
  }

  return (
    <div>
      <h2>Product</h2>
      <table >
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product ? product.name : "-"}</td>
              <td>{product ? product.price : 0}</td>
              <td>
                <button onClick={() => getProduct(product._id)}>Get</button>
                <button onClick={() => delProduct(product._id)}> Delete</button>
                <button onClick={() => editProduct(product._id, product.name, product.price)}>Update</button></td>
            </tr>
          ))}
        </tbody>
      </table>


      selected Product: {product.name}

      <div>
        {edit ? (
          <div>
            <h2>Update Product</h2>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} /> <br />
            Price:
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} /> <br />
            <button onClick={() => formUpdate(idProduct, name, price)}>update Product</button>
          </div>
        ) : (
            <div>
              <h2>Add Product</h2>
               Name:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} /> <br />
               Price:
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} /> <br />
              <button onClick={() => addProduct(name, price)}>Add new Product</button>
            </div>
          )}
      </div>
      <Container>
        <Table celled fixed singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Product</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {products.map((product, index) => (
              <Table.Row key={index}>
                <Table.Cell>{product ? product.name : "-"}</Table.Cell>
                <Table.Cell>{product ? product.price : 0}</Table.Cell>
                <Table.Cell>
                  <Button onClick={() => getProduct(product._id)} icon>
                    <Icon name='bars' />
                  </Button>
                  <Button onClick={() => delProduct(product._id)} icon>
                    <Icon name='delete' />
                  </Button>
                  <Button onClick={() => editProduct(product._id, product.name, product.price)} icon>
                    <Icon name='edit' />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Container>


    </div>
  );
}
export default App
