"use client";

import { useState } from "react";
import { Zap, Copy, Check, ShieldCheck, ArrowUpRight, Key } from "lucide-react";
import ZapModal from "./ZapModal";

export default function NostrCard() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [zapOpen, setZapOpen] = useState(false);

  const nip05 = "phong@hacphong.com";
  const npub = "npub1p8jw2mhsel5vpcmgxu45nuwwxfwrqxv0pvygrvknelwhpyzf5v4sd3u7gw";
  const npubShort = "npub1p8jw2m...d3u7gw";
  const pubkeyHex = "09e4e56ef0cfe8c0e368372b49f1ce325c30198f0b0881b2d3cfdd709049a32b";
  const lightningAddress = "hacphong@getalby.com";

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      prompt("Copy manually:", text);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-10 shadow-sm">
        <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 rounded-full bg-gradient-to-bl from-amber-100/40 via-brand-50/20 to-transparent blur-2xl" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 mb-2">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-600" />
                <span>Protocol Dispatch</span>
              </div>
              <h2 className="font-serif text-2xl font-semibold text-slate-900">
                Sovereign Nostr Identity & Lightning Settlements
              </h2>
              <p className="mt-1 text-sm text-slate-600 max-w-xl">
                Censorship-resistant communication and micropayments for autonomous AI agents. Verified via cryptographic Schnorr signatures and Chaumian eCash.
              </p>
            </div>

            <button
              onClick={() => setZapOpen(true)}
              className="self-start sm:self-center inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-medium px-4 py-2.5 text-xs shadow-sm hover:shadow transition-all"
            >
              <Zap className="h-4 w-4 fill-slate-950" />
              <span>Send Satoshis (Zap)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* NIP-05 Identifier */}
            <div className="flex flex-col justify-between rounded-2xl border border-slate-200/70 bg-slate-50/70 p-5">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  NIP-05 Verification
                </span>
                <p className="mt-1 font-mono text-sm font-semibold text-slate-800 break-all">
                  {nip05}
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  Domain-bound public identity with CORS support.
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-200/50">
                <a
                  href="/.well-known/nostr.json"
                  target="_blank"
                  className="text-xs font-medium text-brand-700 hover:underline flex items-center gap-1"
                >
                  <span>JSON Manifest</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>

                <button
                  onClick={() => handleCopy(nip05, "nip05")}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
                >
                  {copiedKey === "nip05" ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Nostr Public Key (npub) */}
            <div className="flex flex-col justify-between rounded-2xl border border-slate-200/70 bg-slate-50/70 p-5">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    Public Key (npub)
                  </span>
                  <Key className="h-3 w-3 text-slate-400" />
                </div>
                <p className="mt-1 font-mono text-xs font-semibold text-slate-800 break-all" title={npub}>
                  {npubShort}
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  secp256k1 keypair for signed events & Web-of-Trust.
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-200/50">
                <a
                  href={`https://primal.net/p/${npub}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-brand-700 hover:underline flex items-center gap-1"
                >
                  <span>Primal Profile</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>

                <button
                  onClick={() => handleCopy(npub, "npub")}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
                  title="Copy full npub"
                >
                  {copiedKey === "npub" ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy npub</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Lightning Address */}
            <div className="flex flex-col justify-between rounded-2xl border border-slate-200/70 bg-slate-50/70 p-5">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Lightning Address (LUD-16)
                </span>
                <p className="mt-1 font-mono text-sm font-semibold text-slate-800 break-all">
                  {lightningAddress}
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  Instant routing for nano-sats and NutZaps off-chain.
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-200/50">
                <button
                  onClick={() => setZapOpen(true)}
                  className="text-xs font-medium text-amber-700 hover:underline flex items-center gap-1"
                >
                  <span>Show QR Code</span>
                  <ArrowUpRight className="h-3 w-3" />
                </button>

                <button
                  onClick={() => handleCopy(lightningAddress, "ln")}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
                >
                  {copiedKey === "ln" ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zap Modal */}
      <ZapModal isOpen={zapOpen} onClose={() => setZapOpen(false)} />
    </>
  );
}
