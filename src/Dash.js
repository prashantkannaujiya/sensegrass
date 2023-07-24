import React, { useContext, useState } from "react";
import Taskcreate from "./Taskcreate";
import ListTasks from "./ListTasks";
import { userContext } from "./App";
import AllTasks from "./AllTasks";
function Dash()
{
    var [nav,setnav]=useState(0);
    var p=useContext(userContext);
    return(
<div>
<h2>{p}'s Dashboard</h2>
<div id='dash'>
    <div id='controlPane'>
        <button onClick={()=>{setnav(1)}}>Create Task</button><br/>
        <button onClick={()=>{setnav(2)}}>All Tasks</button>
    </div>
    <div id='dashDetails'>
        {
            (()=>{
if(nav==0)
{
    return <div ><p>Check out the left pane to manage</p></div>
}
else if(nav==1)
{
    return <Taskcreate ></Taskcreate>
}
else
{
    return <AllTasks></AllTasks>
}
            })()
        }
    </div>
</div>
</div>
    )
}
export default Dash;