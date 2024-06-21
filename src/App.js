import React, { useState } from "react";
import explorer from "./constants";
import Folder from "./components/Folder";
import useTraverseTree from "./hooks/useTraverseTree";

const App = () => {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  return <Folder handleInsertNode={handleInsertNode} explorer={explorerData} />;
};

export default App;
