import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Edit = ({ oneData, updataData, getOneData }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [num, setNum] = useState("");
  const [image, setImage] = useState("");
  function handleSave() {
    let editedData = {
      name,
      lastName,
      num,
      image,
    };
    updataData(params.id, editedData);
    navigate("/");
  }
  useEffect(() => {
    getOneData(params.id);
  }, []);
  useEffect(() => {
    if (oneData) {
      setName(oneData.name);
      setLastName(oneData.lastName);
      setNum(oneData.num);
      setImage(oneData.image);
    }
  }, [oneData]);
  return (
    <div>
      {oneData ? (
        <div>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
          />
          <input
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            type="text"
          />
          <input
            value={num}
            type="number"
            onChange={e => setNum(e.target.value)}
          />
          <input
            value={image}
            onChange={e => setImage(e.target.value)}
            type="text"
          />
          <button onClick={() => handleSave()}>Save</button>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default Edit;
