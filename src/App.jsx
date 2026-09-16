import './App.css'
import Demo from './Pages/Demo'
import { useState, useEffect } from 'react'


function App() {

  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [selector, setSelector] = useState('')
  const [screenshot, setScreenshot] = useState(null)
  const [target, setTarget] = useState('')
  const [generatedAutomation, setGeneratedAutomation] = useState(null)
  const [generatedScript, setGeneratedScript] = useState('')
  const [copyMessage, setCopyMessage] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [automations, setAutomations] = useState(() => {
    const savedAutomations = localStorage.getItem('automations')
    return savedAutomations ? JSON.parse(savedAutomations) : []
  })

  const deleteAutomation = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/automations/${id}`, {
        method: 'DELETE'
      })

      setAutomations(
        automations.filter((automation) => automation.id !== id)
      )

      window.postMessage(
        {
          type: 'WEBPILOT_DELETE_AUTOMATION',
          id: id
        },
        '*'
      )

      console.log('Automation deleted:', id)
    } catch (error) {
      console.error('Delete error:', error)
      alert('Could not delete automation')
    }
  }


  useEffect(() => {
    fetch('http://localhost:8080/api/automations')
      .then((response) => response.json())
      .then((data) => {
        console.log('Automations from backend:', data)
        setAutomations(data)
      })
      .catch((error) => {
        console.error('Could not load automations:', error)
      })
  }, [])


  const saveAutomation = async () => {
    if (name === '' || url === '' || selector === '') {
      alert('Please fill in all fields')
      return
    }

    const automation = {
      name: name,
      url: url,
      selector: selector.trim(),
      action: 'click'
    }

    try {
      const response = await fetch(
        editingId
          ? `http://localhost:8080/api/automations/${editingId}`
          : 'http://localhost:8080/api/automations',
        {
          method: editingId ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(automation)
        }
      )

      if (!response.ok) {
        throw new Error(`Backend returned ${response.status}`)
      }

      const data = await response.json()

      console.log('Backend response:', data)

      if (editingId) {
        setAutomations(
          automations.map((item) =>
            item.id === editingId ? data : item
          )
        )
        setEditingId(null)
      } else {
        setAutomations([...automations, data])
      }

      window.postMessage(
        {
          type: 'WEBPILOT_SAVE_AUTOMATION',
          automation: data
        },
        '*'
      )

      console.log('Automation saved:', automation)

    } catch (error) {
      console.error('Backend error:', error)
      alert('Could not connect to WebPilot Backend')
    }
  }

  const generateAutomation = () => {
    if (target === '') {
      alert('Please enter a target element')
      return
    }



    const automation = {
      targetType: 'text',
      targetText: target,
      action: 'click'
    }




    const script = `
// ==UserScript==
// @name         WebPilot Automation
// @description  WebPilot generated browser automation
  // @match        *://*/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
  'use strict'

  const targetText = '${target.trim()}'

  const checkTarget = () => {
    const buttons = document.querySelectorAll('button')

    for (const button of buttons) {
      if (
        button.textContent.trim() === targetText &&
        !button.disabled
      ) {
        button.click()
        clearInterval(interval)
        console.log('🤖 WebPilot clicked:', targetText)
        return
      }
    }
  }

  const interval = setInterval(() => {
    checkTarget()
  }, 1000)
})()
`

    setGeneratedAutomation(automation)
    setGeneratedScript(script)

    console.log('Generated Automation:', automation)
    console.log('Generated Userscript:', script)
  }

  const copyUserscript = async () => {
    await navigator.clipboard.writeText(generatedScript)

    setCopyMessage('Userscript copied!')
  }


  return (
    <div className="app-container">

      <h1>WebPilot Agent</h1>
      <p>Browser Automation Control Center</p>


      <label>Automation Name</label>

      <input
        type="text"
        placeholder="Enter automation name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />




      <p>Automation: {name}</p>

      <label>Website URL</label>
      <input
        type="text"
        placeholder="Enter website URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />



      <p>Website: {url}</p>


      <label>Element Selector</label>
      <input
        type="text"
        placeholder="Example: #mark-attendance-button"
        value={selector}
        onChange={(e) => setSelector(e.target.value)}
      />

      <p>Selector: {selector}</p>

      <label>Screenshot</label>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setScreenshot(e.target.files[0])}
      />

      {screenshot && (
        <img
          src={URL.createObjectURL(screenshot)}
          alt="Uploaded screenshot"
          style={{ width: '100%', marginTop: '15px' }}
        />
      )}

      <label>Target Element</label>

      <input
        type="text"
        placeholder="Example: Back to course page"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
      />

      <label>Action</label>
      <select>
        <option value="click">Click</option>
      </select>

      <button type="button" onClick={generateAutomation}>
        Generate Automation
      </button>

      {generatedAutomation && (
        <div>
          <h3>Generated Automation</h3>

          <p>Target Type: {generatedAutomation.targetType}</p>
          <p>Target Text: {generatedAutomation.targetText}</p>
          <p>Action: {generatedAutomation.action}</p>
        </div>
      )}


      {generatedScript && (
        <div>
          <h3>Generated Userscript</h3>

          <textarea
            value={generatedScript}
            readOnly
            rows="20"
          />

          <button type="button" onClick={copyUserscript}>
            Copy Userscript
          </button>

          <p>{copyMessage}</p>
        </div>
      )}




      <button type="button" onClick={saveAutomation}>
        Save Automation
      </button>

      <h2>Saved Automations</h2>

      {automations.map((automation, index) => (
        <div key={index}>

          <h3>{automation.name}</h3>
          <p>Website: {automation.url}</p>
          <p>Selector: {automation.selector}</p>
          <p>Action: {automation.action}</p>

          <button
            onClick={() => {
              setEditingId(automation.id)
              setName(automation.name)
              setUrl(automation.url)
              setSelector(automation.selector)
            }}
          >
            Edit
          </button>

          <button onClick={() => deleteAutomation(automation.id)}>
            Delete
          </button>

        </div>
      ))}

      <Demo />
    </div>
  )
}

export default App





