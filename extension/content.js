console.log('🚀 WebPilot Extension loaded')

const targetText = 'Confirm Presence'

const checkTarget = () => {
  const buttons = document.querySelectorAll('button')

  for (const button of buttons) {
    if (
      button.textContent.trim() === targetText &&
      !button.disabled
    ) {
      console.log('🎯 WebPilot target found:', targetText)

      button.click()

      console.log('🤖 WebPilot clicked target:', targetText)

      clearInterval(interval)

      console.log('🛑 WebPilot stopped checking')

      return
    }
  }
}

const interval = setInterval(checkTarget, 1000)
