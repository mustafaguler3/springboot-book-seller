import { Link } from "react-router-dom";
import React from "react";
const NotFound = () =>{
    return (
        <>
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <span className="display-1">
                        404
                    </span>
                    <div className="mb-4 lead">
                        Oops! We cant seem to find the page
                    </div>

                    <Link to="/home" className="btn btn-link">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
        </>
    )
}

export default  NotFound;