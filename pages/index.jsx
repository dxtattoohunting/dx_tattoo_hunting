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
  return <button {...props} style={{ borderRadius: 18, background: colors.lime, color: "#000", border: "none", padding: "14px 24px", fontWeight: 700, cursor: "pointer", transition: "transform 0.2s ease, box-shadow 0.2s ease", ...style }}>{children}</button>;
}
function OutlineButton({ children, color = "sky", style = {}, ...props }) {
  const borderColor = color === "lime" ? "rgba(163,230,53,0.35)" : "rgba(125,211,252,0.35)";
  const textColor = color === "lime" ? "#ecfccb" : "#e0f2fe";
  return <button {...props} style={{ borderRadius: 18, background: "transparent", color: textColor, border: `1px solid ${borderColor}`, padding: "14px 24px", fontWeight: 700, cursor: "pointer", ...style }}>{children}</button>;
}
function Badge({ children, palette = "lime" }) {
  const borderColor = palette === "sky" ? "rgba(125,211,252,0.20)" : "rgba(163,230,53,0.20)";
  const bg = palette === "sky" ? "rgba(125,211,252,0.10)" : "rgba(163,230,53,0.10)";
  const color = palette === "sky" ? "#bae6fd" : "#d9f99d";
  return <span style={{ display: "inline-flex", borderRadius: 999, border: `1px solid ${borderColor}`, background: bg, color, padding: "6px 14px", fontSize: 13 }}>{children}</span>;
}
function PillButton({ active, palette = "lime", children, onClick, type = "button" }) {
  const activeStyle = palette === "sky" ? { border: `1px solid ${colors.sky}`, background: colors.sky, color: "#000" } : { border: `1px solid ${colors.lime}`, background: colors.lime, color: "#000" };
  const idleStyle = palette === "sky" ? { border: "1px solid rgba(125,211,252,0.25)", background: colors.panelSoft, color: "#e0f2fe" } : { border: "1px solid rgba(163,230,53,0.25)", background: colors.panelSoft, color: "#ecfccb" };
  return <button type={type} onClick={onClick} style={{ borderRadius: 999, padding: "10px 16px", fontSize: 14, cursor: "pointer", ...(active ? activeStyle : idleStyle) }}>{children}</button>;
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("services");
  const [selectedStyle, setSelectedStyle] = useState("Hyper Realistic");
  const [selectedSlot, setSelectedSlot] = useState("4:00 PM");
  const [generator, setGenerator] = useState({ prompt: "", placement: "", size: "", style: "", tone: "Black & Grey", details: "" });
  const [generatorResult, setGeneratorResult] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", idea: "", placement: "", budget: "" });
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const selectedStyleData = useMemo(() => tattooStyles.find((item) => item.name === selectedStyle), [selectedStyle]);
  const updateField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const updateGenerator = (key, value) => setGenerator((prev) => ({ ...prev, [key]: value }));
  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  const nextImage = () => setLightboxIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));

  const quickBookingLink = `https://wa.me/918200568801?text=Hello%20I%20want%20to%20book%20a%20${encodeURIComponent(selectedStyle)}%20tattoo.%20Preferred%20slot:%20${encodeURIComponent(selectedSlot)}`;
  const bookingLink = `https://wa.me/918200568801?text=Hello%20I%20want%20to%20book%20a%20tattoo.%0AName:%20${encodeURIComponent(form.name || "")}%0APhone:%20${encodeURIComponent(form.phone || "")}%0APlacement:%20${encodeURIComponent(form.placement || "")}%0ABudget:%20${encodeURIComponent(form.budget || "")}%0AIdea:%20${encodeURIComponent(form.idea || "")}%0APreferred%20Slot:%20${encodeURIComponent(selectedSlot)}`;

  const handleGeneratePreview = () => {
    setGeneratorResult({
      title: generator.prompt || "Custom Tattoo Idea",
      placement: generator.placement || "Placement not selected",
      size: generator.size || "Size not selected",
      style: generator.style || selectedStyle,
      tone: generator.tone || "Black & Grey",
      details: generator.details || "No extra details added yet.",
    });
    if (generator.style) setSelectedStyle(generator.style);
  };

  const tabButton = (key, label, palette) => {
    const active = activeTab === key;
    const activeStyle = palette === "sky" ? { background: colors.sky, color: "#000" } : { background: colors.lime, color: "#000" };
    return <button key={key} onClick={() => setActiveTab(key)} className="mobile-tab-btn" style={{ border: "none", borderRadius: 16, background: active ? activeStyle.background : "transparent", color: active ? activeStyle.color : colors.text, padding: "12px 16px", fontWeight: 700, cursor: "pointer" }}>{label}</button>;
  };

  return (
    <div style={ui.page}>
      <style>{`
        .hero-grid,.ai-grid,.location-grid,.booking-grid,.gallery-grid,.services-grid,.contact-grid,.showcase-grid,.metric-grid,.tab-grid,.two-col-grid{display:grid;gap:24px}
        .hero-grid{grid-template-columns:repeat(auto-fit,minmax(320px,1fr));align-items:center}
        .ai-grid,.showcase-grid{grid-template-columns:repeat(auto-fit,minmax(320px,1fr))}
        .location-grid{grid-template-columns:minmax(280px,1.05fr) minmax(240px,0.95fr)}
        .booking-grid{grid-template-columns:minmax(0,1.2fr) minmax(280px,0.8fr)}
        .gallery-grid{grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px}
        .services-grid,.contact-grid{grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px}
        .metric-grid{grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px}
        .tab-grid{grid-template-columns:repeat(4,1fr);gap:8px}
        .two-col-grid{grid-template-columns:1fr 1fr;gap:16px}
        @media (max-width:900px){.location-grid,.booking-grid{grid-template-columns:1fr}}
        @media (max-width:700px){.tab-grid{grid-template-columns:1fr 1fr}.two-col-grid{grid-template-columns:1fr}}
        @media (max-width:520px){.mobile-section-padding{padding:18px !important}.mobile-tight-padding{padding:14px !important}.mobile-title{font-size:32px !important}.mobile-card-title{font-size:18px !important}.mobile-tab-btn{font-size:13px !important;padding:10px 12px !important}}
      `}</style>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeLightbox} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <button onClick={closeLightbox} style={{ position: "absolute", top: 18, right: 18, background: "rgba(255,255,255,0.12)", border: "none", color: "#fff", borderRadius: 999, width: 42, height: 42, cursor: "pointer" }}><X size={20} /></button>
            <button onClick={(e) => { e.stopPropagation(); prevImage(); }} style={{ position: "absolute", left: 18, background: "rgba(255,255,255,0.12)", border: "none", color: "#fff", borderRadius: 999, width: 42, height: 42, cursor: "pointer" }}><ChevronLeft size={20} /></button>
            <button onClick={(e) => { e.stopPropagation(); nextImage(); }} style={{ position: "absolute", right: 70, background: "rgba(255,255,255,0.12)", border: "none", color: "#fff", borderRadius: 999, width: 42, height: 42, cursor: "pointer" }}><ChevronRight size={20} /></button>
            <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: 1000, width: "100%" }}>
              <img src={gallery[lightboxIndex].image} style={{ width: "100%", maxHeight: "78vh", objectFit: "contain", borderRadius: 24 }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section style={{ position: "relative", overflow: "hidden", borderBottom: `1px solid ${colors.border}`, padding: "48px 0 64px" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at top right, rgba(163,230,53,0.14), transparent 25%), radial-gradient(circle at bottom left, rgba(125,211,252,0.12), transparent 22%)", pointerEvents: "none" }} />
        <div style={ui.container}>
          <div className="hero-grid" style={{ position: "relative" }}>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge>Tattoo Studio • Baroda • Custom Premium Tattoos</Badge>
              <div style={{ marginTop: 14 }}>
                <h1 className="mobile-title" style={{ margin: 0, fontSize: "clamp(36px, 7vw, 64px)", lineHeight: 1.05, fontWeight: 800 }}>Dx Tattoo Hunting Baroda</h1>
                <p style={{ margin: "10px 0 0", fontStyle: "italic", color: "#bef264", fontSize: 18 }}>Make your look more attractive...</p>
                <p style={{ color: colors.softText, lineHeight: 1.75, maxWidth: 620 }}>Permanent tattoos in Baroda with strong custom artwork, realistic detailing, script tattoos, color tattoos, and premium body-placement concepts.</p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 18 }}>
                <a href="https://wa.me/918200568801?text=Hello%20I%20want%20to%20book%20a%20tattoo" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}><PrimaryButton>Book on WhatsApp</PrimaryButton></a>
                <OutlineButton onClick={() => { const section = document.getElementById("gallery-section"); if (section) section.scrollIntoView({ behavior: "smooth", block: "start" }); }}>See Tattoo Work</OutlineButton>
                <a href="https://instagram.com/dx_tattoo_hunting" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}><OutlineButton color="lime"><span style={{ display: "inline-flex", alignItems: "center" }}><Instagram size={16} style={{ marginRight: 8 }} /> @dx_tattoo_hunting</span></OutlineButton></a>
              </div>
              <div className="metric-grid" style={{ paddingTop: 14 }}>
                {[["Custom","Tattoo Concepts"],["Black & Grey","And Color Work"],["Premium","Tattoo Experience"]].map(([title,sub])=>(
                  <div key={title} className="mobile-tight-padding" style={{ borderRadius: 18, border: `1px solid ${colors.border}`, background: colors.panelSoft, padding: 16 }}>
                    <div style={{ fontSize: 28, fontWeight: 800 }}>{title}</div>
                    <div style={{ color: colors.softText, fontSize: 14 }}>{sub}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.1 }}>
              <SectionCard style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(163,230,53,0.2)" }}>
                <div className="mobile-section-padding" style={{ padding: 24 }}>
                  <h2 className="mobile-card-title" style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 28, fontWeight: 800, color: colors.sky, margin: 0 }}><Sparkles size={24} color={colors.lime} /> Quick Booking Preview</h2>
                </div>
                <div className="mobile-section-padding" style={{ padding: "0 24px 24px", display: "grid", gap: 16 }}>
                  <div className="two-col-grid">
                    <div style={{ borderRadius: 18, border: `1px solid ${colors.border}`, background: colors.panelDark, padding: 16 }}>
                      <div style={{ color: colors.softText, fontSize: 14, marginBottom: 6 }}>Selected Style</div>
                      <div style={{ fontSize: 22, fontWeight: 700, color: colors.sky }}>{selectedStyle}</div>
                      <div style={{ color: colors.softText, fontSize: 14, marginTop: 4 }}>{selectedStyleData?.price}</div>
                    </div>
                    <div style={{ borderRadius: 18, border: `1px solid ${colors.border}`, background: colors.panelDark, padding: 16 }}>
                      <div style={{ color: colors.softText, fontSize: 14, marginBottom: 6 }}>Preferred Slot</div>
                      <div style={{ fontSize: 22, fontWeight: 700, color: colors.sky }}>{selectedSlot}</div>
                      <div style={{ color: colors.softText, fontSize: 14, marginTop: 4 }}>Ready to book on WhatsApp</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{tattooStyles.slice(0,4).map((style)=><PillButton key={style.name} active={selectedStyle===style.name} palette="lime" onClick={()=>setSelectedStyle(style.name)}>{style.name}</PillButton>)}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{slots.slice(0,4).map((slot)=><PillButton key={slot} active={selectedSlot===slot} palette="sky" onClick={()=>setSelectedSlot(slot)}>{slot}</PillButton>)}</div>
                  <a href={quickBookingLink} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}><PrimaryButton style={{ width: "100%" }}>Continue with {selectedStyle} • {selectedSlot}</PrimaryButton></a>
                </div>
              </SectionCard>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
