import { createContext, useContext, useReducer } from "react";

const FlowContext = createContext(null);

export function useFlow() {
    return useContext(FlowContext);
}

export function FlowProvider({ children }) {
    const initialState = {
        nodes: [],
        edges: [],
        selectedNode: null,
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case "SET_NODES":
                return { ...state, nodes: action.payload };

            case "SET_EDGES":
                return { ...state, edges: action.payload };

            case "SELECT_NODE":
                return { ...state, selectedNode: action.payload };

            case "UPDATE_NODE":
                return {
                    ...state,
                    nodes: state.nodes.map((n) =>
                        n.id === action.id
                            ? { ...n, data: { ...n.data, ...action.data } }
                            : n
                    ),
                    selectedNode: {
                        ...state.selectedNode,
                        data: { ...state.selectedNode?.data, ...action.data },
                    },
                };

            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const setNodes = (nodes) => dispatch({ type: "SET_NODES", payload: nodes });
    const setEdges = (edges) => dispatch({ type: "SET_EDGES", payload: edges });

    const selectNode = (node) =>
        dispatch({ type: "SELECT_NODE", payload: node });

    const updateNode = (id, data) =>
        dispatch({ type: "UPDATE_NODE", id, data });

    return (
        <FlowContext.Provider
            value={{
                ...state,
                setNodes,
                setEdges,
                selectNode,
                updateNode,
            }}
        >
            {children}
        </FlowContext.Provider>
    );
}
