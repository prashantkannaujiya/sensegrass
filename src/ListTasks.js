import React, { useContext, useEffect, useState } from "react";
import { userContext } from "./App";
function ListTasks(props)
{
    var [task,settask]=useState([]);
var user=useContext(userContext);

useEffect(()=>{
   fetchTask();
},[])

function fetchTask()
{
    fetch('http://localhost:2100/fetchAll/'+user)
    .then(res=>res.json())
    .then((data)=>{
    settask(data);
    })
}
function edit_task(t)
{
props.u(t)
}
function deleteTask(t)
{
    fetch('http://localhost:2100/erase/'+t,{method:'delete'})
    .then((data)=>{alert("Deleted");fetchTask();})
}
function markclose(k)
{
    console.log('in markclose')
   fetch('http://localhost:2100/markClose/'+k)
   .then((data)=>{fetchTask();})
 }
 function sort()
 {
    var j=task.sort((x,y)=>{
        return ((x.date == y.date) ? 0 : ((x.date > y.date) ? 1 : -1 ));
    })
    console.log(j)
    settask([...j]);
 }
 function sortStatus()
 {
    console.log('in sortStatus')
    var k=[...task];
for(var i=0;i<k.length;i++)
{
    if(k[i].status=='closed')
    {
        console.log('found a closed task')
    for(var j=i+1;j<k.length;j++)
    {
if(k[j].status=='open')
{
    var temp=k[j];
    k[j]=k[i];
    k[i]=temp;
}
    }
}
}
console.log(k)
settask([...k]);
 }
  return(
        <div>
        <div><button className='sortButton' onClick={sort}>Sort By Date</button><button className='sortButton' onClick={sortStatus}>Sort By Status</button></div>
            {
                (()=>{
                    if(task.length!=0)
                    {
                     return   task.map((a)=>{
                    return <div id='taskDisplay'>
                        <p>Title : {a.title}</p>
                        <p>Description : {a.description}</p>
                        <p>Due Date : {a.date}</p>
                        <button className="TaskButton" onClick={()=>{edit_task(a.title)}}>Edit</button>
                        <button className="TaskButton" onClick={()=>{deleteTask(a.title)}}>Delete</button>
                        {
                            (a.status=='closed'?<span id='statusClosed'>Closed</span>: <button className="TaskButton" onClick={()=>{markclose(a.title)}}>Close Task</button>)
                        }
                       
                    </div>
                     })
                    }
                    else{
                        return <p>No Task Added</p>
                    }
                })()
                    
               
            }
        </div>
    )
}
export default ListTasks;