import React, { useCallback, useState } from "react";
import "./App.css";
import Lists from "./components/Lists";
import Form from "./components/Form";

const initialTodoData = localStorage.getItem("todoData")
  ? JSON.parse(localStorage.getItem("todoData"))
  : [];

export default function App() {
  // 함수니까 () 달아주고
  // map 쓸 예정
  // state가 관리하는 중
  // useSateSnippet
  const [todoData, setTodoData] = useState(initialTodoData);
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    // form 안에 input을 전송할 때 페이지 리로드되는 것을 막아줌
    e.preventDefault();

    // 새로운 할 일 데이터
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    // ??
    setTodoData((prev) => [...prev, newTodo]);
    localStorage.setItem("todoData", JSON.stringify([...todoData, newTodo]));
    setValue("");
  };

  const handleClick = useCallback(
    // callback 함수
    (id) => {
      let newTodoData = todoData.filter((data) => data.id !== id);
      console.log("newTodoData", newTodoData);
      setTodoData(newTodoData); // 왼쪽 값이 오른쪽 값으로 바뀜
      localStorage.setItem("todoData", JSON.stringify(newTodoData));
      // 객체나 배열을 저장해 줄 때는 JSON.stringify 메서드를 사용해서 텍스트로 변환해준 후 저장을 하면 됨
    },
    [todoData] // 의존성 배열
  );

  const handleRemoveClick = () => {
    setTodoData([]);
    localStorage.setItem("todoData", JSON.stringify([]));
  };

  // 클래스형 컴포넌트에서는 render 안에 return
  // But, 함수영 컴포넌트에서는 render 아예 없음
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-pink-200">
      <div className="w-full p-6 m-4 bg-white rounded-md shadow-md lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1 className="text-2xl">TO DO LIST</h1>
          <button onClick={handleRemoveClick}>Delete All</button>
        </div>

        {/* 내려줌 */}

        <Lists
          todoData={todoData}
          setTodoData={setTodoData}
          handleClick={handleClick}
        />

        <Form setValue={setValue} handleSubmit={handleSubmit} value={value} />
      </div>
    </div>
  );
}
