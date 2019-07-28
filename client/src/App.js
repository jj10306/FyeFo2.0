import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Queue from './models/Queue'

import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

import TitleBar from "./components/TitleBar"
import Card from "./components/Card"
import Input from "./components/Input"
import TaContent from "./components/TaContent";
import {timeout} from "q";

function App() {
  const [queue, setQueue] = useState(new Queue());
  const [taList, setTaList] = useState([]);
  const [totalWait, setTotalWait] = useState(0);
  const [totalHelped, setTotalHelped] = useState(0);
  const [count, setCount] = useState(0);
  const [user, setUser] = useState("General");

  // useEffect(() => {
  //   debugger;
  //   if (!queue.size) {
  //     for (let i = 1; i < 16; i++) queue.enqueue({name: `Test Student #${i}`, time: Date.now()})
  //     setCount(15);
  //   }
  //     });

  //this hook is to auto sign-out a TA after being dormant for 20s
  useEffect(() => {
    let numSecondsBeforeTimeout = 5;
    let timeOut;
    if (user !== "General") {
      timeOut = setTimeout(() => setUser("General"), numSecondsBeforeTimeout * 1000);
    }
    return () => {
      return timeOut ? clearTimeout(timeOut) : null;
    }
  });

  console.log(count);

  const getInfo = gtid => {
      axios.post("http://localhost:5000/?gtid=" + gtid)
        .then(res => {
          if (res.data.status === 200) {
            const name = res.data.name;
            if (res.data.role === "Ta") {
              let onDuty = false;
              for (let ta of taList) {
                if (ta.name === name) {
                  onDuty = true;
                  break;
                }
              }
              if (!onDuty) {
                setUser(name);
                taList.push({name, time: Date.now()});
                setTaList(taList);
                if (taList.length > 4) {
                  toast_error(`Hello, ${name}. Please remove all TAs that are no longer on duty!`, 3000);
                } else {
                  toast_success(name + " is on duty!");
                }
              } else {
                setUser(name);
                toast_success("Hello, " + name + "!");
              }
            } else {
              if (queue.size !== queue.CAPACITY) {
                if (queue.contains(name)) {
                  toast_error("You're already in the queue, " + name + "!");
                } else {
                  queue.enqueue({name, time: Date.now()});
                  setQueue(queue);
                  setUser("General");
                  toast_success("You've been added to the queue, " + name);
                }
              } else {
                toast_error("Queue is full :(");
              }
            }
            setCount(count => count + 1); //work around to activate re-render
          } else {
            toast_error(res.data.ErrorMessage);
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
          queue.clear()
          setQueue(queue);
          setCount(taList.length);
          setTotalHelped(0);
          setTotalWait(0);
        } else {
          const timeElapsed = ((Date.now() - student.time) / 1000) / 60 ;
          setTotalHelped(totalHelped => totalHelped + 1);
          setTotalWait(totalWait => totalWait + timeElapsed);
        }
        if (student.name) {
          toast_error("Bye, " + student.name);
        }
        break;
      case "ClearQueue":
        if (queue.size) {
          queue.clear();
          setQueue(queue);
          setCount(taList.length);
          setTotalHelped(0);
          setTotalWait(0);
          toast_error("Queue has been cleared!");
        }
        break;
      case "Exit":
        setUser("General");
        break;
      case "SignOut":
        removeTa(ta);
        setUser("General");
        toast_error(ta + " is now off duty!");
        break;
      default:
        console.log("default")
    }
  }
  const removeTa = ta => {
    setTaList(taList.filter(element => element.name !== ta));
    setCount(count => count - 1);
  }
  const signOutTa = ta => {
    setUser("General");
    toast_error(ta + " is now off duty!");
  }
  const toast_error = ( msg , time = 2000) => {
    toast.error(msg, {
      position: "top-right",
      autoClose: time,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      });
  }

  const toast_success= msg => {
    toast.success(msg, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      });
  }
  return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        <TitleBar avgWait={(totalWait / totalHelped).toFixed(2)} />
        <div className="cards-container">
          <Card className={"queue-container"} title={"Queue"}>
            {queue.asArray().map((student, index) => <p key={student.time}>{(index + 1) + ") " + student.name}</p>)}
          </Card>
          <Card className={"tas-container"} title={"TAs on Duty"}>
            {
              taList.map((ta, index) =>
                  index < 4
                ? <TaContent
                      key={ta.time}
                      name={ta.name}
                      user={user}
                      removeTa={removeTa}
                      signOutTa={signOutTa} />
                : null )
            }
            {/*{taList.map((ta, index)=> <TaContent key={ta.time} name={ta.name} user={user} removeTa={removeTa} /> )}*/}
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