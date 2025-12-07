import { playSimulation } from "../helpers/helper";

export async function fetchAutomations(setToast) {
    try {
        const res = await fetch("/automations");
        if (!res.ok) throw new Error("Failed to load automations");

        setToast({
            type: true,
            message: "Automations loaded successfully"
        })
        return res.json();

    } catch (err) {
        setToast({
            type: true,
            message: err.message
        });
        throw err;
    }
    finally {
        setTimeout(() => setToast({
            type: false,
            message: ""
        }), 3000);
    }
}

// export async function simulateWorkflow(workflowJson, setToast) {
//     try {
//         const res = await fetch("/simulate", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(workflowJson)
//         });

//         if (!res.ok) throw new Error("Simulation failed");

//         setToast({ type: true, message: "Simulation successful" });
//         return res.json();

//     } catch (err) {
//         setToast({
//             type: true,
//             message: err.message
//         });
//         throw err;
//     } finally {
//         setTimeout(() => setToast({
//             type: false,
//             message: ""
//         }), 3000);
//     }
// }

export async function simulateWorkflow(workflowJson, setToast, setSimulation, setIsSimulating) {
    try {
        setSimulation({
            running: true,
            steps: [],
            current: 0,
            done: false
        });

        const res = await fetch("/simulate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(workflowJson),
        });

        const result = await res.json();

        const steps = Array.from(
            { length: result.steps },
            (_, i) => `Executing step ${i + 1} of ${result.steps}`
        );

        setSimulation(prev => ({ ...prev, steps }));

        playSimulation(steps, setSimulation);

        setToast("success", "Simulation started!");

    } catch (err) {
        setToast("error", err.message);
    } finally {
        setTimeout(() => {

            setIsSimulating(false);
        }, 5000);
    }
}

