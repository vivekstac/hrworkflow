import { ReactFlowProvider } from '@xyflow/react';
import { FlowProvider } from './context/FlowStoreContext';
import { DnDProvider } from './context/DnDContexts';
import '@xyflow/react/dist/style.css';
import Approval from './components/leaveApproval/Approval';

export default function App() {
  return (

    <ReactFlowProvider>
      <DnDProvider>
        <FlowProvider>
          <div className='main-container'>
            <Approval />
          </div>
        </FlowProvider>
      </DnDProvider>
    </ReactFlowProvider>
  );
}