import './App.css'
import Demo from './Pages/Demo'
import { useState, useEffect } from 'react'


function App() {

  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [selector, setSelector] = useState('')
  const [automations, setAutomations] = useState(() => {
    const savedAutomations = localStorage.getItem('automations')
    return savedAutomations ? JSON.parse(savedAutomations) : []
  })

  const deleteAutomation = (index) => {
    const updatedAutomations = automations.filter(
      (_, i) => i !== index
    )

    setAutomations(updatedAutomations)
  }


  useEffect(() => {
    localStorage.setItem('automations', JSON.stringify(automations))
  }, [automations])


  const saveAutomation = () => {

    if (name === '' || url === '' || selector === '') {
      alert('Please fill in all fields')
      return
    }

    const automation = {
      name: name,
      url: url,
      selector: selector,
      action: 'click'
    }

    setAutomations([...automations, automation])
    console.log(automation)
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

      <label>Action</label>
      <select>
        <option value="click">Click</option>
      </select>

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

          <button onClick={() => deleteAutomation(index)}>
            Delete
          </button>

        </div>
      ))}

      <Demo />
    </div>
  )
}

export default App