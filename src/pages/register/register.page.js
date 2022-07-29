import React from "react";
import { useEffect ,useState} from "react"
import User from "../../models/user"
import {useSelector} from "react-redux"
import AuthenticationService from "../../services/authentication.service"
import { useNavigate } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import faUserCircle from "@fortawesome/free-solid-svg-icons"
import "./register.page.css"

const Register = () =>{

    const [user,setUser] = useState(new User("","",""))
    const [loading,setLoading] = useState(false)
    const [submitted,setSubmitted] = useState(false)
    const [errorMessage,setErrorMessage] = useState("")

    const currentUser = useSelector(state => state.user)

    const navigate = useNavigate();

    //mounted
    useEffect(()=>{
        if(currentUser?.id){
            navigate("/profile");
        }
    },[])


    const handleChange = (e) => {
        const {name,value} = e.target

        setUser((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const handleRegister = () => {
        setSubmitted(true);

        if(!user.username || !user.password || !user.name){
            return;
        }

        setLoading(true)

        AuthenticationService.register(user).then(_=>{
            navigate("/login");
        }).catch(err => {
            if(err?.response?.status === 409){
                setErrorMessage("username or password is not valid")
            }else {
                setErrorMessage("Unexpected error occurred")
            }
            setLoading(false)
        })
    }

    return (
        <>
        <div className="container mt-5">
            <div className="card ms-auto me-auto p-3 shadow-lg custom-card">

            <FontAwesomeIcon icon={faUserCircle} className="ms-auto me-auto user-icon" />

            {errorMessage && 
                <div className="alert alert-danger">
                       {errorMessage} 
                 </div>   
            }

            <form onSubmit={()=> handleRegister()} noValidate className={submitted ? "was-validated":""}>
                
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" 
                    name="name" 
                    className="form-control"
                    value={user.name}
                    required/>
                    <div className="invalid-feeback">
                        Name is required
                    </div>
                </div>


                <div className="form-group">
                    <label htmlFor="name">Username</label>
                    <input type="text" 
                    name="username" 
                    className="form-control"
                    value={user.username}
                    required/>
                    <div className="invalid-feeback">
                        Username is required
                    </div>
                </div>


                <div className="form-group">
                    <label htmlFor="name">Password</label>
                    <input type="password" 
                    name="password" 
                    className="form-control"
                    value={user.password}
                    onChange={(e)=> handleChange(e)}
                    required/>
                    <div className="invalid-feeback">
                        Password is required
                    </div>
                </div>

                <button className="btn btn-info w-100 mt-3" disabled={loading}>
                    Sign Up
                </button>

            </form>

            <Link to="/login" className="btn btn-link">
            I have an account
            </Link>

            </div>
        </div>

        </>
    )
}

export default Register;