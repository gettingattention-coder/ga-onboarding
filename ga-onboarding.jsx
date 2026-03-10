import { useState, useRef, useEffect } from "react";

const STEPS = ["welcome","client_info","am_email","cid","ga4","gtm","survey","complete"];

const GA4_STEPS = [
  {
    instruction: "Go to <strong>analytics.google.com</strong> and sign in with the Google account that owns your nonprofit's analytics.",
    action: "I'm signed in",
    tip: "Use the same Google account your organization uses for Google Workspace or Google for Nonprofits.",
    screenshotSvg: `<svg width="100%" viewBox="0 0 480 180" xmlns="http://www.w3.org/2000/svg"><rect width="480" height="180" fill="#f8f9fa"/><rect width="480" height="44" fill="#fff"/><circle cx="22" cy="22" r="11" fill="#4285f4"/><text x="40" y="27" font-family="sans-serif" font-size="13" fill="#1a1a2e" font-weight="bold">Analytics</text><rect x="0" y="44" width="64" height="136" fill="#fff"/><rect x="8" y="56" width="48" height="8" rx="3" fill="#e8e3dc"/><rect x="8" y="72" width="48" height="8" rx="3" fill="#e8e3dc"/><rect x="8" y="88" width="48" height="8" rx="3" fill="#e8e3dc"/><rect x="8" y="104" width="48" height="8" rx="3" fill="#e8e3dc"/><circle cx="32" cy="162" r="13" fill="#f5a623"/><text x="32" y="167" font-family="sans-serif" font-size="11" fill="white" text-anchor="middle">⚙️</text><rect x="72" y="52" width="400" height="120" fill="#fff" rx="4"/><rect x="88" y="68" width="160" height="14" rx="3" fill="#e8e3dc"/><rect x="88" y="90" width="240" height="60" rx="6" fill="#f9f6f0"/><text x="208" y="126" font-family="sans-serif" font-size="12" fill="#999" text-anchor="middle">analytics.google.com</text></svg>`,
  },
  {
    instruction: "In the <strong>bottom-left corner</strong>, click the <strong>⚙️ Admin gear icon</strong>.",
    action: "I clicked Admin",
    tip: "It's at the very bottom of the left sidebar — you may need to scroll down to find it.",
    screenshotSvg: `<svg width="100%" viewBox="0 0 480 180" xmlns="http://www.w3.org/2000/svg"><rect width="480" height="180" fill="#f8f9fa"/><rect x="0" y="0" width="64" height="180" fill="#fff"/><circle cx="32" cy="22" r="11" fill="#4285f4"/><rect x="10" y="44" width="44" height="8" rx="3" fill="#e8e3dc"/><rect x="10" y="60" width="44" height="8" rx="3" fill="#e8e3dc"/><rect x="10" y="76" width="44" height="8" rx="3" fill="#e8e3dc"/><rect x="10" y="92" width="44" height="8" rx="3" fill="#e8e3dc"/><circle cx="32" cy="160" r="14" fill="#f5a623"/><text x="32" y="165" font-family="sans-serif" font-size="14" fill="white" text-anchor="middle">⚙️</text><rect x="56" y="143" width="120" height="26" rx="5" fill="#1a1a2e"/><text x="116" y="161" font-family="sans-serif" font-size="11" fill="white" text-anchor="middle">← Click Admin here</text><line x1="56" y1="156" x2="46" y2="160" stroke="#f5a623" stroke-width="2"/><rect x="72" y="44" width="400" height="120" fill="#fff" rx="4"/></svg>`,
  },
  {
    instruction: "Under the <strong>Property column</strong> (the middle column), click <strong>Property Access Management</strong>.",
    action: "I found it",
    tip: "There are three columns: Account, Property, and Data Stream. You want the middle one.",
    screenshotSvg: `<svg width="100%" viewBox="0 0 480 180" xmlns="http://www.w3.org/2000/svg"><rect width="480" height="180" fill="#f8f9fa"/><rect x="8" y="8" width="144" height="164" fill="#fff" rx="4"/><text x="80" y="28" font-family="sans-serif" font-size="11" fill="#666" text-anchor="middle" font-weight="bold">Account</text><rect x="18" y="36" width="114" height="8" rx="3" fill="#e8e3dc"/><rect x="18" y="52" width="90" height="8" rx="3" fill="#e8e3dc"/><rect x="160" y="8" width="156" height="164" fill="#fff" rx="4" stroke="#f5a623" stroke-width="2"/><text x="238" y="28" font-family="sans-serif" font-size="11" fill="#f5a623" text-anchor="middle" font-weight="bold">Property ◄</text><rect x="170" y="36" width="136" height="8" rx="3" fill="#e8e3dc"/><rect x="170" y="52" width="120" height="8" rx="3" fill="#e8e3dc"/><rect x="170" y="68" width="136" height="8" rx="3" fill="#e8e3dc"/><rect x="170" y="82" width="136" height="28" rx="4" fill="#fff8ec" stroke="#f5a623" stroke-width="1.5"/><text x="238" y="96" font-family="sans-serif" font-size="10" fill="#b37d1a" text-anchor="middle" font-weight="bold">Property Access Mgmt ✓</text><rect x="170" y="118" width="100" height="8" rx="3" fill="#e8e3dc"/><rect x="324" y="8" width="148" height="164" fill="#fff" rx="4"/><text x="398" y="28" font-family="sans-serif" font-size="11" fill="#666" text-anchor="middle" font-weight="bold">Data Stream</text><rect x="334" y="36" width="128" height="8" rx="3" fill="#e8e3dc"/></svg>`,
  },
  {
    instruction: "Click the blue <strong>+ button</strong> in the top-right corner, then select <strong>Add users</strong>.",
    action: "I clicked + Add users",
    tip: "The + button is in the top-right of the Property Access Management panel.",
    screenshotSvg: `<svg width="100%" viewBox="0 0 480 180" xmlns="http://www.w3.org/2000/svg"><rect width="480" height="180" fill="#f8f9fa"/><rect x="8" y="8" width="464" height="164" fill="#fff" rx="4"/><text x="24" y="32" font-family="sans-serif" font-size="13" fill="#1a1a2e" font-weight="bold">Property Access Management</text><rect x="424" y="14" width="36" height="22" rx="11" fill="#1a73e8"/><text x="442" y="30" font-family="sans-serif" font-size="17" fill="white" text-anchor="middle">+</text><rect x="318" y="44" width="146" height="26" rx="4" fill="#fff8ec" stroke="#f5a623" stroke-width="1.5"/><text x="391" y="61" font-family="sans-serif" font-size="11" fill="#b37d1a" text-anchor="middle">Add users ← click this</text><rect x="318" y="76" width="146" height="24" rx="4" fill="#fff" stroke="#e0e0e0"/><text x="391" y="92" font-family="sans-serif" font-size="11" fill="#aaa" text-anchor="middle">Add user groups</text><rect x="18" y="56" width="200" height="10" rx="3" fill="#f1f0eb"/><rect x="18" y="74" width="180" height="10" rx="3" fill="#f1f0eb"/><rect x="18" y="92" width="190" height="10" rx="3" fill="#f1f0eb"/><path d="M442 36 L391 62" stroke="#f5a623" stroke-width="1.5" stroke-dasharray="4"/></svg>`,
  },
  {
    instruction: "Type <strong>data@gettingattention.org</strong> in the email field, set the role to <strong>Editor</strong>, then click <strong>Add</strong>.",
    action: "Done — access granted ✓",
    tip: "Make sure the role is Editor, not Viewer — we need Editor access to set up conversion tracking.",
    screenshotSvg: `<svg width="100%" viewBox="0 0 480 180" xmlns="http://www.w3.org/2000/svg"><rect width="480" height="180" fill="#f8f9fa"/><rect x="8" y="8" width="464" height="164" fill="#fff" rx="4"/><text x="24" y="30" font-family="sans-serif" font-size="13" fill="#1a1a2e" font-weight="bold">Add users</text><text x="24" y="52" font-family="sans-serif" font-size="11" fill="#666">Email addresses</text><rect x="24" y="58" width="300" height="30" rx="4" fill="#fff" stroke="#1a73e8" stroke-width="2"/><text x="36" y="78" font-family="sans-serif" font-size="12" fill="#1a1a2e">data@gettingattention.org</text><text x="24" y="108" font-family="sans-serif" font-size="11" fill="#666">Role</text><rect x="24" y="114" width="180" height="28" rx="4" fill="#fff" stroke="#e0e0e0"/><text x="36" y="133" font-family="sans-serif" font-size="12" fill="#1a1a2e">Editor ✓</text><rect x="376" y="146" width="80" height="26" rx="13" fill="#1a73e8"/><text x="416" y="164" font-family="sans-serif" font-size="12" fill="white" text-anchor="middle">Add</text></svg>`,
  },
];

const GTM_STEPS = [
  {
    instruction: "Go to <strong>tagmanager.google.com</strong> and sign in with your organization's Google account.",
    action: "I'm signed in",
    tip: "Use the same Google account that manages your website or Google Workspace.",
    screenshotSvg: `<svg width="100%" viewBox="0 0 480 180" xmlns="http://www.w3.org/2000/svg"><rect width="480" height="180" fill="#f8f9fa"/><rect width="480" height="44" fill="#fff"/><rect x="14" y="12" width="20" height="20" rx="3" fill="#4285f4"/><text x="42" y="27" font-family="sans-serif" font-size="13" fill="#1a1a2e" font-weight="bold">Tag Manager</text><rect x="100" y="60" width="280" height="90" rx="8" fill="#fff"/><text x="240" y="96" font-family="sans-serif" font-size="12" fill="#666" text-anchor="middle">tagmanager.google.com</text><rect x="160" y="108" width="160" height="24" rx="12" fill="#1a73e8"/><text x="240" y="124" font-family="sans-serif" font-size="12" fill="white" text-anchor="middle">Sign in with Google</text></svg>`,
  },
  {
    instruction: "Select your <strong>Account</strong> from the list — this is usually your organization's name.",
    action: "I selected my account",
    tip: "If you see multiple accounts, choose the one associated with your nonprofit's website.",
    screenshotSvg: `<svg width="100%" viewBox="0 0 480 180" xmlns="http://www.w3.org/2000/svg"><rect width="480" height="180" fill="#f8f9fa"/><rect width="480" height="44" fill="#fff"/><text x="16" y="28" font-family="sans-serif" font-size="13" fill="#1a1a2e" font-weight="bold">All accounts</text><rect x="16" y="52" width="448" height="52" rx="4" fill="#fff8ec" stroke="#f5a623" stroke-width="2"/><text x="32" y="76" font-family="sans-serif" font-size="13" fill="#1a1a2e" font-weight="bold">Your Nonprofit Name  ← click this</text><text x="32" y="94" font-family="sans-serif" font-size="11" fill="#aaa">yournonprofit.org · 1 container</text><rect x="16" y="112" width="448" height="52" rx="4" fill="#fff"/><rect x="32" y="124" width="160" height="10" rx="3" fill="#e8e3dc"/><rect x="32" y="142" width="120" height="8" rx="3" fill="#f1f0eb"/></svg>`,
  },
  {
    instruction: "Click the <strong>three-dot menu (⋮)</strong> next to your account name at the top, then select <strong>User Management</strong>.",
    action: "I found User Management",
    tip: "The three-dot menu is in the top bar, to the right of your account name.",
    screenshotSvg: `<svg width="100%" viewBox="0 0 480 180" xmlns="http://www.w3.org/2000/svg"><rect width="480" height="180" fill="#f8f9fa"/><rect width="480" height="44" fill="#fff"/><text x="16" y="28" font-family="sans-serif" font-size="13" fill="#1a1a2e">Your Nonprofit Name</text><circle cx="440" cy="22" r="4" fill="#666"/><circle cx="454" cy="22" r="4" fill="#f5a623"/><circle cx="468" cy="22" r="4" fill="#666"/><rect x="348" y="40" width="124" height="110" rx="4" fill="#fff" stroke="#e0e0e0" filter="drop-shadow(0 2px 8px rgba(0,0,0,0.1))"/><rect x="356" y="50" width="108" height="26" rx="4" fill="#fff8ec"/><text x="410" y="67" font-family="sans-serif" font-size="11" fill="#b37d1a" text-anchor="middle" font-weight="bold">User Management ✓</text><rect x="356" y="82" width="108" height="22" rx="4" fill="#fff"/><text x="410" y="97" font-family="sans-serif" font-size="11" fill="#aaa" text-anchor="middle">Account settings</text><rect x="356" y="110" width="108" height="22" rx="4" fill="#fff"/><text x="410" y="125" font-family="sans-serif" font-size="11" fill="#aaa" text-anchor="middle">Delete account</text><path d="M454 26 L410 48" stroke="#f5a623" stroke-width="1.5" stroke-dasharray="4"/></svg>`,
  },
  {
    instruction: "Click the blue <strong>+ button</strong> in the top-right, then select <strong>Add new users</strong>.",
    action: "I clicked + Add new users",
    tip: "Make sure you're adding at the Account level for full access.",
    screenshotSvg: `<svg width="100%" viewBox="0 0 480 180" xmlns="http://www.w3.org/2000/svg"><rect width="480" height="180" fill="#f8f9fa"/><rect x="8" y="8" width="464" height="164" fill="#fff" rx="4"/><text x="24" y="30" font-family="sans-serif" font-size="13" fill="#1a1a2e" font-weight="bold">User Management</text><rect x="424" y="13" width="36" height="22" rx="11" fill="#1a73e8"/><text x="442" y="29" font-family="sans-serif" font-size="17" fill="white" text-anchor="middle">+</text><rect x="314" y="43" width="152" height="26" rx="4" fill="#fff8ec" stroke="#f5a623" stroke-width="1.5"/><text x="390" y="60" font-family="sans-serif" font-size="11" fill="#b37d1a" text-anchor="middle">Add new users ← click</text><rect x="314" y="75" width="152" height="24" rx="4" fill="#fff" stroke="#e0e0e0"/><text x="390" y="91" font-family="sans-serif" font-size="11" fill="#aaa" text-anchor="middle">Add new user groups</text><rect x="18" y="54" width="200" height="10" rx="3" fill="#f1f0eb"/><rect x="18" y="72" width="180" height="10" rx="3" fill="#f1f0eb"/></svg>`,
  },
  {
    instruction: "Enter <strong>data@gettingattention.org</strong>, check the <strong>Publish</strong> permission box, then click <strong>Add</strong>.",
    action: "Done — access granted ✓",
    tip: "Publish permission is required so we can deploy tracking tags on your behalf.",
    screenshotSvg: `<svg width="100%" viewBox="0 0 480 180" xmlns="http://www.w3.org/2000/svg"><rect width="480" height="180" fill="#f8f9fa"/><rect x="8" y="8" width="464" height="164" fill="#fff" rx="4"/><text x="24" y="30" font-family="sans-serif" font-size="13" fill="#1a1a2e" font-weight="bold">Add new users</text><text x="24" y="52" font-family="sans-serif" font-size="11" fill="#666">Email address</text><rect x="24" y="58" width="300" height="30" rx="4" fill="#fff" stroke="#1a73e8" stroke-width="2"/><text x="36" y="78" font-family="sans-serif" font-size="12" fill="#1a1a2e">data@gettingattention.org</text><text x="24" y="108" font-family="sans-serif" font-size="11" fill="#666">Account permissions</text><rect x="24" y="114" width="16" height="16" rx="3" fill="#1a73e8"/><text x="26" y="126" font-family="sans-serif" font-size="11" fill="white">✓</text><text x="46" y="126" font-family="sans-serif" font-size="12" fill="#1a1a2e" font-weight="bold">Publish  ← check this</text><rect x="24" y="138" width="16" height="16" rx="3" fill="#fff" stroke="#e0e0e0"/><text x="46" y="150" font-family="sans-serif" font-size="12" fill="#aaa">Edit</text><rect x="376" y="146" width="80" height="26" rx="13" fill="#1a73e8"/><text x="416" y="163" font-family="sans-serif" font-size="12" fill="white" text-anchor="middle">Add</text></svg>`,
  },
];

const SURVEY_QUESTIONS = [
  { id: "success", label: "What does success in this engagement look like to you?", placeholder: "e.g. More donations, more volunteers signing up, growing awareness..." },
  { id: "goals", label: "What are your advertising goals? Include actions you want users to take, priority order, and dollar value if known.", placeholder: "e.g. Donation form submissions (most important, avg $40), newsletter signups, volunteer applications..." },
  { id: "programs", label: "What are the primary programs or initiatives you'd like to advertise? Any special events coming up?", placeholder: "e.g. Our job training program, annual gala in October, emergency housing services..." },
  { id: "usps", label: "What are your unique selling points — why should donors or service recipients choose your organization?", placeholder: "e.g. We're the only org in the region that offers X, 95% of donations go directly to programs..." },
  { id: "competitors", label: "Are there similar organizations you think do a great job with their marketing?", placeholder: "e.g. charity: water, St. Jude's — I like how they tell donor impact stories..." },
  { id: "exclusions", label: "Are there any services you would NOT like to receive traffic or clicks for?", placeholder: "e.g. We no longer offer in-person counseling, please don't advertise that..." },
  { id: "keywords", label: "What are some example keywords you'd want to show up for in search?", placeholder: "e.g. 'food bank near me', 'donate to hunger relief', 'volunteer opportunities NYC'..." },
  { id: "avoid_terms", label: "Are there any words or terms associated with your mission we should avoid?", placeholder: "e.g. Outdated terminology, words that are insensitive to the people you serve..." },
  { id: "contacts", label: "Are there additional points of contact we'll be working with?", custom: "contacts" },
  { id: "billing", label: "Who is the best contact for invoices and billing?", custom: "billing" },
  { id: "budget", label: "Help us understand your budgeting process.", custom: "budget", subtext: "This will help us ensure we're reporting return on investment in the way that will be most impactful for your organization." },
  { id: "resources", label: "What brand or marketing resources can we use?", custom: "resources" },
  { id: "anything_else", label: "Anything else you'd like us to know before we get started?", placeholder: "Open floor — share anything that would help us hit the ground running..." },
];

const EMPTY_CONTACT = { name: "", title: "", email: "", meetings: false };
const EMPTY_BILLING = { name: "", title: "", email: "" };

function PersonRow({ person, onChange, onRemove, showRemove, showMeetings }) {
  const field = (key, placeholder, width = "100%") => (
    <input
      value={person[key]}
      onChange={e => onChange({ ...person, [key]: e.target.value })}
      placeholder={placeholder}
      style={{
        width, padding: "10px 14px", borderRadius: 8, border: "1.5px solid #e8e3dc",
        fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#1a1a2e",
        background: "#fdfcf8", outline: "none", boxSizing: "border-box",
      }}
    />
  );
  return (
    <div style={{ background: "#f9f6f0", borderRadius: 12, padding: "16px 18px", marginBottom: 12, position: "relative" }}>
      {showRemove && (
        <button onClick={onRemove} style={{
          position: "absolute", top: 10, right: 12, background: "none", border: "none",
          color: "#ccc", fontSize: 18, cursor: "pointer", lineHeight: 1, padding: 0,
        }}>×</button>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
        {field("name", "Full name")}
        {field("title", "Job title")}
      </div>
      {field("email", "Email address")}
      {showMeetings && (
        <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#555" }}>
          <input
            type="checkbox"
            checked={person.meetings}
            onChange={e => onChange({ ...person, meetings: e.target.checked })}
            style={{ width: 16, height: 16, accentColor: "#f5a623", cursor: "pointer" }}
          />
          Include on monthly check-in meetings
        </label>
      )}
    </div>
  );
}

function ContactsInput({ value, onChange }) {
  const contacts = value && value.length > 0 ? value : [{ ...EMPTY_CONTACT }];
  const update = (i, updated) => { const next = [...contacts]; next[i] = updated; onChange(next); };
  const add = () => onChange([...contacts, { ...EMPTY_CONTACT }]);
  const remove = (i) => onChange(contacts.filter((_, idx) => idx !== i));
  return (
    <div>
      {contacts.map((c, i) => (
        <PersonRow key={i} person={c} onChange={u => update(i, u)} onRemove={() => remove(i)} showRemove={contacts.length > 1} showMeetings={true} />
      ))}
      <button onClick={add} style={{
        background: "none", border: "none", color: "#aaa", fontSize: 13,
        cursor: "pointer", fontFamily: "'DM Sans', sans-serif", padding: 0, marginTop: 4,
      }}>
        + Add another contact
      </button>
    </div>
  );
}

const RESOURCE_OPTIONS = [
  { id: "brand_visual", label: "Visual Brand Guide", desc: "Logo, colors, fonts, graphic design standards" },
  { id: "brand_voice", label: "Brand Guide (Tone & Voice)", desc: "Writing style, messaging, terminology" },
  { id: "personas", label: "Donor / Service Recipient Personas", desc: "Descriptions of your target audiences" },
  { id: "case_studies", label: "Case Studies", desc: "Stories of impact or client outcomes" },
  { id: "blog", label: "Blog Content", desc: "Articles or posts you've published" },
  { id: "thought_leadership", label: "Thought Leadership Examples", desc: "External content you admire or have contributed to" },
  { id: "photos", label: "High-Quality Photos", desc: "Images we can use in ads (events, programs, team, etc.)" },
  { id: "other", label: "Something else", desc: "Anything not listed above" },
];

function ResourcesInput({ value, onChange }) {
  const val = value || { selected: [], urls: {}, notes: {} };
  const toggle = (id) => {
    const selected = val.selected.includes(id)
      ? val.selected.filter(s => s !== id)
      : [...val.selected, id];
    onChange({ ...val, selected });
  };
  const setUrl = (id, url) => onChange({ ...val, urls: { ...val.urls, [id]: url } });
  const setNote = (id, note) => onChange({ ...val, notes: { ...val.notes, [id]: note } });
  const isChecked = (id) => val.selected.includes(id);

  return (
    <div>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#888", margin: "0 0 14px" }}>
        Check everything that applies. For each item, you can optionally add a link or a note — or just check it and we'll follow up.
      </p>
      <div style={{ display: "grid", gap: 10 }}>
        {RESOURCE_OPTIONS.map(opt => (
          <div key={opt.id} style={{
            borderRadius: 10, border: `1.5px solid ${isChecked(opt.id) ? "#f5a623" : "#e8e3dc"}`,
            background: isChecked(opt.id) ? "#fff8ec" : "#fdfcf8",
            overflow: "hidden", transition: "all 0.15s",
          }}>
            <label style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 16px", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={isChecked(opt.id)}
                onChange={() => toggle(opt.id)}
                style={{ marginTop: 2, width: 16, height: 16, accentColor: "#f5a623", cursor: "pointer", flexShrink: 0 }}
              />
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: "#1a1a2e" }}>{opt.label}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#999", marginTop: 2 }}>{opt.desc}</div>
              </div>
            </label>
            {isChecked(opt.id) && (
              <div style={{ padding: "0 16px 14px 44px", display: "grid", gap: 8 }}>
                <input
                  value={val.urls[opt.id] || ""}
                  onChange={e => setUrl(opt.id, e.target.value)}
                  placeholder="Link (optional) — e.g. https://drive.google.com/..."
                  style={{
                    width: "100%", padding: "9px 12px", borderRadius: 7,
                    border: "1.5px solid #e8e3dc", fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13, color: "#1a1a2e", background: "#fff",
                    outline: "none", boxSizing: "border-box",
                  }}
                />
                <input
                  value={val.notes[opt.id] || ""}
                  onChange={e => setNote(opt.id, e.target.value)}
                  placeholder="Note (optional) — anything helpful for our team"
                  style={{
                    width: "100%", padding: "9px 12px", borderRadius: 7,
                    border: "1.5px solid #e8e3dc", fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13, color: "#1a1a2e", background: "#fff",
                    outline: "none", boxSizing: "border-box",
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function BudgetInput({ value, onChange }) {
  const val = value || { timing: "", owners: "", process: "" };
  const field = (key, label, placeholder, rows) => (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
      {rows ? (
        <textarea
          value={val[key] || ""}
          onChange={e => onChange({ ...val, [key]: e.target.value })}
          placeholder={placeholder}
          rows={rows}
          style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: "1.5px solid #e8e3dc", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#1a1a2e", background: "#fdfcf8", outline: "none", boxSizing: "border-box", resize: "vertical", lineHeight: 1.6 }}
        />
      ) : (
        <input
          value={val[key] || ""}
          onChange={e => onChange({ ...val, [key]: e.target.value })}
          placeholder={placeholder}
          style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: "1.5px solid #e8e3dc", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#1a1a2e", background: "#fdfcf8", outline: "none", boxSizing: "border-box" }}
        />
      )}
    </div>
  );
  return (
    <div>
      {field("timing", "When is your nonprofit's budget set?", "e.g. Annually in October, fiscal year starts July 1...")}
      {field("owners", "Who owns budgeting decisions at the organization?", "e.g. Jane Smith, Executive Director; John Doe, CFO...")}
      {field("process", "Brief overview of your budget review process", "e.g. Our board reviews quarterly; major decisions require ED + Finance Committee approval. We report on cost-per-outcome...", 4)}
    </div>
  );
}

function BillingInput({ value, onChange }) {
  const billing = value || { ...EMPTY_BILLING };
  return (
    <PersonRow person={billing} onChange={onChange} showRemove={false} showMeetings={false} />
  );
}

function useSpeech(onResult) {
  const [state, setState] = useState("idle");
  const recogRef = useRef(null);

  const toggle = () => {
    if (state === "listening") {
      recogRef.current?.stop();
      setState("idle");
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setState("unsupported"); return; }
    setState("starting");
    const r = new SR();
    r.continuous = true;
    r.interimResults = false;
    r.lang = "en-US";
    r.onstart = () => setState("listening");
    r.onresult = (e) => {
      const text = Array.from(e.results).map(x => x[0].transcript).join(" ");
      onResult(text);
    };
    r.onerror = (e) => { setState(e.error === "not-allowed" ? "denied" : "error"); };
    r.onend = () => setState("idle");
    r.start();
    recogRef.current = r;
  };

  return { state, toggle };
}

function ProgressBar({ step }) {
  const idx = STEPS.indexOf(step);
  const pct = Math.round((idx / (STEPS.length - 2)) * 100);
  return (
    <div style={{ width: "100%", height: 4, background: "#e8e3dc", borderRadius: 2 }}>
      <div style={{ height: "100%", width: `${Math.min(pct, 100)}%`, background: "#f5a623", borderRadius: 2, transition: "width 0.5s ease" }} />
    </div>
  );
}

function Card({ children, style = {} }) {
  return (
    <div style={{ background: "#fffef9", border: "1.5px solid #e8e3dc", borderRadius: 16, padding: "36px 40px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", ...style }}>
      {children}
    </div>
  );
}

function Btn({ children, onClick, variant = "primary", disabled = false, style = {} }) {
  const variants = {
    primary: { background: "#1a1a2e", color: "#fff", border: "none" },
    accent: { background: "#f5a623", color: "#1a1a2e", border: "none" },
    ghost: { background: "transparent", color: "#888", border: "1.5px solid #e8e3dc" },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: "12px 26px", borderRadius: 8, cursor: disabled ? "not-allowed" : "pointer",
      fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15,
      transition: "all 0.15s", opacity: disabled ? 0.4 : 1,
      ...variants[variant], ...style,
    }}>{children}</button>
  );
}

function Tag({ children, color = "#f5a623" }) {
  return (
    <span style={{
      display: "inline-block", background: color + "1a", color,
      border: `1px solid ${color}44`, borderRadius: 6,
      padding: "3px 10px", fontSize: 12, fontWeight: 600,
      letterSpacing: "0.04em", fontFamily: "'DM Sans', sans-serif",
    }}>{children}</span>
  );
}

function StepDots({ total, current }) {
  return (
    <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= current ? "#f5a623" : "#e8e3dc", transition: "background 0.3s" }} />
      ))}
    </div>
  );
}

function Screenshot({ svgString }) {
  return (
    <div style={{ borderRadius: 10, overflow: "hidden", border: "1.5px solid #e8e3dc", marginBottom: 16, background: "#f8f9fa" }}>
      <div style={{ padding: "6px 10px", background: "#f1f0eb", borderBottom: "1px solid #e8e3dc", display: "flex", gap: 5, alignItems: "center" }}>
        {["#ff5f57","#febc2e","#28c840"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
        <div style={{ flex: 1, height: 12, background: "#e0ddd7", borderRadius: 4, marginLeft: 6 }} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: svgString }} style={{ display: "block", lineHeight: 0 }} />
    </div>
  );
}

function SpeechInput({ value, onChange, placeholder, rows = 5 }) {
  const { state, toggle } = useSpeech((t) => onChange(value ? value + " " + t : t));
  const listening = state === "listening";
  const msgMap = { denied: "Mic access denied — please type", unsupported: "Voice not available — please type", error: "Voice error — please type" };

  return (
    <div>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        style={{
          width: "100%", padding: "14px 16px", borderRadius: 10,
          border: `1.5px solid ${listening ? "#e74c3c" : "#e8e3dc"}`,
          fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#1a1a2e",
          background: listening ? "#fff8f8" : "#fdfcf8",
          resize: "vertical", outline: "none", boxSizing: "border-box", lineHeight: 1.6,
          transition: "all 0.2s", marginBottom: 8,
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button onClick={toggle} style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "6px 14px", borderRadius: 20,
          border: `1.5px solid ${listening ? "#e74c3c" : "#e0ddd7"}`,
          background: listening ? "#fee2e2" : "#f5f0e8",
          cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          fontSize: 12, fontWeight: 600,
          color: listening ? "#c0392b" : "#888", transition: "all 0.15s",
        }}>
          {listening
            ? <><span style={{ width: 8, height: 8, borderRadius: "50%", background: "#e74c3c", display: "inline-block", animation: "blink 1s infinite" }} /> Stop recording</>
            : <><span>🎤</span> Speak your answer</>}
        </button>
        {listening && <span style={{ fontSize: 12, color: "#e74c3c", fontFamily: "'DM Sans', sans-serif" }}>Listening…</span>}
        {msgMap[state] && <span style={{ fontSize: 12, color: "#aaa", fontFamily: "'DM Sans', sans-serif" }}>{msgMap[state]}</span>}
      </div>
    </div>
  );
}

function TechStep({ steps, currentStep, setCurrentStep, status, setStatus, prevStep, nextStep, title, subtitle }) {
  const s = steps[currentStep];
  const done = status === "complete" || status === "blocked";
  return (
    <>
      <h2 style={h2}>{title}</h2>
      <p style={sub}>{subtitle}</p>
      {!done && (
        <>
          <StepDots total={steps.length} current={currentStep} />
          <Screenshot svgString={s.screenshotSvg} />
          <div style={{ background: "#f9f6f0", borderRadius: 12, padding: "18px 22px", marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#bbb", fontFamily: "'DM Sans', sans-serif", marginBottom: 6, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Step {currentStep + 1} of {steps.length}</div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#1a1a2e", lineHeight: 1.7, margin: "0 0 8px" }} dangerouslySetInnerHTML={{ __html: s.instruction }} />
            {s.tip && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#888", margin: 0, borderTop: "1px solid #ede9e0", paddingTop: 8 }}>💡 {s.tip}</p>}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
            <button onClick={() => setStatus("blocked")} style={{ background: "none", border: "none", color: "#ccc", fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", padding: 0 }}>
              My screen looks different / I'm stuck
            </button>
            <Btn variant="accent" onClick={() => currentStep < steps.length - 1 ? setCurrentStep(i => i + 1) : setStatus("complete")}>
              {currentStep < steps.length - 1 ? s.action + " →" : "✓ " + s.action}
            </Btn>
          </div>
        </>
      )}
      {status === "complete" && (
        <div style={{ background: "#f0faf4", border: "1.5px solid #a8e6c1", borderRadius: 12, padding: "28px", textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>✅</div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#2d6a4f", margin: 0 }}>Access granted — we're all set with this one!</p>
        </div>
      )}
      {status === "blocked" && (
        <div style={{ background: "#fff8ec", border: "1.5px solid #f5d89a", borderRadius: 12, padding: "22px 26px" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#8a5e0a", margin: "0 0 6px" }}><strong>No worries at all!</strong> We'll sort this out together on your kickoff call.</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#aaa", margin: 0 }}>We've flagged this so nothing falls through the cracks.</p>
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
        <Btn variant="ghost" onClick={prevStep}>← Back</Btn>
        <Btn variant="accent" onClick={nextStep} disabled={!done}>Continue →</Btn>
      </div>
    </>
  );
}

async function generateDeckBriefing(data) {
  const prompt = `You are an onboarding specialist at Getting Attention, a nonprofit Google Ad Grant agency. A new client just completed their onboarding intake. Generate a concise kickoff deck briefing for the account manager.

CLIENT DATA:
- Organization: ${data.client_info?.org_name || "Not provided"}
- Primary Contact: ${data.client_info?.name || ""} | ${data.client_info?.title || ""} | ${data.client_info?.email || ""}
- Account Manager: ${data.am_email}
- Customer ID: ${data.cid === "unknown" ? "Unknown — add 'Connect Google Ads' to action items" : data.cid}
- GA4 Access: ${data.ga4_status === "complete" ? "Granted ✓" : "Blocked — add 'Add us to GA4' to action items"}
- GTM Access: ${data.gtm_status === "complete" ? "Granted ✓" : "Blocked — add 'Add us to GTM' to action items"}
- Success definition: ${data.success || "Not provided"}
- Advertising goals: ${data.goals || "Not provided"}
- Programs: ${data.programs || "Not provided"}
- USPs: ${data.usps || "Not provided"}
- Competitor examples: ${data.competitors || "Not provided"}
- Exclusions: ${data.exclusions || "Not provided"}
- Keywords: ${data.keywords || "Not provided"}
- Terms to avoid: ${data.avoid_terms || "Not provided"}
- Contacts: ${data.contacts ? data.contacts.map(c => `${c.name} | ${c.title} | ${c.email}${c.meetings ? " | include on check-ins" : ""}`).join("; ") : "Not provided"}
- Billing: ${data.billing ? `${data.billing.name} | ${data.billing.title} | ${data.billing.email}` : "Not provided"}
- Budget timing: ${data.budget?.timing || "Not provided"}
- Budget owners: ${data.budget?.owners || "Not provided"}
- Budget review process: ${data.budget?.process || "Not provided"}
- Resources: ${data.resources ? data.resources.selected.map(id => { const opt = RESOURCE_OPTIONS.find(o => o.id === id); const url = data.resources.urls[id]; const note = data.resources.notes[id]; return `${opt?.label}${url ? " [" + url + "]" : ""}${note ? " — " + note : ""}`; }).join("; ") : "Not provided"}
- Notes: ${data.anything_else || "None"}

Generate the following sections:

1. SUGGESTED GOALS FOR KICKOFF DECK
Up to 3 goals with suggested measurement. Format: Goal | Measurement

2. REMAINING TECHNICAL ACTION ITEMS
Only outstanding items. If all done, say "All technical access confirmed ✓"

3. KEY INSIGHTS FOR AM (2–3 bullets specific to this client)

4. SUGGESTED SEED KEYWORDS (6–8 keywords)

5. FLAGS & FOLLOW-UP QUESTIONS (anything ambiguous or worth clarifying live)

Be specific and grounded. Don't invent details. Keep it tight and scannable.`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }),
  });
  const json = await res.json();
  return json.content?.[0]?.text || "Unable to generate briefing.";
}

export default function App() {
  const [step, setStep] = useState("welcome");
  const [data, setData] = useState({});
  const [ga4Step, setGa4Step] = useState(0);
  const [gtmStep, setGtmStep] = useState(0);
  const [surveyIdx, setSurveyIdx] = useState(0);
  const [briefing, setBriefing] = useState("");
  const [generating, setGenerating] = useState(false);
  const topRef = useRef(null);

  useEffect(() => { topRef.current?.scrollIntoView({ behavior: "smooth" }); }, [step, surveyIdx]);

  const set = (k, v) => setData(d => ({ ...d, [k]: v }));
  const goTo = (s) => setStep(s);

  async function handleSubmit() {
    goTo("complete");
    setGenerating(true);

    let briefingText = "";
    try { briefingText = await generateDeckBriefing(data); }
    catch { briefingText = "Error generating briefing — please review responses manually."; }
    setBriefing(briefingText);
    setGenerating(false);

    // Send to Zapier
    try {
      const RESOURCE_OPTIONS_MAP = {
        brand_visual: "Visual Brand Guide", brand_voice: "Brand Guide (Tone & Voice)",
        personas: "Donor / Service Recipient Personas", case_studies: "Case Studies",
        blog: "Blog Content", thought_leadership: "Thought Leadership Examples",
        photos: "High-Quality Photos", other: "Something else",
      };
      await fetch("https://hooks.zapier.com/hooks/catch/20000349/ux8tjt7/", {
        method: "POST",
        body: JSON.stringify({
          // Client info
          org_name: data.client_info?.org_name || "",
          client_name: data.client_info?.name || "",
          client_title: data.client_info?.title || "",
          client_email: data.client_info?.email || "",

          // Account manager
          am_email: data.am_email || "",

          // Technical setup
          google_ads_cid: data.cid === "unknown" ? "Unknown — to confirm on call" : (data.cid || ""),
          ga4_status: data.ga4_status === "complete" ? "Connected ✓" : "Needs attention ⚠",
          gtm_status: data.gtm_status === "complete" ? "Connected ✓" : "Needs attention ⚠",

          // Survey responses
          success_definition: data.success || "",
          advertising_goals: data.goals || "",
          programs: data.programs || "",
          usps: data.usps || "",
          competitors: data.competitors || "",
          exclusions: data.exclusions || "",
          keywords: data.keywords || "",
          terms_to_avoid: data.avoid_terms || "",
          anything_else: data.anything_else || "",

          // Contacts
          additional_contacts: data.contacts
            ? data.contacts.map(c => `${c.name} | ${c.title} | ${c.email}${c.meetings ? " | include on check-ins" : ""}`).join("; ")
            : "",

          // Billing
          billing_name: data.billing?.name || "",
          billing_title: data.billing?.title || "",
          billing_email: data.billing?.email || "",

          // Budget
          budget_timing: data.budget?.timing || "",
          budget_owners: data.budget?.owners || "",
          budget_process: data.budget?.process || "",

          // Resources
          resources: data.resources?.selected
            ? data.resources.selected.map(id => {
                const label = RESOURCE_OPTIONS_MAP[id] || id;
                const url = data.resources.urls?.[id] || "";
                const note = data.resources.notes?.[id] || "";
                return `${label}${url ? " [" + url + "]" : ""}${note ? " — " + note : ""}`;
              }).join("; ")
            : "",

          // AM briefing
          am_briefing: briefingText,

          // Meta
          submitted_at: new Date().toISOString(),
        }),
      });
    } catch (e) {
      console.error("Zapier webhook failed:", e);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0e8", backgroundImage: "radial-gradient(circle at 15% 15%, #fff8ec 0%, transparent 45%), radial-gradient(circle at 85% 85%, #e8f4f8 0%, transparent 45%)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@700&display=swap');
        * { box-sizing: border-box; }
        textarea:focus, input:focus { border-color: #f5a623 !important; box-shadow: 0 0 0 3px rgba(245,166,35,0.12) !important; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>
      <div style={{ maxWidth: 660, margin: "0 auto", padding: "0 20px 60px" }}>
        <div ref={topRef} style={{ paddingTop: 28, paddingBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, background: "#f5a623", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>💡</div>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, color: "#1a1a2e", letterSpacing: "0.05em" }}>GETTING ATTENTION</span>
        </div>

        <ProgressBar step={step} />
        <div style={{ height: 32 }} />

        {step === "welcome" && (
          <Card>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ fontSize: 44, marginBottom: 14 }}>👋</div>
              <h1 style={h1}>Welcome to Getting Attention</h1>
              <p style={{ ...sub, maxWidth: 440, margin: "0 auto" }}>
                This short intake helps your account manager prepare for your kickoff call. It takes about <strong>10 minutes</strong> — type or speak your answers.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 28 }}>
              {[["📋","A few questions about your goals"],["🔧","Quick technical setup walkthrough"],["🚀","Your AM gets a briefing instantly"]].map(([icon,label]) => (
                <div key={label} style={{ background: "#f9f6f0", borderRadius: 12, padding: "18px 12px", textAlign: "center" }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
                  <div style={{ fontSize: 12, color: "#666", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>{label}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center" }}>
              <Btn variant="accent" onClick={() => goTo("client_info")} style={{ fontSize: 16, padding: "14px 44px" }}>Let's get started →</Btn>
            </div>
          </Card>
        )}

        {step === "client_info" && (() => {
          const ci = data.client_info || {};
          const ready = ci.org_name?.trim() && ci.name?.trim() && ci.title?.trim() && ci.email?.trim();
          const field = (key, placeholder, label) => (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 5 }}>{label}</div>
              <input
                value={ci[key] || ""}
                onChange={e => set("client_info", { ...ci, [key]: e.target.value })}
                placeholder={placeholder}
                style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: "1.5px solid #e8e3dc", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#1a1a2e", background: "#fdfcf8", outline: "none", boxSizing: "border-box" }}
              />
            </div>
          );
          return (
            <>
              <Lbl>Step 1 of 6 · About You</Lbl>
              <Card>
                <h2 style={h2}>We're excited to meet you!</h2>
                <p style={sub}>This information will help your account manager plan your kickoff call.</p>
                {field("org_name", "e.g. City Harvest", "Organization name")}
                {field("name", "e.g. Sarah Chen", "Your full name")}
                {field("title", "e.g. Director of Development", "Your job title")}
                {field("email", "e.g. sarah@cityharvest.org", "Your email address")}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                  <Btn variant="ghost" onClick={() => goTo("welcome")}>← Back</Btn>
                  <Btn variant="accent" onClick={() => goTo("am_email")} disabled={!ready}>Continue →</Btn>
                </div>
              </Card>
            </>
          );
        })()}

        {step === "am_email" && (
          <>
            <Lbl>Step 2 of 6 · Account Setup</Lbl>
            <Card>
              <h2 style={h2}>Who is your Getting Attention account manager?</h2>
              <p style={sub}>Select your account manager's email from the list below.</p>
              <div style={{ display: "grid", gap: 10, marginBottom: 28 }}>
                {["daniel.mallari@gettingattention.org","shalimar.cenidoza@gettingattention.org","ysa.dionisio@gettingattention.org","jenelle.condado@gettingattention.org","arielle.sollo@gettingattention.org"].map(email => (
                  <button key={email} onClick={() => set("am_email", email)} style={{
                    padding: "13px 18px", borderRadius: 10, textAlign: "left", cursor: "pointer",
                    border: `1.5px solid ${data.am_email === email ? "#f5a623" : "#e8e3dc"}`,
                    background: data.am_email === email ? "#fff8ec" : "#fdfcf8",
                    fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#1a1a2e", transition: "all 0.15s",
                  }}>
                    {data.am_email === email ? "✓ " : ""}{email}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Btn variant="ghost" onClick={() => goTo("client_info")}>← Back</Btn>
                <Btn variant="accent" onClick={() => goTo("cid")} disabled={!data.am_email}>Continue →</Btn>
              </div>
            </Card>
          </>
        )}

        {step === "cid" && (
          <>
            <Lbl>Step 3 of 6 · Google Ads</Lbl>
            <Card>
              <h2 style={h2}>What is your Google Ads Customer ID?</h2>
              <p style={sub}>A 10-digit number (e.g. <code style={{ background: "#f0ece4", padding: "2px 6px", borderRadius: 4 }}>123-456-7890</code>) found in the top-right of your Google Ads account, or in your Google for Nonprofits dashboard under Ad Grants.</p>
              <input
                value={data.cid && data.cid !== "unknown" ? data.cid : ""}
                onChange={e => set("cid", e.target.value)}
                placeholder="e.g. 123-456-7890"
                style={{ width: "100%", padding: "14px 16px", borderRadius: 10, border: "1.5px solid #e8e3dc", fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#1a1a2e", background: "#fdfcf8", outline: "none", boxSizing: "border-box", marginBottom: 10 }}
              />
              {data.cid && data.cid !== "unknown" && (
                <div style={{ background: "#f0faf4", border: "1.5px solid #a8e6c1", borderRadius: 10, padding: "12px 16px", marginBottom: 12, fontSize: 14, color: "#2d6a4f", fontFamily: "'DM Sans', sans-serif" }}>
                  ✓ Your AM will send a connection request to <strong>{data.cid}</strong> — you'll just click Confirm in Google Ads.
                </div>
              )}
              <button onClick={() => { set("cid", "unknown"); goTo("ga4"); }} style={{ background: "none", border: "none", color: "#bbb", fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", padding: 0, marginBottom: 20 }}>
                I don't know my Customer ID →
              </button>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Btn variant="ghost" onClick={() => goTo("am_email")}>← Back</Btn>
                <Btn variant="accent" onClick={() => goTo("ga4")} disabled={!data.cid}>Continue →</Btn>
              </div>
            </Card>
          </>
        )}

        {step === "ga4" && (
          <>
            <Lbl>Step 4 of 6 · Google Analytics 4</Lbl>
            <Card>
              <TechStep
                steps={GA4_STEPS} currentStep={ga4Step} setCurrentStep={setGa4Step}
                status={data.ga4_status} setStatus={v => set("ga4_status", v)}
                prevStep={() => goTo("cid")} nextStep={() => goTo("gtm")}
                title="Let's connect Google Analytics"
                subtitle="We need Editor access to your GA4 property to track how your ads perform. Follow the steps below — it takes about 2 minutes."
              />
            </Card>
          </>
        )}

        {step === "gtm" && (
          <>
            <Lbl>Step 5 of 6 · Google Tag Manager</Lbl>
            <Card>
              <TechStep
                steps={GTM_STEPS} currentStep={gtmStep} setCurrentStep={setGtmStep}
                status={data.gtm_status} setStatus={v => set("gtm_status", v)}
                prevStep={() => goTo("ga4")} nextStep={() => goTo("survey")}
                title="One more — Google Tag Manager"
                subtitle="GTM lets us set up conversion tracking so we can measure what actions your ads drive. About 2 more minutes."
              />
            </Card>
          </>
        )}

        {step === "survey" && (() => {
          const q = SURVEY_QUESTIONS[surveyIdx];
          const isLast = surveyIdx === SURVEY_QUESTIONS.length - 1;
          const hasAnswer = q.custom === "contacts"
            ? !!(data.contacts && data.contacts.length > 0 && data.contacts[0].name && data.contacts[0].name.trim())
            : q.custom === "billing"
            ? !!(data.billing && data.billing.name && data.billing.name.trim())
            : q.custom === "budget"
            ? !!(data.budget && (data.budget.timing?.trim() || data.budget.owners?.trim() || data.budget.process?.trim()))
            : q.custom === "resources"
            ? !!(data.resources && data.resources.selected && data.resources.selected.length > 0)
            : !!(data[q.id] && data[q.id].toString().trim());
          return (
            <>
              <Lbl>Step 6 of 6 · About Your Organization ({surveyIdx + 1} of {SURVEY_QUESTIONS.length})</Lbl>
              <Card>
                <StepDots total={SURVEY_QUESTIONS.length} current={surveyIdx} />
                <h2 style={{ ...h2, fontSize: 19, marginBottom: q.subtext ? 8 : 16 }}>{q.label}</h2>
                {q.subtext && <p style={{ ...sub, fontSize: 14, marginBottom: 16 }}>{q.subtext}</p>}
                <div style={{ marginBottom: 20 }}>
                  {q.custom === "contacts" && (
                    <ContactsInput value={data.contacts} onChange={v => set("contacts", v)} />
                  )}
                  {q.custom === "billing" && (
                    <BillingInput value={data.billing} onChange={v => set("billing", v)} />
                  )}
                  {q.custom === "budget" && (
                    <BudgetInput value={data.budget} onChange={v => set("budget", v)} />
                  )}
                  {q.custom === "resources" && (
                    <ResourcesInput value={data.resources} onChange={v => set("resources", v)} />
                  )}
                  {!q.custom && (
                    <SpeechInput value={data[q.id] || ""} onChange={val => set(q.id, val)} placeholder={q.placeholder} rows={5} />
                  )}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Btn variant="ghost" onClick={() => surveyIdx === 0 ? goTo("client_info") : setSurveyIdx(i => i - 1)}>← Back</Btn>
                  <Btn variant="accent" onClick={() => isLast ? handleSubmit() : setSurveyIdx(i => i + 1)} disabled={!hasAnswer}>
                    {isLast ? "Submit ✓" : "Next →"}
                  </Btn>
                </div>
              </Card>
            </>
          );
        })()}

        {step === "complete" && (
          <>
            <Card style={{ textAlign: "center" }}>
              <div style={{ fontSize: 44, marginBottom: 12 }}>🎉</div>
              <h2 style={{ ...h2, textAlign: "center" }}>You're all set!</h2>
              <p style={{ color: "#666", fontSize: 15, lineHeight: 1.7, maxWidth: 440, margin: "0 auto 28px", fontFamily: "'DM Sans', sans-serif" }}>
                Your response has been submitted. <strong>{data.am_email}</strong> has been notified and will use your responses to prepare for your call.
              </p>
              <div style={{ borderTop: "1.5px solid #f0ece4", paddingTop: 24 }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#888", marginBottom: 14 }}>
                  Want a copy of your responses for your records?
                </p>
                <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", maxWidth: 420, margin: "0 auto" }}>
                  <input
                    value={data.copy_email || (data.client_info?.email || "")}
                    onChange={e => set("copy_email", e.target.value)}
                    placeholder="your@email.com"
                    style={{ flex: 1, minWidth: 180, padding: "11px 14px", borderRadius: 8, border: "1.5px solid #e8e3dc", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#1a1a2e", background: "#fdfcf8", outline: "none", boxSizing: "border-box" }}
                  />
                  <Btn variant="accent" onClick={() => set("copy_sent", true)} disabled={!data.copy_email && !data.client_info?.email}>
                    {data.copy_sent ? "Sent ✓" : "Send me a copy"}
                  </Btn>
                </div>
                {data.copy_sent && (
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#2d6a4f", marginTop: 10 }}>
                    ✓ A copy has been sent to {data.copy_email || data.client_info?.email}
                  </p>
                )}
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}

function Lbl({ children }) {
  return <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#bbb", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", marginBottom: 10 }}>{children}</div>;
}

const h1 = { fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: "#1a1a2e", margin: "0 0 12px" };
const h2 = { fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: "#1a1a2e", margin: "0 0 10px" };
const sub = { fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#666", lineHeight: 1.7, margin: "0 0 20px" };
