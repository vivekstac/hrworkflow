import React from "react";
import { Handle, Position } from "@xyflow/react";
import { convertFieldLabel } from "../../../helpers/helper";

export default function ApprovalNode({ id, data }) {
    return (
        <div className="node">
            <div className="node-header">Approval</div>
            <div className="node-body">{
                Object.keys(data || {}).length === 0
                    ? <em>No data</em>
                    : Object.entries(data).map(([key, value]) => (
                        <div key={key}>
                            {typeof value === 'object' ? Object.entries(data[key]).map(([subKey, subValue]) => <div key={subKey}><strong>{convertFieldLabel(subKey)}
                                : </strong> {String(subValue)}</div>) : <><strong>{convertFieldLabel(key)}:</strong> {String(value)}</>}
                        </div>
                    ))
            }</div>
            <Handle id="in" type="target" position={Position.Left} />
            <Handle id="out" type="source" position={Position.Right} />
        </div>
    );
}
