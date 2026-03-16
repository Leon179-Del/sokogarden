import React, { useState } from 'react'
import Loader from './Loader';
import axios from 'axios';
import { unstable_setDevServerHooks } from 'react-router-dom';

const Addproducts = () => {

  const[product_name, setProductname] = useState("");
   const[product_description, setProductDescription] = useState("");
    const[product_cost, setProductCost] = useState("");
    const[product_photo, setProductPhoto] = useState("");
  //declare the additionalhook to manage the state of application

  const [loading, setLoading] =useState(false);
  const [success, setSuccess] =useState("")
  const [error, setError] =useState("")

  // create a function that will handle the submit function
  const handleSubmit = async(e) =>{
    //prevent the site from reloading
    e.preventDefault()

    //setloading hook with a message(activate it)
    setLoading(true)
    //  <h3 className='text-secondary'>{success}</h3>
    //   <h4 className='text-danger'>{error}</h4>
    try{

      //create a form data
      const formdata = new FormData()

      //appendthe details to the form data created
      formdata.append("product_name", product_name);
      formdata.append("product_description", product_description);
      formdata.append("product_cost", product_cost);
      formdata.append("product_photo",product_photo);

      // interact with axios to help you use the method post
      const response = await axios.post("https://leonlangat.alwaysdata.net/api/add_product", formdata)

      // set the loading hook back to default
      setLoading(false)

      // update the success  hook with a message
      setSuccess(response.data.message)
      // clearing the hooks
      setProductname("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto("");

    }
    catch(error){
      //set loading hook back to default
      setLoading(false)

      //update the seterror with a message
      setError(error.message)


    }
  }

  return (
    <div className='row justify-content-center mt-4'>
      <div className="col-md-6 card shadow p-4  ">
        <h3 className='text-info'>Welcome to add products</h3>
        {/* bind the loading hook */}
        {loading && <Loader />}

         <h3 className='text-secondary'>{success}</h3>
      <h4 className='text-danger'>{error}</h4>

      <form onSubmit={handleSubmit}>
        <input type="text" 
        placeholder='Enter the product name'
        className='form-control'
        required
        value={product_name}
        onChange={(e) => setProductname(e.target.value)}
        />
        <br />
        {/* {product_name} */}

        <input type="text"
        placeholder='Enter the product description'
        className='form-control'
        required
        value={product_description}
        onChange={(e) =>setProductDescription(e.target.value)}
        /> <br />

        {/* {product_description} */}

        <input type="number"
        placeholder='Enter the price of the product'
        className='form-control'
        required
        value={product_cost}
        onChange={(e) => setProductCost(e.target.value)}
        /> <br />


        {/* {product_cost} */}

        <label >Product photo</label>
        <input type="file" 
        className='form-control'
        required
        accept='image/*'
        onChange={(e) => setProductPhoto(e.target.files[0])}
        /> <br />


        <input type="submit"
        value="Add Products"
        className='btn btn-outline-primary'/>
  
        </form>
      </div>
      
    </div>
  )
}

export default Addproducts;
