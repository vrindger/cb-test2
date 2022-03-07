import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import API from "./API";

const AddChat = ({ onAdd }) => {
  const [sender_email, setSenderEmail] = useState("");
  const [receiver_email, setReceiverEmail] = useState("");
  const [title, setTitle] = useState("");
  const [chat_body, setChatBody] = useState("");
  const [chatId, setChatId] = useState(null);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    refreshChats();
  }, []);

  const refreshChats = () => {
    API.get("/")
      .then((res) => {
        setChats(res.data);
        // setSenderEmail(res[0].sender_email)
        // setReceiverEmail(res[0].receiver_email)
        // setTitle(res[0].title)
        // setChatId(res[0].id)
      })
      .catch(console.error);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let item = { sender_email, receiver_email, title, chat_body };
    API.post("/", item).then(() => refreshChats());
  };

  const onUpdate = (id) => {
    let item = { sender_email };
    API.patch(`/${id}/`, item).then((res) => refreshChats());
  };

  const onDelete = (id) => {
    API.delete(`/${id}/`).then((res) => refreshChats());
  };

  function selectChat(id) {
    let item = chats.filter((chat) => chat.id === id)[0];
    setSenderEmail(item.sender_email);
    setReceiverEmail(item.receiver_email);
    setTitle(item.title);
    setChatBody(item.chat_body);
    setChatId(item.id);
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <h3 className="float-left">Create a new Chat</h3>
          <Form onSubmit={onSubmit} className="mt-4">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>{chatId}Sender Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Sender Email"
                value={sender_email}
                onChange={(e) => setSenderEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicGenre">
              <Form.Label>Receiver email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Receiver email"
                value={receiver_email}
                onChange={(e) => setReceiverEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Chat Body</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Chat Body"
                value={chat_body}
                onChange={(e) => setChatBody(e.target.value)}
              />
            </Form.Group>

            <div className="float-right">
              <Button
                variant="primary"
                type="submit"
                onClick={onSubmit}
                className="mx-2"
              >
                Save
              </Button>
              <Button
                variant="primary"
                type="button"
                onClick={() => onUpdate(chatId)}
                className="mx-2"
              >
                Update
              </Button>
            </div>
          </Form>
        </div>
        <div className="col-md-8 m">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Sender email</th>
                <th scope="col">Receiver email</th>
                <th scope="col">Title</th>
                <th scope="col">Body</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {chats.map((chat, index) => {
                return (
                  <tr key="">
                    <th scope="row">{chat.id}</th>
                    <td> {chat.sender_email}</td>
                    <td>{chat.receiver_email}</td>
                    <td>{chat.title}</td>
                    <td>{chat.chat_body}</td>
                    <td>
                      <i
                        className="fa fa-pencil-square text-primary d-inline"
                        aria-hidden="true"
                        onClick={() => selectChat(chat.id)}
                      ></i>
                      <i
                        className="fa fa-trash-o text-danger d-inline mx-3"
                        aria-hidden="true"
                        onClick={() => onDelete(chat.id)}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddChat;