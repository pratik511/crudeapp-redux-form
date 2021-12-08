import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadUsersStart, deleteUsersStart } from './../redux/actions';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBIcon, MDBTooltip, MDBSpinner } from "mdb-react-ui-kit"
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


const Home = () => {
    const dispatch = useDispatch();
    const { users ,loading } = useSelector(state => state.data);

    useEffect(() => {
        dispatch(loadUsersStart());
    }, []);

    if(loading){
        return (
            <MDBSpinner style={{marginTop:"150px"}} role="status">
                <span className="visually-hiddden"></span>
            </MDBSpinner>
        )
    }

    const handleDelete = (id) => {
        if(window.confirm("Are you sure that you want to Delete that user ? ")){
            dispatch(deleteUsersStart(id))
            toast.success("User Deleted Successfully !")
        }
    }
    return (
        <div className="container" style={{ marginTop: "150px" }}>
            <MDBTable>
                <MDBTableHead dark>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                        <th scope="col">Action</th>
                    </tr>
                </MDBTableHead>
                {users && users.map((item, index) => (
                    <MDBTableBody key={index}>
                        <tr>
                            <th scope="row">{index + 1}</th>
                            <td scope="row">{item.name}</td>
                            <td scope="row">{item.email}</td>
                            <td scope="row">{item.phone}</td>
                            <td scope="row">{item.address}</td>
                            <td>
                                <MDBBtn className="m-1" tag="a" color="none" onClick={() => handleDelete(item.id)}>
                                    <MDBTooltip title="Delete" tag="a">
                                        <MDBIcon fas icon="trash" style={{ color: "#dd4b39", size: "lg" }} />
                                    </MDBTooltip>
                                </MDBBtn>{"  "}
                                <Link to={`/edituser/${item.id}`}>
                                    <MDBTooltip title="Edit" tag="a">
                                        <MDBIcon fas icon="pen" style={{ color: "#55acee", size: "lg" , marginBottom :"10px" }} />
                                    </MDBTooltip>
                                </Link>{"  "}
                                <Link to={`/userInfo/${item.id}`}>
                                    <MDBTooltip title="View" tag="a">
                                        <MDBIcon fas icon="eye" style={{ color: "#3b5998", size: "lg" , marginBottom :"10px" }} />
                                    </MDBTooltip>
                                </Link>
                            </td>
                        </tr>
                    </MDBTableBody>
                ))}
            </MDBTable>
        </div>
    )
}

export default Home
