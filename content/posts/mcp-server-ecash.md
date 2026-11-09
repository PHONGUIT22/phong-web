---
title: "NostrPulse MCP: Decentralized Stripe & Anti-Sybil Radar for Autonomous AI Agents"
date: "2026-11-05"
excerpt: "Designing an open-source Model Context Protocol (MCP) server combining a 5-Pillar Web-of-Trust Anti-Sybil Radar, asynchronous Cashu eCash (NIP-61 NutZaps), NIP-47 NWC Lightning settlement, and deterministic agent spending guardrails."
tags: ["MCP", "AI Agents", "Cashu eCash", "Nostr", "Web3"]
readingTime: "10 min read"
featured: true
---

# NostrPulse MCP: Decentralized Stripe & Anti-Sybil Radar for Autonomous AI Agents

> **Author:** Nguyen Phong (Hac Phong) • **Published:** November 5, 2026 • **Category:** Distributed Protocols & AI Agents  
> **Repository:** [github.com/PHONGUIT22/nostrpulse-full](https://github.com/PHONGUIT22/nostrpulse-full) • **Live Registry:** [nostrpulse.vercel.app](https://nostrpulse.vercel.app/)

---

## 1. The Autonomous Agent Dilemma: Sybil Floods and KYC Lockouts

As software engineering shifts toward autonomous multi-agent swarms, LLMs require native capabilities to discover collaborator services, negotiate computational contracts, and settle micro-transactions without human intervention. However, deploying agentic payments into production surfaces two fundamental vulnerabilities:

1. **The Sybil Attack Vector:** On open distributed networks, generating an asymmetric secp256k1 keypair (`npub`) costs $0.00. Malicious actors can spin up tens of thousands of ephemeral agent identities to spam tool registries, poach computational bounties, and poison shared knowledge graphs.
2. **The Sovereign Settlement Chokepoint:** Conventional fiat payment processors (Stripe, PayPal, Brex) require human KYC identity proofs, legal entity registration, and manual fraud reviews. Autonomous agents executing micro-tasks (e.g., paying 5 sats for an API call) are systematically blocked or banned by legacy banking rails. Furthermore, synchronous Lightning invoices (BOLT-11) require the receiving agent to be online to generate and settle the payment hash, failing when agents execute intermittent, asynchronous workloads.

**NostrPulse MCP (v1.3.2)** provides a production-grade, open-source sovereign trust and payment infrastructure for autonomous AI agents via Anthropic's **Model Context Protocol (MCP)**.

---

## 2. Server Architecture & Topology

NostrPulse runs locally over standard input/output (Stdio JSON-RPC), connecting seamlessly to agent environments including Claude Desktop, Cursor IDE, Windsurf, and custom agent harnesses:

```
[Consumer Client] (Claude Desktop / Cursor IDE / Windsurf)
       │
       ▼ Stdio JSON-RPC (MCP Protocol)
[NOSTRPULSE-MCP GATEWAY CORE] (Non-Custodial)
   ├── 5-Pillar WoT Anti-Sybil Radar (0-100 Score, 22 Root Anchors)
   ├── Agent Spending Guardrails (50 sat/tx cap, 500 sat 24h budget)
   └── Dual-Rail Value Settlement Engine
         ├── NIP-61 Cashu NutZaps (Async Chaumian eCash)
         └── NIP-47 Nostr Wallet Connect (Synchronous Lightning)
       │
       ▼ Decentralized Protocol Mesh
   ├── Chaumian eCash Layer: Cashu Dynamic Mint Mesh (RFC 8949 CBOR)
   └── Relay Layer: Nostr Distributed Relay Network (NIP-01 / NIP-65)
```

---

## 3. Core Tool Specification (10 Production MCP Tools)

The server exposes 10 high-level tools designed for autonomous agent execution:

| Tool Name | Domain | Primary Capability |
| :--- | :--- | :--- |
| `check_trust_score` | Trust / Radar | Computes 5-Pillar Web-of-Trust score (0–100 pts) with Sybil damping. |
| `pay_cashu_nutzap` | Payment | Emits asynchronous blind-signature NutZaps (NIP-61) via NIP-59 Gift Wrap. |
| `request_nip90_job` | Compute | Publishes NIP-90 Data Vending Machine computation requests. |
| `pay_lightning_nwc` | Payment | Settles synchronous BOLT-11 invoices via Nostr Wallet Connect (NIP-47). |
| `pay_with_nwc` | Payment | High-level unified payment orchestration with auto-fallback. |
| `audit_cashu_mint` | Radar | Audits mint solvency, keysets, and protocol compliance. |
| `route_cashu_mint` | Radar | Selects lowest-latency, highest-reputation mint endpoints. |
| `get_agent_identity` | Identity | Inspects local secp256k1 keypair, NIP-05 address, and npub string. |
| `get_spending_guardrails` | Governance | Audits per-tx caps, rolling 24-hour limits, and counterparty gates. |
| `get_agent_telemetry` | Telemetry | Emits diagnostic settlement latency and cache hit ratios. |

### Context-Optimized SLM Profiles
To prevent tool schema definitions from crowding smaller localized models, NostrPulse introduces context-pruning CLI flags:

```bash
# Drops tool definition context from 2,200 tokens to 380 tokens for 1.5B models
npx nostrpulse-mcp --profile=payment
```

Available profiles include `--profile=minimal`, `--profile=radar`, `--profile=payment`, and `--profile=full`.

---

## 4. The 5-Pillar Web-of-Trust Anti-Sybil Radar

To evaluate counterparty credibility without centralized KYC, NostrPulse implements an algorithmic graph traversal that assigns a cryptographic trust score from **0 to 100 points**:

- **Pillar 1: NIP-05 DNS Binding (+25 pts):** Validates DNS cryptographic domain ownership proof (e.g., `agent@domain.com`). Prevents identity spoofing by requiring ownership of a registered web domain.
- **Pillar 2: WoT Distance to Root Anchors (+25 pts):** Calculates degrees of separation from 22 sovereign root Nostr developers and infrastructure operators. Shorter graph distances yield maximum points.
- **Pillar 3: Sat-Weighted Economic Stake (+20 pts):** Measures historical on-chain and Lightning sat volume transacted and verified by the identity, providing economic proof of skin-in-the-game.
- **Pillar 4: Key Longevity & Activity Half-Life (+15 pts):** Evaluates the cryptographic age of the secp256k1 keypair and consistency of signed events over time. Ephemeral bot keys created minutes ago receive 0 points.
- **Pillar 5: Social Metadata & PoW Difficulty (+15 pts):** Verifies profile metadata completeness (avatar, bio, relays) and checks for SHA-256 Proof-of-Work leading zeroes on published events.

### Unverified Sybil Capping
Identities lacking cryptographic DNS proofs or verified social graph links are hard-capped at **44 points maximum**. By configuring agent guardrails to require `min_trust_score: 50`, autonomous agents automatically ignore Sybil swarms and spam bots.

---

## 5. Deterministic Agent Spending Guardrails

To prevent runaway agentic loops or model hallucinations from draining funds, NostrPulse enforces deterministic financial boundaries backed by local SQLite persistence:

- **Per-Transaction Cap:** Restricts any single payment tool invocation to a maximum of **50 sats** (configurable).
- **Rolling 24-Hour Budget:** Enforces a hard aggregate daily ceiling of **500 sats** across all combined tool calls.
- **Stateful Circuit Breaker:** If an agent attempts more than 3 failed transactions in 60 seconds, the payment rail pauses automatically, alerting the developer via console events.

---

## 6. Zero-Code Quickstart & Configuration

Integrating NostrPulse into modern agent harnesses requires adding a simple entry to your client configuration:

### Claude Desktop Configuration (`claude_desktop_config.json`)
```json
{
  "mcpServers": {
    "nostrpulse": {
      "command": "npx",
      "args": ["-y", "nostrpulse-mcp@latest", "--profile=full"],
      "env": {
        "NOSTR_PRIVATE_KEY": "nsec1...",
        "NWC_CONNECTION_URI": "nostr+walletconnect://..."
      }
    }
  }
}
```

### Direct CLI Execution
```bash
# Run standalone server over stdio
npx nostrpulse-mcp
```

---

## 7. Open Source & Project Ecosystem

NostrPulse MCP is completely open-source and part of the sovereign agentic tooling initiative:

- **Source Code Repository:** [github.com/PHONGUIT22/nostrpulse-full](https://github.com/PHONGUIT22/nostrpulse-full)
- **Live Tool Registry & Explorer:** [nostrpulse.vercel.app](https://nostrpulse.vercel.app/)
- **Protocol Specifications:** Anthropic MCP, Nostr NIP-05 / NIP-47 / NIP-59 / NIP-61, Cashu NUT-00–12
