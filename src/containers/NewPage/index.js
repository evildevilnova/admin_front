import React, { useState, useEffect } from 'react'
import { Button, Col, FormLabel, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createPage } from '../../actions/index';
import Layout from '../../components/layout'
import Modale from '../../components/Modal'
import Input from '../../components/UI/Input';
import linearCategoryList from '../../helpers/linearCategories';

const NewPage = () => {

    const [createModal, setCreateModal] = useState(false);
    const [title, setTitle] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [desc, setDesc] = useState('');
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);
    const [type, setType] = useState('');
    const category = useSelector(state => state.category);
    const page = useSelector(state => state.page);

    const dispatch = useDispatch();

    useEffect(() => {
        setCategories(linearCategoryList(category.categories));
        console.log('categories', categories);
    }, [category]);

    useEffect(() => {
        console.log(page);
        if (!page.loading) {
            setCreateModal(false);
            setTitle('');
            setCategoryId('');
            setDesc('');
            setProducts([]);
            setBanners([]);
        }
    }, [page]);

    const onCategoriesChange = (e) => {
        const category = categories.find(category => category._id == e.target.value)
        setCategoryId(e.target.value);
        setType(category.type);
    };

    const handleBannerImages = (e) => {
        console.log(e);
        setBanners([...banners, e.target.files[0]])
    };

    const handleProductsImages = (e) => {
        console.log(e);
        setProducts([...products, e.target.files[0]])
    };

    const submitPageForm = (e) => {

        // e.target.preventDefault();

        if (title === "") {
            alert('Title is required.');
            setCreateModal(false);
            return;
        }
        const form = new FormData();
        form.append('title', title);
        form.append('description', desc);
        form.append('category', categoryId);
        form.append('type', type);
        banners.forEach((banner, index) => {
            form.append('banners', banner);
        });
        products.forEach((product, index) => {
            form.append('products', product);
        });

        dispatch(createPage(form));
        console.log(title, desc, categoryId, type, banners, products);
    };

    const renderCreatePageModal = () => {
        return (
            <Modale
                show={createModal}
                title='Create New Page'
                onHide={() => setCreateModal(false)}
                savebtn={submitPageForm}
            >
                <Row>
                    <Col>
                        {/* <select
                            className=" form-control form-select-sm mb-3"
                            value={categoryId}
                            onChange={onCategoriesChange}
                        >
                            <option>select category</option>
                            {
                                categories.map(cat =>
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                )
                            }
                        </select> */}
                        <Input
                            type="select"
                            value={categoryId}
                            onChange={onCategoriesChange}
                            options={categories}
                            placeholder='select category'
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='Page Title'
                            className="form-control form-control-sm"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            className="form-control form-control-sm"
                            placeholder='Page Desc'
                        />
                    </Col>
                </Row>
                {
                    banners.length > 0 ?
                        banners.map((banner, index) =>
                            <Row key={index}>
                                <Col>
                                    <FormLabel>{banner.name}</FormLabel>
                                </Col>
                            </Row>
                        ) : null
                }
                <Row>

                    <Col>
                        <input
                            type="file"
                            name="banners"
                            onChange={handleBannerImages}
                            className="form-control-file form-control mb-3"
                            placeholder='banners'
                        />
                    </Col>
                </Row>
                {
                    products.length > 0 ?
                        products.map((product, index) =>
                            <Row key={index}>
                                <Col>
                                    <FormLabel>{product.name}</FormLabel>
                                </Col>
                            </Row>
                        ) : null
                }
                <Row>
                    <Col>
                        <input
                            type="file"
                            name="products"
                            // value={desc}
                            onChange={handleProductsImages}
                            className="form-control-file form-control"
                            placeholder='products'
                        />
                    </Col>
                </Row>
            </Modale>
        )
    }
    return (
        <Layout sidebar>
            {
                page.loading ?
                    <p>Creating Page ...please wait</p>
                    :
                    <>
                        {renderCreatePageModal()}
                        <Button onClick={() => setCreateModal(true)}>create Page</Button>
                    </>
            }
        </Layout>
    )
}

export default NewPage
