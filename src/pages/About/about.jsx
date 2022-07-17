import "./about.scss";

import { Form, Formik } from "formik";
import {
  useGetDetaillUserQuery,
  useUpdateUserMutation,
} from "services/userServices";

import { Loading } from "components/Loading";
import { ProfileForm } from "components/ProfileForm/profileForm";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { validationSchema } from "formik/profile";

function About() {
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
            image: null,
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
              setFieldValue,
            } = formikProps;
            return (
              <Form>
                <ProfileForm
                  data={data}
                  values={values}
                  isSubmitting={isSubmitting}
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
