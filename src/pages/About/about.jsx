import "./about.scss";

import { Button, CircularProgress, TextField } from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import {
  useGetDetaillUserQuery,
  useUpdateUserMutation,
} from "services/userServices";

import { Loading } from "components/Loading";
import { ProfileForm } from "components/ProfileForm/profileForm";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { validationSchema } from "formik/profile";

function About({ mode, languages }) {
  const { id } = useParams();
  const { data, error, isLoading } = useGetDetaillUserQuery(id);
  const [updateUser] = useUpdateUserMutation();

  const handleUpdateUser = (values, { setSubmitting }) => {
    updateUser({ ...values, id: id });
    setTimeout(() => {
      setSubmitting(false);
      Swal.fire("Update user successfully!", "", "success");
    }, 2000);
  };

  if (isLoading) return <Loading />;
  if (error) console.log(error);
  else
    return (
      <div className="account">
        <Formik
          enableReinitialize={true}
          validationSchema={validationSchema}
          initialValues={{
            firstName: `${data ? data.firstName : ""}`,
            lastName: `${data ? data.lastName : ""}`,
            email: `${data ? data.email : ""}`,
            age: `${data ? data.age : ""}`,
            team: `${data ? data.team : ""}`,
            role: `${data ? data.role : ""}`,
          }}
          onSubmit={(values, { setSubmitting }) => {
            handleUpdateUser(values, { setSubmitting });
          }}
        >
          {(formikProps) => {
            const {
              isSubmitting,
              isValid,
              values,
              touched,
              errors,
              handleChange,
            } = formikProps;
            console.log("🚀 ~ file: about.jsx ~ line 57 ~ About ~ values,", {
              values,
              touched,
              errors,
            });
            return (
              <Form>
                <ProfileForm
                  mode={mode}
                  languages={languages}
                  values={values}
                  isSubmitting={isSubmitting}
                  isValid={isValid}
                  touched={touched}
                  errors={errors}
                  handleChange={handleChange}
                />
              </Form>
            );
          }}
        </Formik>
      </div>
    );
}
export default About;
