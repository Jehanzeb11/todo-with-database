import React from "react";
import { useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { FiDelete } from "react-icons/fi";
import { BiEditAlt } from "react-icons/bi";
import { useEffect } from "react";
const Todo = () => {
  const [todoItem, setTodoItem] = useState([]);
  const [inputValue, setinputValue] = useState("");
  const [indexNumber, setIndexNumber] = useState("");
  const [updateInput, setupdateInput] = useState("");
  const [refresh, setRefresh] = useState(false);
  ///CREATE COLLECTION
  const dbCollection = collection(db, "todoCollection");

  useEffect(() => {
    async function getData() {
      const querySnapshot = await getDocs(dbCollection);
      const arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({
          id: doc.id,
          value: doc.data().todoValue,
        });
      });
      setTodoItem([...arr]);
    }
    getData();
  }, [refresh]);

  const addTodo = async () => {
    const obj = {
      todoValue: inputValue,
    };
    const addTodo = await addDoc(dbCollection, obj);
    console.log(addTodo, "addTodo");
    setRefresh(!refresh);
    ///old
    // todoItem.push({ value: inputValue });
    // setTodoItem([...todoItem]);
    setinputValue("");
  };

  const deleteAll = async () => {
    setTodoItem([]);
  };

  const deleteTodo = async (ind) => {
    console.log("delete todo", ind);
    const id = todoItem[ind].id;
    const dbRef = doc(db, "todoCollection", id);
    await deleteDoc(dbRef);

    todoItem.splice(ind, 1);
    setTodoItem([...todoItem]);
  };

  const updateTodo = async (ind) => {
    ///update firebase collection
    const id = todoItem[ind].id;
    const dbRef = doc(db, "todoCollection", id);
    await updateDoc(dbRef, {
      todoValue: updateInput,
    });

    todoItem.splice(ind, 1, { value: updateInput, id });
    setTodoItem([...todoItem]);
    setIndexNumber("");
    setupdateInput("");
  };

  const editTodo = (ind) => {
    setupdateInput(todoItem[ind].value);
  };

  return (
    <div className="container">
      <h1 className="text-black text-center p-4">TODO APP</h1>

      <div className="mt-5 px-4 d-flex">
        <input
          type="text"
          className="form-group form-control"
          placeholder="ENTER TODO"
          value={inputValue}
          onChange={(e) => setinputValue(e.target.value)}
        />
        <div className="my-1 mx-3 d-flex gap-3">
          <button className="btn btn-success" onClick={addTodo}>
            +
          </button>
        </div>
      </div>

      <section className="mt-5 px-4">
        {todoItem.map((todo, ind) => {
          return (
            <React.Fragment key={ind}>
              {indexNumber === ind ? (
                <div>
                  <input
                    onChange={(e) => setupdateInput(e.target.value)}
                    className="form-control form-group my-3"
                    value={updateInput}
                    autoFocus
                  />
                  <button
                    onClick={() => updateTodo(ind)}
                    className="btn btn-primary my-2"
                  >
                    UPDATE
                  </button>
                </div>
              ) : (
                <div className="alert alert-success d-flex justify-content-between">
                  {todo.value}
                  <div className="d-flex gap-2">
                    <FiDelete
                      color="black"
                      className="icon"
                      onClick={() => deleteTodo(ind)}
                      size={25}
                    />
                    <BiEditAlt
                      color="black"
                      className="icon"
                      onClick={() => {
                        setIndexNumber(ind);
                        editTodo(ind);
                      }}
                      size={25}
                    />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </section>
    </div>
  );
};

export default Todo;
