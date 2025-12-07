export const emptyObjectValues = (obj) => {
    const result = {};
    Object.keys(obj).forEach(key => {
        const value = obj[key];

        if (typeof value === "object" && value !== null && !Array.isArray(value)) {
            result[key] = emptyObjectValues(value);
        } else {
            result[key] = "";
        }
    });

    return result;
}

export const convertFieldLabel = (key) => {
    if (!key) return "";
    let label = key.replace(/_/g, " ");
    label = label.replace(/([a-z])([A-Z])/g, "$1 $2");
    label = label
        .split(" ")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

    return label;
}

export const validateWorkflow = (nodes, edges) => {
    const errors = {};

    const hasStart = nodes.some(n => n.type === "startNode");
    if (!hasStart) {
        errors["global"] = ["Missing Start Node"];
    }

    const hasEnd = nodes.some(n => n.type === "endNode");
    if (!hasEnd) {
        errors["global"] = [...(errors["global"] || []), "Missing End Node"];
    }

    nodes.forEach(node => {
        const nodeErr = [];

        if (!node.data?.title) {
            nodeErr.push("Title is required");
        }

        const hasConnection = edges.some(e => e.source === node.id);
        if (!hasConnection && node.type !== "endNode") {
            nodeErr.push("Node Edge must connect to next step");
        }

        if (nodeErr.length > 0) {
            errors[node.id] = nodeErr;
        }
    });

    return errors;
}

export const downloadWorkflow = (nodes, edges) => {
    const workflow = { nodes, edges };
    const blob = new Blob([JSON.stringify(workflow, null, 2)], {
        type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "workflow.json";
    a.click();
    URL.revokeObjectURL(url);
};

export const uploadWorkflow = (event, setNodes, setEdges) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
        try {
            const json = JSON.parse(e.target.result);

            if (!json.nodes || !json.edges) {
                alert("Invalid workflow file");
                return;
            }

            setNodes(json.nodes);
            setEdges(json.edges);

        } catch (err) {
            alert("Failed to parse JSON");
        }
    };

    reader.readAsText(file);
};

export const getNodeStyle = (node) => {
    return {
        border: node.errors?.length ? "2px solid red" : "none",
        borderRadius: "6px",
        background: "#fff"
    };
}

export const playSimulation = (steps, setSimulation) => {
    let index = 0;

    const interval = setInterval(() => {
        setSimulation(prev => ({
            ...prev,
            current: index
        }));

        index++;

        if (index >= steps.length) {
            clearInterval(interval);
            setSimulation(prev => ({
                ...prev,
                running: false,
                done: true
            }));
        }
    }, 800);
}

