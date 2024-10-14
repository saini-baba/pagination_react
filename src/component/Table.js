import React from "react";
import styles from "./table.module.scss";
export const Table = (props) => {
  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.age}</td>
                <td>{item.salary}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
