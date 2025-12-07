
import React, { useEffect, useRef } from "react";
import StartNodeForm from "./NodeForms/StartNodeForm";
import TaskNodeForm from "./NodeForms/TaskNodeForm";
import ApprovalNodeForm from "./NodeForms/ApprovalNodeForm";
import AutomatedNodeForm from "./NodeForms/AutomatedNodeForm";
import EndNodeForm from "./NodeForms/EndNodeForm";

const NodeFormPanel = ({ selectedNode, onUpdate, onClose, setNodes }) => {
    if (!selectedNode) return <div>Select a node</div>;
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    if (!selectedNode) return null;

    const renderForm = () => {
        switch (selectedNode.type) {
            case "startNode":
                return <StartNodeForm node={selectedNode} onUpdate={onUpdate} setNodes={setNodes} onClose={onClose} />;

            case "taskNode":
                return <TaskNodeForm node={selectedNode} onUpdate={onUpdate} setNodes={setNodes} onClose={onClose} />;

            case "approvalNode":
                return <ApprovalNodeForm node={selectedNode} onUpdate={onUpdate} setNodes={setNodes} onClose={onClose} />;

            case "automatedNode":
                return <AutomatedNodeForm node={selectedNode} onUpdate={onUpdate} setNodes={setNodes} onClose={onClose} />;

            case "endNode":
                return <EndNodeForm node={selectedNode} onUpdate={onUpdate} setNodes={setNodes} onClose={onClose} />;

            default:
                return <p>No form available for this node type.</p>;
        }
    };

    return (
        <div className="modal-panel">
            <div className="modal" ref={modalRef}>
                <h3>{selectedNode?.data?.title}</h3>
                {renderForm()}
            </div>
        </div>
    );
};

export default NodeFormPanel;
