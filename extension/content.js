console.log('🚀 WebPilot Extension loaded')

const watchers = new Map()

const startWatching = (automation) => {

  if (!automation) {
    console.log('📭 WebPilot: no automation configured')
    return
  }

  if (watchers.has(automation.id)) {
    console.log('⚠️ WebPilot watcher already running:', automation.id)
    return
  }


  if (!automation.url) {
    console.log('⚠️ WebPilot: automation URL is missing')
    return
  }

  let automationUrl

  try {
    automationUrl = new URL(automation.url)
  } catch (error) {
    console.log('⚠️ WebPilot: invalid automation URL')
    return
  }

  if (window.location.origin !== automationUrl.origin) {
    console.log('🌐 WebPilot: URL does not match automation')
    return
  }

  const checkTarget = () => {
    console.log('👀 WebPilot watching:', automation.id)

    const elements = document.querySelectorAll(automation.selector)

    const eligibleElements = Array.from(elements).filter(
      (element) =>
        element.offsetParent !== null &&
        !element.disabled &&
        !element.dataset.webpilotHandled
    )

    if (eligibleElements.length !== 1) {
      return
    }

    const element = eligibleElements[0]

    if (
      element &&
      element.offsetParent !== null &&
      !element.disabled &&
      !element.dataset.webpilotHandled
    ) {
      console.log('🎯 WebPilot target found:', automation.selector)

      element.dataset.webpilotHandled = 'true'

      if (automation.action === 'click') {
        element.click()
        console.log('🤖 WebPilot clicked target')
      }

      clearInterval(watcherInterval)
      watchers.delete(automation.id)

      console.log('🛑 WebPilot stopped checking:', automation.id)
    }
  }

  const watcherInterval = setInterval(checkTarget, 1000)

  watchers.set(automation.id, watcherInterval)

  console.log('👀 WebPilot watcher started:', automation.id)
}


window.addEventListener('message', (event) => {
  if (event.source !== window) {
    return
  }

  if (!event.data) {
    return
  }

  if (event.data.type === 'WEBPILOT_SAVE_AUTOMATION') {
    const automation = event.data.automation

    console.log('📥 WebPilot received automation from dashboard:', automation)

    chrome.runtime.sendMessage(
      {
        type: 'SAVE_AUTOMATION',
        automation: automation
      },
      (response) => {
        console.log('📤 WebPilot sent automation to background:', response)

        startWatching(automation)
      }
    )
  }

  if (event.data.type === 'WEBPILOT_DELETE_AUTOMATION') {
    const id = event.data.id

    console.log('🗑️ WebPilot received delete request:', id)

    const watcher = watchers.get(id)

    if (watcher) {
      clearInterval(watcher)
      watchers.delete(id)

      console.log('🛑 WebPilot stopped deleted watcher:', id)
    }

    chrome.runtime.sendMessage(
      {
        type: 'DELETE_AUTOMATION',
        id: id
      },
      (response) => {
        console.log('📤 WebPilot sent delete request to background:', response)
      }
    )
  }
})


chrome.runtime.sendMessage(
  { type: 'GET_AUTOMATION' },
  (response) => {
    if (!response || !response.automations) {
      console.log('📭 WebPilot: no automations configured')
      return
    }

    const automations = response.automations

    console.log('📦 WebPilot automations received:', automations)

    automations.forEach((automation) => {
      startWatching(automation)
    })
  }
)