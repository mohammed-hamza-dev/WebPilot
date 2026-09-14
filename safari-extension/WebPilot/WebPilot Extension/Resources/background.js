console.log('🚀 WebPilot background service worker loaded')

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SAVE_AUTOMATION') {
    chrome.storage.local.set(
      { automation: message.automation },
      () => {
        console.log('💾 WebPilot automation saved')
        sendResponse({ success: true })
      }
    )

    return true
  }

  if (message.type === 'GET_AUTOMATION') {
    chrome.storage.local.get('automation', (result) => {
      console.log('📦 WebPilot automation requested:', result.automation)
      sendResponse({ automation: result.automation || null })
    })

    return true
  }
})
