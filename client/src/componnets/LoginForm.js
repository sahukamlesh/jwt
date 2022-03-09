import{useState} from 'react';
import {login} from '../services/user.service'
function LoginForm(){
    const [formData,setFormData]=useState({
        email:'sahukamlesh18@gmail.com',
        password:"1234567890"
    })
    const[errorMessage,setErrorMessage] = useState(null);
    const[sucessMesage,setSucessMessage] = useState(null);
    const handleFormSubmit = (event)=>{
        console.log(event)
        event.preventDefault();
        login(formData).then((response)=>{
            const {data:{message, token,type}} = response;
            localStorage.setItem("token",JSON.stringify({token,type}))
            setSucessMessage(message)
            setErrorMessage(null)
            // console.log({response}) 
        }).catch((error)=>{
            const {response:{data:{message}},}=error;
            setErrorMessage(message)
            setSucessMessage(null)
            // console.log({error:error.response})
        })
    }
    const handleOnchange = ({target:{name,value}})=>{
        // console.log({name,value})
        setFormData({
            ...formData,
            [name]:value
        })
    }
    return(
        <>
        {errorMessage &&  <p className='alert alert-danger'>{errorMessage}</p> }
        {sucessMesage && <p className='alert alert-success'>{sucessMesage}</p>  }
<form onSubmit={handleFormSubmit}>
  <div className="mb-3">
    <label>Email address</label>
    <input name="email" type="email" value={formData.email} onChange={handleOnchange} className="form-control"/>
  </div>
  <div className="mb-3">
    <label>Email address</label>
    <input type="password" name="password" value={formData.password} onChange={handleOnchange} className="form-control"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</>
    )
}

export default LoginForm;