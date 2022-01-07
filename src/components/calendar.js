import { Calendar, Select } from "antd";
import React, { useState } from "react";
import SelectTeacher from "./selectTeacher";

function getListData(value) {
  let listData;
  console.log(value.date(), value);
  switch (value.date()) {
    case 8:
      listData = [
        {
          name: "Luca",
          link: "https://meeting.zhumu.me/j/1530484976?pwd=Ump6VE9rY2c4RUd4Tnk3c3VDTG1WQT09",
        },
      ];
      break;

    default:
  }
  return listData || [];
}

function dateCellRender(value) {
  const listData = getListData(value);
  return (
    <div>
      {listData.map((item) => (
        <SelectTeacher />
      ))}
    </div>
  );
}

function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
}

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
}
function selectData(e) {
  console.log(e);
}

export default function MyCalendar() {
  return (
    <Calendar
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}
      onSelect={selectData}
    />
  );
}
