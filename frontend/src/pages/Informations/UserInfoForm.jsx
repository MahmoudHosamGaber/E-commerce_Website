import { Button } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../../features/auth/authSlice";

const UserInfoForm = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useForm({
        username: user.username,
        address: user.address,
        phone: user.phone,
        age: user.age,
    });
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserInfo(userInfo));
    };
    return (
        <form onSubmit={onSubmit}>
            <div className="UserInfo_wrapper-content_items mb-5">
                <div className="mb-3">
                    <label>Username</label>
                    <input
                        className="form-control"
                        type="Username"
                        name="username"
                        placeholder="Enter your Username"
                        defaultValue={user?.username}
                        onChange={setUserInfo}
                    />
                </div>
            </div>

            <div className="UserInfo_wrapper-content_items mb-5">
                <div className="mb-3">
                    <label>Location</label>
                    <input
                        className="form-control"
                        type="Location"
                        name="address"
                        placeholder="Enter your Location"
                        defaultValue={user?.address}
                        onChange={setUserInfo}
                    />
                </div>
            </div>

            <div className="UserInfo_wrapper-content_items mb-5">
                <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                        <label>Phone number</label>
                        <input
                            className="form-control"
                            type="tel"
                            name="phone"
                            placeholder="Enter your phone number"
                            defaultValue={user?.phone}
                            onChange={setUserInfo}
                        />
                    </div>
                    <div className="col-md-6">
                        <label>Age</label>
                        <input
                            className="form-control"
                            type="age"
                            name="age"
                            placeholder="Enter your birthday"
                            defaultValue={user?.age}
                            onChange={setUserInfo}
                        />
                    </div>
                </div>
            </div>
            <div className="UserInfo_wrapper-content_items mb-5">
                <div className="action-wrapper text-center">
                    <Button className="btn" type="submit">
                        Save changes
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default UserInfoForm;
