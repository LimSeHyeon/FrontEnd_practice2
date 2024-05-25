import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";

export default function UserApp() {
  const [userList, setUserList] = useState([]);

  const url = " https://jsonplaceholder.typicode.com/users";
  useEffect(() => {
    axios.get(url).then((resp) => {
      setUserList(resp.data);
      console.log(resp.data);
    });
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ListGroup>
        {userList.map((user) => (
          <ListGroup.Item>{user.id}. {user.name}-{user.email}</ListGroup.Item>
        ))}
      {/* <ListGroup.Item>안녕 날 소개하지 !</ListGroup.Item>
      <ListGroup.Item>내 이름은 임세현!</ListGroup.Item>
      <ListGroup.Item>힘차게 외쳐봅시다~</ListGroup.Item>
      <ListGroup.Item>빠샤빠샤 화이팅 !</ListGroup.Item> */}
    </ListGroup>
    </div>
  )
}
