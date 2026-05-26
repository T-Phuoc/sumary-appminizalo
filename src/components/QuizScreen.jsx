import React, { useState, useEffect, useRef } from "react";
import { Box, Page, Text } from "zmp-ui";
import { useVisaTest } from "../context/VisaTestContext";
import { fetchQuestions } from "../services/apiService";
import { countryConfigs } from "../data/visaData";

const FISH_HTO_URL =
  "https://i.ibb.co/ZRBsM4Xw/sticker-hito-06-removebg-preview-1.png";

const OceanScene = ({ active }) => {
  const skyObjects = [
    { id: 1, icon: "✈️", type: "plane", top: "10%", size: "24px", dur: "18s", delay: "0s" },
    { id: 2, icon: "🕊️", type: "bird", top: "15%", size: "20px", dur: "22s", delay: "3s" },
    { id: 3, icon: "✈️", type: "plane", top: "22%", size: "24px", dur: "25s", delay: "10s", flip: true },
    { id: 4, icon: "🕊️", type: "bird", top: "28%", size: "20px", dur: "20s", delay: "6s" },
  ];

  const clouds = [
    { top: "3%", left: "5%", size: "55px", dur: "15s" },
    { top: "19%", right: "15%", size: "60px", dur: "18s" },
    { top: "8%", right: "30%", size: "65px", dur: "20s" },
    { top: "12%", left: "80%", size: "50px", dur: "14s" },
  ];

  return (
    <Box className={`ocean-scene ${active ? "is-transitioning" : ""}`} style={{ position: "absolute", width: "100%", height: "100%", overflow: "hidden", top: 0, left: 0, background: "#01579b" }}>
      <div className="ocean-sky"></div>
      {clouds.map((c, i) => (
        <Box key={`cloud-${i}`} style={{ position: "absolute", top: c.top, left: c.left, right: c.right, fontSize: c.size, opacity: 0.4, zIndex: 1, filter: "blur(1px)", animation: `float-slow ${c.dur} ease-in-out infinite` }}>☁️</Box>
      ))}
      {skyObjects.map((obj) => (
        <Box key={obj.id} style={{ position: "absolute", top: obj.top, fontSize: obj.size, zIndex: 2, animation: `plane-fly ${obj.dur} linear infinite ${obj.delay}`, transform: obj.flip ? "scaleX(-1)" : "none", pointerEvents: "none", opacity: 0.6 }}>{obj.icon}</Box>
      ))}
      <div className="wave-layer wave-back"></div>
      <div className="wave-layer wave-middle"></div>
      <div className="wave-layer wave-front"></div>
      <div className="sea-foam foam-1"></div>
      <div className="ocean-overlay"></div>
    </Box>
  );
};

function QuizScreen() {
  const { selectedVisaType, selectedCountry, setAnswer, setStep } = useVisaTest();
  const [questions, setQuestions] = useState([]);
  const [qIdx, setQIdx] = useState(0);
  const [slideDir, setSlideDir] = useState("in");
  const [selected, setSelected] = useState(null);
  const [transitioning, setTransitioning] = useState(false);

  const bgAudio = useRef(new Audio("https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3"));
  const soundTing = useRef(new Audio("https://cdn.pixabay.com/audio/2022/03/10/audio_c35278d633.mp3"));

  // 7 bảng màu rực rỡ cho các câu trả lời
  const rainbowColors = [
    { main: "#01579b", light: "#4fc3f7", glow: "rgba(1, 87, 155, 0.5)" },    // Xanh dương
    { main: "#d81b60", light: "#f48fb1", glow: "rgba(216, 27, 96, 0.5)" },   // Hồng san hô
    { main: "#2e7d32", light: "#a5d6a7", glow: "rgba(46, 125, 50, 0.5)" },   // Lục bảo
    { main: "#f57c00", light: "#ffcc80", glow: "rgba(245, 124, 0, 0.5)" },   // Cam mặt trời
    { main: "#6a1b9a", light: "#ce93d8", glow: "rgba(106, 27, 154, 0.5)" },  // Tím thạch anh
    { main: "#00838f", light: "#80deea", glow: "rgba(0, 131, 143, 0.5)" },   // Teal
    { main: "#c62828", light: "#ef9a9a", glow: "rgba(198, 40, 40, 0.5)" },   // Đỏ Ruby
  ];

  useEffect(() => {
    fetchQuestions(selectedVisaType, selectedCountry).then((data) => setQuestions(data || []));
  }, [selectedVisaType, selectedCountry]);

  useEffect(() => {
    const audio = bgAudio.current;
    audio.loop = true;
    audio.volume = 0.1;
    const play = () => audio.play().catch(() => {});
    window.addEventListener("click", play);
    return () => { audio.pause(); window.removeEventListener("click", play); };
  }, []);

  if (!questions.length) return null;
  const q = questions[qIdx];
  const progress = ((qIdx + 1) / questions.length) * 100;

  const handleSelect = (points, idx) => {
    if (transitioning) return;
    soundTing.current.play().catch(() => {});
    setSelected(idx);
    setAnswer(q.id, points);
    setTransitioning(true);

    setTimeout(() => {
      setSlideDir("out");
      setTimeout(() => {
        if (qIdx >= questions.length - 1) {
          setStep("result");
        } else {
          setQIdx((prev) => prev + 1);
          setSelected(null);
          setSlideDir("in");
          setTransitioning(false);
        }
      }, 400);
    }, 500);
  };

  return (
    <Page style={{ position: "relative", overflow: "hidden", background: "#e0f7fa" }}>
      <OceanScene active={transitioning} />

      <div className="bubbles-container">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`bubble b${i % 3}`} style={{ left: `${Math.random() * 90}%`, animationDelay: `${Math.random() * 5}s` }}></div>
        ))}
      </div>

      <Box style={{ position: "relative", zIndex: 10, padding: "env(safe-area-inset-top) 20px 20px", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        
        {/* Badge tiêu đề */}
        <Box className="anim-fade-down badge-deep-sea pulse-slow shine-effect" style={{ marginBottom: 20, borderRadius: 50, padding: "12px 28px", background: "linear-gradient(135deg, #01579b, #00acc1, #01579b)", backgroundSize: '200% auto', border: "3px solid #01579b", boxShadow: "0 10px 25px rgba(0, 172, 193, 0.5)", animation: 'shine-btn 3s linear infinite' }}>
          <Text style={{ fontSize: 13, fontWeight: 900, color: "#fff", letterSpacing: "1.5px", textTransform: 'uppercase' }}>
            {countryConfigs[selectedCountry]?.name} • {selectedVisaType === "study" ? "DU HỌC" : "DU LỊCH"}
          </Text>
        </Box>

        {/* KHUNG CÂU HỎI */}
        <Box
          className={`app-card card-deep-sea ${slideDir === "out" ? "quiz-slide-out" : "quiz-slide-in"}`}
          style={{
            padding: "35px 24px",
            width: "100%",
            maxWidth: 420,
            height: 650, 
            background: "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(224,247,250,0.95) 100%)",
            backdropFilter: "blur(25px)",
            borderRadius: 55,
            border: "6px solid #01579b",
            boxShadow: "0 40px 80px rgba(1, 87, 155, 0.3), inset 0 0 30px rgba(255, 255, 255, 0.5)",
            position: "relative",
            zIndex: 15,
            display: "flex",
            flexDirection: "column",
            overflow: 'hidden'
          }}
        >
          {/* Thanh Tiến Trình Neon */}
          <Box style={{ marginBottom: 25 }}>
            <Box style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: 900, color: "#01579b" }}>CÂU HỎI {qIdx + 1}/{questions.length}</Text>
              <Text style={{ fontSize: 14, fontWeight: 900, color: "#00acc1" }}>{Math.round(progress)}%</Text>
            </Box>
            <Box style={{ height: 12, width: "100%", background: "rgba(1, 87, 155, 0.1)", borderRadius: 20, padding: 2 }}>
              <Box className="shine-effect" style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #00acc1, #01579b, #00acc1)", backgroundSize: '200% auto', borderRadius: 20, transition: "width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)", boxShadow: '0 0 12px rgba(0, 172, 193, 0.6)' }} />
            </Box>
          </Box>

          <Box style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {/* Câu hỏi */}
            <Box style={{ height: 110, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
              <Text style={{ fontSize: 22, fontWeight: 900, color: "#01579b", textAlign: "center", lineHeight: 1.4, textShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                {q.question || q.title}
              </Text>
            </Box>

            {/* Danh sách 7 màu sắc đáp án */}
            <Box style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {q.options.map((opt, idx) => {
                const isActive = selected === idx;
                const colorTheme = rainbowColors[idx % rainbowColors.length];

                return (
                  <button
                    key={idx}
                    className={`option-item-sea ${isActive ? "selected active-glow" : ""} shine-effect`}
                    onClick={() => handleSelect(opt.points, idx)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "16px 20px",
                      borderRadius: 26,
                      border: `3px solid ${isActive ? colorTheme.main : "rgba(1, 87, 155, 0.1)"}`,
                      background: isActive ? "#fff" : "rgba(255, 255, 255, 0.85)",
                      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      transform: isActive ? "scale(0.96)" : "none",
                      textAlign: "left",
                      position: "relative",
                      overflow: "hidden",
                      boxShadow: isActive ? `0 15px 30px ${colorTheme.glow}` : "0 4px 10px rgba(0,0,0,0.03)"
                    }}
                  >
                    {/* Badge Chữ Cái với Gradient riêng */}
                    <Box style={{ 
                        width: 42, height: 42, borderRadius: 15, 
                        background: isActive 
                          ? `linear-gradient(135deg, ${colorTheme.main}, ${colorTheme.light})` 
                          : "linear-gradient(135deg, #f1f5f9, #e2e8f0)", 
                        display: "flex", alignItems: "center", justifyContent: "center", 
                        flexShrink: 0,
                        border: isActive ? "2px solid #fff" : "1px solid rgba(0,0,0,0.05)",
                        boxShadow: isActive ? '0 4px 8px rgba(0,0,0,0.1)' : 'none'
                    }}>
                      <Text style={{ fontWeight: 900, color: isActive ? "#fff" : colorTheme.main, fontSize: 18 }}>
                        {"ABCDEF"[idx]}
                      </Text>
                    </Box>

                    <Text style={{ 
                        marginLeft: 18, fontWeight: 800, 
                        color: isActive ? colorTheme.main : "#37474f", 
                        fontSize: 15, flex: 1, lineHeight: 1.2 
                    }}>
                      {opt.text}
                    </Text>

                    {/* Thanh chỉ báo năng lượng khi chọn */}
                    {isActive && (
                        <Box style={{ 
                          position: 'absolute', right: 0, top: 0, bottom: 0, width: 6, 
                          background: colorTheme.main, 
                          animation: 'energy-flow 1s infinite alternate' 
                        }} />
                    )}
                  </button>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>

      <style>{`
        .quiz-slide-in { animation: cardEnter 0.7s cubic-bezier(0.19, 1, 0.22, 1) both; }
        .quiz-slide-out { animation: cardExit 0.4s cubic-bezier(1, 0, 0, 1) both; }

        @keyframes cardEnter {
          0% { opacity: 0; transform: translateY(50px) scale(0.92) rotateX(-5deg); }
          100% { opacity: 1; transform: translateY(0) scale(1) rotateX(0); }
        }
        @keyframes cardExit {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.95) translateY(-40px) filter(blur(8px)); }
        }

        .active-glow {
            animation: borderGlow 1.5s infinite ease-in-out;
        }
        @keyframes borderGlow {
            0%, 100% { opacity: 1; filter: brightness(1); }
            50% { opacity: 0.9; filter: brightness(1.1); }
        }

        @keyframes energy-flow {
            from { height: 30%; top: 35%; opacity: 0.5; }
            to { height: 100%; top: 0%; opacity: 1; }
        }

        .shine-effect::after {
          content: ""; position: absolute; top: 0; left: -150%; width: 60%; height: 100%;
          background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.6), transparent);
          transform: skewX(-25deg); animation: shine 5s infinite;
        }
        @keyframes shine { 0% { left: -150%; } 20% { left: 150%; } 100% { left: 150%; } }

        .pulse-slow { animation: pulseAnim 3s infinite; }
        @keyframes pulseAnim { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.03); } }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(10px); }
        }

        .bubbles-container { position: absolute; width: 100%; height: 100%; pointer-events: none; z-index: 3; }
        .bubble { position: absolute; bottom: -20px; background: rgba(255, 255, 255, 0.35); border-radius: 50%; animation: bubble-up 8s infinite ease-in; }
        .b0 { width: 22px; height: 22px; }
        .b1 { width: 14px; height: 14px; }
        .b2 { width: 18px; height: 18px; }
        @keyframes bubble-up {
          0% { transform: translateY(0); opacity: 0; }
          20% { opacity: 0.4; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }

        .option-item-sea:active { transform: scale(0.9); }
      `}</style>
    </Page>
  );
}

export default QuizScreen;
