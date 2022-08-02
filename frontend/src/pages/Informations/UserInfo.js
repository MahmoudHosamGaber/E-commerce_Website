import "./UserInfo.css";
import { Button } from "react-bootstrap";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserInfoForm from "./UserInfoForm";

const UserInfo = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    return (
        <div className="UserInfo_wrapper">
            <div className="UserInfo_wrapper-content d-flex w-100 p-5">
                <h1 className="mb-5">My Information</h1>
                <div className="UserInfo_wrapper-content_items w-75">
                    <UserInfoForm />
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
