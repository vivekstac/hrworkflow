# Workflow Builder

A visual workflow creation tool built with **Vite + React + React Flow**, supporting drag‑and‑drop nodes, workflow validation, and step‑by‑step simulation.

---

## 🚀 Architecture

### **Frontend**

- **React (Vite)**
- **React Flow** → Node/Edge graph editor
- **Context API** → App-wide state (nodes, edges, selected node, node types)
- **Custom Validation Engine**
- **Simulation Engine** (step‑by‑step workflow execution)
- Components:
  - `Approval.jsx` → Main Flow Data
  - `NodeFormPanel` → Dynamic forms (Task/Start/End nodes)
  - `SimulationModal` → Shows execution steps
  - `ToolBar` → Actions (simulate, Export, import)

---

## 🛠 How to Run

### 1️⃣ Install Dependencies

```sh
npm install @xyflow/react

```

MSW

```sh
npm install msw sass concurrently --save-dev
npx msw init public/ --save

```

### 2️⃣ Start Dev Server

```sh
npm run dev
```

### 3️⃣ Build for Production

```sh
npm run build
```

---

## Key Design Decisions

### ✔ React Flow for Node

- Added Main 5 Nodes on SideBar. we can drag and drop and use it.
- Each Nodes Have Unique Form Component we can use and save this

### ✔ Context APId

Added Context api for share states.

Simulation goes node‑by‑node and produces:

- `steps[]`
- `currentStep`
- `done`
- `errors[]`

This allows UI playback or step highlighting.

---

## 🧪 What’s Completed

### ✅ Drag & Drop Node Canvas

Add, edit, connect nodes.

### ✅ Dynamic Node Form Panel

Each node opens a right-side settings panel.

### ✅ Workflow Validation

Errors shown visually on nodes + toast/modal messages.

### ✅ JSON Save & Load

Export workflow.json  
Import workflow.json back into canvas.

### ✅ Simulation Engine

Step-by-step execution display.

---

## 🚧 What Could Be Added With More Time

### 🔹 **Theme System**

Dark/Light mode for the editor.

### 🔹 **Advanced Validation**

- Dead-end detection
- Unreachable nodes
- Parallel path support

## 📁 File Structure

```
src/
  ├── api/
  │    ├── apiTrigger.js
  │    ├── browser.js
  │    ├── handlers.jsx
  ├── assets/
  │    ├── scss/
  │         ├── main.scss
  ├── components/
  │    ├── NodeForms/...
  │    ├── Nodes/...
  │    ├── Approval.jsx
  │    ├── EditModal.jsx
  │    └── SideBar.jsx
  │    └── Simulate.jsx
  ├── constants/
  │    └── common.jsx
  │    └── DynamicInputs.jsx
  │    └── StatusToast.jsx
  ├── context/
  │    └── DndContexts.jsx
  ├── helpers/...
  ├── hooks/...
  ├── App.jsx
  └── main.jsx
```

---

## 📤 Export & Import Workflow

### Save workflow:

```js
downloadJSON({ nodes, edges }, "workflow.json");
```

### Load workflow:

```js
uploadWorkflow(event, setNodes, setEdges);
```

## 👨‍💻 Author

Vivek Raja  
Full‑Stack Developer
