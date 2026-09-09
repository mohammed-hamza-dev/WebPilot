// ==UserScript==
// @name         WebPilot Browser Worker
// @description  WebPilot automation worker for the demo site
// @match        http://localhost:5173/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

console.log('🚀 WebPilot Browser Worker loaded')

const checkForTarget = () => {
    const button = document.querySelector('#confirm-presence')

    if (button && !button.dataset.webpilotHandled) {
        console.log('🎯 Confirm Presence button found')

        button.dataset.webpilotHandled = 'true'

        button.click()

        console.log('🤖 WebPilot clicked Confirm Presence')
    }
}

checkForTarget()



const interval = setInterval(() => {
    console.log('🔄 WebPilot checking...')

    const button = document.querySelector('#confirm-presence')

    if (button && !button.dataset.webpilotHandled) {
        console.log('🎯 Confirm Presence button found')

        button.dataset.webpilotHandled = 'true'

        button.click()

        console.log('🤖 WebPilot clicked Confirm Presence')

        clearInterval(interval)

        console.log('🛑 WebPilot stopped checking')
    }
}, 1000)