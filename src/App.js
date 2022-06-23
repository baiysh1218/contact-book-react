import axios from "axios";
import React, { useState } from "react";
import AddProduct from "./components/AddProduct/AddProduct";
import List from "./components/List/List";
import "./App.css";
import Edit from "./components/Edit/Edit";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./components/Details/Details";

const App = () => {
  const API = "http://localhost:8001/data";
  const [data, setData] = useState([]);
  const [oneData, setOneData] = useState(null);
  async function addData(newData) {
    await axios.post(API, newData);
    getData();
  }
  async function getData() {
    let res = await axios(API);
    // console.log(res);
    setData(res.data);
  }
  async function deleteData(id) {
    await axios.delete(`${API}/${id}`);
    getData();
  }
  async function getOneData(id) {
    let res = await axios(`${API}/${id}`);
    setOneData(res.data);
  }
  async function updataData(id, editedData) {
    await axios.patch(`${API}/${id}`, editedData);
    getData();
  }
  return (
    <div className="block-body">
      <BrowserRouter>
        <Routes>
          <Route path="/add" element={<AddProduct addData={addData} />} />
          <Route
            path="/"
            element={
              <List deleteData={deleteData} data={data} getData={getData} />
            }
          />
          <Route
            path="edit/:id"
            element={
              <Edit
                getOneData={getOneData}
                oneData={oneData}
                updataData={updataData}
              />
            }
          />
          <Route
            path="/details/:id"
            element={<Details oneData={oneData} getOneData={getOneData} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
