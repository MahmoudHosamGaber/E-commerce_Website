import './UserInfo.css';
import { Button } from 'react-bootstrap';
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
            <div className='UserInfo_wrapper-content d-flex w-100 p-5'>
                <h1 className='mb-5'>My Information</h1>
                <div className="UserInfo_wrapper-content_items w-75">

                    <form>
                    <div className="UserInfo_wrapper-content_items mb-5">
                    <div className="mb-3">
                        <label>Username</label>
                        <input className='form-control' type="Username" placeholder="Enter your Username" defaultValue= {user && user.username} /*onChange={(e) => this.setName(e.target.value)} */disabled readOnly />
                    </div>
                    </div>

                    <div className="UserInfo_wrapper-content_items mb-5">
                    <div className="mb-3">
                            <label>Location</label>
                            <input className='form-control' type="Location" placeholder="Enter your Location" defaultValue={user && user.address} /*onChange={(e) => this.setAddress(e.target.value)}*/ disabled readOnly />
                        </div>
                    </div>

                    <div className="UserInfo_wrapper-content_items mb-5">
                    <div className="mb-3">
                            <label>Email address</label>
                            <input className='form-control' type="email" placeholder="Enter your email address" aria-label="Disabled input" defaultValue={user && user.email}/* onChange={(e) => this.setEmail(e.target.value)}*/ disabled readOnly />
                    </div>
                    </div>

                    <div className="UserInfo_wrapper-content_items mb-5">
                    <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                            <label>Phone number</label>
                            <input className='form-control' type="tel" placeholder="Enter your phone number" defaultValue={user && user.phone} /*onChange={(e) => this.setPhone(e.target.value)}*/  disabled readOnly />
                        </div>
                        <div className="col-md-6">
                            <label>Age</label>
                            <input className='form-control' type="age" placeholder="Enter your birthday" defaultValue={user && user.age} /*onChange={(e) => this.setAge(e.target.value)}*/ disabled readOnly/>
                        </div>
                    </div>
                    </div>
                    <div className="UserInfo_wrapper-content_items mb-5">
                    <div className="action-wrapper text-center">
                    <Button className="btn"  type="submit">Save changes</Button>
                    </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserInfo;