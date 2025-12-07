import { useState } from "react";

export default function EndNodeForm({ node, onUpdate, setNodes, onClose }) {
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

    return (
        <div className="form-panel">
            <label>End Message</label>
            <input
                type="text"
                value={formData.end_message || ""}
                name="end_message"
                placeholder="End Message"
                onChange={(e) => handleFieldChange("end_message", e.target.value)}
            />

            <label className="check-box">
                <input
                    type="checkbox"
                    checked={formData.summary || false}
                    onChange={(e) => handleFieldChange("summary", e.target.checked)}
                />
                Summary
            </label>

            <div className="action-container">
                <button className="cancel-btn" onClick={() => onClose()}>Cancel</button>
                <button className="save-btn" onClick={() => handleSave()}>Save</button>
            </div>
        </div>

    );
}
