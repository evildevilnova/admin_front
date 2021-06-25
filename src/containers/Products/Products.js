import React, { useState } from 'react';
import Layout from '../../components/layout/index';
import { Col, Container, Modal, Row, Button, Table } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../actions/product.action';
import Modale from '../../components/Modal';
import { generatePublicUrl } from '../../urlConfig';


const Products = () => {

    //
    // input feild useState
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [productPicture, setProductPicture] = useState([]);

    // accessing data from store
    const category = useSelector(state => state.category);
    const product = useSelector(state => state.product);

    // modal show and hiding
    const [show, setShow] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [productDetails, setProductDetails] = useState(null);

    const detailModalClose = () => {
        setShowDetail(false);
    }

    const detailModalShow = (product) => {
        setProductDetails(product)
        setShowDetail(true);
        console.log(product);
    }

    const detailModal = () => {
        if (!productDetails) {
            return null;
        }
        return (

            <Modale
                show={showDetail}
                onHide={detailModalClose}
                title='Product Detailes'
                size="lg"
                savebtn={detailModalClose}
            >
                <Row className="p-3">
                    <Col md={8}>
                        <label>Name</label>
                        <p>{productDetails.name}</p>
                    </Col>
                    <Col md={4}>
                        <label>Price</label>
                        <p>{productDetails.price}</p>
                    </Col>
                    <Col md={8}>
                        <label>Quantity</label>
                        <p>{productDetails.quantity}</p>
                    </Col>
                    <Col md={4}>
                        <label>Category</label>
                        <p>{productDetails.category.name}</p>
                    </Col>
                    <Col md={12}>
                        <label>Description</label>
                        <p>{productDetails.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>Product Picture</label>
                        <div style={{ display: 'flex' }}>
                            {productDetails.productPictures.length > 0 ? productDetails.productPictures.map(picture =>
                                <div>
                                    <img className="m-3" style={{width:'50px',height:'95px'}} src={generatePublicUrl(picture.img)} />
                                </div>
                            ) : null
                            }
                        </div>
                    </Col>
                </Row>

            </Modale>

        )
    }

    // 
    const dispatch = useDispatch();

    const handleClose = () => {

        const form = new FormData();

        form.append('name', name);
        form.append('quantity', quantity);
        form.append('price', price);
        form.append('description', description);
        form.append('category', categoryId);
        for (let pic of productPicture) {
            form.append('productPicture', pic);
        }

        // triggering reducer action function 
        dispatch(addProduct(form));
        console.log(product)
        setName('');
        setPrice('');
        setQuantity('');
        setDescription('');
        setCategoryId('');
        setProductPicture([]);
        setShow(false);
    };

    // create category for select option
    const createCategoryList = (categories, options = []) => {

        // accessing id and name 
        // create ( option ) list
        for (let category of categories) {
            options.push({ value: category._id, name: category.name });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }

        return options;
    }

    const handleShow = () => setShow(true);

    const handleProductPictures = (e) => {
        setProductPicture([
            ...productPicture,
            e.target.files[0]
        ]);
    }

    // products Table
    const renderProducts = () => {
        return (
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        {/* <th>Description</th> */}
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.products.length > 0 ?
                            product.products.map((product, index) =>
                                <tr key={product._id} onClick={() => detailModalShow(product)}>
                                    <td>{index}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    {/* <td>{product.description}</td> */}
                                    <td>{product.category.name}</td>
                                </tr>
                            ) : null
                    }
                </tbody>
            </Table>
        )
    }

    const modalDetail = () => {
        return (
            <>
                <Input
                    value={name}
                    placeholder={'Product Name'}
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    label="quantity"
                    value={quantity}
                    placeholder={'Quantity'}
                    name="quantity"
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <Input
                    value={price}
                    placeholder={'Price'}
                    name="price"
                    onChange={(e) => setPrice(e.target.value)}
                />
                <Input
                    value={description}
                    placeholder={"description"}
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                />

                <select
                    className="form-control my-3"
                    value={categoryId}
                    name="parentId"
                    onChange={(e) => setCategoryId(e.target.value)}>
                    <option>select category</option>
                    {
                        createCategoryList(category.categories).map(option =>
                            <option key={option.value} value={option.value} > {option.name} </option>)
                    }
                </select>

                {
                    productPicture.length > 0 ?
                        productPicture.map((pic, index) => <div key={index}>{pic.name}</div>) : null
                }

                <Input
                    type="file"
                    placeholder={'Product Picture'}
                    className="my-3"
                    name="productPicture"
                    onChange={handleProductPictures}
                />
            </>
        );
    }


    return (
        <>
            <Layout sidebar>
                <Container className="m-3">
                    <Row>
                        <Col md={12}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h3>Product</h3>
                                <Button variant="primary" onClick={handleShow}>
                                    +
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col className="my-5">
                            {renderProducts()}
                        </Col>
                    </Row>
                </Container>

                <Modale
                    show={show}
                    onHide={handleClose}
                    title='Add New Product'
                    body={modalDetail()}
                    savebtn={handleClose}
                />
                {detailModal()}
            </Layout>
        </>
    )
}


export default Products;