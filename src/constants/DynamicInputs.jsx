import React, { useState } from "react";

const DynamicInput = ({ type, keyName, value, handleChange }) => {
    // const validate = (val) => {
    //     if (validation.required && !val) {
    //         return `${label} is required`;
    //     }

    //     if (type === "email") {
    //         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //         if (val && !emailRegex.test(val)) return "Invalid email format";
    //     }

    //     if (validation.minLength && val.length < validation.minLength) {
    //         return `${label} must be at least ${validation.minLength} chars`;
    //     }

    //     if (validation.maxLength && val.length > validation.maxLength) {
    //         return `${label} must be under ${validation.maxLength} chars`;
    //     }

    //     if (type === "number") {
    //         const num = Number(val);
    //         if (validation.min !== undefined && num < validation.min) {
    //             return `${label} must be >= ${validation.min}`;
    //         }
    //         if (validation.max !== undefined && num > validation.max) {
    //             return `${label} must be <= ${validation.max}`;
    //         }
    //     }

    //     return "";
    // };
    return (
        <>
            {type === "textarea" ? (
                <textarea
                    value={value || ""}
                    onChange={(e) => handleChange(keyName, e.target.value)}
                    rows="3"
                />
            ) : (
                <input
                    type={type}
                    value={value || ""}
                    onChange={(e) => handleChange(keyName, e.target.value)}
                />
            )}

            {/* {error && (
                <small style={{ color: "red", marginTop: "4px", display: "block" }}>
                    {error}
                </small>
            )} */}
        </>
    );
}

export default DynamicInput;
