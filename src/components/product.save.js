import {forwardRef,useImperativeHandle,useState} from "react"
import Product from "../models/product"
import ProductService from "../services/product.service"

const ProductSave = forwardRef((props,ref)=>{


    useImperativeHandle(ref,()=>{
        showProductModal(){
            setShow(true)
        }
    })

    const [product,setProduct] = useState(new Product("","",""))
    const [errorMessage,setErrorMessage] = useState("");
    const [submitted,setSubmitted] = useState(false);
    const [show,setShow] = useState(false);

    const saveProduct = (e) => {
        e.preventDefault();

        setSubmitted(true)

        if (!product.name || !product.description || !product.price){
            return;
        }

        ProductService.saveProduct(product).then((res)=>{

            props.onSaved(res.data);
            setShow(false)
            setSubmitted(false)

        }).catch(err => {
            setErrorMessage("Unexpected error occurred")
        })
    }

    const handleChange = (e) => {
        const {name,value} = e.target;

        setProduct((prev)=>{
            return {
                ...prev,
                [name]:value
            }
        })
    }

    return (
        <Modal show={show}>
            <form onSubmit={(e)=>saveProduct(e)} noValidate className={submitted? "was-validated": ""}>
                <div className="modal-header">
                    <h5 className="modal-title">Product Details</h5>
                    <button type="button" className="btn-close" onClick={()=> setShow(false)}></button>
                </div>

                <div className="modal-body">

                {errorMessage && 
                    <div className="alert alert-danger">
                        {errorMessage}
                    </div>     
                }

                <div className="form-group">
                    <label>Name</label>
                    <input type="text"
                    name="name"
                    placeholder="name"
                    className="form-control"
                    value={product.name}
                    onChange={(e)=>handleChange(e)}
                    required />
                    <div className="invalid-feedback">
                        Name is required
                    </div>
                </div>

                </div>
            </form>
        </Modal>
    )

})