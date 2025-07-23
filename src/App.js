import React, { useState } from 'react'
import './App.css'
const App = () => {
  const arr1=[-100,-10,-1]
  const arr2=[100,10,1]
  let [value,setValue]=useState(0)
  let [history,setHistory]=useState([])
  let [counter,setcounter]=useState(0)
  let [redoList,setRedoList]=useState([])
  let ShowHistory =(key,prev,curr)=>{
    console.log("Show the overview",key,prev,curr)
    let obj={
      action:key,
      prev,
      curr
    }
    const copyHistory=[...history]
    copyHistory.unshift(obj)
    setHistory(copyHistory)
  }
  let handleClick=(key)=>{
    console.log(key)
    let val=parseInt(key)
    ShowHistory(key,value,val+value)
    setValue((prev)=>prev+val)
  }
  // undohandle function
  let UndoHandle=()=>{

    
    if(history.length>0){
      if(counter+1>5){
        alert("You already have reached the limit of greater than 5")
        return;
      }

      setcounter((c)=>c+1)
      const copyhistory=[...history]
      const firstitem= copyhistory.shift()
      setHistory(copyhistory)

      setValue(firstitem.prev)
      const copyredo=[...redoList]
      copyredo.unshift(firstitem)
      setRedoList(copyredo)
    }
  }
  let handleRedo=()=>{
    if(redoList.length>0){
      const copyredolist=[...redoList]
      const popdone=copyredolist.pop()
      setRedoList(copyredolist)

      const {action,curr,prev}=popdone;
      setValue(curr)
      ShowHistory(action,curr,prev)
    }
  }
  return (
    <div className='App'>
      <h1>Undoable Counter</h1>
      <div className="action-btn">
        <button onClick={UndoHandle}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
      </div>
      <div className="user-actions">
       {
        arr1.map((btn)=>{
            return <div>
              <button onClick={()=>handleClick(btn)}>{btn}</button>
            </div>
        })
       }
       <div className='Value'>{value}</div>
       {
        arr2.map((btn)=>{
            return <div>
              <button onClick={()=>handleClick(btn)}>{btn}</button>
            </div>
        })
       }
      </div>
      <h1>History is coming</h1>
      <div className="history">
        
        {history.map((e)=>{
          return <div>
            <div className="row">
              <div>{e.action}</div>
              <div>
                {
                  `[${e.prev} -> ${e.curr}]`
                }

              </div>
            </div>
          </div>
        })}
      </div>
    </div>
  )
}

export default App
