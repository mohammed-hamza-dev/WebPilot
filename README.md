# WebPilot

A configurable browser automation agent built with React and JavaScript.

WebPilot allows users to create browser automation tasks by defining a website URL, target element selector, and action. A browser-side worker reads the saved automation and performs the configured action when the target element appears.

## 🚀 Current V1

The current version demonstrates the core browser automation workflow using a controlled demo website.

### How it works

```text
User creates automation
        ↓
Automation saved in localStorage
        ↓
Browser Worker reads configuration
        ↓
Worker checks the configured webpage
        ↓
Target element appears
        ↓
Worker detects the target
        ↓
Configured action is executed
        ↓
Worker stops after successful execution
