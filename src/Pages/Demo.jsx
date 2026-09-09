import { useState, useEffect } from 'react'

function Demo() {
    const [confirmed, setConfirmed] = useState(false)
    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowButton(true)
        }, 5000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div>
            <h1>WebPilot Demo Site</h1>

            <p>
                Status: {confirmed ? 'Confirmed!' : 'Waiting for confirmation...'}
            </p>

            {showButton && (
                <button
                    id="confirm-presence"
                    onClick={() => setConfirmed(true)}
                >
                    Confirm Presence
                </button>
            )}
        </div>
    )
}

export default Demo