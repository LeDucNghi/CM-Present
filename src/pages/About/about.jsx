import "./About.scss";

import { Button, CircularProgress } from "@mui/material";
import { Form, Formik } from "formik";
import { fetchUserById, handleUpdateUser } from "features/profile/profileThunk";
import {
  fetchingUser,
  selectError,
  selectFetching,
  selectMessage,
  selectUserProfile,
  updateUser,
} from "features/profile/profileSlice";
import { useDispatch, useSelector } from "react-redux";

import { Avatar } from "features/profile/components/Avatar";
import { Images } from "constants/images";
import { InputField } from "features/profile/components/InputField";
import { Loading } from "components/Common/Loading";
import { selectLanguage } from "features/drawer/drawerSlice";
import { selectLoading } from "features/profile/profileSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { validationSchema } from "formik/profile";

function About() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const error = useSelector(selectError);
  const message = useSelector(selectMessage);
  const data = useSelector(selectUserProfile);
  const isFetching = useSelector(selectFetching);
  const isLoading = useSelector(selectLoading);
  const languages = useSelector(selectLanguage);

  useEffect(() => {
    // dispatch(fetchUserById(id));
    dispatch(fetchingUser(id));
  }, [dispatch, id]);

  const initialValues = {
    firstName: `${data ? data.firstName : ""}`,
    lastName: `${data ? data.lastName : ""}`,
    email: `${data ? data.email : ""}`,
    age: `${data ? data.age : ""}`,
    team: `${data ? data.team : ""}`,
    role: `${data ? data.role : ""}`,
    image: `${data ? data.image : null}`,
  };

  if (isFetching) return <Loading />;
  else if (error)
    return (
      <div className="not_found">
        <img src={Images.EMPTY} alt="" />
        <p>{message} </p>
      </div>
    );
  else
    return (
      <div className="account">
        <Formik
          enableReinitialize={true}
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(values) => {
            // dispatch(handleUpdateUser(id, values));
            dispatch(
              updateUser({
                id,
                values,
              })
            );
          }}
        >
          {(formikProps) => {
            const {
              isValid,
              values,
              touched,
              errors,
              handleChange,
              handleBlur,
              setFieldValue,
            } = formikProps;
            return (
              <Form>
                <div className="account_info">
                  <InputField
                    values={values}
                    touched={touched}
                    errors={errors}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                  />
                </div>

                <div className="user_avatar">
                  <Avatar data={data} setFieldValue={setFieldValue} />
                </div>

                <div className="account_btn">
                  <Button
                    disabled={isLoading || !isValid}
                    type="submit"
                    className="apply"
                  >
                    {isLoading ? (
                      <CircularProgress color="success" />
                    ) : languages === "Eng" ? (
                      "Save"
                    ) : (
                      "Lưu"
                    )}
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    );
}
export default About;
