package com.mohammedhamza.webpilot.controller;

import com.mohammedhamza.webpilot.entity.Automation;
import com.mohammedhamza.webpilot.repository.AutomationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/automations")
@CrossOrigin(origins = "http://localhost:5173")
public class AutomationController {

    private final AutomationRepository automationRepository;

    public AutomationController(AutomationRepository automationRepository) {
        this.automationRepository = automationRepository;
    }

    @PostMapping
    public Automation createAutomation(@RequestBody Automation automation) {
        return automationRepository.save(automation);
    }

    @GetMapping
    public List<Automation> getAllAutomations() {
        return automationRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public void deleteAutomation(@PathVariable Long id) {
        automationRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public Automation updateAutomation(
        @PathVariable Long id,
        @RequestBody Automation automation) {

    Automation existingAutomation = automationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Automation not found"));

    existingAutomation.setName(automation.getName());
    existingAutomation.setUrl(automation.getUrl());
    existingAutomation.setSelector(automation.getSelector());
    existingAutomation.setAction(automation.getAction());

    return automationRepository.save(existingAutomation);
  }
}
