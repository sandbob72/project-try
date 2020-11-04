import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Icon, Button, Modal, Header, Image, Form, Segment, Dimmer, Loader } from 'semantic-ui-react'

function App() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [edit, setEdit] = useState(false)
  const [idProduct, setIdProduct] = useState(null)
  const [openGet, setOpenGet] = useState(false)
  const [openAdd, setOpenAdd] = useState(false)
  const [openUp, setOpenUp] = useState(false)

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
    setOpenAdd(false)
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
  }

  const UpdateProduct = (id, name, price) => {
    upProduct(id, name, price)
    setIdProduct(null)
    setName("")
    setPrice(0)
    getProducts()
    setOpenUp(false)
  }

  const formUpdate = (id, _name, _price) => {
    return (
      <Modal
        onClose={() => setOpenUp(false)}
        onOpen={() => setOpenUp(true)}
        open={openUp}
        trigger={<Button color='yellow' icon onClick={() => editProduct(id, _name, _price)}><Icon name='edit' /></Button>}
      >
        <Modal.Header>Update Product</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Product Name</label>
              <input type="text" placeholder='Product Name' value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Field>
            <Form.Field>
              <label>Price</label>
              <input type="number" placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)} />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => setOpenUp(false)}>
            cancel
            </Button>
          <Button
            color='green'
            onClick={() => UpdateProduct(idProduct, name, price)}
            content='Update Product'
          />
        </Modal.Actions>
      </Modal>
    )

  }

  const ReadProduct = (id) => {
    return (
      <Modal
        centered={false}
        open={openGet}
        onClose={() => setOpenGet(false)}
        onOpen={() => setOpenGet(true)}
        trigger={
          <Button onClick={() => getProduct(id)} icon>
            <Icon name='bars' />
          </Button>}
      >
        <Modal.Header>Detail</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {product.name} {product.price}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpenGet(false)}>OK</Button>
        </Modal.Actions>
      </Modal>
    )
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <Container>
        <h2>Product</h2>
        <Modal
          onClose={() => setOpenAdd(false)}
          onOpen={() => setOpenAdd(true)}
          open={openAdd}
          trigger={<Button color='green'>Add</Button>}
        >
          <Modal.Header>New Product</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>Product Name</label>
                <input type="text" placeholder='Product Name' value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Field>
              <Form.Field>
                <label>Price</label>
                <input type="number" placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)} />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={() => setOpenAdd(false)}>
              cancel
            </Button>
            <Button
              color='green'
              onClick={() => addProduct(name, price)}
              content='Add new Product'
            />
          </Modal.Actions>
        </Modal>

        {products.length > 0 ? (
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
                    {ReadProduct(product._id)}
                    <Button onClick={() => delProduct(product._id)} color='red' icon>
                      <Icon name='delete' />
                    </Button>
                    {formUpdate(product._id, product.name, product.price)}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
            <div>
              <Table celled fixed singleLine>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Product</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
              </Table>
              <Segment>
                <Dimmer active>
                  <Loader size='massive'>Loading</Loader>
                </Dimmer>
                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
              </Segment>
            </div>
          )}
      </Container>
    </div>
  );
}
export default App
