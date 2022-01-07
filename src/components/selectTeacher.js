import { Select } from "antd";
import React, { useState } from "react";

const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];

function SelectTeacher() {
  const [selectedItems, confirmSlectedItem] = useState([]);
  const filteredOptions = OPTIONS.filter(o => !selectedItems.includes(o));
//   handleChange = (selectedItems) => {
//     this.setState({ selectedItems });
//   };

  return (
    // const { selectedItems } = this.state;
    <Select
      mode="multiple"
      placeholder="Inserted are removed"
      value={selectedItems}
      onChange={confirmSlectedItem}
      style={{ width: "100%" }}
    >
      {filteredOptions.map((item) => (
        <Select.Option key={item} value={item}>
          {item}
        </Select.Option>
      ))}
    </Select>
  );
}

export default SelectTeacher;
