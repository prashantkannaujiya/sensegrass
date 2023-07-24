import React, { useEffect, useState } from "react";

function EditTask(props)
{
    var [taskVal,settaskVal]=useState([{title:'',description:'',date:''}])

    useEffect(()=>{
        fetch('http://localhost:2100/getTask/'+props.p)
        .then(res=>res.json())
        .then((data)=>{
            console.log(data)
            console.log(taskVal)
        var k=document.getElementsByName('task');
        k[0].value=data[0].title;
        console.log(taskVal[0].title)
        k[1].value=data[0].description;
        k[2].value=data[0].date;
        settaskVal(data);
        })
    },[])

 function updateTasks(e)
 {
    e.preventDefault();
    console.log(props.p)
    var k=document.getElementsByName('task');
    var u={
        identity:props.p,
        title:k[0].value,
        description:k[1].value,
        date:k[2].value
    }
console.log(u)
    fetch("http://localhost:2100/updateTask",{
   method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(u),
})
    .then((res)=>{alert("updated");props.z('done');
    })
 }
    return(
        <div>
<form onSubmit={(e)=>{updateTasks(e)}}>
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
    )
}
export default EditTask;