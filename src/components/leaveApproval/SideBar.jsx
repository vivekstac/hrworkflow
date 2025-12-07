import React from "react";
import { useDnD } from "../../context/DnDContexts";

const SidebarItem = ({ type, label }) => {
    const { setType } = useDnD();
    const onDragStart = (e) => {
        setType(type)
        e.dataTransfer.setData("application/reactflow", type);
        e.dataTransfer.effectAllowed = "move";
    };

    return (
        <div className="sidebar-item" draggable onDragStart={(event) => onDragStart(event)}>
            {label}
        </div>
    );
};

const sideBarLNodeList = ["startNode", "taskNode", "approvalNode", "automatedNode", "endNode"];

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <h4>Leave Approval Nodes</h4>
            {sideBarLNodeList.map((type) => (
                <SidebarItem key={type} type={type} label={type.replace("Node", "")} />
            ))}
        </aside>
    );
}
