export const LEAVE_APPROVAL_NODE = [
    {
        id: "1",
        type: "startNode",
        position: { x: 250, y: 0 },
        data: {
            title: "",
            metadata: {
                category: "",
            },
            errors: []
        },
    },

    {
        id: "2",
        type: "taskNode",
        position: { x: 250, y: 120 },
        data: {
            title: "",
            description: "",
            assignee: "",
            due_date: "",
        },
        errors: []
    },

    {
        id: "3",
        type: "approvalNode",
        position: { x: 250, y: 240 },
        data: {
            title: "Manager Approval",
            approver_role: "Manager",
            auto_approve_threshold: 2,
            notes: "Auto-approve if documents are verified"
        },
        errors: []
    },
    {
        id: "4",
        type: "automatedNode",
        position: { x: 100, y: 360 },
        data: {
            title: "Notify HR",
        },
        action_data: [
            {
                action: "send_email",
                actionParams: {
                    to: "hr@company.com",
                    subject: "Leave Request Approved",
                    message: "Manager approved the leave request."
                }
            },
            {
                action: "generate_doc",
                action_params: {
                    to: "hr@company.com",
                    subject: "Leave Request Approved",
                    message: "Manager approved the leave request."
                }
            }
        ],
        errors: []
    },
    {
        id: "5",
        type: "endNode",
        position: { x: 100, y: 600 },
        data: {
            end_message: "",
            summary: true,
        },
        errors: []
    }
];

export const LEAVE_APPROVAL_EDGES = [
    // Start → Task
    {
        id: "e1-2",
        source: "1",
        target: "2",
        type: "smoothstep",
        animated: true
    },

    // Task → Manager Approval
    {
        id: "e2-3",
        source: "2",
        target: "3",
        type: "smoothstep"
    },

    // Approval → Approved Path (automated step)
    {
        id: "e3-4",
        source: "3",
        target: "4",
        type: "smoothstep",
        label: "Approved"
    },

    // Automated Step → Payroll Task
    {
        id: "e4-5",
        source: "4",
        target: "5",
        type: "smoothstep"
    },

    // Payroll Task → End (Completed)
    {
        id: "e5-6",
        source: "5",
        target: "6",
        type: "smoothstep"
    },

    // Approval → Denied End Node
    {
        id: "e3-7",
        source: "3",
        target: "7",
        type: "smoothstep",
        label: "Denied"
    }
];
