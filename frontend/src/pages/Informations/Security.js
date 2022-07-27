import { Aside } from '../../components';
import './UserInfo.css';
import {Form, Button } from 'react-bootstrap';
import React ,{useState ,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import {updatePassword, reset} from '../../features/auth/authSlice'

const Security = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        newPassword:'',
        confirmPassword: '',
      })
    
      const { email, password, newPassword, confirmPassword } = formData
    
      const dispatch = useDispatch()
    
      const { user, isError, message } = useSelector(
        (state) => state.auth
      )
    
      useEffect(() => {
        if (isError) {
          toast.error(message)
        }
        dispatch(reset())
      }, [user, isError, message, dispatch])
    
      const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
    
      const onSubmit = (e) => {
        e.preventDefault()
        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match')
          } 
          if(!email){
            const userData = {
              password,
              newPassword
            }
            dispatch(updatePassword(userData))
          }else {
             const userData = {
               email ,
               password,
               newPassword,
             }
            dispatch(updatePassword(userData))
          }
        }
      

    return (
        <div className='UserInfo_wrapper'>
            <Aside />
            <div className='UserInfo_wrapper-content d-flex w-100 p-5'>
                <h1 className='mb-5'>My security</h1>
                <div className="UserInfo_wrapper-content_items w-75">
                   
                    <div className="UserInfo_wrapper-content_items mb-5">
                    <div className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control id="email" type="email" placeholder="email" name="email" onChange={onChange} value={email} required />
                    </div>
                    </div>

                    <div className="UserInfo_wrapper-content_items mb-5">
                    <div className="mb-3">
                            <Form.Label>Old Password</Form.Label>
                            <Form.Control id="password" type="password" placeholder="password" name="password" value={password} onChange={onChange} required />
                    </div>
                    </div>

                    <div className="UserInfo_wrapper-content_items mb-5">
                    <div className="mb-3">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control id="newPassword" type="password" placeholder="newPassword" name="newPassword" value={newPassword} onChange={onChange} required />
                    </div>
                    </div>

                    <div className="UserInfo_wrapper-content_items mb-5">
                    <div className="mb-3">
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control id="confirmPassword" type="password" placeholder="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={onChange}  required />
                    </div>
                    </div>
                    <div className="UserInfo_wrapper-content_items mb-5">
                    <div className="action-wrapper text-center">
                    <Button className="btn"  type="submit" onClick={onSubmit}>Save changes</Button>
                    </div>
                    </div>
            
                </div>
            </div>
        </div>
    )
}

export default Security;