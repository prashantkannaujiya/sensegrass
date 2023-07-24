import React, { createContext, useEffect, useState } from "react";
import './style.css';
import Signup from "./Signup";
import Login from "./Login";
import Dash from "./Dash";
export const userContext=createContext();
function App() {
 
  var [log, setlog] = useState(false);
  var [choice, setchoice] = useState(0);
  var [user, setuser] = useState(null);
  var [notes,setnotes]=useState([]);

  useEffect(()=>{
var u=window.localStorage.getItem("token");
console.log(u)
if(u!=null)
{
  fetch('http://localhost:2100/auth/'+u)
  .then((res) => res.json())
  .then((data) => {
    if (data.message == "approved") {
      console.log(data.data)
    setuser(data.data);
    setlog(true);
    var l=document.getElementById('logout');
    l.style.display='inline';
    }
});
}
  },[])
  function userResponse(n)
  {
    if(n==1)
    {
      setchoice(1);
    }
    else
    {
      setchoice(2);
    }
  }
 
  const userName=(k)=>{
    console.log(k);
   // var z=JSON.stringify(k);
    //console.log(z);
    console.log(typeof k);
    setuser(k);
    setlog(true);
 allNotes(k);
  }
  function allNotes(us){
    var l=document.getElementById('logout');
    l.style.display='inline';
    console.log(user);
    fetch("http://localhost:2100/notes/"+us)
    .then(res=>res.json())
    .then((data)=>{console.log(data);
      if(data.message=='none')
      {
       
      } 
    else
  {
    setnotes(data)
  }})
  }
  
  function logoff()
  {
    window.localStorage.clear();
    setuser(null);
    setlog(false);
    setchoice(0);
    var t=document.getElementById('logout');
    t.style.display='none';
  }
  function reload(k)
  {
setchoice(0);
  }
  return (
    <div>
      <div id="header"><span>{log ? 'Welcome '+ user : ""}</span><button id="logout" onClick={logoff}>Logout</button></div>
      {(() => {
        if (log == false) {
        return(  <div id="content">
            <div id="color-box"></div>
            <div id="interact">
             {
              (()=>{
if(choice==0)
{
  return (  <div>
      <div id="bars">
        <h1 className="red-bar"></h1>
        <h1 className="red-bar"></h1>
      </div>
      <h1 id="welcome">Welcome to TAMAS</h1>
      <p id='webTitle'>Task Management System</p>
      <div id="buttons">
        <button className="button" onClick={()=>{userResponse(1)}}>Sign Up</button>
        <button className="button" onClick={()=>{userResponse(2)}}>Log In</button>
      </div>
    </div>
  )
}
else if(choice==1)
{
  return <Signup u={reload}></Signup>
}
else
{
  return  <Login u={userName}></Login>
}
              })()
             }
            </div>
          </div>
        )
        }
        else{
return(<userContext.Provider value={user}><Dash></Dash></userContext.Provider> 
  )
        }
      })()}
    </div>
  );
}
export default App;
