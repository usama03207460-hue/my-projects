import { useRef, useState } from "react";
import "./App.css"
export function App() {
    console.log(localStorage);
    let acc=[];
    let taskHistory = Object.values(localStorage);
    console.log(taskHistory);
    for(let i=0; i<taskHistory.length;i++){
        acc.push(JSON.parse(taskHistory[i]));
    }
     const[task,addTask]=useState(acc);
     function taskCompleted(id){
        
        addTask(
            task.map((each)=>{
                
                if(Number(each.id)===id){
                    localStorage.setItem(id,JSON.stringify({...each,status:each.status==="complete"?"incomplete":"complete"}))
                return {...each,status:each.status==="complete"?"incomplete":"complete"}
            }
            else{
                return each
            }
            }
        ))        
    }
    function taskRemoved(id){
       task.map((each,index)=>{
        if(Number(each.id)===id){
            task.splice(index,1);
            localStorage.removeItem(id);
            addTask([...task])
        }
       })
    }
    return (
        <>

            <DateAndDay />
            <TaskInformation task={task} />
            <TaskContainer taskRemoved={taskRemoved} taskCompleted={taskCompleted} item={task} />
            <TaskAdd addTask={addTask} task={task} />
        </>
    )
}

export function DateAndDay() {
    const today = new Date();
    const dayName = today.toLocaleDateString("en-US", {
        weekday: "long"
    });

    const fullDate = today.toDateString().slice(4);

    return (
        <div className="dateAndDay">
            <p className="dayName">{dayName}</p>
            <p className="Date">{fullDate}</p>
        </div>
    )
}
function TaskInformation({ task }) {
    let count=0;
    task.forEach((each)=>{
       if(each.status==="complete"){
      count++;
      console.log(count);
       }
    })
    return (
        <div className="task-information">
            <div className="task-information--total-task tasks"><span>total task</span><div className="taskTrack">{task.length}</div></div>
            <div className="task-information--task-finished tasks"><span>finished</span><div className="taskTrack">{count}</div></div>
            <div className="task-information--task-left tasks"><span>task left</span><div className="taskTrack">{task.length-count}</div></div>
        </div>
    )
}
function TaskAdd({ addTask, task }) {
    const [state, changeState] = useState("");
    const counter = useRef(1);
    const Input = useRef();
    function inputTrack(event) {
        changeState(event.target.value);
    }
    function addTaskfn() {
      
       let random=Math.floor(Math.random()*1000);
       console.log(random);
        const newTask={id:random,text:state,status:"incomplete"}
        localStorage.setItem(random,JSON.stringify(newTask));
        addTask([...task,newTask])
        
        changeState("");
        Input.current.focus();
    }
    return (


        <div className="taskAddBox">

            <div className="inputBoxAndAddButton-wrapper">
                <input onChange={inputTrack} type="text" className="taskAddBox--inputBox" value={state} ref={Input}></input>
                <svg onClick={addTaskfn}
                    className={state ?"taskAddBox-inputBox--addButton-icon enable":"taskAddBox-inputBox--addButton-icon"} viewBox="0 0 69 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse className="mainCircle" cx="34.5" cy="33.5" rx="34.5" ry="33.5" />
                    <path d="M35.4142 12.5858C34.6332 11.8047 33.3668 11.8047 32.5858 12.5858L19.8579 25.3137C19.0768 26.0948 19.0768 27.3611 19.8579 28.1421C20.6389 28.9232 21.9052 28.9232 22.6863 28.1421L34 16.8284L45.3137 28.1421C46.0948 28.9232 47.3611 28.9232 48.1421 28.1421C48.9232 27.3611 48.9232 26.0948 48.1421 25.3137L35.4142 12.5858ZM34 53L36 53L36 14L34 14L32 14L32 53L34 53Z" fill="white" />
                </svg>
            </div>
        </div>

    )
}
function TaskContainer({item,taskCompleted,taskRemoved}) {
    console.log("item is", item);
    return (
        <div className="taskContainer">
            {item.map(function (each) {
                return <div className={each.status==="complete"?"task completed":"task"}>{each.text}
                <div className="taskTools">
                    <svg onClick={()=>taskCompleted(each.id)} className=" task-icons" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="60" cy="60" r="54" fill="#22C55E" />
                        <path
                            d="M50 52 
       L58 30 
       C60 24 68 24 70 30
       L70 50
       L84 50
       C90 50 94 56 92 62
       L86 82
       C84 88 80 92 74 92
       L50 92
       C44 92 40 88 40 82
       L40 58
       C40 54 44 52 50 52Z"
                            fill="white"
                        />


                        <rect x="28" y="54" width="12" height="38" rx="4" fill="white" />
                    </svg>
                    <svg onClick={()=>taskRemoved(each.id)} className="task-icons" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">


                        <ellipse cx="70" cy="118" rx="34" ry="8" fill="rgba(0,0,0,0.12)" />


                        <rect
                            x="42"
                            y="30"
                            width="56"
                            height="10"
                            rx="5"
                            fill="#475569"
                        />


                        <rect
                            x="58"
                            y="20"
                            width="24"
                            height="8"
                            rx="4"
                            fill="#64748B"
                        />
                        <path
                            d="M46 42 
       H94 
       L88 102
       C87 108 82 112 76 112
       H64
       C58 112 53 108 52 102
       Z"
                            fill="#CBD5E1"
                            stroke="#475569"
                            strokeWidth="4"
                            strokeLinejoin="round"
                        />


                        <line x1="60" y1="50" x2="60" y2="100" stroke="#64748B" stroke-width="3" />
                        <line x1="70" y1="50" x2="70" y2="102" stroke="#64748B" stroke-width="3" />
                        <line x1="80" y1="50" x2="80" y2="100" stroke="#64748B" stroke-width="3" />


                        <path
                            d="M58 66 L82 90"
                            stroke="#EF4444"
                            stroke-width="6"
                            stroke-linecap="round"
                        />

                        <path
                            d="M82 66 L58 90"
                            stroke="#EF4444"
                            stroke-width="6"
                            stroke-linecap="round"
                        />


                        <path
                            d="M52 48 H88"
                            stroke="white"
                            stroke-width="2"
                            opacity="0.5"
                            stroke-linecap="round"
                        />
                    </svg>
                </div>
            </div>
               
            })}


        </div>
    )
}