console.log('🚀 WebPilot background service worker loaded')

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SAVE_AUTOMATION') {
    chrome.storage.local.get('automations', (result) => {
      const automations = result.automations || []

      const existingIndex = automations.findIndex(
        (automation) => automation.id === message.automation.id
      )

      if (existingIndex !== -1) {
        automations[existingIndex] = message.automation
      } else {
        automations.push(message.automation)
      }

      chrome.storage.local.set(
        { automations: automations },
        () => {
          console.log('💾 WebPilot automations saved:', automations)
          sendResponse({ success: true })
        }
      )
    })

    return true
  }

  if (message.type === 'GET_AUTOMATION') {
    chrome.storage.local.get('automations', (result) => {
      console.log('📦 WebPilot automations requested:', result.automations)
      sendResponse({ automations: result.automations || [] })
    })

    return true
  }

  if (message.type === 'DELETE_AUTOMATION') {
    chrome.storage.local.get('automations', (result) => {
      const automations = result.automations || []

      const updatedAutomations = automations.filter(
        (automation) => automation.id !== message.id
      )

      chrome.storage.local.set(
        { automations: updatedAutomations },
        () => {
          console.log('🗑️ WebPilot automation deleted:', message.id)
          sendResponse({ success: true })
        }
      )
    })

    return true
  }

})
