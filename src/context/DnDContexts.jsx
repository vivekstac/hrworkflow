import { createContext, useContext, useState } from "react";

const DnDContext = createContext(null);

export const DnDProvider = ({ children }) => {
    const [type, setType] = useState(null);
    const [name, setName] = useState(null);
    const [selectedNodeData, setSelectedNodeData] = useState(null);
    const [toast, setToast] = useState({
        type: false,
        message: "",
    });
    const [simulation, setSimulation] = useState({
        running: false,
        steps: [],
        currentStep: 0,
        error: null
    });


    const value = {
        type,
        name,
        setType,
        setName,
        selectedNodeData,
        setSelectedNodeData,
        toast,
        setToast,
        simulation, setSimulation
    };

    return (
        <DnDContext.Provider value={value}>
            {children}
        </DnDContext.Provider>
    );
};

export const useDnD = () => useContext(DnDContext);

export default DnDContext;
