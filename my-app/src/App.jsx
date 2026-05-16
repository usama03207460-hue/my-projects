import { useEffect, useRef, useState } from "react"

export function App(){
  console.log(localStorage);
  return(
    <EditorBox/>
  )
}
function EditorBox(){
  const[state,setState]=useState("");
  const input=useRef();
  function textSelection(){
    setState(getSelection().toString())
  }
  useEffect(
    ()=>{
      window.addEventListener("beforeunload",()=>{
        localStorage.setItem("inputHistory",input.current.textContent);
      })
    },[]);
useEffect(
  ()=>{
    input.current.textContent=localStorage.getItem("inputHistory");
  }
)
function selectionText(){
  setState(getSelection().toString())
}
  return(
    <>
    <div className="small">{state}</div>
    <div onMouseUp={selectionText} ref={input}  className="editorBox"  contentEditable={true}>

    </div>
    </>
  )
}

