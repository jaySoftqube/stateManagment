import React from "react";

const CheckBoxList = ({ item, handleCheckbox, arrayName, index }) => {
  return (
    <div>
      <input
        style={{ border: "1px solid black" }}
        type="checkbox"
        checked={item.isChecked}
        name={item.subName}
        value={item.subName}
        onChange={() => {
          handleCheckbox(index, arrayName);
        }}
      />
      <label htmlFor={item.subName}>{item.subName}</label>
    </div>
  );
};

export default CheckBoxList;
