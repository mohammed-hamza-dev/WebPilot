import { useState } from 'react'
import './Demo.css'

function Demo() {
    const [currentStep, setCurrentStep] = useState(0)
    const [completedSteps, setCompletedSteps] = useState([])

    const buttons = [
        {
            id: 'confirm-presence',
            label: 'Confirm Presence'
        },
        {
            id: 'complete-task',
            label: 'Complete Task'
        },
        {
            id: 'submit-form',
            label: 'Submit Form'
        },
        {
            id: 'approve-request',
            label: 'Approve Request'
        },
        {
            id: 'finish-process',
            label: 'Finish Process'
        }
    ]



    const handleClick = (id) => {
        setCompletedSteps((steps) => [...steps, id])

        if (currentStep < buttons.length - 1) {
            setTimeout(() => {
                setCurrentStep((step) => step + 1)
            }, 10000)
        }
    }
    const currentButton = buttons[currentStep]

    return (
        <div className="demo-page">
            <div className="demo-container">

                <div className="demo-header">
                    <h1>WebPilot Demo Site</h1>
                    <p>Step: {currentStep + 1} / {buttons.length}</p>
                </div>
                <div className="demo-target">

                    <div className="demo-status">
                        <p>
                            Status:{' '}
                            {completedSteps.includes(currentButton.id)
                                ? 'Completed!'
                                : 'Waiting for automation...'}
                        </p>

                        <p>
                            WebPilot is waiting for the next target element to appear.
                        </p>
                    </div>

                    <button
                        key={currentButton.id}
                        id={currentButton.id}
                        onClick={() => handleClick(currentButton.id)}
                    >
                        {currentButton.label}
                    </button>

                </div>

                <div className="demo-progress">
                    <h2>Demo Progress</h2>

                    <div className="demo-progress-list">
                        {buttons.map((button, index) => (
                            <p
                                key={button.id}
                                className={`demo-progress-item ${completedSteps.includes(button.id)
                                    ? 'demo-completed'
                                    : ''
                                    }`}
                            >
                                <span className="demo-step-name">
                                    {index + 1}. {button.label}
                                </span>

                                <span className="demo-step-status">
                                    {completedSteps.includes(button.id)
                                        ? 'Completed'
                                        : index === currentStep
                                            ? 'Current'
                                            : 'Waiting'}
                                </span>
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Demo