import React, { FC, ChangeEvent, useState } from "react";
import "./index.css";
import TodoTask from "./components/TodoTask";
import { ITask } from "./interfaces";
import "remixicon/fonts/remixicon.css";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<any>("");
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDeadline(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadline };
    setTodoList([...todoList, newTask]);
    setTask("");
    setDeadline("");
  };

  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(
      todoList.filter(task => {
        return task.taskName != taskNameToDelete;
      })
    );
  };

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Tarefa"
            name="task"
            value={task}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Tempo (em dias)"
            name="deadline"
            value={deadline}
            onChange={handleChange}
          />
          <button onClick={addTask}>
            <i className="ri-add-circle-line"></i>
          </button>
        </div>
      </div>
      <div className="todoList">
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask} />;
        })}
      </div>
    </div>
  );
};

export default App;
