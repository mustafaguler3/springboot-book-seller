import React from "react";
import { useDispatch } from "react-redux";
import AuthenticationService from "../../services/authentication.service"

const Login = () =>{

    const [user,setUser] = useState(new User("","",""))
    const [loading,setLoading] = useState(false)
    const [submitted,setSubmitted] = useState(false)
    const [errorMessage,setErrorMessage] = useState("")

    const currentUser = useSelector(state => state.user)

    const navigate = useNavigate();

    const dispatch = useDispatch();

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

    const handleLogin = (e) => {
        e.preventDefault()

        setSubmitted(true)

        if (!user.username || !user.password){
            return;
        }

        setLoading(true)

        AuthenticationService.login(user).then(response => {
            //set user in session
            dispatch(setCurrentUser(response.data))
            navigate("/profile")
        }).catch(err => {
            console.log(err)
            setErrorMessage("username or password is not valid")
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

            <form onSubmit={()=> handleLogin()} noValidate className={submitted ? "was-validated":""}>


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
                    Sign In
                </button>

            </form>

            <Link to="/register" className="btn btn-link">
            Create an account
            </Link>

            </div>
        </div>
        </>
    )
}

export default Login;