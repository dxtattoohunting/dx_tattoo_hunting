import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, MapPin, Image as ImageIcon, Star, IndianRupee, Sparkles,
  HeartHandshake, ShieldCheck, Instagram, Smartphone, Monitor, Wand2,
  X, ChevronLeft, ChevronRight, MapPinned
} from "lucide-react";

const tattooStyles = [
  { name: "Hyper Realistic", price: "₹500/sq.in+", desc: "High-detail black and grey realism with depth, textures, and lifelike finishing." },
  { name: "3D Tattoos", price: "₹500/sq.in+", desc: "Dimension-based tattoo concepts with realistic illusion and depth." },
  { name: "Armband", price: "₹500/sq.in+", desc: "Bold armband and band pattern tattoos with strong wrapping flow." },
  { name: "Name / Script", price: "₹500/sq.in+", desc: "Names, letters, scripts, Sanskrit calligraphy, and custom typography tattoos." },
  { name: "Minimal", price: "₹500/sq.in+", desc: "Clean line work, symbols, tiny tattoos, and elegant minimalist concepts." },
  { name: "Color Tattoos", price: "₹700/sq.in+", desc: "Color-packed tattoos with vibrant contrast and artistic blending." },
  { name: "Polynesian", price: "₹500/sq.in+", desc: "Pattern-based tribal and Polynesian flow tattoos built for body placement." },
  { name: "Portrait", price: "Custom Pricing", desc: "Realistic portraits priced by size, placement, and design complexity." },
];

const gallery = Array.from({ length: 19 }, (_, i) => ({
  title: `Tattoo Design ${i + 1}`,
  type: "Custom Tattoo",
  note: "Premium tattoo artwork by Dx Tattoo Hunting.",
  image: `/images/tattoo${i + 1}.png`,
}));

const slots = ["11:00 AM", "12:30 PM", "2:00 PM", "4:00 PM", "6:00 PM", "7:30 PM"];

const colors = {
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
  page: { minHeight: "100vh", color: colors.text, background: "linear-gradient(135deg, #000 0%, #09090b 45%, #111827 100%)", fontFamily: "Inter, Arial, sans-serif" },
  container: { width: "100%", maxWidth: 1280, margin: "0 auto", padding: "0 16px" },
  sectionCard: { borderRadius: 28, border: `1px solid ${colors.border}`, background: colors.panel, boxShadow: "0 10px 30px rgba(0,0,0,0.24)" },
  input: { width: "100%", borderRadius: 16, border: `1px solid ${colors.border}`, background: colors.panelDark, color: colors.text, padding: "14px 16px", outline: "none", fontSize: 15 },
  textarea: { width: "100%", minHeight: 110, borderRadius: 16, border: `1px solid ${colors.border}`, background: colors.panelDark, color: colors.text, padding: "14px 16px", outline: "none", resize: "vertical", fontSize: 15 },
};

function SectionCard({ children, style = {} }) {
  return <div style={{ ...ui.sectionCard, ...style }}>{children}</div>;
}

function PrimaryButton({ children, style = {}, ...props }) {
  return (
    <button
      {...props}
      style={{ borderRadius: 18, background: colors.lime, color: "#000", border: "none", padding: "14px 24px", fontWeight: 700, cursor: "pointer", transition: "transform 0.2s ease, box-shadow 0.2s ease", ...style }}
      onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 12px 24px rgba(163,230,53,0.25)"; }}
      onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      {children}
    </button>
  );
}

function OutlineButton({ children, color = "sky", style = {}, ...props }) {
  return (
    <button
      {...props}
      style={{ borderRadius: 18, background: "transparent", color: color === "lime" ? "#ecfccb" : "#e0f2fe", border: `1px solid ${color === "lime" ? "rgba(163,230,53,0.35)" : "rgba(125,211,252,0.35)"}`, padding: "14px 24px", fontWeight: 700, cursor: "pointer", transition: "transform 0.2s ease, background 0.2s ease", ...style }}
      onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.background = color === "lime" ? "rgba(163,230,53,0.10)" : "rgba(125,211,252,0.10)"; }}
      onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "transparent"; }}
    >
      {children}
    </button>
  );
}

function Badge({ children, palette = "lime" }) {
  return (
    <span style={{ display: "inline-flex", borderRadius: 999, border: `1px solid ${palette === "sky" ? "rgba(125,211,252,0.20)" : "rgba(163,230,53,0.20)"}`, background: palette === "sky" ? "rgba(125,211,252,0.10)" : "rgba(163,230,53,0.10)", color: palette === "sky" ? "#bae6fd" : "#d9f99d", padding: "6px 14px", fontSize: 13 }}>
      {children}
    </span>
  );
}

function PillButton({ active, palette = "lime", children, onClick, type = "button" }) {
  const activeStyle = palette === "sky"
    ? { border: `1px solid ${colors.sky}`, background: colors.sky, color: "#000", boxShadow: "0 8px 24px rgba(125,211,252,0.25)" }
    : { border: `1px solid ${colors.lime}`, background: colors.lime, color: "#000", boxShadow: "0 8px 24px rgba(163,230,53,0.25)" };
  const idleStyle = palette === "sky"
    ? { border: "1px solid rgba(125,211,252,0.25)", background: colors.panelSoft, color: "#e0f2fe" }
    : { border: "1px solid rgba(163,230,53,0.25)", background: colors.panelSoft, color: "#ecfccb" };
  return <button type={type} onClick={onClick} style={{ borderRadius: 999, padding: "10px 16px", fontSize: 14, cursor: "pointer", transition: "all 0.2s ease", ...(active ? activeStyle : idleStyle) }}>{children}</button>;
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("services");
  const [selectedStyle, setSelectedStyle] = useState("Hyper Realistic");
  const [selectedSlot, setSelectedSlot] = useState("4:00 PM");
  const [generator, setGenerator] = useState({ prompt: "", placement: "", size: "", style: "", tone: "Black & Grey", details: "" });
  const [form, setForm] = useState({ name: "", phone: "", idea: "", placement: "", budget: "" });
  const [submitted, setSubmitted] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const selectedStyleData = useMemo(() => tattooStyles.find((item) => item.name === selectedStyle), [selectedStyle]);
  const updateField = (key, value) => { setForm((prev) => ({ ...prev, [key]: value })); setSubmitted(false); };
  const updateGenerator = (key, value) => setGenerator((prev) => ({ ...prev, [key]: value }));
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  const nextImage = () => setLightboxIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));

  const waBookingMessage = `Hello, I want to book a tattoo.%0AName: ${encodeURIComponent(form.name || "")}%0APhone: ${encodeURIComponent(form.phone || "")}%0APlacement: ${encodeURIComponent(form.placement || "")}%0ABudget: ${encodeURIComponent(form.budget || "")}%0AIdea: ${encodeURIComponent(form.idea || "")}%0APreferred Slot: ${encodeURIComponent(selectedSlot)}`;

  const tabButton = (key, label, palette) => {
    const active = activeTab === key;
    return <button key={key} onClick={() => setActiveTab(key)} style={{ border: "none", borderRadius: 16, background: active ? (palette === "sky" ? colors.sky : colors.lime) : "transparent", color: active ? "#000" : colors.text, padding: "12px 16px", fontWeight: 700, cursor: "pointer" }}>{label}</button>;
  };

  return (
    <div style={ui.page}>
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeLightbox} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <button onClick={closeLightbox} style={{ position: "absolute", top: 18, right: 18, background: "rgba(255,255,255,0.12)", border: "none", color: "#fff", borderRadius: 999, width: 42, height: 42, cursor: "pointer" }}><X size={20} style={{ marginTop: 2 }} /></button>
            <button onClick={(e) => { e.stopPropagation(); prevImage(); }} style={{ position: "absolute", left: 18, background: "rgba(255,255,255,0.12)", border: "none", color: "#fff", borderRadius: 999, width: 42, height: 42, cursor: "pointer" }}><ChevronLeft size={20} style={{ marginTop: 2 }} /></button>
            <button onClick={(e) => { e.stopPropagation(); nextImage(); }} style={{ position: "absolute", right: 70, background: "rgba(255,255,255,0.12)", border: "none", color: "#fff", borderRadius: 999, width: 42, height: 42, cursor: "pointer" }}><ChevronRight size={20} style={{ marginTop: 2 }} /></button>
            <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: 1000, width: "100%" }}>
              <img src={gallery[lightboxIndex].image} style={{ width: "100%", maxHeight: "78vh", objectFit: "contain", borderRadius: 24 }} />
              <div style={{ marginTop: 14, textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 700 }}>{gallery[lightboxIndex].title}</div>
                <div style={{ color: colors.softText, marginTop: 6 }}>{gallery[lightboxIndex].type}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section style={{ position: "relative", overflow: "hidden", borderBottom: `1px solid ${colors.border}`, padding: "48px 0 64px" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at top right, rgba(163,230,53,0.14), transparent 25%), radial-gradient(circle at bottom left, rgba(125,211,252,0.12), transparent 22%)", pointerEvents: "none" }} />
        <div style={ui.container}>
          <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32, alignItems: "center" }}>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge>Tattoo Studio • Baroda • Dark Luxury x Neon Modern</Badge>
              <div style={{ marginTop: 14 }}>
                <h1 style={{ margin: 0, fontSize: "clamp(36px, 7vw, 64px)", lineHeight: 1.05, fontWeight: 800 }}>Dx Tattoo Hunting Baroda</h1>
                <p style={{ margin: "10px 0 0", fontStyle: "italic", color: "#bef264", fontSize: 18 }}>Make your look more attractive...</p>
                <p style={{ color: colors.softText, lineHeight: 1.75, maxWidth: 620 }}>Permanent tattoos in Baroda with strong custom artwork, realistic detailing, script tattoos, color tattoos, and premium body-placement concepts.</p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 18 }}>
                <a href="https://wa.me/918200558801?text=Hello%20I%20want%20to%20book%20a%20tattoo" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}><PrimaryButton>Book on WhatsApp</PrimaryButton></a>
                <OutlineButton onClick={() => { const section = document.getElementById("gallery-section"); if (section) section.scrollIntoView({ behavior: "smooth", block: "start" }); }}>See Tattoo Work</OutlineButton>
                <a href="https://instagram.com/dx_tattoo_hunting" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}><OutlineButton color="lime"><span style={{ display: "inline-flex", alignItems: "center" }}><Instagram size={16} style={{ marginRight: 8 }} /> @dx_tattoo_hunting</span></OutlineButton></a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <main style={{ ...ui.container, paddingTop: 40, paddingBottom: 56 }}>
        <section style={{ display: "grid", gap: 24, marginBottom: 40 }}>
          <SectionCard style={{ borderColor: "rgba(125,211,252,0.15)" }}>
            <div style={{ padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <MapPinned size={24} color={colors.sky} />
                <div><h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: colors.orange }}>Studio Location & Trust</h2><div style={{ color: colors.softText, fontSize: 14 }}>Help clients find your studio and feel confident before booking.</div></div>
              </div>
              <div style={{ display: "grid", gap: 24, gridTemplateColumns: "minmax(280px,1.05fr) minmax(240px,0.95fr)" }}>
                <div style={{ borderRadius: 22, overflow: "hidden", border: `1px solid ${colors.border}`, minHeight: 320 }}>
                  <iframe title="Dx Tattoo Hunting Location" src="https://www.google.com/maps?q=SF-27%2C%20Kasper%20Square%2C%20Gotri-Laxmipura%20Road%2C%20New%20Alkapuri%2C%20Vadodara%2C%20Gujarat%20390021&output=embed" width="100%" height="320" style={{ border: 0, display: "block" }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </div>
                <div style={{ display: "grid", gap: 14 }}>
                  <div style={{ borderRadius: 18, background: colors.panelDark, border: `1px solid ${colors.border}`, padding: 16 }}><div style={{ fontWeight: 700, marginBottom: 6 }}>Studio Address</div><div style={{ color: colors.softText, lineHeight: 1.7 }}>SF-27, Kasper Square, Gotri-Laxmipura Road, New Alkapuri, Vadodara, Gujarat 390021</div></div>
                  <div style={{ borderRadius: 18, background: colors.panelDark, border: `1px solid ${colors.border}`, padding: 16 }}><div style={{ display: "flex", gap: 12 }}><ShieldCheck size={20} color={colors.lime} /><div><div style={{ fontWeight: 700 }}>Hygiene Focused Studio</div><div style={{ color: colors.softText, marginTop: 4, fontSize: 14 }}>Professional setup and care-focused tattooing experience.</div></div></div></div>
                  <div style={{ borderRadius: 18, background: colors.panelDark, border: `1px solid ${colors.border}`, padding: 16 }}><div style={{ display: "flex", gap: 12 }}><HeartHandshake size={20} color={colors.sky} /><div><div style={{ fontWeight: 700 }}>Consultation Support</div><div style={{ color: colors.softText, marginTop: 4, fontSize: 14 }}>Get help with design, placement, and budget before you finalize your tattoo.</div></div></div></div>
                </div>
              </div>
            </div>
          </SectionCard>
        </section>

        <div style={{ display: "grid", gap: 32 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, background: "rgba(24,24,27,0.9)", border: "1px solid rgba(163,230,53,0.12)", borderRadius: 20, padding: 6 }}>
            {tabButton("services", "Services", "lime")}
            {tabButton("gallery", "Gallery", "sky")}
            {tabButton("booking", "Booking", "lime")}
            {tabButton("contact", "Contact", "sky")}
          </div>

          {activeTab === "services" && <div style={{ color: colors.softText }}>Use your previous working file’s services section or keep this tab simple for now.</div>}

          {activeTab === "gallery" && (
            <div id="gallery-section" style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              {gallery.map((item, index) => (
                <SectionCard key={item.title + item.image} style={{ overflow: "hidden", borderColor: "rgba(125,211,252,0.15)", cursor: "pointer" }}>
                  <div onClick={() => openLightbox(index)} style={{ height: 220, overflow: "hidden", borderBottom: `1px solid ${colors.border}`, background: "#27272a" }}>
                    <img src={item.image} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease", display: "block" }} onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")} onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")} />
                  </div>
                  <div style={{ padding: 20 }}>
                    <div style={{ display: "flex", gap: 12, justifyContent: "space-between", alignItems: "center" }}>
                      <h3 style={{ margin: 0, fontWeight: 700 }}>{item.title}</h3>
                      <span style={{ borderRadius: 999, background: "rgba(255,255,255,0.10)", color: "#fff", padding: "6px 10px", fontSize: 12 }}>{item.type}</span>
                    </div>
                    <p style={{ marginTop: 10, color: colors.softText, lineHeight: 1.7, fontSize: 14 }}>{item.note}</p>
                  </div>
                </SectionCard>
              ))}
            </div>
          )}

          {activeTab === "booking" && (
            <div style={{ display: "grid", gap: 24, gridTemplateColumns: "minmax(0,1.2fr) minmax(280px,0.8fr)" }}>
              <SectionCard style={{ borderColor: "rgba(125,211,252,0.15)" }}>
                <div style={{ borderBottom: `1px solid ${colors.border}`, padding: 24 }}><h2 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>Book a Tattoo Consultation</h2></div>
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
                    <textarea style={{ ...ui.textarea, minHeight: 130 }} value={form.idea} onChange={(e) => updateField("idea", e.target.value)} placeholder="Describe your tattoo idea" />
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{slots.map((slot) => <PillButton key={slot} active={selectedSlot === slot} palette="sky" onClick={() => setSelectedSlot(slot)}>{slot}</PillButton>)}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                      <div style={{ color: colors.softText, fontSize: 14 }}>Selected time: {selectedSlot}</div>
                      <a href={`https://wa.me/918200558801?text=${waBookingMessage}`} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}><PrimaryButton type="button">Send Booking Request</PrimaryButton></a>
                    </div>
                    {submitted && <div style={{ borderRadius: 18, border: "1px solid rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.10)", padding: 16, color: "#a7f3d0", fontSize: 14 }}>Booking preview submitted for {form.name || "client"}.</div>}
                  </form>
                </div>
              </SectionCard>
            </div>
          )}

          {activeTab === "contact" && (
            <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
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
