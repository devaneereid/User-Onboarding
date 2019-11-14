import React, {useState, useEffect}from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styled from "styled-components";

const UserStyles = styled.div`
    background: blueviolet;
    padding: 40px;
    border-radius: 20px;
    opacity: 0.9;
`;

const UserForms = ({ values, errors, touched, status }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        status && setUsers(users => 
            [...users, status]);
        }, [status]);
    
    return (
    <UserStyles>
        <div className="user-form">
            <Form>
               <Field 
                    type="text"
                    name="name"
                    placeholder="Name" />
                        {touched.name && errors.name && (
                    <p className="errors">
                        {errors.name}</p>
                )}
                <Field 
                    type="text"
                    name="email"
                    placeholder="Email" />
                {touched.email && errors.email && (
                    <p className="errors">
                        {errors.email}
                    </p>
                )}
                <Field 
                    type="text"
                    name="password"
                    placeholder="Password" /> 
                {touched.password && errors.password && (
                    <p className="errors">
                        {errors.password}
                    </p>
                )}
                    {/* CHECKBOX */}
                <label className="checkbox-container">
                    Terms of Service
                <Field 
                    type="checkbox"
                    name="terms"
                    checked={values.terms} />
            </label>
                    {/* BUTTON */}
                <Field as="textarea"
                    type="text"
                    name="notes" 
                    placeholder="Notes" />
                <button type="submit">Submit</button>
            </Form>
            {users.map(user => (
                <ul key={user.id}>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Password: {user.password}</li>
                </ul>
            ))}
        </div>
     </UserStyles>
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
            name: Yup.string().required('Required Field'),
            email: Yup.string().required('Required Field'),
            password: Yup.string().required('Required Field')
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