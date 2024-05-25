import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";

export default function UserApp() {
  const [userList, setUserList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  //리스트 클릭 시 user state를 변경, 해당 user의 id값으로 post, todo 정보 불러옴
  const [user, setUser] = useState("");
  const [userName, setUserName] = useState("");
  const [modalPostInfo, setModalPostInfo] = useState([]);
  const [modalTodoInfo, setModalTodoInfo] = useState([]);

  //모달 띄우고 닫기
  const handleClose = (e) => {
    setModalShow(false);
  };
  const handleOpen = (e) => {
    setModalShow(true);
  };

  //user 값이 바뀌면 모달에 띄울 내용 변경하기
  useEffect(() => {
    axios
      .get(postUrl, {
        params: { userId: user },
      })
      .then((resp) => {
        setModalPostInfo(resp.data);
      });
    axios
      .get(todoUrl, {
        params: { userId: user },
      })
      .then((resp) => {
        setModalTodoInfo(resp.data);
      });
  }, [user]);

  const url = "https://jsonplaceholder.typicode.com/users";
  const postUrl = "https://jsonplaceholder.typicode.com/posts";
  const todoUrl = "https://jsonplaceholder.typicode.com/todos";

  //처음 랜더링 시 값 요청하기
  useEffect(() => {
    axios.get(url).then((resp) => {
      setUserList(resp.data);
      // console.log(resp.data);
    });
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ListGroup>
        {userList.map((user) => (
          <ListGroup.Item
            key={user.id}
            onClick={(e) => {
              //모달에 띄울 user 변경, 데이터 요청할 id값과 이름 state 변경
              setUser(user.id);
              setUserName(user.name);
              handleOpen();
            }}
          >
            {user.id}. {user.name}-{user.email}
          </ListGroup.Item>
        ))}
        {/* <ListGroup.Item>안녕 날 소개하지 !</ListGroup.Item>
      <ListGroup.Item>내 이름은 임세현!</ListGroup.Item>
      <ListGroup.Item>힘차게 외쳐봅시다~</ListGroup.Item>
      <ListGroup.Item>빠샤빠샤 화이팅 !</ListGroup.Item> */}
      </ListGroup>

      <Modal show={modalShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{userName}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container fluid>
            <Row>
              <Col xs={12} sm={6}>
                <h1>Posts</h1>
                <ul>
                  {modalPostInfo.map((post) => (
                    <li>{post.title}</li>
                  ))}
                </ul>
              </Col>
              <Col xs={12} sm={6}>
                <h1>Todos</h1>
                <ul>
                  {modalTodoInfo.map((todo) => (
                    <li>{todo.title}</li>
                  ))}
                </ul>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
}
