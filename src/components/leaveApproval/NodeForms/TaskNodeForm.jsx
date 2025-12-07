import { useState } from "react";

export default function TaskNodeForm({ node, onUpdate, setNodes, onClose }) {
    const data = node.data || {};
    const [formData, setFormData] = useState({ ...data });
    const [errors, setErrors] = useState({});

    const handleFieldChange = (key, value) => {
        setErrors({})
        setFormData(prev => ({
            ...prev,
            [key]: value
        }));
    };
    const validateTaskNode = (data) => {
        const errors = {};

        if (!data.title || data.title.trim() === "") {
            errors.title = "Title is required";
        }

        return Object.keys(errors).length > 0 ? errors : null;
    }


    const handleSave = () => {
        const isValid = validateTaskNode(formData);
        if (isValid) {
            setErrors(isValid);
            return;
        }
        onUpdate(node.id, { ...formData });
        onClose();
    }

    return (
        <div className="form-panel">
            <label>Title <span className="required">*</span></label>
            <input
                type="text"
                value={formData.title || ""}
                name="title"
                placeholder="Title"
                className={errors["title"] ? "input-error" : ""}
                onChange={(e) => handleFieldChange("title", e.target.value)}
                required={errors["title"]}
            />
            {errors["title"] && <span className="error-text">{errors["title"]}</span>}

            <label>Description</label>
            <textarea
                value={formData.description || ""}
                onChange={(e) => handleFieldChange("description", e.target.value)}
            />
            <label>Assignee</label>
            <input
                type="text"
                value={formData.assignee || ""}
                name="assignee"
                placeholder="Assignee"
                onChange={(e) => handleFieldChange("assignee", e.target.value)}
            />
            <label>Due Date</label>
            <input
                type="date"
                value={formData.due_date || ""}
                name="due_date"
                placeholder="Due Date"
                onChange={(e) => handleFieldChange("due_date", e.target.value)}
            />

            <div className="action-container">
                <button className="cancel-btn" onClick={() => onClose()}>Cancel</button>
                <button className="save-btn" onClick={() => handleSave()}>Save</button>
            </div>
        </div>
    );
}
