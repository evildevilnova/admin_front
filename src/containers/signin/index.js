import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Form, Button} from 'react-bootstrap';
import Layout from '../../components/layout';
import Input from '../../components/UI/Input/index';
import { isUserLoggedIn, login } from '../../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import SignIn from './signin';


const Singin = (props) => { 

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const userLogin = (e) => {
        
        e.preventDefault();

        const user = {
            email, password
        }
        dispatch(login(user));   
    }
    if(auth.authenticate){
        return <Redirect to={'/'} />
    }

    return (
        <>
            <Layout>
                {/* <Container>
                    <Row className="my-5 ">
                        <Col md={{span:6, offset: 3}}>
                            <Form onSubmit = { userLogin }>
                                <Input
                                    id="email"
                                    label="Email Address"
                                    placeholder="email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <Input
                                    id="password"
                                    label="Password"
                                    placeholder="Password"
                                    type="password"
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
                </Container> */}
                <SignIn 
                    submit={ userLogin }
                />
            </Layout>            
        </>
    )
}

export default Singin
