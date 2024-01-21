import { useState } from "react"
import { useAppDispatch } from "../../redux/app/hooks";
import { login } from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invaildLogin, setInvalidLogin] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOnChangeEmail = (e:any) => {
    const value = e.target.value;
    setEmail(value);
  }

  const handleOnChangePassword = (e:any) => {
    const value = e.target.value;
    setPassword(value);
  }

  const handleOnAdd = (e:any) => {
    e.preventDefault();
    dispatch(login({email, password}))
      .then(response => {
        if(response.type === "login/fulfilled") navigate("/")
      })
      .catch(err => {
        setPassword("");
        setInvalidLogin(true);
      })
   
  }

  return (
    <div className="w-full bg-white py-12">
      <div className="md:max-w-[1480px] m-auto grid md:grid-cols-2 max-w-[600px]">
        <form action="" className="form">
          {invaildLogin ? 
            <h1 className="my-2 text-[red]">
              Invaild login, please try again
            </h1>: null}
          <div className="form-group">
            <input className="form-input" type="email" placeholder=" " value={email} onChange={handleOnChangeEmail}/>
            <label className="form-label">Email</label>
          </div>
          <div className="form-group">
            <input className="form-input" type="password" placeholder=" " value={password} onChange={handleOnChangePassword}/>
            <label className="form-label">Password</label>
          </div>
          <button className="px-8 py-3 rounded-md bg-[#9F2DD3] text-white font-bold hover:bg-[#6c1097] transition ease-in duration-200" 
                  onClick={handleOnAdd}>Login</button> 
        </form>
      </div> 
    </div>
)}

export default Login;