import React, { useState } from 'react';
import { Col, Container, Row, Form, Button} from 'react-bootstrap';
import Layout from '../../components/layout';
import Input from '../../components/UI/Input';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { singup } from '../../actions/user.actions';



const Singup = () => {

    // e.preventDefault();

    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);


    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const dispatch = useDispatch();

    const userSignup = () => {

        const user = { firstname, lastname, email, password};

        dispatch(singup(user));
    }
    if(auth.authenticate){
        return <Redirect to={'/'} />
    }

    if(user.loading){
        return <p>Loading... </p>
    }
    return (
        <>
            <Layout>
                <Container>
                
                    <Row className="my-5 ">
                        <Col md={{span:6, offset: 3}}>
                            <Form onSubmit={userSignup}>
                                <Row>
                                    <Col md={6}>
                                        <Input 
                                            label="First Name"
                                            placeholder="First Name"
                                            type="text"
                                            name="firstname"
                                            value={firstname}
                                            onChange={(e) => setFirstname(e.target.value)}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Input
                                            label="Last Name"
                                            placeholder="First Name"
                                            type="text"
                                            name="lastname"
                                            value={lastname}
                                            onChange={(e) => setLastname(e.target.value)}
                                        />
                                    </Col>
                                </Row>
                                <Input
                                    label="Email"
                                    placeholder="email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) =>setEmail(e.target.value) }
                                />

                                <Input
                                    label="Password"
                                    placeholder="Password"
                                    type="Password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Layout>            
        </>
    )
}

export default Singup;
