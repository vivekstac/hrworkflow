import { useState } from "react";
import { emptyObjectValues } from "../../../helpers/helper";
import DynamicInput from "../../../constants/dynamicInputs";

export default function StartNodeForm({ node, onUpdate, setNodes, onClose }) {
    const data = node.data || {};
    const [formData, setFormData] = useState({ ...data });

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
            {/* {Object.keys(emptyObjectValues(data || {})).map((key) => {
                return <div key={key} style={{ marginBottom: '10px' }}>
                    {typeof formData[key] === 'object' ? <>
                        {Object.keys(formData[key] || {}).map((subKey) => {
                            return <div key={subKey}>
                                <h5>Meta Data (optional)</h5>
                                <div style={{ display: 'flex' }}>
                                    <input
                                        type="text"
                                        value={subKey}
                                        disabled
                                    />
                                    <DynamicInput
                                        type="text"
                                        keyName={subKey}
                                        value={formData[key][subKey] || ""}
                                        handleChange={handleFieldChange}
                                    />
                                </div>
                            </div>
                        })}
                    </> :
                        <DynamicInput
                            type="text"
                            keyName={key}
                            value={formData[key]}
                            handleChange={handleFieldChange}
                        />}
                </div>;
            })} */}

            <label>Title</label>
            <input
                type="text"
                value={formData.title || ""}
                name="title"
                placeholder="Title"
                onChange={(e) => handleFieldChange("title", e.target.value)}
            />

            <div>
                <button onClick={() => onClose()}>Cancel</button>
                <button onClick={() => handleSave()}>Save</button>
            </div>
        </div>
    );
}
