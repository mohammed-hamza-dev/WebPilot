console.log('🚀 WebPilot Extension loaded')

window.addEventListener('message', (event) => {
  if (event.source !== window) {
    return
  }

  if (!event.data || event.data.type !== 'WEBPILOT_SAVE_AUTOMATION') {
    return
  }

  const automation = event.data.automation

  console.log('📥 WebPilot received automation from dashboard:', automation)

  chrome.runtime.sendMessage(
    {
      type: 'SAVE_AUTOMATION',
      automation: automation
    },
    (response) => {
      console.log('📤 WebPilot sent automation to background:', response)
    }
  )
})

chrome.runtime.sendMessage(
  { type: 'GET_AUTOMATION' },
  (response) => {
    if (!response || !response.automation) {
      console.log('📭 WebPilot: no automation configured')
      return
    }

    const automation = response.automation

    console.log('📦 WebPilot automation received:', automation)

    if (window.location.origin !== new URL(automation.url).origin) {
      console.log('🌐 WebPilot: URL does not match automation')
      return
    }

    const checkTarget = () => {
      const element = document.querySelector(automation.selector)

      if (element && !element.dataset.webpilotHandled) {
        console.log('🎯 WebPilot target found:', automation.selector)

        element.dataset.webpilotHandled = 'true'

        if (automation.action === 'click') {
          element.click()
          console.log('🤖 WebPilot clicked target')
        }

        clearInterval(interval)

        console.log('🛑 WebPilot stopped checking')
      }
    }

    const interval = setInterval(checkTarget, 1000)
  })
