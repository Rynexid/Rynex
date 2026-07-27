"use client";

import {
  Check,
  CreditCard,
  DollarSign,
  Landmark,
  QrCode,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";

import { cn } from "@rynex/utils";

const services = [
  {
    id: 1,
    name: "UI/UX Design",
    desc: "Wireframing, prototyping, and user interface design",
    price: "$2,400",
    timeline: "2-4 weeks",
    tag: "Popular",
    tagColor: "bg-[rgba(74,225,118,0.15)] text-[#4ae176]",
  },
  {
    id: 2,
    name: "Web Development",
    desc: "Full-stack web application development",
    price: "$4,200",
    timeline: "4-8 weeks",
    tag: "Fast Turnaround",
    tagColor: "bg-[rgba(173,198,255,0.15)] text-[#adc6ff]",
  },
  {
    id: 3,
    name: "Brand Identity",
    desc: "Logo, color palette, typography, and brand guidelines",
    price: "$1,800",
    timeline: "1-2 weeks",
    tag: "Premium",
    tagColor: "bg-[rgba(255,185,95,0.15)] text-[#ffb95f]",
  },
  {
    id: 4,
    name: "Mobile App Dev",
    desc: "Cross-platform mobile application development",
    price: "$6,300",
    timeline: "6-12 weeks",
  },
  {
    id: 5,
    name: "SEO Optimization",
    desc: "Search engine optimization and content strategy",
    price: "$960",
    timeline: "2-3 weeks",
  },
  {
    id: 6,
    name: "Cloud Migration",
    desc: "Cloud infrastructure setup and migration services",
    price: "$3,600",
    timeline: "3-6 weeks",
    tag: "Enterprise",
    tagColor: "bg-[rgba(173,198,255,0.15)] text-[#adc6ff]",
  },
];

const paymentMethods = [
  { id: "cash", label: "Cash", icon: DollarSign },
  { id: "bank", label: "Bank Transfer", icon: Landmark },
  { id: "qris", label: "QRIS", icon: QrCode },
  { id: "card", label: "Credit Card", icon: CreditCard },
];

export default function TransactionsPage() {
  const [cart, setCart] = useState<typeof services>([]);
  const [paymentMethod, setPaymentMethod] = useState("qris");
  const [showSuccess, setShowSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  const addToCart = (service: (typeof services)[number]) => {
    if (!cart.find((s) => s.id === service.id)) {
      setCart([...cart, service]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((s) => s.id !== id));
  };

  const subtotal = cart.reduce(
    (sum, s) => sum + parseInt(s.price.replace(/[$,]/g, "")),
    0,
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleComplete = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setShowSuccess(true);
    }, 1200);
  };

  return (
    <div className="flex h-full flex-1">
      <div className="flex-1 space-y-6 overflow-y-auto p-6 lg:p-8">
        <div>
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl font-semibold text-[#e5e1e4]">
            New Transaction
          </h1>
          <p className="mt-1 text-sm text-[#c2c6d6]">
            Select services to add to the transaction
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[#c2c6d6]" />
            <input
              type="text"
              placeholder="Search client..."
              className="w-full rounded-lg border border-[#27272A] bg-[#0e0e10] py-3 pr-4 pl-11 text-sm text-[#e5e1e4] transition-all outline-none placeholder:text-[#c2c6d6]/50 focus:border-[#adc6ff] focus:ring-2 focus:ring-[rgba(173,198,255,0.2)]"
            />
          </div>
          <button className="rounded-lg border border-[#27272A] bg-[#1c1b1d] px-4 py-3 text-sm font-medium text-[#e5e1e4] transition-all hover:bg-[#2a2a2c]">
            + Add New
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative rounded-xl border border-[#27272A] bg-[#0e0e10] p-6 transition-all hover:border-[#adc6ff]"
            >
              {service.tag && (
                <span
                  className={cn(
                    "absolute top-3 right-3 rounded-full px-2 py-0.5 text-[10px] font-bold",
                    service.tagColor,
                  )}
                >
                  {service.tag}
                </span>
              )}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(173,198,255,0.1)]">
                <svg
                  className="h-6 w-6 text-[#adc6ff]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3 className="mb-1 text-lg font-semibold text-[#e5e1e4]">
                {service.name}
              </h3>
              <p className="mb-4 line-clamp-2 text-sm text-[#c2c6d6]">
                {service.desc}
              </p>
              <p className="mb-1 text-2xl font-bold text-[#adc6ff]">
                {service.price}
              </p>
              <p className="mb-4 text-xs text-[#8c909f]">Starting from</p>
              <div className="mb-4 flex items-center gap-1 text-xs text-[#4ae176]">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                </svg>
                {service.timeline}
              </div>
              <button
                onClick={() => addToCart(service)}
                className="w-full rounded-lg bg-[#adc6ff] py-2.5 text-sm font-bold text-[#002e6a] transition-all hover:opacity-90"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-[400px] shrink-0 flex-col border-l border-[#27272A] bg-[#0e0e10]">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgba(173,198,255,0.1)]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#adc6ff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-[#e5e1e4]">
              Transaction Summary
            </h2>
            <span className="ml-auto rounded-full bg-[#353437] px-2 py-0.5 text-xs font-bold text-[#c2c6d6]">
              {cart.length}
            </span>
          </div>

          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <svg
                className="mb-4 h-12 w-12 text-[#353437]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <p className="text-sm text-[#c2c6d6]">Your cart is empty</p>
              <p className="text-xs text-[#8c909f]">Select services to begin</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="group relative rounded-lg border border-[#27272A] bg-[#111113] p-4"
                >
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full text-[#c2c6d6] opacity-0 transition-opacity group-hover:opacity-100 hover:bg-[#2a2a2c]"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  <h3 className="text-sm font-semibold text-[#e5e1e4]">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#c2c6d6]">{item.desc}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-[#4ae176]">
                      {item.timeline}
                    </span>
                    <span className="text-sm font-bold text-[#adc6ff]">
                      {item.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {cart.length > 0 && (
            <>
              <div className="my-6 space-y-2 border-t border-[#27272A] pt-4">
                <div className="flex justify-between text-sm text-[#c2c6d6]">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-[#c2c6d6]">
                  <span>Tax (10%)</span>
                  <span>${tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-[#27272A] pt-2 text-lg font-semibold text-[#e5e1e4]">
                  <span>Total</span>
                  <span className="text-[#adc6ff]">
                    ${total.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="mb-3 text-sm font-medium text-[#c2c6d6]">
                  Payment Method
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    const selected = paymentMethod === method.id;
                    return (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={cn(
                          "flex items-center gap-2 rounded-lg border p-3 text-sm transition-all",
                          selected
                            ? "border-[#adc6ff] bg-[rgba(173,198,255,0.1)] text-[#adc6ff]"
                            : "border-[#27272A] text-[#c2c6d6] hover:border-[#8c909f]",
                        )}
                      >
                        <Icon
                          className={cn("h-4 w-4", selected && "fill-current")}
                        />
                        {method.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="border-t border-[#27272A] p-6">
          <button
            onClick={handleComplete}
            disabled={cart.length === 0 || processing}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold transition-all disabled:cursor-not-allowed disabled:opacity-50",
              processing
                ? "bg-[#4ae176] text-[#003915]"
                : "bg-[#adc6ff] text-[#002e6a] hover:shadow-[0_0_20px_rgba(173,198,255,0.4)]",
            )}
          >
            {processing ? (
              <>Processing...</>
            ) : (
              <>
                <Check className="h-4 w-4" /> Complete Transaction
              </>
            )}
          </button>
          <p className="mt-2 text-center text-[10px] text-[#8c909f]">
            Creates 1 project card automatically
          </p>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#09090B]/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-[#27272A] bg-[rgba(17,17,19,0.95)] p-8 backdrop-blur-xl">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[rgba(74,225,118,0.1)]">
                <Check className="h-10 w-10 text-[#4ae176]" />
              </div>
              <h2 className="mb-2 text-2xl font-semibold text-[#e5e1e4]">
                Transaction Complete!
              </h2>
              <p className="mb-6 text-sm text-[#c2c6d6]">
                Transaction has been successfully processed for{" "}
                <b className="text-[#e5e1e4]">Lumina Tech</b>
              </p>
              <div className="flex w-full gap-3">
                <button
                  onClick={() => {
                    setShowSuccess(false);
                    setCart([]);
                  }}
                  className="flex-1 rounded-lg border border-[#27272A] px-4 py-3 text-sm font-medium text-[#c2c6d6] transition-all hover:bg-[#1c1b1d]"
                >
                  New Transaction
                </button>
                <button className="flex-1 rounded-lg bg-[#adc6ff] px-4 py-3 text-sm font-bold text-[#002e6a] transition-all hover:opacity-90">
                  Go to Projects
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
