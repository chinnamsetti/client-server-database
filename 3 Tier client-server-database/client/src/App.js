
import './App.css';
import {useState} from "react"
function App() {

  let [students,setStudents]=useState([]);

  let getStudentsFromServer=async()=>{
    let reqOptions={
      method:"GET"
    };

    let JSONData=await fetch("http://localhost:1405/getStudents",reqOptions);

    let JSOData=await JSONData.json();
    setStudents(JSOData);

    console.log(JSOData);
  }
  return (
    <div className="App">
      <button onClick={()=>{
        getStudentsFromServer();
      }}>Get Students</button>
      {students.map((ele,i)=>{
        return <div className="studentDiv" key={i}>
           <h2>{ele.firstName}{ele.lastName}</h2>
           <h2>{ele.email}</h2>
           <h2>{ele.age}</h2>
           <h2>{ele.gender}</h2>
           <h2>{ele.mobileNo}</h2>
           <h2>{ele.htNo}</h2>
           </div>
      })}
    </div>
  );
}

export default App;
