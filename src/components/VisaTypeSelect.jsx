import React, { useState } from "react";
import { Box, Page, Text } from "zmp-ui";
import { useVisaTest } from "../context/VisaTestContext";

const FISH_HTO_URL =
  "https://i.ibb.co/ZRBsM4Xw/sticker-hito-06-removebg-preview-1.png";

const OceanBackground = () => {
  return (
    <Box
      className="ocean-scene"
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        top: 0,
        left: 0,
        background: "#01579b",
      }}
    >
      <div className="ocean-sky"></div>
      <div className="wave-layer wave-back"></div>
      <div className="wave-layer wave-middle"></div>
      <div className="wave-layer wave-front"></div>
      <div className="sea-foam foam-1"></div>
      <div className="ocean-overlay"></div>
    </Box>
  );
};

function VisaTypeSelect() {
  const { setSelectedVisaType, setStep } = useVisaTest();
  const [hoveredKey, setHoveredKey] = useState(null);

  const handleSelect = (type) => {
    setHoveredKey(type);
    setTimeout(() => {
      setSelectedVisaType(type);
      setStep("country");
    }, 250); // Tăng nhẹ thời gian để người dùng kịp thấy hiệu ứng nhấn
  };

  const types = [
    {
      key: "study",
      icon: "🎓",
      title: "Visa Du Học",
      desc: "Đánh giá tỷ lệ đỗ visa du học dựa trên tài chính, hồ sơ & năng lực",
      gradient: "linear-gradient(135deg, #01579b, #00acc1)",
      bgGradient: "rgba(255, 255, 255, 0.95)",
      border: "#01579b",
      tags: ["Tài chính", "Hồ sơ", "Cam kết"],
    },
    {
      key: "tourist",
      icon: "✈️",
      title: "Visa Du Lịch",
      desc: "Phân tích khả năng xin visa du lịch, thăm thân, tự túc hoặc theo tour",
      gradient: "linear-gradient(135deg, #0d9488, #2dd4bf)",
      bgGradient: "rgba(255, 255, 255, 0.95)",
      border: "#0d9488",
      tags: ["Lịch trình", "Tài chính", "Ràng buộc"],
    },
  ];

  return (
    <Page
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#e0f7fa",
      }}
    >
      <OceanBackground />

      <div className="bubbles-container">
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`bubble b${i}`}></div>
        ))}
      </div>

      <Box
        style={{
          position: "relative",
          zIndex: 10,
          padding: "env(safe-area-inset-top) 14px 16px",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box style={{ position: "relative", width: "100%", maxWidth: 420 }}>
          {/* Con cá bơi nhô cao hơn tạo chiều sâu */}
          <Box
            style={{
              position: "absolute",
              top: -90,
              right: -10,
              width: 140,
              height: 140,
              zIndex: 11,
              pointerEvents: "none",
              animation: "fish-float-subtle 4s ease-in-out infinite",
            }}
          >
            <img
              src={FISH_HTO_URL}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                filter: "drop-shadow(0 12px 20px rgba(0,0,0,0.25))",
              }}
            />
          </Box>

          <Box
            className="app-card card-deep-sea anim-fade-up"
            style={{
              padding: "28px 16px",
              width: "100%",
              maxWidth: 460,
              position: "relative",
              zIndex: 15,
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              border: "5px solid #01579b",
              borderRadius: 55,
              background: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(12px)",
            }}
          >
            <Box style={{ textAlign: "center", marginBottom: 20 }}>
              <Box
                className="badge-deep-sea pulse-slow shine-effect"
                style={{
                  display: "inline-block",
                  padding: "8px 22px",
                  borderRadius: 50,
                  marginBottom: 12,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: 900,
                    color: "#fff",
                    letterSpacing: "1.5px",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  MỤC ĐÍCH VISA
                </Text>
              </Box>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: "#01579b",
                  letterSpacing: "-0.5px",
                }}
              >
                Bạn cần visa gì?
              </Text>
            </Box>

            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                marginBottom: 20,
              }}
            >
              {types.map((t, i) => {
                const isActive = hoveredKey === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => handleSelect(t.key)}
                    className={`visa-card-item shine-effect ${isActive ? "selected" : ""}`}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "18px 16px",
                      borderRadius: 28,
                      border: `3px solid ${isActive ? t.border : "rgba(1, 87, 155, 0.15)"}`,
                      background: t.bgGradient,
                      position: "relative",
                      overflow: "hidden",
                      transition:
                        "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      transform: isActive ? "scale(0.96)" : "scale(1)",
                      boxShadow: isActive
                        ? `0 0 20px ${t.border}44`
                        : "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        marginBottom: 10,
                        position: "relative",
                        zIndex: 2,
                      }}
                    >
                      <Box
                        className="icon-box"
                        style={{
                          width: 58,
                          height: 58,
                          borderRadius: 20,
                          background: t.gradient,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
                        }}
                      >
                        <Text style={{ fontSize: 30 }}>{t.icon}</Text>
                      </Box>
                      <Box style={{ flex: 1 }}>
                        <Text
                          style={{
                            fontSize: 19,
                            fontWeight: 900,
                            color: "#01579b",
                          }}
                        >
                          {t.title}
                        </Text>
                        <Text
                          style={{
                            fontSize: 13,
                            color: "#01579b",
                            opacity: 0.8,
                            fontWeight: 700,
                            lineHeight: 1.4,
                          }}
                        >
                          {t.desc}
                        </Text>
                      </Box>
                    </Box>

                    <Box
                      style={{
                        display: "flex",
                        gap: 8,
                        marginLeft: 74,
                        position: "relative",
                        zIndex: 2,
                      }}
                    >
                      {t.tags.map((tag, ti) => (
                        <Text
                          key={ti}
                          style={{
                            fontSize: 11,
                            fontWeight: 800,
                            color: isActive ? "#fff" : "#01579b",
                            background: isActive
                              ? t.gradient
                              : "rgba(1, 87, 155, 0.08)",
                            borderRadius: 10,
                            padding: "4px 12px",
                            transition: "all 0.3s ease",
                          }}
                        >
                          {tag}
                        </Text>
                      ))}
                    </Box>
                  </button>
                );
              })}
            </Box>

            <button
              className="btn-secondary active-tap"
              onClick={() => setStep("user_info")}
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: 20,
                fontWeight: 800,
                color: "#01579b",
                border: "2px solid #01579b",
                background: "transparent",
              }}
            >
              ← Quay Lại
            </button>

            <Box className="step-dots" style={{ marginTop: 18 }}>
              <Box className="step-dot done" />
              <Box className="step-dot active" />
              <Box className="step-dot" />
              <Box className="step-dot" />
              <Box className="step-dot" />
            </Box>
          </Box>
        </Box>
      </Box>

      <style>{`
        /* Luồng sáng chạy qua cực mượt */
        .shine-effect::after {
          content: "";
          position: absolute;
          top: 0;
          left: -150%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.6) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-25deg);
          animation: shine 3.5s infinite ease-in-out;
          z-index: 1;
        }
        @keyframes shine {
          0% {
            left: -150%;
          }
          20% {
            left: 150%;
          }
          100% {
            left: 150%;
          }
        }

        /* Hiệu ứng con cá bơi sống động */
        @keyframes fish-float-subtle {
          0%,
          100% {
            transform: translate(0, 0) rotate(8deg);
          }
          50% {
            transform: translate(-20px, -20px) rotate(-3deg);
          }
        }

        /* Bong bóng đa dạng kích thước */
        .bubble {
          position: absolute;
          bottom: -30px;
          background: rgba(255, 255, 255, 0.25);
          border-radius: 50%;
          animation: bubble-up 7s infinite ease-in;
        }
        .b0 {
          left: 5%;
          width: 25px;
          height: 25px;
          animation-delay: 0.5s;
        }
        .b1 {
          left: 25%;
          width: 12px;
          height: 12px;
          animation-delay: 2s;
        }
        .b2 {
          left: 50%;
          width: 18px;
          height: 18px;
          animation-delay: 4s;
        }
        .b3 {
          left: 80%;
          width: 10px;
          height: 10px;
          animation-delay: 1s;
        }
        .b4 {
          left: 90%;
          width: 22px;
          height: 22px;
          animation-delay: 5s;
        }

        @keyframes bubble-up {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          20% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-100vh) scale(1.5);
            opacity: 0;
          }
        }

        /* Hiệu ứng khi nhấn (kích thích xúc giác) */
        .visa-card-item:active {
          transform: scale(0.92);
        }
        .active-tap:active {
          background: rgba(1, 87, 155, 0.1);
        }

        .icon-box {
          transition: all 0.3s ease;
        }
        .visa-card-item.selected .icon-box {
          transform: rotate(10deg) scale(1.1);
        }
      `}</style>
    </Page>
  );
}

export default VisaTypeSelect;
