import { MDBInput, MDBValidation, MDBBtn } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import { createUsersStart, updateUsersStart } from '../redux/actions';
import { toast } from 'react-toastify';

const initialState = {
    name: "",
    email: "",
    phone: "",
    address: ""
}


const AddEditUser = () => {
    const [formValue, setFormValue] = useState(initialState);
    const [editMode, setEditMode] = useState(false);
    const { name, email, phone, address } = formValue;
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { users } = useSelector(state => state.data);

    useEffect(() => {
        if (id) {
            setEditMode(true);
            const singleUser = users.find(item => item.id === Number(id));
            setFormValue({ ...singleUser });
        }else{
            setEditMode(false);
            setFormValue({...initialState})
        }
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && email && phone && address) {
            if (!editMode) {
                dispatch(createUsersStart(formValue))
                toast.success("User Added Successfully")
                setTimeout(() => history.push("/"), 500)
            } else {
                dispatch(updateUsersStart({ id, formValue }));
                setEditMode(false);
                toast.success("User Updated Successfully")
                setTimeout(() => history.push("/"), 500)
            }

        }
    }
    const onInputChange = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value })
    }

    return (
        <MDBValidation className="row g-0" style={{ marginTop: "30px" }} noValidate onSubmit={handleSubmit}>
            <p className="fs-2 fw bold">{!editMode ? "Add User Details" : "Update User details"}</p>
            <div style={{ margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center" }}>
                <MDBInput value={name || ""} name="name" type="text" onChange={onInputChange} required label="Name" validation="Please Enter Your Name !" invalid /><br />
                <MDBInput value={email || ""} name="email" type="email" onChange={onInputChange} required label="Email" validation="Please Enter Your email !" invalid /><br />
                <MDBInput value={phone || ""} name="phone" type="number" onChange={onInputChange} required label="Phone" validation="Please Enter Your phone No. !" invalid /><br />
                <MDBInput value={address || ""} name="address" type="text" onChange={onInputChange} required label="Address" validation="Please Enter Your address !" invalid /><br />
                <div className="col-12">
                    <MDBBtn style={{ marginRight: "10px" }} type="submit">{!editMode ? "Add" : "Update"}</MDBBtn>
                    <MDBBtn onClick={() => history.push("/")} color="danger">Back</MDBBtn>
                </div>
            </div>
        </MDBValidation>
    )
}

export default AddEditUser
