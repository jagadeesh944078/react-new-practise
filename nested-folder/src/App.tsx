import { useState } from "react";
import "./App.css";
import { initialData, FileSystemNode } from "./data/data";

interface EditModeState {
  [key: string]: boolean;
}

const App: React.FC = () => {
  const [data, setData] = useState<FileSystemNode>(initialData);
  const [editmode, setEditMode] = useState<EditModeState>({});

  const handleAdd = (parentId: string, isFolder: boolean) => {
    const name = prompt(`Enter ${isFolder ? "folder" : "file"} name:`);
    if (!name) return;

    const newId = Date.now().toString();
    const newItem: FileSystemNode = {
      id: newId,
      name,
      isFolder,
      children: isFolder ? [] : undefined,
    };

    const addItem = (node: FileSystemNode) => {
      if (node.id === parentId) {
        node.children?.push(newItem);
      } else if (node.children) {
        node.children.forEach(addItem);
      }
    };

    const newData = { ...data };
    addItem(newData);
    setData(newData);
  };

  const handleEdit = (itemId: string, newName: string) => {
    // const name = prompt("enter the name");
    // if (!name) return;
    const editItem = (node: FileSystemNode) => {
      console.log(node);
      if (node.id === itemId) {
        node.name = newName;
      } else if (node.children) {
        node.children.forEach(editItem);
      }
    };
    const newData = { ...data };
    editItem(newData);
    setData(newData);
  };

  const toggleEditMode = (itemId: string) => {
    console.log("sad");
    setEditMode((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const renderTree = (node: FileSystemNode): React.ReactNode => (
    <div key={node.id} className="node">
      {editmode[node.id] ? (
        <input
          type="text"
          value={node.name}
          onChange={(e) => handleEdit(node.id, e.target.value)}
          onBlur={() => toggleEditMode(node.id)}
        />
      ) : (
        <span onDoubleClick={() => toggleEditMode(node.id)}>{node.name}</span>
      )}

      <button onClick={() => toggleEditMode(node.id)}>
        {editmode[node.id] ? "Save" : "Edit"}
      </button>
      {node.isFolder && (
        <>
          <button onClick={() => handleAdd(node.id, true)}>Add Folder</button>
          <button onClick={() => handleAdd(node.id, false)}>Add File</button>
        </>
      )}
      {node.children && (
        <div className="children">
          {node.children.map((child) => renderTree(child))}
        </div>
      )}
    </div>
  );

  return <div className="file-manager">{renderTree(data)}</div>;
};

export default App;
