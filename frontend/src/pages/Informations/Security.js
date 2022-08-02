import "./UserInfo.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { reset } from "../../features/auth/authSlice";
import SecurityForm from "./SecurityForm";

const Security = () => {
    const dispatch = useDispatch();

    const { user, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess) {
            toast(`Password Updated succefully `);
        }
        dispatch(reset());
    }, [user, isError, isSuccess, message, dispatch]);

    return (
        <div className="UserInfo_wrapper">
            <div className="UserInfo_wrapper-content d-flex w-100 p-5">
                <h1 className="mb-5">My security</h1>
                <div className="UserInfo_wrapper-content_items w-75">
                    <SecurityForm />
                </div>
            </div>
        </div>
    );
};

export default Security;
