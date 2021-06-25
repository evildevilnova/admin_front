import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { 
    getAllCategory,
    addCategory, 
    updateCategories,
    deleteCategories as deleteCategoriesAction
 } from '../../actions';
import Layout from '../../components/layout/index';
import Input from '../../components/UI/Input';
import CheckBoxTree from 'react-checkbox-tree';
import { IoCheckboxOutline, IoCheckbox, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import Modale from '../../components/Modal';
import { FileEarmarkPlusFill, FileEarmarkXFill, PencilSquare } from 'react-bootstrap-icons';

const Category = (props) => {

    const category = useSelector(state => state.category);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [checked, setChecked] = useState([]);
    const [checkedArry, setCheckedArry] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [expandedArry, setExpandedArry] = useState([]);
    const [show, setShow] = useState(false);
    const [showDeleteCategoryModel, setDeleteCategoryModel] = useState(false);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!category.loading){
            setShow(false);
        }
    },[category.loading]);

    const handlecut = () => {
        setShow(false);
    }

    const handleClose = () => {

        const form = new FormData();

        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);

        dispatch(addCategory(form));
        setCategoryImage('');
        setCategoryName('');
        setParentCategoryId('');

        setShow(false);
    };

    const handleShow = () => setShow(true);

    const renderCategories = (categories) => {

        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            );
        }
        return myCategories;
    }

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ 
                value: category._id,
                name: category.name, 
                parentId: category.parentId,
                type: category.type
             });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }

        return options;
    }

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }

    const updateCategory = () => {
        updateCheckedAndExpandedCategories();
        setUpdateCategoryModal(true);
    }

    const updateCheckedAndExpandedCategories = () => {
        const categories = createCategoryList(category.categories);
        const checkedArry = [];
        const expandedArry = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, index) => categoryId == category.value);
            category && checkedArry.push(category);
        });

        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, index) => categoryId == category.value);
            category && expandedArry.push(category);
        });
        setCheckedArry(checkedArry);
        setExpandedArry(expandedArry);
    }

    const handleCategoryInput = (key, value, index, type) => {
        if (type == "checked") {
            const updatedChechedArray = checkedArry.map((item, _index) => index == _index ? { ...item, [key]: value } : item);
            setCheckedArry(updatedChechedArray);
        } else if (type == "expended") {
            const updatedExpandedArray = expandedArry.map((item, _index) => index == _index ? { ...item, [key]: value } : item);
            setExpandedArry(updatedExpandedArray);
        }
    }

    const updateCategoriesForm = () => {
        const form = new FormData();

        expandedArry.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('type', item.type);
            form.append('parentId', item.parentId ? item.parentId: ""); 
        });
        checkedArry.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('type', item.type);
            form.append('parentId', item.parentId ? item.parentId: "");
        });
        dispatch(updateCategories(form))
        setUpdateCategoryModal(false);
    }
    const renderUpadetCategoriesModel = () => {
        return (
            <Modale
                show={updateCategoryModal}
                onHide={() => setUpdateCategoryModal(false)}
                title="Update Category"
                savebtn={updateCategoriesForm}
                size='lg'
            >
                <Row>
                    <Col>
                        <h6>checked</h6>
                    </Col>
                </Row>
                {
                    checkedArry.length > 0 &&
                    checkedArry.map((item, index) =>
                        <Row key={index}>
                            <Col>
                                <Input
                                    value={item.name}
                                    placeholder={'Category Name'}
                                    name="name"
                                    onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                                />
                            </Col>
                            <Col>
                                <select
                                    className="form-control"
                                    value={item.parentId}
                                    name="parentId"
                                    onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}>
                                    <option>select category</option>
                                    {
                                        createCategoryList(category.categories).map(option =>
                                            <option key={option.value} value={option.value} > {option.name} </option>)
                                    }
                                </select>
                            </Col>
                            <Col>
                                <select 
                                className="form-control"
                                value={item.type}
                                onChange={(e) => handleCategoryInput('type', e.target.value, index, 'checked')}
                                >
                                    <option value=''>Select type</option>
                                    <option value='store'>store</option>
                                    <option value='product'>product</option>
                                    <option value='page'>page</option>
                                </select>
                            </Col>
                        </Row>
                    )

                }
                <h6>expanded</h6>
                {
                    expandedArry.length > 0 &&
                    expandedArry.map((item, index) =>
                        <Row key={index}>
                            <Col>
                                <Input
                                    value={item.name}
                                    placeholder={'Category Name'}
                                    name="name"
                                    onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                                />
                            </Col>
                            <Col>
                                <select
                                    className="form-control"
                                    value={item.parentId}
                                    name="parentId"
                                    onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}>
                                    <option>select category</option>
                                    {
                                        createCategoryList(category.categories).map(option =>
                                            <option key={option.value} value={option.value} > {option.name} </option>)
                                    }
                                </select>
                            </Col>
                            <Col>
                                <select 
                                className="form-control"
                                value={item.type}
                                onChange={(e) => handleCategoryInput('type', e.target.value, index, 'expanded')}
                                >
                                    <option value=''>Select type</option>
                                    <option value='store'>store</option>
                                    <option value='product'>product</option>
                                    <option value='page'>page</option>
                                </select>
                            </Col>
                        </Row>
                    )
                }

            </Modale>
        );
    }

    const renderAddCategoriesModel = () => {
        return (
            
            <Modal show={show} onHide={handlecut}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        value={categoryName}
                        placeholder={'Category Name'}
                        name="name"
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                    <select
                        className="form-control"
                        value={parentCategoryId}
                        name="parentId"
                        onChange={(e) => setParentCategoryId(e.target.value)}>
                        <option>select category</option>
                        {
                            createCategoryList(category.categories).map(option =>
                                <option key={option.value} value={option.value} > {option.name} </option>)
                        }
                    </select>
                    <input type="file" className="form-control my-3" name="categoryImage" onChange={handleCategoryImage} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    const deleteCategory = () => {
        updateCheckedAndExpandedCategories();
        setDeleteCategoryModel(true);
    }

    const deleteCategories = () => {
        const checkedIdsArry = checkedArry.map((item, index) => ({_id: item.value}));
        const expandedIdsArry = expandedArry.map((item, index) => ({_id: item.value}));
        const idsArray = expandedIdsArry.concat(checkedIdsArry);
        dispatch(deleteCategoriesAction(checkedIdsArry))
        .then(result => {
            if(result){
                setDeleteCategoryModel(false);
                alert('Categories is deleted.')
            };
        });
    }
    const renderDeleteCategoriesModel = () => {
        return(
            <Modale
                show={showDeleteCategoryModel}
                onHide={() => setDeleteCategoryModel(false)}
                title="Delete Category"
                buttons={[
                    {
                        label:'No',
                        color:'primary',
                        onClick: () => {
                            setDeleteCategoryModel(false);
                        }
                    },
                    {
                        label:'yes',
                        color:'danger',
                        onClick: deleteCategories
                    }
                ]}
            >
            <h6 className="mb-2">Expanded</h6>
            { expandedArry.map((item, index) => <span key={index}>{item.name}</span>)}
            <h6 className="my-2">Checked</h6>
            { checkedArry.map((item, index) => <span key={index}>{item.name}</span>)}
            </Modale>
        );
    }

    return (
        <div>
            <Layout sidebar >
                <Container>
                    <Row>
                        <Col className="m-4" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h2>Category</h2>
                            <FileEarmarkPlusFill color="black" onClick={handleShow} size={30} />
                            <FileEarmarkXFill color="red" onClick={deleteCategory} size={30}/>
                            <PencilSquare color="royalblue" onClick={updateCategory} size={30} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} >

                            <CheckBoxTree
                                nodes={renderCategories(category.categories)}
                                checked={checked}
                                expanded={expanded}
                                onCheck={checked => setChecked(checked)}
                                onExpand={expanded => setExpanded(expanded)}
                                icons={{
                                    check: <IoCheckbox />,
                                    uncheck: <IoCheckboxOutline />,
                                    halfCheck: <IoCheckmarkCircleOutline />,
                                    expandClose: <IoIosArrowForward />,
                                    expandOpen: <IoIosArrowDown />,
                                }}
                            />

                        </Col>
                    </Row>
                </Container>
                {renderDeleteCategoriesModel()}
                {renderAddCategoriesModel()}
                {renderUpadetCategoriesModel()}
            </Layout>
        </div>
    )
}

export default Category;
