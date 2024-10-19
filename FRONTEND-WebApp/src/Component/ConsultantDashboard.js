import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function ConsultantDashboard() {
  const { userId, isLoggedIn } = useSelector((state) => state);
  const [resp, setRes] = useState([]);

  useEffect(() => {
    const getResponse = async () => {
      await getPost();
    };
    getResponse();
  }, []);

  const getPost = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/community/get-all-post"
      );
      setRes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        padding: "20px",
      }}
    >
      {resp &&
        resp.map((item) => (
          <ConsultantCard
            key={item._id} // Added key prop
            title={item.title}
            desc={item.desc}
            img={item.image}
            postId={item._id}
          />
        ))}
    </div>
  );
}

function ConsultantCard({ title, desc, img, postId }) {
  const [reply, setReply] = useState("");
  const { userId, isLoggedIn } = useSelector((state) => state);

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const createReply = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3000/api/community/create-reply", {
        reply: reply,
        postId: postId,
        userId: userId,
      })
      .then((res) => {
        alert("Reply created");
        if (reply.trim()) {
          setReply("");
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };

  return (
    <div
      style={{
        border: "1px solid black",
        width: "20%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        margin: "20px auto",
      }}
    >
      {img && (
        <img
          src={`http://localhost:3000/${img}`}
          alt="Consultant"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "10px",
            objectFit: "cover",
          }}
        />
      )}
      {title && (
        <h1 style={{ fontSize: "1.5rem", margin: "10px 0" }}>{title}</h1>
      )}
      {desc && (
        <h4 style={{ fontSize: "1rem", textAlign: "center", margin: "0" }}>
          {desc}
        </h4>
      )}

      <form onSubmit={createReply} style={{ width: "100%", marginTop: "10px" }}>
        <input
          type="text"
          value={reply}
          onChange={handleReplyChange}
          placeholder="Type your reply..."
          style={{
            width: "80%",
            padding: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "5px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "5px 10px",
            borderRadius: "5px",
            backgroundColor: "#00bf63",
            color: "white",
            border: "none",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Reply
        </button>
      </form>
    </div>
  );
}

export default ConsultantDashboard;
