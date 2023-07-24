import React, { useContext } from "react";
import { userContext } from "./App";
function Taskcreate()
{
    var p=useContext(userContext);
    function insertTask(ev)
  {
    ev.preventDefault();
    var n=document.getElementsByName('task');
    console.log(n[0].value)
    var t={
      username:p,
      title:n[0].value.trim(),
      description:n[1].value,
      date:n[2].value
    }

    fetch("http://localhost:2100/submitTask",{
      
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(t),
    
    }).then(res=>res.json()).then((data)=>{alert('Task inserted ');})
ev.target.reset();
  }
    return(
        <div>
<h3>Create Task</h3>
<div>
    <form onSubmit={(e)=>{insertTask(e)}}>
        <label>Title</label><br/>
        <input type='text' name='task'/>
        <br/>
        <label>Task Description</label><br/>
        <textarea cols={21} rows={4} name='task'></textarea>
        <br/>
        <label>Due Date</label><br/>
        <input type='date' name='task'/>
        <br/>
        <button>Submit</button>
    </form>
</div>
        </div>
    )
}
export default Taskcreate;