import { useEffect, useState, useCallback } from "react";

export default function useAutomations() {
    const [automations, setAutomations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAutomations = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch("/automations");
            if (!res.ok) throw new Error("Failed to load automations");

            const data = await res.json();
            setAutomations(data);
            setError(null);
        } catch (err) {
            console.error("Automations fetch error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAutomations();
    }, [fetchAutomations]);

    return {
        automations,
        loading,
        error,
        refresh: fetchAutomations,
    };
}