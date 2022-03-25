import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../../actions/userActions";
import ButtonLoader from "../../../components/loader/ButtonLoader";
import ProfileLink from "../../../components/profileLinks/ProfileLink";
import { UPDATE_PASSWORD_RESET } from "../../../constants/userConstants";
import styles from "./ChangePassword.module.scss";

const ChangePassword = ({ history }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, isUpdated, loading } = useSelector((state) => state.user);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Password updated successfully");

            history.push("/me");

            dispatch({
                type: UPDATE_PASSWORD_RESET,
            });
        }
    }, [dispatch, alert, error, history, isUpdated]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("oldPassword", oldPassword);
        formData.set("password", password);

        dispatch(updatePassword(formData));
    };
    return (
        <div className={styles.update_password}>
            <div className="container" style={{ marginTop: "85px" }}>
                <div className="row g-3">
                    <div className="col-md-3">
                        <ProfileLink />
                    </div>
                    <div className="col-md-9">
                        <div className={styles.form_container}>
                            <h4 className="text-center">
                                Update Profile
                                <form
                                    className={styles.form}
                                    onSubmit={submitHandler}
                                    encType="multipart/form-data"
                                >
                                    <div className={styles.from_group}>
                                        <label htmlFor="old_password_field">
                                            Old Password
                                        </label>
                                        <input
                                            type="password"
                                            id="old_password_field"
                                            value={oldPassword}
                                            onChange={(e) =>
                                                setOldPassword(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className={styles.from_group}>
                                        <label htmlFor="new_password_field">
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            id="new_password_field"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className={styles.from_group}>
                                        <button>
                                            {loading ? (
                                                <ButtonLoader />
                                            ) : (
                                                "Update"
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
