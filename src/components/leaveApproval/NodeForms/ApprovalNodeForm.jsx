import { useState } from "react";

export default function ApprovalNodeForm({ node, onUpdate, setNodes, onClose }) {
    const data = node.data || {};
    const [formData, setFormData] = useState({ ...data });
    const [metaData, setMetaData] = useState(data?.metadata || {});

    const handleFieldChange = (key, value) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSave = () => {
        onUpdate(node.id, { ...formData, metadata: metaData });
        onClose();
    }

    const handleCustomField = (key, value) => {
        const newFields = { ...(data.custom || {}), [key]: value };
        onChange({ custom: newFields });
    };

    return (
        <div className="form-panel">
            <label>Title</label>
            <input
                type="text"
                value={formData.title || ""}
                name="title"
                placeholder="Title"
                onChange={(e) => handleFieldChange("title", e.target.value)}
            />

            <label>Approval</label>
            <select onChange={(e) => handleFieldChange("approver_role", e.target.value)}>
                <option value="Manager">Manager</option>
                <option value="HR">HR</option>
                <option value="Director">Director</option>
            </select>
            <label>Auto Approval Threshold</label>
            <input
                type="number"
                value={formData.auto_approve_threshold || ""}
                name="auto_approve_threshold"
                placeholder="auto approve threshold"
                onChange={(e) => handleFieldChange("auto_approve_threshold", parseInt(e.target.value))}
            />
            <label>Notes</label>

            <textarea
                value={formData.notes || ""}
                onChange={(e) => handleFieldChange("notes", e.target.value)}
            />

            <div className="action-container">
                <button className="cancel-btn" onClick={() => onClose()}>Cancel</button>
                <button className="save-btn" onClick={() => handleSave()}>Save</button>
            </div>
        </div>
    );
}
