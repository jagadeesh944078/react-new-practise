import { ReactNode, useMemo, useRef, useState } from "react";
import "./App.css";

type TaskList = Record<Categories, Task[]>;

type Categories = "todo" | "progress" | "completed";

interface Task {
  id: number;
  title: string;
  category: Categories;
}

function App() {
  const [tasks, setTasks] = useState<TaskList>({
    todo: [
      { id: 1, title: "Task1", category: "todo" },
      { id: 2, title: "Task1", category: "todo" },
      { id: 3, title: "Task1", category: "todo" },
    ],
    progress: [{ id: 4, title: "Task2", category: "progress" }],
    completed: [{ id: 5, title: "Task3", category: "completed" }],
  });

  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const setIsEditing = (task: Task) => {
    console.log(task);
    setEditingTask(task);
  };

  const categories = useMemo(() => {
    return Object.keys(tasks);
  }, [tasks]);

  const addNewTaskHandler = (payload: Task) => {
    const tempTaskList = [...tasks[payload.category]];
    // Add new Task
    tempTaskList.push(payload);
    setTasks((prev) => ({ ...prev, [payload.category]: tempTaskList }));
  };

  const editTaskHandler = (payload: Task) => {
    const oldTask = editingTask;

    // create new object
    const newTask = payload;

    console.log("task", oldTask, newTask);

    // remove old object
    const oldList = [...tasks[oldTask?.category]].filter(
      (task) => task.id != oldTask.id
    );

    const newList = [...tasks[newTask?.category]];
    newList.push(newTask);

    // add new object
    setTasks((prev) => ({
      ...prev,
      [oldTask?.category]: oldList,
      [newTask.category]: newList,
    }));
    setEditingTask(undefined);
  };

  return (
    <div style={{ margin: "24px" }}>
      <TaskForm
        mode={editingTask ? "edit" : "add"}
        task={editingTask}
        addNewTaskHandler={addNewTaskHandler}
        editTaskHandler={editTaskHandler}
      />
      <div style={{ display: "flex", gap: "16px" }}>
        {categories.map((category, index) => (
          <TaskList key={index} name={category}>
            {tasks[category].map((task, index) => (
              <TaskCard task={task} key={index} setIsEditing={setIsEditing} />
            ))}
            Render Props
          </TaskList>
        ))}
      </div>
    </div>
  );
}

export default App;

const options = [
  { label: "Todo", value: "todo" },
  { label: "Progress", value: "progress" },
  { label: "Completed", value: "completed" },
];

const TaskForm = ({
  addNewTaskHandler,
  editTaskHandler,
  mode = "add",
  task,
}) => {
  const titleRef = useRef();
  const optionRef = useRef();

  const resetForm = () => {
    titleRef.current.value = "";
    optionRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id: mode === "add" ? self.crypto.randomUUID() : task.id,
      title: titleRef.current.value,
      category: optionRef.current.value,
    };
    if (mode === "add") {
      addNewTaskHandler(payload);
    } else {
      editTaskHandler(payload);
    }
    // resetForm();
  };

  return (
    <div>
      <h5>Create New Task</h5>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={titleRef} defaultValue={task?.title || ""} />
        <select ref={optionRef}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button type="submit">
          {mode === "add" ? "Add Task" : "Edit Task"}
        </button>
      </form>
    </div>
  );
};

const TaskList = ({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) => {
  return (
    <div
      style={{
        minWidth: "240px",
        border: "1px solid grey",
        borderRadius: "4px",
        padding: "12px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div id="header">
        <p>{name.toUpperCase()}</p>
      </div>
      {children}
      <div>
        <button>Add Cards</button>
      </div>
    </div>
  );
};

const TaskCard = ({
  task,
  setIsEditing,
}: {
  task: Task;
  setIsEditing: (task: Task) => void;
}) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "8px 8px",
      }}
    >
      <p>{task.title}</p>
      <button type="button" onClick={() => setIsEditing(task)}>
        Edit
      </button>
    </div>
  );
};
