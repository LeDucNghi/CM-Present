import "./About.scss";

import { Form, Formik } from "formik";
import { fetchUserById, handleUpdateUser } from "features/profile/profileThunk";
import {
  selectError,
  selectFetching,
  selectMessage,
  selectUserProfile,
} from "features/profile/profileSlice";
import { useDispatch, useSelector } from "react-redux";

import { Images } from "constants/images";
import { Loading } from "components/Common/Loading/Loading";
import { ProfileForm } from "features/profile/components/ProfileForm";
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

  useEffect(() => {
    dispatch(fetchUserById(id));
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
            dispatch(handleUpdateUser(id, values));
          }}
        >
          {(formikProps) => {
            const {
              isValid,
              values,
              touched,
              errors,
              handleChange,
              setFieldValue,
            } = formikProps;
            return (
              <Form>
                <ProfileForm
                  data={data}
                  values={values}
                  isValid={isValid}
                  touched={touched}
                  errors={errors}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              </Form>
            );
          }}
        </Formik>
      </div>
    );
}
export default About;
