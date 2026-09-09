# 🤖 WebPilot

WebPilot is a configurable browser automation agent built with **React** and **JavaScript**.

It lets users create browser automation tasks by defining an automation name, target website URL, target element CSS selector, and action. A browser-side worker reads the saved configuration and performs the configured action when the target element appears.

## 🚀 Current V1

WebPilot V1 is a working prototype that demonstrates the core browser automation workflow using a controlled local demo website.

### Core Workflow

```text
User creates automation
        ↓
Automation saved in localStorage
        ↓
Browser Worker reads configuration
        ↓
Worker checks for the configured target
        ↓
Target element appears
        ↓
WebPilot detects the target
        ↓
Configured action is executed
        ↓
Worker stops after successful execution
```

## ✨ Features

### V1 — Completed

- [x] Create browser automation tasks
- [x] Configure automation name
- [x] Configure target website URL
- [x] Configure CSS element selector
- [x] Configure action type
- [x] Save automations using browser `localStorage`
- [x] Persist automations after page refresh
- [x] Delete saved automations
- [x] Detect dynamically rendered webpage elements
- [x] Automatically execute click actions
- [x] Prevent duplicate execution
- [x] Stop the worker after successful execution
- [x] Controlled demo environment for testing automation

## 🛠️ Tech Stack

| Category | Technologies |
| --- | --- |
| Frontend | React, JavaScript, Vite, CSS |
| Browser Automation | JavaScript, Safari Userscripts, DOM APIs |
| Browser APIs       | DOM APIs, `setInterval`, `querySelector`, `localStorage` |
| Development | Git, GitHub |

## 📸 Demo

🚀 **Live Demo:** [WebPilot](https://mohammed-hamza-dev.github.io/WebPilot/)

### Demo Flow

1. The page initially displays a waiting status.
2. The **Confirm Presence** button is not initially available.
3. After a few seconds, the button appears dynamically.
4. The Browser Worker detects the configured selector.
5. WebPilot automatically clicks the button.
6. The status changes to **“Confirmed!”**.
7. The worker stops checking after successful execution.

### Example Automation

| Setting | Value |
| --- | --- |
| **Name** | `Confirm Presence Demo` |
| **Website** | `http://localhost:5173/` |
| **Selector** | `#confirm-presence` |
| **Action** | `click` |

## 🌐 Browser Worker

The current V1 Browser Worker is implemented using a **Safari Userscript**. It:

1. Reads saved automation configuration from `localStorage`.
2. Reads the configured CSS selector.
3. Checks the webpage for the target element.
4. Detects the target when it appears.
5. Executes the configured action.
6. Prevents duplicate execution.
7. Stops checking after successful execution.

### Currently Supported Action

- `Click`

> **Note:** V1 uses Safari Userscripts as its browser integration layer. A dedicated browser extension is planned for a future version and is **not currently implemented**.

## ⚙️ Getting Started

### Prerequisites

- Node.js
- npm
- Git
- Safari
- A Userscripts Safari extension

### 1. Clone the Repository

```bash
git clone https://github.com/mohammed-hamza-dev/WebPilot.git
```

### 2. Navigate to the Project

```bash
cd WebPilot
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`.

## 🧪 Running the Automation Demo

After starting the application:

1. Open the WebPilot application in Safari.
2. Open the Userscripts extension.
3. Add the `browser-worker/browser-worker.js` script from this repository to Userscripts.
4. Allow Userscripts to run on `localhost`.
5. Create the following automation:

   | Setting | Value |
   | --- | --- |
   | **Name** | `Confirm Presence Demo` |
   | **Website** | `http://localhost:5173/` |
   | **Selector** | `#confirm-presence` |
   | **Action** | `click` |

6. Open the **Demo** section.
7. Wait for the target button to appear.
8. WebPilot automatically detects and clicks the button.

The React dashboard runs normally after cloning the repository and installing dependencies. However, automatic browser interaction requires the Safari Userscripts setup: V1 uses Userscripts as its browser integration layer. Without that configuration, the dashboard runs but the worker will not automatically interact with the webpage on another computer.

## 📂 Project Structure

```text
WebPilot/
│
├── browser-worker/
│   └── browser-worker.js
│
├── public/
│
├── src/
│   ├── Pages/
│   │   └── Demo.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## 🔐 Safety

WebPilot is designed around controlled, predefined browser automation actions. The current portfolio demo uses a locally controlled mock website.

WebPilot is **not designed to bypass**:

- CAPTCHA
- MFA
- Authentication security
- Anti-bot protections
- Paywalls
- Access controls

## 🗺️ Roadmap

The roadmap separates V1 functionality from planned future work.

### V1 — Core Automation

- [x] React automation dashboard
- [x] Create automation
- [x] Save automation configuration
- [x] `localStorage` persistence
- [x] Configurable CSS selector
- [x] Dynamic target detection
- [x] Click action
- [x] Duplicate execution prevention
- [x] Stop worker after successful execution
- [x] Controlled demo site

### V2 — Browser Integration

- [ ] Dedicated browser extension
- [ ] Visual element picker
- [ ] Multiple automation targets
- [ ] Additional predefined actions
- [ ] Enable / disable automation

### V3 — Automation Platform

- [ ] Backend API
- [ ] PostgreSQL database
- [ ] User authentication
- [ ] Scheduling
- [ ] Execution history
- [ ] Execution logs
- [ ] Safety policies

### Future Enhancements

- [ ] Conditional workflows
- [ ] Notifications
- [ ] Automation templates
- [ ] Import / export
- [ ] AI-assisted element discovery

## 🎯 Project Purpose

WebPilot was developed as a portfolio project to explore:

- Browser automation
- DOM interaction
- Configurable automation workflows
- React application development
- Browser-side automation
- Client-side configuration persistence

The project demonstrates how a frontend application can store automation configuration in browser storage and how a browser-side automation worker can read that configuration and execute the defined action.

## 👨‍💻 Author

**Mohammed Hamza**

- GitHub: https://github.com/mohammed-hamza-dev
- LinkedIn: https://www.linkedin.com/in/mohammed-hamza-dev

## 📄 License

This project was created for **learning and portfolio purposes**. There is currently **no open-source license**.
