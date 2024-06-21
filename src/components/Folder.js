import React, { useState } from "react";

const Folder = ({ explorer, handleInsertNode }) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const addFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div>
        <div className="folder" onClick={() => setExpand(!expand)}>
          <span>🗂 {explorer.name}</span>
          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>Folder +</button>
            <button onClick={(e) => handleNewFolder(e, false)}>File +</button>
          </div>
        </div>
        <div
          style={{ display: expand ? "block" : "none", paddingLeft: "25px" }}
        >
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "🗂" : "📄"}</span>
              <input
                autoFocus
                type="text"
                onKeyDown={(e) => addFolder(e)}
                className="inputContainer__input"
                onBlur={() => setShowInput({ ...showInput, visible: false })}
              />
            </div>
          )}
          {explorer.items.map((item) => (
            <Folder
              handleInsertNode={handleInsertNode}
              explorer={item}
              key={item.id}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return <div className="file">📄 {explorer.name}</div>;
  }
};

export default Folder;
