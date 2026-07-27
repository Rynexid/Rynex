const columns: {
  title: string;
  count: number;
  active?: boolean;
  empty?: boolean;
  cards?: {
    category: string;
    title: string;
    client: string;
    progress: number;
    avatars: string[];
    attachments?: number;
    notes?: number;
    comments?: number;
    date?: string;
    active?: boolean;
    finalized?: boolean;
  }[];
}[] = [
  {
    title: "Backlog",
    count: 4,
    cards: [
      {
        category: "Digital Branding",
        title: "Lumina SaaS Brand Identity",
        client: "Lumina Tech",
        progress: 5,
        avatars: ["JD", "SK"],
        attachments: 3,
        date: "24 OCT",
      },
      {
        category: "UX Research",
        title: "FinTech User Flow Mapping",
        client: "PayWave Inc",
        progress: 0,
        avatars: ["AL"],
        attachments: 2,
        date: "08 NOV",
      },
      {
        category: "Brand Strategy",
        title: "GreenLeaf Rebranding",
        client: "GreenLeaf Co",
        progress: 10,
        avatars: ["MR", "NT"],
        notes: 6,
        date: "15 NOV",
      },
    ],
  },
  {
    title: "In Progress",
    count: 3,
    active: true,
    cards: [
      {
        category: "Frontend Dev",
        title: "Nexus Mobile App MVP",
        client: "Nexus Cloud",
        progress: 65,
        avatars: ["AK", "BT", "PM"],
        attachments: 12,
        date: "05 DEC",
        active: true,
      },
      {
        category: "Backend Dev",
        title: "API Gateway Optimization",
        client: "Rynex Internal",
        progress: 45,
        avatars: ["SH", "VK"],
        comments: 7,
        date: "28 NOV",
        active: true,
      },
    ],
  },
  {
    title: "In Review",
    count: 1,
    cards: [
      {
        category: "QA Audit",
        title: "Payment Gateway Integration",
        client: "Rynex Internal",
        progress: 85,
        avatars: ["LF"],
        comments: 4,
        date: "18 NOV",
      },
    ],
  },
  {
    title: "Completed",
    count: 2,
    cards: [
      {
        category: "Product Launch",
        title: "BioTech Landing Page",
        client: "BioTech Org",
        progress: 100,
        avatars: ["CZ"],
        finalized: true,
      },
      {
        category: "E-Commerce",
        title: "Shopify Store Setup",
        client: "Urban Style",
        progress: 100,
        avatars: ["NM"],
        finalized: true,
      },
    ],
  },
  {
    title: "Archived",
    count: 0,
    empty: true,
  },
];

export default function ProjectsPage() {
  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-[#27272A] px-6 py-4">
        <div>
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl font-semibold text-[#e5e1e4]">
            Projects
          </h1>
          <div className="mt-1 flex items-center gap-1 text-sm">
            <span className="text-[#c2c6d6]">Ecosystem</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8c909f"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
            <span className="text-[#adc6ff]">Kanban Board</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-[#27272A] bg-[#1c1b1d] p-1">
            <button className="rounded-md bg-[#2a2a2c] px-3 py-1.5 text-xs font-medium text-[#adc6ff]">
              Kanban
            </button>
            <button className="rounded-md px-3 py-1.5 text-xs font-medium text-[#c2c6d6]">
              Timeline
            </button>
            <button className="rounded-md px-3 py-1.5 text-xs font-medium text-[#c2c6d6]">
              Calendar
            </button>
          </div>
          <button className="rounded-lg border border-[#27272A] px-3 py-2 text-sm text-[#c2c6d6] hover:bg-[#1c1b1d]">
            Filter
          </button>
          <button className="rounded-lg bg-[#adc6ff] px-4 py-2 text-sm font-bold text-[#002e6a] hover:opacity-90">
            + Create Project
          </button>
        </div>
      </div>

      <div className="flex gap-4 border-b border-[#27272A] px-6 py-4">
        {[
          { label: "Backlog", count: 4, color: "bg-[#8c909f]" },
          { label: "Active", count: 3, color: "bg-[#4d8eff]" },
          { label: "Completed", count: 2, color: "bg-[#4ae176]" },
          { label: "Overdue", count: 1, color: "bg-[#ffb4ab]" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2 rounded-xl border border-[#27272A] bg-[#0e0e10] px-4 py-2"
          >
            <div className={`h-2 w-2 rounded-full ${item.color}`} />
            <span className="text-sm text-[#c2c6d6]">
              {item.label}: <b className="text-[#e5e1e4]">{item.count}</b>
            </span>
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden p-6">
        <div className="flex h-full gap-6">
          {columns.map((col) => (
            <div
              key={col.title}
              className="flex max-w-[280px] min-w-[280px] flex-col gap-4"
            >
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <h3
                    className={`text-xs font-bold tracking-widest uppercase ${col.active ? "text-[#adc6ff]" : "text-[#c2c6d6]"}`}
                  >
                    {col.title}
                  </h3>
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-bold ${col.active ? "bg-[rgba(173,198,255,0.2)] text-[#adc6ff]" : "bg-[#353437] text-[#c2c6d6]"}`}
                  >
                    {col.count}
                  </span>
                </div>
                <button className="text-[#8c909f] hover:text-[#c2c6d6]">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {col.empty ? (
                  <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#27272A] p-8 text-center transition-all hover:border-[#adc6ff]">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#201f22] text-[#8c909f]">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                    </div>
                    <p className="text-xs text-[#c2c6d6]">
                      No cards yet. Drag to add.
                    </p>
                  </div>
                ) : col.cards ? (
                  col.cards.map((card, i) => (
                    <div
                      key={i}
                      className={`rounded-xl border p-4 ${card.finalized ? "border-[rgba(74,225,118,0.2)] bg-[rgba(74,225,118,0.05)] grayscale transition-all hover:grayscale-0" : "border-[#27272A] bg-[rgba(17,17,19,0.8)] backdrop-blur-sm transition-all hover:border-[#adc6ff]"}`}
                    >
                      <div className="mb-3 flex items-start justify-between">
                        <span className="text-[10px] font-bold tracking-wider text-[#c2c6d6] uppercase opacity-70">
                          {card.category}
                        </span>
                        {card.active && (
                          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#4ae176]" />
                        )}
                      </div>
                      <h4 className="mb-2 text-sm font-bold text-[#e5e1e4]">
                        {card.title}
                      </h4>
                      <div className="mb-3 flex items-center gap-2">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#c2c6d6"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                        </svg>
                        <span className="text-[11px] text-[#c2c6d6]">
                          {card.client}
                        </span>
                      </div>
                      {!card.finalized && (
                        <div className="mb-3 h-1 w-full overflow-hidden rounded-full bg-[#353437]">
                          <div
                            className={`h-full rounded-full ${card.active ? "bg-[#adc6ff]" : "bg-[#8c909f]"}`}
                            style={{ width: `${card.progress}%` }}
                          />
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {card.avatars.map((avatar, j) => (
                            <div
                              key={j}
                              className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#201f22] bg-[#353437] text-[9px] font-bold text-[#e5e1e4]"
                            >
                              {avatar}
                            </div>
                          ))}
                        </div>
                        {card.finalized ? (
                          <div className="flex items-center gap-1 rounded-md bg-[rgba(74,225,118,0.1)] px-2 py-0.5 text-[10px] font-bold text-[#4ae176]">
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                              <path d="m9 12 2 2 4-4" />
                            </svg>
                            FINALIZED
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-[#8c909f]">
                            {card.attachments !== undefined && (
                              <div className="flex items-center gap-1">
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M21.44 11.05-12.5 12.5a3.84 3.84 0 0 1-5.42 0 3.83 3.83 0 0 1 0-5.42l12.5-12.5a2.83 2.83 0 0 1 4 4l-11 11a1.42 1.42 0 0 1-2 0 1.42 1.42 0 0 1 0-2l9-9" />
                                </svg>
                                <span className="text-[11px]">
                                  {card.attachments}
                                </span>
                              </div>
                            )}
                            {card.comments !== undefined && (
                              <div className="flex items-center gap-1">
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                </svg>
                                <span className="text-[11px]">
                                  {card.comments}
                                </span>
                              </div>
                            )}
                            {card.notes !== undefined && (
                              <div className="flex items-center gap-1">
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z" />
                                  <path d="M15 3v4a2 2 0 0 0 2 2h4" />
                                </svg>
                                <span className="text-[11px]">
                                  {card.notes}
                                </span>
                              </div>
                            )}
                            <div
                              className={`flex items-center gap-1 rounded-md px-1.5 py-0.5 ${card.active ? "bg-[rgba(173,198,255,0.1)] text-[#adc6ff]" : "bg-[#201f22] text-[#8c909f]"}`}
                            >
                              <svg
                                width="11"
                                height="11"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <rect
                                  width="18"
                                  height="18"
                                  x="3"
                                  y="4"
                                  rx="2"
                                  ry="2"
                                />
                                <line x1="16" x2="16" y1="2" y2="6" />
                                <line x1="8" x2="8" y1="2" y2="6" />
                                <line x1="3" x2="21" y1="10" y2="10" />
                              </svg>
                              <span className="text-[9px] font-bold">
                                {card.date}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
