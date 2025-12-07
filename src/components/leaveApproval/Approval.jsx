import React, { useCallback, useRef, useState } from "react";
import {
    ReactFlow,
    useNodesState,
    useEdgesState,
    addEdge,
    MiniMap,
    Controls,
    Background,
    useReactFlow,
    reconnectEdge,
} from "@xyflow/react";
import Sidebar from "./SideBar";
import StartNode from "./nodes/StartNode";
import TaskNode from "./nodes/TaskNode";
import ApprovalNode from "./nodes/ApprovalNode";
import AutomatedNode from "./nodes/AutomatedNode";
import EndNode from "./nodes/EndNode";
import EditModal from "./EditModal";
import { useDnD } from "../../context/DnDContexts";
import { LEAVE_APPROVAL_NODE } from "../../constants/common";
import StatusMessage from "../../constants/StatusToast";
import { downloadWorkflow, getNodeStyle, uploadWorkflow, validateWorkflow } from "../../helpers/helper";
import { simulateWorkflow } from "../../api/apiTrigger";
import Simulate from "./Simulate";

const nodeTypes = {
    startNode: StartNode,
    taskNode: TaskNode,
    approvalNode: ApprovalNode,
    automatedNode: AutomatedNode,
    endNode: EndNode,
};

export default function Approval() {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [modalData, setModalData] = useState(null);
    const { screenToFlowPosition } = useReactFlow();
    const idRef = useRef(1);
    const { type, selectedNodeData, setSelectedNodeData, toast, setToast, simulation, setSimulation } = useDnD();
    const nodeData = LEAVE_APPROVAL_NODE.reduce((acc, node) => {
        acc[node.type] = node.data;
        return acc;
    }, {});

    const [isSimulating, setIsSimulating] = useState(false);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();
            if (!type) {
                return;
            }

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            if (type === "startNode" && nodes.some((n) => n.type === "startNode")) {
                alert("A Start node already exists. Only one Start node allowed.");
                return;
            }

            const newNode = {
                id: `${idRef.current++}`,
                type,
                position,
                data: JSON.parse(JSON.stringify(nodeData[type] || {}))
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, type]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onConnect = useCallback(
        (params) => {
            const sourceNode = nodes.find((n) => n.id === params.source);
            const targetNode = nodes.find((n) => n.id === params.target);

            if (targetNode?.type === "startNode") {
                alert("Start node cannot have incoming edges.");
                return;
            }

            if (sourceNode?.type === "endNode") {
                alert("End node cannot have outgoing edges.");
                return;
            }
            setEdges((eds) => addEdge(params, eds));
        },
        [nodes, setEdges]
    );

    const openEdit = useCallback((node) => {
        setModalData(node);
    }, []);

    const onNodeDoubleClick = useCallback((event, node) => {
        openEdit(node);
    }, [openEdit]);

    const onSaveNode = useCallback(
        (id, newData) => {
            setNodes((nds) =>
                nds.map((n) => {
                    if (n.id === id) {
                        return {
                            ...n,
                            data: { ...n.data, ...newData },
                        };
                    }
                    return n;
                })
            );
            setModalData(null);
        },
        [setNodes]
    );

    const onDragStart = (event, nodeType) => {
        setType(nodeType);
        event.dataTransfer.setData('text/plain', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const onReconnect = useCallback(
        (oldEdge, newConnection) =>
            setEdges((els) => reconnectEdge(oldEdge, newConnection, els)),
        [],
    );

    const onUpdateNodeData = (id, updatedData) => {
        setNodes((nds) =>
            nds.map((n) => (n.id === id ? { ...n, data: { ...updatedData } } : n))
        );
    };
    const handleSimulate = () => {
        const errors = validateWorkflow(nodes, edges);

        setNodes(nds =>
            nds.map(n => ({
                ...n,
                data: {
                    ...n.data,
                    errors: errors[n.id] || []
                }
            }))
        );

        if (Object.keys(errors).length > 0) {

            alert(`Workflow has errors! ${JSON.stringify(errors)}`);
            return;
        }

        setIsSimulating(true);
        simulateWorkflow({ nodes, edges }, setToast, setSimulation, setIsSimulating);
    };

    return (
        <div className="app">
            <div className="app-header">
                <h3>HR Leave Management</h3>
            </div>
            <div className="flow-wrapper" ref={reactFlowWrapper}>
                <ReactFlow
                    // nodes={nodes}
                    nodes={nodes.map(n => ({ ...n, style: getNodeStyle(n) }))}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDoubleClick={onNodeDoubleClick}
                    onNodeClick={(node, type) => setSelectedNodeData(type)}
                    onDragStart={onDragStart}
                    onReconnect={onReconnect}
                    nodeTypes={nodeTypes}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                >
                    <Controls />
                    <Background gap={16} />
                </ReactFlow>

                <div className="toolbar">
                    <button onClick={() => handleSimulate()}>
                        Validate Workflow
                    </button>
                    <button style={{ marginRight: '10px', padding: '5px 10px' }} onClick={() => downloadWorkflow(nodes, edges)}>
                        Export
                    </button>
                    <input
                        className="import_export_input"
                        type="file"
                        accept="application/json"
                        onChange={(e) => uploadWorkflow(e, setNodes, setEdges)}
                    />

                </div>
            </div>
            <Sidebar />

            {selectedNodeData && (
                <EditModal
                    selectedNode={selectedNodeData}
                    onClose={() => setSelectedNodeData(null)}
                    onSave={(newData) => onSaveNode(modalData.id, newData)}
                    onUpdate={onUpdateNodeData}
                    setNodes={setNodes}
                />
            )}


            {toast?.type && <StatusMessage type={toast?.type ? "success" : "error"} message={toast.message} />}
            {isSimulating && <Simulate simulation={simulation} />}
        </div>
    );
}
