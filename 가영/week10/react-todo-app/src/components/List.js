import React, { useState } from "react";

const List = React.memo(
  ({
    id,
    title,
    completed,
    todoData,
    setTodoData,
    provided,
    snapshot,
    handleClick,
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);

    const handleCompletedChange = (id) => {
      let newTodoData = todoData.map((data) => {
        if (data.id === id) {
          data.completed = !data.completed;
        }
        return data;
      });
      setTodoData(newTodoData);
      localStorage.setItem("todoData", JSON.stringify(newTodoData));
    };

    const handleEditChange = (e) => {
      setEditedTitle(e.target.value);
    };

    const handleSubmit = (e) => {
      e.preventDefault(); // 왜 쓰는지 알 것
      let newTodoData = todoData.map((data) => {
        if (data.id === id) {
          data.title = editedTitle;
        }
        return data;
      });
      setTodoData(newTodoData);
      localStorage.setItem("todoData", JSON.stringify(newTodoData));
      setIsEditing(false);
    };

    if (isEditing)
      return (
        <div>
          <div
            className={
              "flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded"
            }
          >
            <div>
              <form onSubmit={handleSubmit}>
                <input
                  value={editedTitle}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 mr-4 text-gray-500 rounded"
                />
              </form>
            </div>
            <div>
              <button
                className="px-4 py-2 float-right text-black border-black
              border rounded hover:text-white hover:border-red-500 hover:bg-red-500"
                onClick={() => setIsEditing(false)}
              >
                X
              </button>
              <button
                className="px-4 py-2 float-right text-black border-black
              border rounded hover:text-white hover:border-red-500 hover:bg-red-500"
                type="submit"
                onClick={handleSubmit}
              >
                SAVE
              </button>
            </div>
          </div>
        </div>
      );
    else {
      return (
        <div
          key={id}
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <div
            className={`${snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"}
                        flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`}
          >
            <input
              type="checkbox"
              onChange={() => handleCompletedChange(id)} // 화살표 함수가 아니어서 오류
              defaultChecked={completed}
            />
            <span
              className={
                completed ? "line-through px-2 text-lg" : "px-2 text-lg"
              }
            >
              {title}
            </span>

            <div>
              <button
                className="px-4 py-2 float-right text-black border-black
              border rounded hover:text-white hover:border-red-500 hover:bg-red-500"
                onClick={() => handleClick(id)}
              >
                X
              </button>

              <button
                className="px-4 py-2 float-right text-black border-black
              border rounded hover:text-white hover:border-red-500 hover:bg-red-500"
                onClick={() => setIsEditing(true)}
              >
                EDIT
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
);

export default List;
