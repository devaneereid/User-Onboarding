import React, {useState, useEffect}from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";


const UserForms = ({ values, errors, touched, status }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        status && setUsers(users => 
            [...users, status]);
        }, [status]);
    
    return (
        <div className="user-form">
            <Form>
               <Field 
                    type="text"
                    name="name"
                    placeholder="name" />

                <Field 
                    type="text"
                    name="email"
                    placeholder="email" />

                <Field 
                    type="text"
                    name="password"
                    placeholder="password" /> 

                    {/* CHECKBOX */}
                <label className="checkbox-container">
                    Terms of Service
                </label>
                <Field 
                    type="checkbox"
                    name="terms"
                    checked={values.terms} />

                    {/* BUTTON */}
                <Field as="textarea"
                    type="text"
                    name="notes" 
                    placeholder="notes" />
                <button>Submit</button>
            </Form>
            {users.map(user => (
                <ul key={user.id}>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Password: {user.password}</li>
                </ul>
            ))}
        </div>
    )
}
    const FormikUserForms = withFormik({
        mapPropsToValues({name, email, password,terms }){
            return {
                name: name || "",
                email: email || "",
                password: password || "",
                terms: terms || false
            };
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required(),
            password: Yup.string().required()
        }),
        handleSubmit(values, {setStatus}) {
            axios
                .post("https://reqres.in/api/users", values)
                .then(res => {
                    setStatus(res.data); 
                    console.log(res);
                })
                .catch(err => console.log(err.response));
        }
    })(UserForms);

export default FormikUserForms;