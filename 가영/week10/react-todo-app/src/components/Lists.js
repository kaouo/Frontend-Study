import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import List from "./List";

// 재사용성이 높은 함수부터 가져오기

// 내려줌
const Lists = React.memo(({ todoData, setTodoData, handleClick }) => {
  // 드래그앤드롭 적용
  const handleEnd = (result) => {
    console.log(result);

    if (!result.destination) return;

    const newTodoData = todoData;

    const [reorderedItem] = newTodoData.splice(result.source.index, 1);

    newTodoData.splice(result.destination.index, 0, reorderedItem);
    setTodoData(newTodoData);
    localStorage.setItem("todoData", JSON.stringify(newTodoData));
  };
  //

  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="to-dos">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.map((data, index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <List
                      key={data.id}
                      id={data.id}
                      title={data.title}
                      completed={data.completed}
                      todoData={todoData}
                      setTodoData={setTodoData}
                      provided={provided}
                      snapshot={snapshot}
                      handleClick={handleClick}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
});

export default Lists;
