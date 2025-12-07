// const mockActions = {
//     send_email: ["to", "subject", "message"],
//     update_record: ["table", "recordId", "fields"],
//     slack_notify: ["channel", "message"],
// };

import { useState } from "react";
import { fetchAutomations } from "../../../api/apiTrigger";
import { useDnD } from "../../../context/DnDContexts";

export default function AutomatedNodeForm({ node, onUpdate, setNodes, onClose }) {
    const data = node.data || {};
    const [formData, setFormData] = useState({ ...data });
    const [metaData, setMetaData] = useState(data?.metadata || {});
    const { setToast } = useDnD();
    const [actionType, setActionType] = useState("Send Email");

    const handleFieldChange = (key, value) => {
        if (key === "action_type") {
            setActionType(value);
        }
        setFormData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSave = () => {
        onUpdate(node.id, { ...formData, metadata: metaData });
        const params = {
            mail: "sended",
        }
        fetchAutomations(setToast)

        onClose();
    }

    const sendParams = [{ key: "to", placeholder: "Email", type: "text" }, { key: "subject", placeholder: "Subject", type: "text" }]
    const generateDocParams = [{ key: "template", placeholder: "template", type: "text" }, { key: "recipient", placeholder: "recipient", type: "text" }]

    return (
        <>
            <div className="form-panel">
                <label>Title</label>
                <input
                    type="text"
                    value={formData.title || ""}
                    name="title"
                    placeholder="Title"
                    onChange={(e) => handleFieldChange("title", e.target.value)}
                />

                <label>Choose An Action</label>
                <select onChange={(e) => handleFieldChange("action_type", e.target.value)}>
                    <option value="Send Email">Send Email</option>
                    <option value="Generate Docs">Generate Docs</option>
                </select>
                {actionType === "Send Email" ? (<>{
                    sendParams.map((item) => {
                        return <div key={item.key}>
                            <label>{item.placeholder}</label>
                            <input
                                type={item.type}
                                value={formData[item.key] || ""}
                                name={item.key}
                                placeholder={item.placeholder}
                                onChange={(e) => handleFieldChange(item.key, e.target.value)}
                            />

                        </div>
                    })
                }
                </>) :
                    generateDocParams.map((item) => {
                        return <div key={item.key}>
                            <label>{item.placeholder}</label>
                            <input
                                type={item.type}
                                value={formData[item.key] || ""}
                                name={item.key}
                                placeholder={item.placeholder}
                                onChange={(e) => handleFieldChange(item.key, e.target.value)}
                            />

                        </div>
                    })}

                <div className="action-container">
                    <button className="cancel-btn" onClick={() => onClose()}>Cancel</button>
                    <button className="save-btn" onClick={() => handleSave()}>Save</button>
                </div>
            </div>
        </>
    );
}

