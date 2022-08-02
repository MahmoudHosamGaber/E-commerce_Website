import "./UserInfo.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserInfoForm from "./UserInfoForm";
import { toast } from "react-toastify";
import { reset } from "../../features/auth/authSlice";
const UserInfo = () => {
    const { user, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }

        if (isError) {
            toast.error(message);
        }
        if (isSuccess) {
            toast.success(`Information Updated Successfully`);
        }
        dispatch(reset());
    }, [user, isError, isSuccess, message, dispatch, navigate]);

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
