import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  MapPin,
  Image as ImageIcon,
  Star,
  IndianRupee,
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  Instagram,
  Smartphone,
  Monitor,
  Wand2,
} from "lucide-react";

const tattooStyles = [
  {
    name: "Hyper Realistic",
    price: "₹500/sq.in+",
    desc: "High-detail black and grey realism with depth, textures, and lifelike finishing.",
  },
  {
    name: "3D Tattoos",
    price: "₹500/sq.in+",
    desc: "Dimension-based tattoo concepts with realistic illusion and depth.",
  },
  {
    name: "Armband",
    price: "₹500/sq.in+",
    desc: "Bold armband and band pattern tattoos with strong wrapping flow.",
  },
  {
    name: "Name / Script",
    price: "₹500/sq.in+",
    desc: "Names, letters, scripts, Sanskrit calligraphy, and custom typography tattoos.",
  },
  {
    name: "Minimal",
    price: "₹500/sq.in+",
    desc: "Clean line work, symbols, tiny tattoos, and elegant minimalist concepts.",
  },
  {
    name: "Color Tattoos",
    price: "₹700/sq.in+",
    desc: "Color-packed tattoos with vibrant contrast and artistic blending.",
  },
  {
    name: "Polynesian",
    price: "₹500/sq.in+",
    desc: "Pattern-based tribal and Polynesian flow tattoos built for body placement.",
  },
  {
    name: "Portrait",
    price: "Custom Pricing",
    desc: "Realistic portraits priced by size, placement, and design complexity.",
  },
];

const gallery = Array.from({ length: 19 }, (_, i) => ({
  title: `Tattoo Design ${i + 1}`,
  type: "Custom Tattoo",
  note: "Premium tattoo artwork by Dx Tattoo Hunting.",
  image: `/images/tattoo${i + 1}.png`,
}));


const slots = ["11:00 AM", "12:30 PM", "2:00 PM", "4:00 PM", "6:00 PM", "7:30 PM"];

const colors = {
  black: "#000000",
  panel: "rgba(24,24,27,0.86)",
  panelSoft: "rgba(255,255,255,0.05)",
  panelDark: "rgba(0,0,0,0.32)",
  border: "rgba(255,255,255,0.10)",
  text: "#ffffff",
  softText: "#d4d4d8",
  mutedText: "#a1a1aa",
  lime: "#a3e635",
  sky: "#7dd3fc",
  orange: "#fb923c",
};

const ui = {
  page: {
    minHeight: "100vh",
    color: colors.text,
    background: "linear-gradient(135deg, #000 0%, #09090b 45%, #111827 100%)",
    fontFamily: 'Inter, Arial, sans-serif',
  },
  container: {
    width: "100%",
    maxWidth: 1280,
    margin: "0 auto",
    padding: "0 16px",
  },
  sectionCard: {
    borderRadius: 28,
    border: `1px solid ${colors.border}`,
    background: colors.panel,
    boxShadow: "0 10px 30px rgba(0,0,0,0.24)",
  },
  input: {
    width: "100%",
    borderRadius: 16,
    border: `1px solid ${colors.border}`,
    background: colors.panelDark,
    color: colors.text,
    padding: "14px 16px",
    outline: "none",
    fontSize: 15,
  },
  textarea: {
    width: "100%",
    minHeight: 110,
    borderRadius: 16,
    border: `1px solid ${colors.border}`,
    background: colors.panelDark,
    color: colors.text,
    padding: "14px 16px",
    outline: "none",
    resize: "vertical",
    fontSize: 15,
  },
};

function SectionCard({ children, style = {} }) {
  return <div style={{ ...ui.sectionCard, ...style }}>{children}</div>;
}

function PrimaryButton({ children, style = {}, ...props }) {
  return (
    <button
      {...props}
      style={{
        borderRadius: 18,
        background: colors.lime,
        color: "#000",
        border: "none",
        padding: "14px 24px",
        fontWeight: 700,
        cursor: "pointer",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function OutlineButton({ children, color = "sky", style = {}, ...props }) {
  const borderColor = color === "lime" ? "rgba(163,230,53,0.35)" : "rgba(125,211,252,0.35)";
  const textColor = color === "lime" ? "#ecfccb" : "#e0f2fe";
  const hoverBg = color === "lime" ? "rgba(163,230,53,0.10)" : "rgba(125,211,252,0.10)";
  return (
    <button
      {...props}
      style={{
        borderRadius: 18,
        background: "transparent",
        color: textColor,
        border: `1px solid ${borderColor}`,
        padding: "14px 24px",
        fontWeight: 700,
        cursor: "pointer",
        boxShadow: `inset 0 0 0 9999px ${hoverBg}`,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function Badge({ children, palette = "lime" }) {
  const borderColor = palette === "sky" ? "rgba(125,211,252,0.20)" : "rgba(163,230,53,0.20)";
  const bg = palette === "sky" ? "rgba(125,211,252,0.10)" : "rgba(163,230,53,0.10)";
  const color = palette === "sky" ? "#bae6fd" : "#d9f99d";
  return (
    <span
      style={{
        display: "inline-flex",
        borderRadius: 999,
        border: `1px solid ${borderColor}`,
        background: bg,
        color,
        padding: "6px 14px",
        fontSize: 13,
      }}
    >
      {children}
    </span>
  );
}

function PillButton({ active, palette = "lime", children, onClick, type = "button" }) {
  const activeStyle =
    palette === "sky"
      ? {
          border: `1px solid ${colors.sky}`,
          background: colors.sky,
          color: "#000",
          boxShadow: "0 8px 24px rgba(125,211,252,0.25)",
        }
      : {
          border: `1px solid ${colors.lime}`,
          background: colors.lime,
          color: "#000",
          boxShadow: "0 8px 24px rgba(163,230,53,0.25)",
        };

  const idleStyle =
    palette === "sky"
      ? {
          border: "1px solid rgba(125,211,252,0.25)",
          background: colors.panelSoft,
          color: "#e0f2fe",
        }
      : {
          border: "1px solid rgba(163,230,53,0.25)",
          background: colors.panelSoft,
          color: "#ecfccb",
        };

  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        borderRadius: 999,
        padding: "10px 16px",
        fontSize: 14,
        cursor: "pointer",
        transition: "all 0.2s ease",
        ...(active ? activeStyle : idleStyle),
      }}
    >
      {children}
    </button>
  );
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("services");
  const [selectedStyle, setSelectedStyle] = useState("Hyper Realistic");
  const [selectedSlot, setSelectedSlot] = useState("4:00 PM");
  const [generator, setGenerator] = useState({
    prompt: "",
    placement: "",
    size: "",
    style: "",
    tone: "Black & Grey",
    details: "",
  });
  const [form, setForm] = useState({
    name: "",
    phone: "",
    idea: "",
    placement: "",
    budget: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const selectedStyleData = useMemo(
    () => tattooStyles.find((item) => item.name === selectedStyle),
    [selectedStyle]
  );

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSubmitted(false);
  };

  const updateGenerator = (key, value) => {
    setGenerator((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const tabButton = (key, label, palette) => {
    const active = activeTab === key;
    const activeStyle = palette === "sky" ? { background: colors.sky, color: "#000" } : { background: colors.lime, color: "#000" };

    return (
      <button
        key={key}
        onClick={() => setActiveTab(key)}
        style={{
          border: "none",
          borderRadius: 16,
          background: active ? activeStyle.background : "transparent",
          color: active ? activeStyle.color : colors.text,
          padding: "12px 16px",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        {label}
      </button>
    );
  };

  return (
    <div style={ui.page}>
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          borderBottom: `1px solid ${colors.border}`,
          padding: "48px 0 64px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top right, rgba(163,230,53,0.14), transparent 25%), radial-gradient(circle at bottom left, rgba(125,211,252,0.12), transparent 22%)",
            pointerEvents: "none",
          }}
        />

        <div style={ui.container}>
          <div
            style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 32,
              alignItems: "center",
            }}
          >
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge>Tattoo Studio • Baroda • Dark Luxury x Neon Modern</Badge>

              <div style={{ marginTop: 14 }}>
                <h1
                  style={{
                    margin: 0,
                    fontSize: "clamp(36px, 7vw, 64px)",
                    lineHeight: 1.05,
                    fontWeight: 800,
                  }}
                >
                  Dx Tattoo Hunting Baroda
                </h1>
                <p style={{ margin: "10px 0 0", fontStyle: "italic", color: "#bef264", fontSize: 18 }}>
                  Make your look more attractive...
                </p>
                <p style={{ color: colors.softText, lineHeight: 1.75, maxWidth: 620 }}>
                  Permanent tattoos in Baroda with strong custom artwork, realistic detailing, script tattoos, color tattoos, and premium body-placement concepts.
                </p>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 18 }}>
                <a href="https://wa.me/918200558801" target="_blank" rel="noreferrer">
  <a 
  href="https://wa.me/918200558801?text=Hello%20I%20want%20to%20book%20a%20tattoo" 
  target="_blank"
>
  <PrimaryButton>Book on WhatsApp</PrimaryButton>
</a>
</a>
                <OutlineButton>See Tattoo Work</OutlineButton>
                <OutlineButton color="lime">
                  <span style={{ display: "inline-flex", alignItems: "center" }}>
                    <Instagram size={16} style={{ marginRight: 8 }} />
                   <a href="https://instagram.com/dx_tattoo_hunting" target="_blank" rel="noreferrer">
 <a href="https://instagram.com/dx_tattoo_hunting" target="_blank">
  @dx_tattoo_hunting
</a>
</a>
                  </span>
                </OutlineButton>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: 12,
                  paddingTop: 14,
                }}
              >
                {[
                  ["Custom", "Tattoo Concepts"],
                  ["Black & Grey", "And Color Work"],
                  ["Premium", "Tattoo Experience"],
                ].map(([title, sub]) => (
                  <div
                    key={title}
                    style={{
                      borderRadius: 18,
                      border: `1px solid ${colors.border}`,
                      background: colors.panelSoft,
                      padding: 16,
                    }}
                  >
                    <div style={{ fontSize: 28, fontWeight: 800 }}>{title}</div>
                    <div style={{ color: colors.softText, fontSize: 14 }}>{sub}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.1 }}>
              <SectionCard style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(163,230,53,0.2)" }}>
                <div style={{ padding: 24 }}>
                  <h2
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontSize: 28,
                      fontWeight: 800,
                      color: colors.sky,
                      margin: 0,
                    }}
                  >
                    <Sparkles size={24} color={colors.lime} />
                    Quick Booking Preview
                  </h2>
                </div>

                <div style={{ padding: "0 24px 24px", display: "grid", gap: 16 }}>
                  <div
                    style={{
                      display: "grid",
                      gap: 16,
                      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    }}
                  >
                    <div style={{ borderRadius: 18, border: `1px solid ${colors.border}`, background: colors.panelDark, padding: 16 }}>
                      <div style={{ color: colors.softText, fontSize: 14, marginBottom: 6 }}>Selected Style</div>
                      <div style={{ fontSize: 22, fontWeight: 700, color: colors.sky }}>{selectedStyle}</div>
                      <div style={{ color: colors.softText, fontSize: 14, marginTop: 4 }}>{selectedStyleData?.price}</div>
                    </div>

                    <div style={{ borderRadius: 18, border: `1px solid ${colors.border}`, background: colors.panelDark, padding: 16 }}>
                      <div style={{ color: colors.softText, fontSize: 14, marginBottom: 6 }}>Preferred Slot</div>
                      <div style={{ fontSize: 22, fontWeight: 700, color: colors.sky }}>{selectedSlot}</div>
                      <div style={{ color: colors.softText, fontSize: 14, marginTop: 4 }}>Today availability preview</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {tattooStyles.slice(0, 4).map((style) => (
                      <PillButton
                        key={style.name}
                        active={selectedStyle === style.name}
                        palette="lime"
                        onClick={() => setSelectedStyle(style.name)}
                      >
                        {style.name}
                      </PillButton>
                    ))}
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {slots.slice(0, 4).map((slot) => (
                      <PillButton
                        key={slot}
                        active={selectedSlot === slot}
                        palette="sky"
                        onClick={() => setSelectedSlot(slot)}
                      >
                        {slot}
                      </PillButton>
                    ))}
                  </div>
                </div>
              </SectionCard>
            </motion.div>
          </div>
        </div>
      </section>

      <main style={{ ...ui.container, paddingTop: 40, paddingBottom: 56 }}>
        <section
          style={{
            display: "grid",
            gap: 24,
            marginBottom: 40,
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          }}
        >
          <SectionCard style={{ gridColumn: "1 / -1", borderColor: "rgba(163,230,53,0.2)" }}>
            <div
              style={{
                display: "grid",
                gap: 24,
                padding: 28,
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                alignItems: "center",
              }}
            >
              <div>
                <Badge palette="sky">AI Tattoo Generator</Badge>

                <div style={{ marginTop: 12 }}>
                  <h2 style={{ margin: 0, fontSize: 30, fontWeight: 800, color: colors.sky }}>
                    Let customers generate tattoo ideas before booking
                  </h2>
                  <p style={{ color: colors.softText, lineHeight: 1.75, maxWidth: 720 }}>
                    Customers can type their concept, choose style, body placement, size, and mood, then get an AI-generated tattoo idea preview for consultation at Dx Tattoo Hunting Baroda.
                  </p>
                </div>

                <div
                  style={{
                    display: "grid",
                    gap: 12,
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  }}
                >
                  <div style={{ borderRadius: 18, border: `1px solid ${colors.border}`, background: colors.panelDark, padding: 16 }}>
                    <div style={{ fontWeight: 700 }}>Input options</div>
                    <div style={{ marginTop: 6, color: colors.softText, fontSize: 14 }}>
                      Name, deity, animal, script, portrait, symbolism, placement, and style.
                    </div>
                  </div>
                  <div style={{ borderRadius: 18, border: `1px solid ${colors.border}`, background: colors.panelDark, padding: 16 }}>
                    <div style={{ fontWeight: 700 }}>Studio advantage</div>
                    <div style={{ marginTop: 6, color: colors.softText, fontSize: 14 }}>
                      Pre-qualified leads with clear design direction before the client visits.
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
                  {["Hyper Realistic", "3D", "Script", "Polynesian", "Portrait"].map((tag, i) => (
                    <span
                      key={tag}
                      style={{
                        borderRadius: 999,
                        border: `1px solid ${i % 2 === 0 ? "rgba(163,230,53,0.2)" : "rgba(125,211,252,0.2)"}`,
                        background: i % 2 === 0 ? "rgba(163,230,53,0.10)" : "rgba(125,211,252,0.10)",
                        color: i % 2 === 0 ? "#d9f99d" : "#bae6fd",
                        padding: "6px 12px",
                        fontSize: 12,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div
                style={{
                  borderRadius: 32,
                  border: "1px solid rgba(125,211,252,0.2)",
                  background: "rgba(0,0,0,0.35)",
                  padding: 16,
                  boxShadow: "0 18px 42px rgba(125,211,252,0.08)",
                }}
              >
                <div
                  style={{
                    borderRadius: 24,
                    border: `1px solid ${colors.border}`,
                    background: "#09090b",
                    padding: 16,
                    display: "grid",
                    gap: 14,
                  }}
                >
                  <div>
                    <div style={{ color: "#bae6fd", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                      AI Design Preview
                    </div>
                    <h3 style={{ margin: "8px 0 0", fontSize: 22, fontWeight: 700, color: colors.sky }}>
                      Generate your tattoo concept
                    </h3>
                  </div>

                  <div style={{ display: "grid", gap: 12 }}>
                    <input
                      style={ui.input}
                      value={generator.prompt}
                      onChange={(e) => updateGenerator("prompt", e.target.value)}
                      placeholder="Example: Lord Shiva trishul with smoke and Sanskrit script"
                    />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <input
                        style={ui.input}
                        value={generator.placement}
                        onChange={(e) => updateGenerator("placement", e.target.value)}
                        placeholder="Placement"
                      />
                      <input
                        style={ui.input}
                        value={generator.size}
                        onChange={(e) => updateGenerator("size", e.target.value)}
                        placeholder="Size"
                      />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <input
                        style={ui.input}
                        value={generator.style}
                        onChange={(e) => updateGenerator("style", e.target.value)}
                        placeholder="Style"
                      />
                      <input
                        style={ui.input}
                        value={generator.tone}
                        onChange={(e) => updateGenerator("tone", e.target.value)}
                        placeholder="Black & Grey / Color"
                      />
                    </div>
                    <textarea
                      style={ui.textarea}
                      value={generator.details}
                      onChange={(e) => updateGenerator("details", e.target.value)}
                      placeholder="Describe mood, meaning, or extra elements"
                    />
                    <PrimaryButton style={{ width: "100%" }}>
                      <span style={{ display: "inline-flex", alignItems: "center" }}>
                        <Wand2 size={16} style={{ marginRight: 8 }} />
                        Generate Tattoo Idea
                      </span>
                    </PrimaryButton>
                  </div>

                  <div
                    style={{
                      borderRadius: 18,
                      border: "1px dashed rgba(125,211,252,0.25)",
                      background: colors.panelSoft,
                      padding: 24,
                      textAlign: "center",
                    }}
                  >
                    <ImageIcon size={40} color={colors.sky} />
                    <div style={{ marginTop: 12, fontWeight: 700 }}>AI concept preview appears here</div>
                    <div style={{ marginTop: 4, color: colors.softText, fontSize: 12 }}>
                      This can later connect to a real image generation API.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard>
            <div style={{ padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <Smartphone size={24} color={colors.lime} />
                <div>
                  <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: colors.orange }}>Android App Version</h2>
                  <div style={{ color: colors.softText, fontSize: 14 }}>
                    Mobile-first booking, gallery browsing, call button, and WhatsApp enquiry flow.
                  </div>
                </div>
              </div>

              <div
                style={{
                  maxWidth: 320,
                  margin: "0 auto",
                  borderRadius: 40,
                  border: `1px solid ${colors.border}`,
                  background: "#000",
                  padding: 12,
                  boxShadow: "0 22px 48px rgba(0,0,0,0.35)",
                }}
              >
                <div
                  style={{
                    overflow: "hidden",
                    borderRadius: 30,
                    border: `1px solid ${colors.border}`,
                    background: "#09090b",
                  }}
                >
                  <div style={{ borderBottom: `1px solid ${colors.border}`, padding: 16 }}>
                    <div style={{ color: "#bef264", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                      Dx Tattoo Hunting
                    </div>
                    <h3 style={{ margin: "8px 0 0", fontSize: 22, fontWeight: 700, color: colors.sky }}>
                      Book your next tattoo
                    </h3>
                  </div>
                  <div style={{ display: "grid", gap: 12, padding: 16 }}>
                    {[
                      ["Black Ink", "₹500/sq.in"],
                      ["Color Tattoos", "₹700/sq.in"],
                      ["Realistic Tattoos", "Custom quote by design"],
                    ].map(([label, value]) => (
                      <div key={label} style={{ borderRadius: 18, background: colors.panelSoft, padding: 14 }}>
                        <div style={{ fontWeight: 700 }}>{label}</div>
                        <div style={{ color: colors.softText, fontSize: 12, marginTop: 4 }}>{value}</div>
                      </div>
                    ))}
                    <PrimaryButton style={{ width: "100%" }}>WhatsApp Booking</PrimaryButton>
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard>
            <div style={{ padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <Monitor size={24} color={colors.sky} />
                <div>
                  <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: colors.orange }}>Web Version</h2>
                  <div style={{ color: colors.softText, fontSize: 14 }}>
                    Desktop-friendly portfolio, premium landing page, and enquiry-focused layout.
                  </div>
                </div>
              </div>

              <div
                style={{
                  borderRadius: 32,
                  border: `1px solid ${colors.border}`,
                  background: "#09090b",
                  padding: 16,
                  boxShadow: "0 22px 48px rgba(0,0,0,0.35)",
                }}
              >
                <div
                  style={{
                    marginBottom: 16,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderRadius: 18,
                    border: `1px solid ${colors.border}`,
                    background: colors.panelSoft,
                    padding: "14px 16px",
                  }}
                >
                  <div>
                    <div style={{ color: "#bae6fd", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                      Dx Tattoo Hunting Baroda
                    </div>
                    <div style={{ marginTop: 4, fontSize: 20, fontWeight: 700 }}>
                      Premium Tattoo Studio Website
                    </div>
                  </div>
                  <Instagram size={20} color={colors.sky} />
                </div>

                <div
                  style={{
                    display: "grid",
                    gap: 12,
                    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                  }}
                >
                  {[
                    ["Portfolio", "Real tattoo showcase"],
                    ["Pricing", "Black, color, realism"],
                    ["Contact", "Call, WhatsApp, Instagram"],
                  ].map(([label, value]) => (
                    <div key={label} style={{ borderRadius: 18, background: colors.panelSoft, padding: 16 }}>
                      <div style={{ fontWeight: 700 }}>{label}</div>
                      <div style={{ color: colors.softText, fontSize: 12, marginTop: 4 }}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>
        </section>

        <div style={{ display: "grid", gap: 32 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 8,
              background: "rgba(24,24,27,0.9)",
              border: "1px solid rgba(163,230,53,0.12)",
              borderRadius: 20,
              padding: 6,
            }}
          >
            {tabButton("services", "Services", "lime")}
            {tabButton("gallery", "Gallery", "sky")}
            {tabButton("booking", "Booking", "lime")}
            {tabButton("contact", "Contact", "sky")}
          </div>

          {activeTab === "services" && (
            <div
              style={{
                display: "grid",
                gap: 20,
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              }}
            >
              {tattooStyles.map((item) => (
                <SectionCard key={item.name} style={{ height: "100%", background: "rgba(24,24,27,0.75)", borderColor: "rgba(163,230,53,0.15)" }}>
                  <div style={{ padding: 24 }}>
                    <div style={{ display: "flex", gap: 12, justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: colors.orange }}>{item.name}</h3>
                        <p style={{ marginTop: 8, color: colors.softText, lineHeight: 1.7 }}>{item.desc}</p>
                      </div>
                      <span
                        style={{
                          borderRadius: 999,
                          background: colors.lime,
                          color: "#000",
                          padding: "6px 12px",
                          fontWeight: 700,
                          fontSize: 13,
                        }}
                      >
                        {item.price}
                      </span>
                    </div>
                    <div style={{ marginTop: 16 }}>
                      <OutlineButton style={{ width: "100%" }}>Explore Design</OutlineButton>
                    </div>
                  </div>
                </SectionCard>
              ))}
            </div>
          )}

          {activeTab === "gallery" && (
            <div
              style={{
                display: "grid",
                gap: 20,
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              }}
            >
              {gallery.map((item) => (
  <SectionCard key={item.title} style={{ overflow: "hidden", borderColor: "rgba(125,211,252,0.15)" }}>
    <div
      style={{
        height: 176,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottom: `1px solid ${colors.border}`,
        background: "#27272a",
        overflow: "hidden",
      }}
    >
      <img
        src={item.image}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "0.4s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />
    </div>

    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", gap: 12, justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0, fontWeight: 700 }}>{item.title}</h3>
        <span
          style={{
            borderRadius: 999,
            background: "rgba(255,255,255,0.10)",
            color: "#fff",
            padding: "6px 10px",
            fontSize: 12,
          }}
        >
          {item.type}
        </span>
      </div>

      <p style={{ marginTop: 10, color: colors.softText, lineHeight: 1.7, fontSize: 14 }}>
        {item.note}
      </p>
    </div>
  </SectionCard>
))}

          {activeTab === "booking" && (
            <div
              style={{
                display: "grid",
                gap: 24,
                gridTemplateColumns: "minmax(0,1.2fr) minmax(280px,0.8fr)",
              }}
            >
              <SectionCard style={{ borderColor: "rgba(125,211,252,0.15)" }}>
                <div style={{ borderBottom: `1px solid ${colors.border}`, padding: 24 }}>
                  <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>Book a Tattoo Consultation</h2>
                </div>
                <div style={{ padding: 24 }}>
                  <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <input style={ui.input} value={form.name} onChange={(e) => updateField("name", e.target.value)} placeholder="Your name" />
                      <input style={ui.input} value={form.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="Phone number" />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <input style={ui.input} value={form.placement} onChange={(e) => updateField("placement", e.target.value)} placeholder="Body placement" />
                      <input style={ui.input} value={form.budget} onChange={(e) => updateField("budget", e.target.value)} placeholder="Expected budget" />
                    </div>

                    <textarea
                      style={{ ...ui.textarea, minHeight: 130 }}
                      value={form.idea}
                      onChange={(e) => updateField("idea", e.target.value)}
                      placeholder="Describe your tattoo idea"
                    />

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {slots.map((slot) => (
                        <PillButton key={slot} active={selectedSlot === slot} palette="sky" onClick={() => setSelectedSlot(slot)}>
                          {slot}
                        </PillButton>
                      ))}
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                      <div style={{ color: colors.softText, fontSize: 14 }}>Selected time: {selectedSlot}</div>
                      <PrimaryButton type="submit">Send Booking Request</PrimaryButton>
                    </div>

                    {submitted && (
                      <div
                        style={{
                          borderRadius: 18,
                          border: "1px solid rgba(16,185,129,0.3)",
                          background: "rgba(16,185,129,0.10)",
                          padding: 16,
                          color: "#a7f3d0",
                          fontSize: 14,
                        }}
                      >
                        Booking preview submitted for {form.name || "client"}. This can be connected to WhatsApp, Android app enquiry flow, website leads, or Firebase later.
                      </div>
                    )}
                  </form>
                </div>
              </SectionCard>

              <div style={{ display: "grid", gap: 24 }}>
                <SectionCard style={{ borderColor: "rgba(125,211,252,0.15)" }}>
                  <div style={{ padding: 24 }}>
                    <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Why clients choose Dx Tattoo Hunting</h3>
                    <div style={{ display: "grid", gap: 16, marginTop: 18 }}>
                      {[
                        [ShieldCheck, colors.lime, "Hygiene First", "Professional permanent tattoo process with hygiene-focused studio practice."],
                        [HeartHandshake, colors.sky, "Custom Guidance", "Guidance for design selection, placement planning, and tattoo flow on the body."],
                        [Star, colors.lime, "Portfolio Driven", "Real portfolio-based confidence with custom work across multiple tattoo styles."],
                      ].map(([Icon, color, title, desc]) => (
                        <div key={title} style={{ display: "flex", gap: 12 }}>
                          <Icon size={20} color={color} style={{ marginTop: 2 }} />
                          <div>
                            <div style={{ fontWeight: 700 }}>{title}</div>
                            <div style={{ color: colors.softText, fontSize: 14, marginTop: 4 }}>{desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </SectionCard>

                <SectionCard style={{ borderColor: "rgba(125,211,252,0.15)" }}>
                  <div style={{ padding: 24 }}>
                    <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Pricing Highlights</h3>
                    <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
                      {[
                        [IndianRupee, colors.lime, "Black Ink Tattoos", "₹500/sq.in"],
                        [Sparkles, colors.sky, "Color Tattoos", "₹700/sq.in"],
                        [Star, colors.lime, "Realistic Tattoos", "Custom"],
                      ].map(([Icon, color, label, value]) => (
                        <div
                          key={label}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderRadius: 18,
                            border: `1px solid ${colors.border}`,
                            background: colors.panelDark,
                            padding: 14,
                          }}
                        >
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#fff", fontSize: 14 }}>
                            <Icon size={16} color={color} /> {label}
                          </span>
                          <span
                            style={{
                              borderRadius: 999,
                              background: "rgba(255,255,255,0.10)",
                              color: "#fff",
                              padding: "6px 10px",
                              fontSize: 12,
                            }}
                          >
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </SectionCard>
              </div>
            </div>
          )}

          {activeTab === "contact" && (
            <div
              style={{
                display: "grid",
                gap: 20,
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              }}
            >
              {[
                [Phone, colors.lime, "Phone / WhatsApp", "+91 8200558801", "WhatsApp available"],
                [MapPin, colors.sky, "Studio Location", "SF-27, Kasper Square, Gotri-Laxmipura Road, New Alkapuri, Vadodara, Gujarat 390021", ""],
                [Instagram, colors.lime, "Instagram", "@dx_tattoo_hunting", ""],
              ].map(([Icon, color, title, line1, line2]) => (
                <SectionCard key={title} style={{ borderColor: "rgba(125,211,252,0.15)" }}>
                  <div style={{ padding: 24 }}>
                    <Icon size={24} color={color} />
                    <h3 style={{ margin: "12px 0 0", fontSize: 20, fontWeight: 700 }}>{title}</h3>
                    <p style={{ marginTop: 8, color: colors.softText, lineHeight: 1.7 }}>{line1}</p>
                    {line2 ? <p style={{ marginTop: 4, color: colors.mutedText, fontSize: 14 }}>{line2}</p> : null}
                  </div>
                </SectionCard>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
