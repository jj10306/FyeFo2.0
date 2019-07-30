import React, { useState } from 'react';
import axios from 'axios';
import Queue from './models/Queue'

import './App.scss';

import TitleBar from "./components/TitleBar"
import Card from "./components/Card"
import Input from "./components/Input"

function App() {
  const [queue, setQueue] = useState(new Queue());
  const [taList, setTaList] = useState([]);
  const [totalWait, setTotalWait] = useState(0);
  const [totalHelped, setTotalHelped] = useState(0);
  const [count, setCount] = useState(0);
  const [err, setErr] = useState("");
  const [user, setUser] = useState("General");

  const getInfo = gtid => {
      axios.post("http://localhost:5000/?gtid=" + gtid)
        .then(res => {
          if (res.data.status === 200) {
            const name = res.data.name;
            if (res.data.role === "Ta") {
              setUser(name);
              let flag = false;
              for (let i = 0; i < taList.length; i++) {
                if (taList[i].name === name) {
                  flag = true;
                  break;
                }
              }
              if (!flag) {
                taList.push({name, time: Date.now()});
                setTaList(taList);
              }
            } else {
              if (queue.size !== queue.CAPACITY) {
                if (queue.contains(name)) {
                  setErr("You're already in the queue!");
                  console.log("In queue already");
                } else {
                  queue.enqueue({name, time: Date.now()});
                  setQueue(queue);
                  setUser("General")
                }
              } else {
                setErr("Queue is full :(")
              }
            }
            setCount(count => count + 1); //work around to activate re-render
          } else {
            setErr(res.data.ErrorMessage);
          }
        })
        .catch(err => console.log(err));

  }
  const handleButtonChange = e => {
    let [op, ...ta] = e.target.value.split(" ");
    ta = ta.join(" ");
    switch(op) {
      case "RemoveNext":
        const student = queue.dequeue();
        if (queue.size === 0) {
          setQueue(queue);
          setCount(taList.length);
          setTotalHelped(0);
          setTotalWait(0);
        } else {
          const timeElapsed = ((Date.now() - student.time) / 1000) / 60 ;
          setTotalHelped(totalHelped => totalHelped + 1);
          setTotalWait(totalWait => totalWait + timeElapsed);
        }
        break;
      case "ClearQueue":
        queue.clear();
        setQueue(queue);
        setCount(taList.length);
        setTotalHelped(0);
        setTotalWait(0);
        break;
      case "Exit":
        setUser("General");
        break;
      case "SignOut":
        const newTaList = taList.filter((element) => element.name !== ta);
        setTaList(newTaList);
        setUser("General");
        setCount(count => count - 1);
        break;
      default:
        console.log("default")
    }
  }
  
  return (
      <>
        <TitleBar avgWait={(totalWait / totalHelped).toFixed(2)} />
        <div className="cards-container">
          <Card className={"queue-container"} title={"Queue"}>
            {queue.asArray().map((student, index) => <p key={student.time}>{(index + 1) + ") " + student.name}</p>)}
          </Card>
          <Card className={"ta-container"} title={"TAs on Duty"}>
            {taList.map((ta, index)=> <p key={ta.time}>{(index + 1) + ") " + ta.name}</p>)}
          </Card>
        </div>
        <Input 
          getInfo={getInfo}
          user={user}
          handleButtonChange={handleButtonChange}
        /> 
      </>
  );
}

export default App;
