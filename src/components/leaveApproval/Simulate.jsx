import React from 'react'

const Simulate = ({ simulation }) => {
    return (
        <div className='modal-panel'>
            <div className="simulation-box modal">
                <h3>Simulation</h3>

                {simulation?.running && <p>⏳ Running...</p>}
                {simulation?.done && <p>✅ Completed</p>}

                <ul>
                    {simulation?.steps?.map((step, index) => (
                        <li
                            key={index}
                            className={index === simulation?.current ? "active-step" : ""}
                        >
                            {step}
                        </li>
                    ))}
                </ul>
            </div>

        </div>

    )
}

export default Simulate