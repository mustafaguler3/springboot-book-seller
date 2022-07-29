import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import purchaseService from "../../services/purchase.service";
import UserService from "../../services/user.service"

const Profile = () =>{

    const [purchaseList,setPurchaseList] = useState([])
    const [errorMessage,setErrorMessage] = useState("")

    const currentUser = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        purchaseService.getAllPurchaseItems().then((res)=>{
            setPurchaseList(res.data);
        })
    },[])

    const changeRole = ()=>{
        const newRole = currentUser.role === Role.ADMIN ? Role.USER : Role.ADMIN;

        UserService.changeRole(newRole).then(()=>{
            dispatch(clearCurrentUser())
            navigate("/login")
        }).catch(err =>{
            setErrorMessage("Unexpected error occured")
        })
    }

    return (
        <>
        <div className="container">
            <div className="pt-5">

            {errorMessage && 
            
                <div className="alert alert-danger">
                        {errorMessage}
                </div>
            }

            <div className="card">
                <div className="card-header">
                <div className="row">
                    <div className="col-6">
                        <h3>All purchased</h3>
                    </div>

                    <div className="col-6 text-end">
                        Current role is <strong>{currentUser_.role}</strong>
                    </div>

                    <button className="btn btn-primary" onClick={()=>changeRole()}>
                        Change Role
                    </button>
                </div>
                </div>
                
                <div className="card-body">
                    <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchaseList.map((item,ind)=>{
                            <tr>
                                <td scope="row">{ind+1}</td>
                                <td>{item.name}</td>
                                <td>{`$ ${item.price}`}</td>
                                <td>{new Date(item.purchaseTime).toLocaleDateString()}</td>
                            </tr>
                        })}
                    </tbody>
                    </table>
                </div>
            </div>

            </div>
        </div>
        </>
    )
}

export default Profile;