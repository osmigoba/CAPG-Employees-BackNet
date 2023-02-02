import React, {useEffect, useState} from 'react';
import { Form, Button, FormGroup } from "react-bootstrap"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../../features/auth/authSlice'
import "./Login.css";
import { motion } from "framer-motion"
import Swal from 'sweetalert2'
import { getEmployeesRedux } from '../../features/employees/employeesSlice'
import { getSkillsRedux } from '../../features/skills/skillsSlice'
import { getLevelsRedux } from '../../features/expertiseLevel/levelsSlice'
import { getskillOfEmployees } from '../../features/skillsofEmployees/skillsofEmployeesSlice'
import loading from './loading.gif'
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
  const { isSuccess, isLoading } = useSelector((state) => state.auth)
  const employeesState  = useSelector((state) => state.employeesState)
  const  {getEmployeesStatus}  = employeesState;
  const skillssState  = useSelector((state) => state.skillsState)
  const  {getSkillsStatus}  = skillssState;
  const levelsState  = useSelector((state) => state.levelsState)
  const  {getLevelsStatus}  = levelsState; 
  const skillEmployeesStatus = useSelector((state) => state.skillsOfEmployeesState)
  const {getskillOfEmployeesStatus} = skillEmployeesStatus 
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email.length <= 10 || password.length <= 2){
       Toast.fire({
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
    dispatch(login(userData))

  }
  useEffect( () => {

    if(isSuccess){
      // Get All Employees
      if (getEmployeesStatus !== "ok"){
        dispatch(getEmployeesRedux())
      }
      // Get all Skills
      if (getSkillsStatus !== 'ok'){
        dispatch(getSkillsRedux())
      }
      // Get all Levels Expertise
      if (getLevelsStatus !== 'ok'){
        dispatch(getLevelsRedux())
      }
      // Get all Relationships many to many relation
      if (getskillOfEmployeesStatus !== 'ok'){
        dispatch(getskillOfEmployees())
      }        
  
        navigate("/home")
      }
  
   
  }, [isSuccess])

 
  return (
    <div>
      {isLoading ? (
          <div className="overlay">
            <div className="spinner-wrapper">
                <img className="spiner-imagenLoader" src={loading}  alt="loading" ></img>
            </div>
          </div>
      ) : (
        (
          <motion.div 
          initial={{opacity: 0, x: 100 }}
          animate={{opacity: 1, x: 0 }}
          exit={{opacity: 0, x: -100 }}
          transition={{duration: 0.7}}
          className='login'>
            <div className='firstDiv'>
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
            </div>

          </motion.div>
        )
      )}
    </div>
  )
}

export default Login