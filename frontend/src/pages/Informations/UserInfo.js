import { Aside } from '../../components';
import './UserInfo.css';
import {Form, Button } from 'react-bootstrap';
import React ,{ useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const UserInfo = () => {
  const navigate = useNavigate()  
  const {user} = useSelector((state) => state.auth)
  useEffect(() => {
    if(!user){
        navigate('/login')
    }
  }, [user, navigate])



    return (
        <div className='UserInfo_wrapper'>
            <Aside />
            <div className='UserInfo_wrapper-content d-flex w-100 p-5'>
                <h1 className='mb-5'>My Information</h1>
                <div className="UserInfo_wrapper-content_items w-75">
                    <div className="UserInfo_wrapper-content_items mb-5">
                    <div className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="Username" placeholder="Enter your Username" defaultValue= {user && user.username} /*onChange={(e) => this.setName(e.target.value)} */disabled readOnly />
                    </div>
                    </div>

                    <div className="UserInfo_wrapper-content_items mb-5">
                    <div className="mb-3">
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="Location" placeholder="Enter your Location" defaultValue={user && user.address} /*onChange={(e) => this.setAddress(e.target.value)}*/ disabled readOnly />
                        </div>
                    </div>
                    <div className="UserInfo_wrapper-content_items mb-5">
                    <div className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter your email address" aria-label="Disabled input" defaultValue={user && user.email}/* onChange={(e) => this.setEmail(e.target.value)}*/ disabled readOnly />
                    </div>
                    </div>

                    <div className="UserInfo_wrapper-content_items mb-5">
                    <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control type="tel" placeholder="Enter your phone number" defaultValue={user && user.phone} /*onChange={(e) => this.setPhone(e.target.value)}*/  disabled readOnly />
                        </div>
                        <div className="col-md-6">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="age" placeholder="Enter your birthday" defaultValue={user && user.age} /*onChange={(e) => this.setAge(e.target.value)}*/ disabled readOnly/>
                        </div>
                    </div>
                    </div>

                    <div className="UserInfo_wrapper-content_items mb-5">
                    <div className="action-wrapper text-center">
                    <Button className="btn"  type="submit">Save changes</Button>
                    </div>
                    </div>
            
                </div>
            </div>
        </div>
    )
}

export default UserInfo;