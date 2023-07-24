import React, { useState } from "react";
import ListTasks from "./ListTasks";
import EditTask from "./EditTask";

function AllTasks()
{
    var [navigate,setnavigate]=useState(0);
var [identify,setidentify]=useState(null)
    function updateTask(u)
    {
setidentify(u);
setnavigate(1)
    }

    function respond(w)
    {
setnavigate(0);
    }
    return(
<div>
{
    (()=>{
        if(navigate==0)
        {
            return <ListTasks u={updateTask}></ListTasks>
        }
        else
        {
            return <EditTask p={identify} z={respond}></EditTask>
        }
    })()
}
</div>
    )
}
export default AllTasks