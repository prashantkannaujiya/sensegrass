import React from "react";
function Signup(props)
{
    function userRegistration(ev)
    {
        ev.preventDefault();
var k=document.getElementsByName('sign');
var d={
    username:k[0].value,
    
    password:k[1].value
}
fetch("http://localhost:2100/register", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(d),
  })
    
    .then((data) => {
      alert("Registered");
      props.u(4);
    })
    .catch(err=>alert(err))
    ev.target.reset();
    }
    return(
        <div style={{marginTop:'1.5cm'}}>
<form onSubmit={(e)=>{userRegistration(e)}}>
    <input type="text" placeholder='Username' name='sign'/><br/>
  
    <input type='password' placeholder='password' name='sign'/><br/>
    <button>Submit</button>
</form>
        </div>
    )
}
export default Signup;