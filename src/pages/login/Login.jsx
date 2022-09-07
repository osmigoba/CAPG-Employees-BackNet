import React, {useEffect, useState} from 'react';
import { Form, Button } from "react-bootstrap"
import { Container, FormGroup, Row} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, reset } from '../../features/auth/authSlice'
import "./Login.css";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    function validateForm() {
      return email.length > 0 && password.length > 0;
    }
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // Get the state from redux
    const { user, isSuccess } = useSelector((state) => state.auth)

    function handleSubmit(event) {
      //event.preventDefault();
      console.log(email, password)
      const userData = {
        email,
        password,
      }
      dispatch(login(userData))
      if (isSuccess){
        navigate("/home")
      }
    }
    useEffect(() => {
      if(isSuccess){
        navigate("/home")
      }
    }, [])
    
  return (

    <Form className='Login'>
        <FormGroup className='Title'>
            Admin Login
        </FormGroup>
        <FormGroup className='GroupClass'>
            <Form.Label >
                Username
            </Form.Label>
            <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Label className='PasswordLabel'>
                Password
            </Form.Label>
            <Form.Control
                type="password"
                value={password}
                    onChange={(e) => setPassword(e.target.value)}
            /> 
            <Button block="true" size="sm" type="submit"  className="paddingButton" onClick={(e) => handleSubmit(e)}>
                Login
            </Button>                          
        </FormGroup>
    </Form>

  )
}

export default Login