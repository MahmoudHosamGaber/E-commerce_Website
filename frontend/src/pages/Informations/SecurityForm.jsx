import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "../../features/auth/authSlice";
import { Button } from "react-bootstrap";

const SecurityForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        newPassword: "",
        confirmPassword: "",
    });

    const dispatch = useDispatch();
    const { email, password, newPassword, confirmPassword } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
        }
        if (!email) {
            const userData = {
                password,
                newPassword,
            };
            dispatch(updateUserInfo(userData));
        } else {
            const userData = {
                email,
                password,
                newPassword,
            };
            dispatch(updateUserInfo(userData));
        }
    };
    return (
        <form onSubmit={onSubmit}>
            <div className="UserInfo_wrapper-content_items mb-5">
                <div className="mb-3">
                    <label>Email address</label>
                    <input
                        className="form-control"
                        id="email"
                        type="email"
                        placeholder="email"
                        name="email"
                        onChange={onChange}
                        value={email}
                    />
                </div>
            </div>

            <div className="UserInfo_wrapper-content_items mb-5">
                <div className="mb-3">
                    <label>Old Password</label>
                    <input
                        className="form-control"
                        id="password"
                        type="password"
                        placeholder="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                    />
                </div>
            </div>

            <div className="UserInfo_wrapper-content_items mb-5">
                <div className="mb-3">
                    <label>New Password</label>
                    <input
                        className="form-control"
                        id="newPassword"
                        type="password"
                        placeholder="newPassword"
                        name="newPassword"
                        value={newPassword}
                        onChange={onChange}
                        required
                    />
                </div>
            </div>

            <div className="UserInfo_wrapper-content_items mb-5">
                <div className="mb-3">
                    <label>Confirm New Password</label>
                    <input
                        className="form-control"
                        id="confirmPassword"
                        type="password"
                        placeholder="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={onChange}
                        required
                    />
                </div>
            </div>

            <div className="UserInfo_wrapper-content_items mb-5">
                <div className="action-wrapper text-center">
                    <Button type="submit" className="btn">
                        Save changes
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default SecurityForm;
