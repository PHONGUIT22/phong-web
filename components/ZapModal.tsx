"use client";

import { useState, useEffect } from "react";
import { Zap, Copy, Check, X, QrCode } from "lucide-react";

interface ZapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ZapModal({ isOpen, onClose }: ZapModalProps) {
  const [copied, setCopied] = useState(false);
  const lightningAddress = "hacphong@getalby.com";
  const nip05 = "phong@hacphong.com";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      prompt("Copy manually:", text);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl transition-all">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60">
              <Zap className="h-4 w-4 fill-amber-500" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-slate-900">
                Send Bitcoin Zap
              </h3>
              <p className="text-xs text-slate-500">
                Lightning Network & Chaumian eCash
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* QR & Details */}
        <div className="my-6 flex flex-col items-center text-center">
          <div className="relative mb-4 flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-inner">
            <svg
              className="h-36 w-36"
              viewBox="0 0 28 28"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="2" y="2" width="7" height="7" rx="1" />
              <rect x="4" y="4" width="3" height="3" fill="#ffffff" />
              <rect x="19" y="2" width="7" height="7" rx="1" />
              <rect x="21" y="4" width="3" height="3" fill="#ffffff" />
              <rect x="2" y="19" width="7" height="7" rx="1" />
              <rect x="4" y="21" width="3" height="3" fill="#ffffff" />
              <rect x="11" y="2" width="2" height="3" />
              <rect x="15" y="4" width="2" height="2" />
              <rect x="11" y="8" width="4" height="2" />
              <rect x="4" y="11" width="2" height="5" />
              <rect x="8" y="13" width="3" height="2" />
              <rect x="13" y="11" width="4" height="4" />
              <rect x="18" y="10" width="3" height="2" />
              <rect x="23" y="13" width="3" height="2" />
              <rect x="11" y="18" width="3" height="4" />
              <rect x="16" y="17" width="2" height="5" />
              <rect x="20" y="19" width="5" height="3" />
              <rect x="11" y="24" width="4" height="2" />
              <rect x="17" y="23" width="2" height="3" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-white/90 rounded-2xl">
              <span className="text-xs font-medium text-slate-700 flex items-center gap-1">
                <QrCode className="h-4 w-4" /> Scan with Lightning Wallet
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-500 mb-2">
            Compatible with Alby, Cashu, Blink, Phoenix, and Cash App
          </p>
        </div>

        {/* Address Card */}
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/80 p-3 text-left">
            <div>
              <span className="block text-[10px] uppercase font-semibold tracking-wider text-slate-400">
                Lightning Address
              </span>
              <span className="font-mono text-sm font-medium text-slate-800">
                {lightningAddress}
              </span>
            </div>
            <button
              onClick={() => handleCopy(lightningAddress)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/80 p-3 text-left">
            <div>
              <span className="block text-[10px] uppercase font-semibold tracking-wider text-slate-400">
                NIP-05 Identity
              </span>
              <span className="font-mono text-xs text-slate-600">
                {nip05}
              </span>
            </div>
            <button
              onClick={() => handleCopy(nip05)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </button>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-slate-900 py-2.5 text-center text-sm font-medium text-white shadow-sm hover:bg-slate-800 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
