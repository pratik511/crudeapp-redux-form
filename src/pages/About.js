import React from 'react'
import { Formik, Form, Field, FieldArray} from "formik";
import * as yup from "yup";
import ErrorMsg from '../component/ErrorMsg';

const validationSchema = yup.object({
    name: yup.string().required("Name is Required !"),
    phone: yup.number().min(1000000000,"Not a Valid Number").max(9999999999,"Not a Valid Number").required("Phone is Required !"),
    password: yup.string().required("Password is Required !"),
    gender: yup.string().required("Gender is Required !"),
    date: yup.date().required("Date is Required !"),
    income: yup.number().required("Income is Required !"),
    about: yup.string().required("About is Required !"),
})

const About = () => {
    return (
        <div style={{marginTop:"50px"}}>
            <h2>Formik and Yup Validation</h2>
            <Formik
                validationSchema={validationSchema}
                initialValues={{
                    name: "",
                    phone: "",
                    password: "",
                    gender: "",
                    date: "",
                    income: "",
                    about: "",
                    social: [],
                    hobbies: [],
                }}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                    <Form>
                        <label>Name:</label>
                        <Field name="name" type="text" />
                        <ErrorMsg name='name'/>
                        <br /> 
                        <label>Phone:</label>
                        <Field name="phone" type="number" />
                        <ErrorMsg name='phone'/>
                        <br /> 
                        <label>Password:</label>
                        <Field name="password" type="password" />
                        <ErrorMsg name='password'/>
                        <br /> <br />
                        <label>Gender:</label>
                        <br /> <br />
                        <label>Male:</label>
                        <Field name="gender" value="male" type="radio" />
                        <label>Female:</label>
                        <Field name="gender" value="female" type="radio" />
                        <ErrorMsg name='gender'/>
                        <br /> <br />
                        <label>Date:</label>
                        <Field name="date" type="date" />
                        <ErrorMsg name='date'/>
                        <br /> <br />
                        <label>Income:</label>
                        <Field name="income" as="select">
                            <option value="0">rs 0</option>
                            <option value="1000">rs 1000</option>
                            <option value="10000">rs 10000</option>
                        </Field>
                        <ErrorMsg name='income'/>
                        <br /> <br />
                        <label>About:</label>
                        <Field name="about" as="textarea" />
                        <ErrorMsg name='about'/>
                        <br /> <br />
                       
                        <button type="submit">Submit</button>
                    </Form>
              
            </Formik>
        </div>
    )
}

export default About
