import React, {useEffect, useState} from 'react';
import { Form, Button, FormGroup } from "react-bootstrap"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, reset } from '../../features/auth/authSlice'
import "./Login.css";
import { motion } from "framer-motion"
import Swal from 'sweetalert2'
const Login = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timerProgressBar: true,
  })
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // Get the state from redux
    const { isSuccess } = useSelector((state) => state.auth)

    const handleSubmit = async (event) => {
      event.preventDefault();
      if (email.length <= 10 || password.length <= 2){
        await Toast.fire({
          title: `🙄 Please enter a valid email and Password`,
          icon: 'error',
          timer: 1500,
          position: "top-end"
        })
        return
      }
      const userData = {
        email,
        password,
      }
      await dispatch(login(userData))

    }
    useEffect(() => {
      if(isSuccess){
        console.log("redirigí a home")
        navigate("/home")
      }
    }, [isSuccess, navigate])
    
  return (
    <motion.div 
    initial={{opacity: 0, x: 100 }}
    animate={{opacity: 1, x: 0 }}
    exit={{opacity: 0, x: -100 }}
    transition={{duration: 0.7}}
    className='login'>
      <Form className='Login'>
          <FormGroup className='Title'>
              Admin Login
          </FormGroup>
          <FormGroup className='GroupClass'>
              <Form.Label >
                  Username
              </Form.Label>
              <Form.Control
                      type="text"
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
    </motion.div>


  )
}

export default Login