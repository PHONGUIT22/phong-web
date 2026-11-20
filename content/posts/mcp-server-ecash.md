---
title: "How to Give AI Agents Autonomous Bitcoin, Cashu eCash & HTTP 402 Payments via MCP (NostrPulse v1.4.0)"
date: "2026-11-20"
excerpt: "Complete engineering guide to NostrPulse (nostrpulse-mcp v1.4.0): giving Claude Desktop, Cursor, and autonomous AI agents instant Cashu eCash (NIP-61), HTTP 402 (L402 + NUT-24) paywall settlement, NIP-47 NWC Lightning rails, 5-Pillar Web-of-Trust Anti-Sybil Radar, and SQLite spending guardrails."
tags: ["MCP", "AI Agents", "Cashu eCash", "HTTP 402", "Nostr", "Bitcoin Lightning"]
readingTime: "12 min read"
featured: true
---

# How to Give AI Agents Autonomous Bitcoin, Cashu eCash & HTTP 402 Payments via MCP (NostrPulse v1.4.0)

> **Author:** Nguyễn Hạc Phong • **Published:** November 20, 2026 • **Category:** Distributed Protocols & AI Agents  
> **npm Package:** [npmjs.com/package/nostrpulse-mcp](https://www.npmjs.com/package/nostrpulse-mcp) • **Repository:** [github.com/PHONGUIT22/nostrpulse-full](https://github.com/PHONGUIT22/nostrpulse-full)

---

## 1. Why AI Agents Cannot Use Stripe (And How Freedom Tech Solves It)

As software engineering shifts toward autonomous multi-agent swarms, LLMs running inside **Claude Desktop**, **Cursor**, **Windsurf**, and custom TypeScript runtimes need native capabilities to pay for APIs, hire compute workers, and settle micro-transactions without human intervention.

Conventional payment rails fail autonomous agents in two fundamental ways:
1. **KYC Lockouts & Fiat Friction:** Stripe, PayPal, and corporate credit cards require human KYC identity verification, legal entity registration, and 30-cent fixed fee floors—making a **5-satoshi API call** or **21-satoshi agent bounty** economically impossible.
2. **Sybil Attacks & Wallet Draining:** On open decentralized networks, generating cryptographic keypairs (`npub`) costs `$0.00`. Without an anti-Sybil reputation filter and strict budget guardrails, a single prompt injection or infinite ReAct loop can drain an agent's wallet in seconds.

**NostrPulse (`nostrpulse-mcp` v1.4.0)** solves both problems. It is an open-source **Model Context Protocol (MCP)** server and TypeScript SDK built on the **Freedom Tech Stack** (Nostr + Bitcoin Lightning + Cashu Chaumian eCash), providing **Stripe-like M2M settlement** and **Stripe Radar-grade anti-Sybil protection** out of the box.

| Vector | Legacy Web2 / Stripe | NostrPulse (`nostrpulse-mcp` v1.4.0) |
| :--- | :--- | :--- |
| **Agent Identity** | API keys, credit cards, KYC bans | **Zero-Config Sovereign Keypairs (`NIP-01 / NIP-19`)** |
| **Anti-Fraud (Radar)** | Centralized black-box heuristics | **Web-of-Trust Ring-1 (22 Root Anchors) + Sats Stake** |
| **M2M Settlement** | 30% cuts, merchant holds | **Chaumian eCash (NIP-61 NutZaps): Zero-fee, instant, private** |
| **API Paywalls** | OAuth + Monthly SaaS billing | **HTTP 402 Engine (`L402` Lightning + Cashu `NUT-24 X-Cashu`)** |
| **Offline Delivery** | Synchronous connection required | **Asynchronous NutZaps via NIP-59 Gift Wrap & Relays** |
| **Compute Delegation** | Proprietary cloud APIs | **NIP-90 Data Vending Machines (Open Compute Marketplace)** |
| **AI Protocol** | Custom vendor REST wrappers | **Stdio JSON-RPC via Model Context Protocol (`nostrpulse-mcp`)** |

---

## 2. Zero-Code Quickstart: Connect Cursor & Claude Desktop in 10 Seconds

NostrPulse exports an industry-standard MCP server over **Stdio JSON-RPC**. You do not need to clone a repository or manually generate `nsec` private keys—the server automatically bootstraps a persistent local keypair at `.nostrpulse/agent-identity.json` (mode `0600`).

Add this configuration to your `claude_desktop_config.json` or `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "nostrpulse": {
      "command": "npx",
      "args": ["-y", "nostrpulse-mcp"]
    }
  }
}
```

- **Claude Desktop (macOS):** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Claude Desktop (Windows):** `%APPDATA%\Claude\claude_desktop_config.json`
- **Cursor IDE:** `.cursor/mcp.json` in your project root, or under *Cursor Settings > Features > MCP*.

To inspect all 11 tools and test prompts interactively in your browser, run the official MCP Inspector:

```bash
npx @modelcontextprotocol/inspector npx -y nostrpulse-mcp
```

---

## 3. 3-Line TypeScript SDK & HTTP 402 Paywall Engine (`nostrpulse-mcp/sdk`)

For developers building custom Node.js or TypeScript AI agents who want autonomous eCash/Lightning rails and HTTP `402 Payment Required` handling without manually wiring Nostr NIPs or Cashu NUTs:

```typescript
import { NostrPulseAgent } from "nostrpulse-mcp/sdk";

const wallet = new NostrPulseAgent({ maxDailySats: 5000, minTrustScore: 65 });
await wallet.deposit("cashuAeyJ0b2tlbiI6...");
const receipt = await wallet.pay({
  to: "npub180cvv07tjdrrgpa0j7j7tmnyl2yr6yr7l8j4s3evf6u64th6gkwsyjh6w6",
  amountSats: 21,
  memo: "AI task settlement",
});

// Bitcoin-native HTTP 402 Paywall Engine (L402 Lightning + Cashu NUT-24 X-Cashu)
const paidApi = await wallet.fetch402("https://api.example.com/paid-endpoint");
```

The built-in `fetch402` engine automatically detects `402 Payment Required` responses, settles either **Lightning L402** invoices or **Cashu NUT-24 (`X-Cashu`)** headers under strict SSRF and spending guardrails, and retries the request transparently.

---

## 4. Complete Lookup Table: 11 Core MCP Tools

| Tool Name | Category | Description |
| :--- | :---: | :--- |
| `check_trust_score` | **Radar / Anti-Sybil** | Evaluates Web-of-Trust Ring-1 (22 Root Anchors), transitive hops, and Sybil-filtered Economic Stake (sats) before interacting or paying. |
| `pay_cashu_nutzap` | **Payment Rails (eCash)** | Instant M2M settlement with Chaumian eCash (`NIP-61` NutZap) wrapped in metadata-private `NIP-59` Gift Wrap and `NIP-44` encryption. |
| `request_nip90_job` | **Decentralized Compute** | Dispatches compute tasks to decentralized `NIP-90` Data Vending Machines (DVMs) across Nostr relays with local SQLite cache fallback. |
| `pay_lightning_nwc` | **Payment Rails (Lightning)** | Settle BOLT-11 Lightning invoices directly via `NIP-47` Nostr Wallet Connect (Alby Hub, Phoenixd, Umbrel) with zero-leak pool cleanup. |
| `pay_with_nwc` | **Payment Rails (Alias)** | Direct NWC payment executor alias for `pay_lightning_nwc`. |
| `audit_cashu_mint` | **Mint Radar** | Audits counterparty risk of a Cashu eCash Mint via `NUT-06 /v1/info`, `NIP-05` sovereign domain validation, and admin WoT reputation. |
| `route_cashu_mint` | **Mint Mesh** | Dynamically discovers and routes to the highest-trust, lowest-latency Cashu Mint from the WoT-Gated Dynamic Mint Mesh. |
| `get_agent_identity` | **Zero-Config Identity** | Retrieves active agent cryptographic identity (`pubkey`, `npub`, keystore source). Automatically bootstraps local keys if missing. |
| `get_spending_guardrails` | **Budget Gatekeeper** | Queries active daily budget (500 sats rolling), 24h satoshis spent, remaining allowance, and per-transaction cap (50 sats). |
| `get_agent_telemetry` | **Telemetry & Audit** | Inspects structured audit logs (`payment`, `radar_block`, `job_settlement`, `mint_audit`) and blocked Sybil threats. |
| `fetch_with_402_payment` | **HTTP 402 Paywall** | Fetches external REST APIs and settles HTTP `402` paywalls via Cashu `NUT-24` (`X-Cashu`) or Lightning `L402` with SSRF protection. |

---

## 5. Optimizing Context for Small Language Models (500M – 1.5B SLMs)

Loading 11 full JSON tool schemas consumes **~2,200 tokens**—excessive overhead for local SLMs like `qwen2.5-coder:1.5b` running on Ollama or edge devices. NostrPulse v1.4.0 supports **context-pruned profiles** that cut tool overhead by **82% (down to ~380 tokens)**:

```bash
# Launch with minimal profile (3 core tools: check_trust_score, pay_cashu_nutzap, get_spending_guardrails)
npx -y nostrpulse-mcp --profile=minimal

# Or via environment variable
NOSTRPULSE_PROFILE=minimal npx -y nostrpulse-mcp
```

| Profile | Active Tools | Token Footprint | Recommended Use Case |
| :--- | :--- | :---: | :--- |
| `minimal` | `check_trust_score`, `pay_cashu_nutzap`, `get_spending_guardrails` | **~380 tokens** | Local SLMs (0.5B–1.5B), edge devices, low-cost loops |
| `radar` | `check_trust_score`, `audit_cashu_mint` | **~240 tokens** | Read-only anti-Sybil screening & Mint risk verification |
| `payment` | `pay_cashu_nutzap`, `pay_lightning_nwc`, `get_spending_guardrails` | **~420 tokens** | Payment-only execution daemons & bots |
| `full` | All 11 NostrPulse MCP tools | **~2,200 tokens** | Flagship LLMs (Claude, GPT, Gemini) |

---

## 6. 5-Pillar Anti-Sybil Radar & NUT-06 Mint Risk Auditing

### A. 5-Pillar Cryptographic Trust Score (0–100 Points)

To neutralize bot swarms without centralized KYC, `check_trust_score` evaluates five deterministic signals across open Nostr relays and local SQLite cache:

1. **Pillar 1 — NIP-05 Cryptographic DNS Binding (25 pts):** Validates `.well-known/nostr.json` against the public key, awarding bonuses for sovereign custom domains.
2. **Pillar 2 — Web-of-Trust Ring-1 Proximity (25 pts):** Computes graph hops to **22 verified protocol Root Anchors** (`jack`, `fiatjaf`, `jb55`, `calle`, `odell`, etc.).
3. **Pillar 3 — Sats-Weighted Economic Stake (20 pts):** Analyzes verified Zap receipts while filtering out self-zaps and circular bot clones.
4. **Pillar 4 — Keypair Longevity & Multi-Relay Depth (15 pts):** Evaluates keypair age and replication across global relays.
5. **Pillar 5 — Metadata Richness & Authenticity (15 pts):** Verifies profile metadata and external identity endpoints.

> **Anti-Sybil Damping Guard:** Any account lacking **both** a verified NIP-05 signature **and** Web-of-Trust graph proximity is **strictly capped at 44 points (Unverified / Potential Bot)**, preventing Sybil swarms from crossing the default payment threshold.

### B. WoT-Gated Dynamic Mint Mesh (`NUT-06` Radar)

Because Cashu Mints carry counterparty risk, `audit_cashu_mint` probes `/v1/info`, measures response latency, checks supported NUTs (`NUT-04`, `NUT-05`, `NUT-07`, `NUT-08`, `NUT-10`, `NUT-11`), and resolves the Mint admin's Nostr WoT score into three risk tiers:
- **`LOW` (Score ≥ 75):** `TRUSTED` — verified operator, low latency, full NUT compliance.
- **`MODERATE` (Score 45–74):** `USE_WITH_CAP` — community mint with acceptable WoT connectivity.
- **`HIGH_RISK` (Score < 45):** `AVOID` — anonymous admin, insecure HTTP, or isolated keypair.

---

## 7. Autonomous Agent-to-Agent (A2A) Mesh & Spending Guardrails

NostrPulse enforces strict pre-flight **Spending Guardrails** backed by SQLite (`agent_spending_log`) before any cryptographic token leaves the agent:

```text
[ Agent Payment Request ]
       │
       ├──► Check AGENT_MAX_SATS_PER_TX (Default: 50 sats)
       ├──► Check AGENT_DAILY_LIMIT_SATS (Default: 500 sats / 24h rolling)
       └──► Check AGENT_MIN_RECIPIENT_SCORE (Default: >= 40 WoT Score)
                │
                ▼ (Any Violation)
      Short-Circuit Block ──► { status: "blocked_by_guardrails", reason } (0 Sats Spent)
```

In the reference **Autonomous Agent-to-Agent (A2A) Collaborative Mesh** (`scripts/test-mesh-agent.ts`), two local agents negotiate and settle a `NIP-90` compute job (`zap-analytics`) using **Ollama (`qwen2.5-coder:1.5b`)** with zero cloud API keys:
1. **Buyer Agent** dispatches a `NIP-90` job request.
2. **Worker Agent** audits the Buyer's WoT score (`check_trust_score`) before executing work.
3. **Buyer Agent** checks its rolling 24h budget (`get_spending_guardrails`) and settles via Chaumian eCash (`pay_cashu_nutzap`) with **Adaptive Spending Fallback** so micro-payments adapt to remaining safe allowance without crashing.

```bash
# Run the local zero-cloud A2A showcase against the published npm package
npm exec tsx scripts/test-mesh-agent.ts --ollama --npm
```

---

## 8. Frequently Asked Questions (FAQ)

### How do I install `nostrpulse-mcp` in Claude Desktop or Cursor?
Add `"nostrpulse": { "command": "npx", "args": ["-y", "nostrpulse-mcp"] }` to `claude_desktop_config.json` or `.cursor/mcp.json`. No manual private key setup is required; NostrPulse automatically bootstraps a non-custodial keypair locally.

### Does NostrPulse store or have access to my private keys (`nsec`)?
No. NostrPulse is 100% non-custodial open-source software. Keys are either read from your local environment (`NOSTR_SECRET_KEY` / `AGENT_NSEC`) or generated locally with `0600` file permissions in `.nostrpulse/agent-identity.json` (git-ignored).

### How does HTTP 402 (`fetch402`) work for AI agents?
When an agent calls `wallet.fetch402(url)` or the `fetch_with_402_payment` MCP tool and receives an HTTP `402 Payment Required` challenge, NostrPulse parses either the `L402` Lightning invoice or Cashu `NUT-24` (`X-Cashu`) header, verifies the amount against your spending guardrails, pays it, and returns the unlocked API response.

---

## Resources & Package Links

- **npm Package (`nostrpulse-mcp` v1.4.0):** [npmjs.com/package/nostrpulse-mcp](https://www.npmjs.com/package/nostrpulse-mcp)
- **GitHub Repository:** [github.com/PHONGUIT22/nostrpulse-full](https://github.com/PHONGUIT22/nostrpulse-full)
- **Built by:** [Hạc Phong](https://hacphong.com) (`@PHONGUIT22`)
