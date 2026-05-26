import React, { useState, useEffect, useRef } from 'react';
import { Box, Page, Text } from 'zmp-ui';
import { useVisaTest } from '../context/VisaTestContext';
import { countryConfigs } from '../data/visaData';
import { calculateVisaResultAPI, submitToGoogleSheet } from '../services/apiService';
import { openPhone } from 'zmp-sdk/apis';

const flagMap = { usa:'us', canada:'ca', australia:'au', japan:'jp', korea:'kr', schengen:'de', taiwan:'tw', china:'cn', poland:'pl', newzealand:'nz' };

const themes = {
  green:  { gradient: 'linear-gradient(135deg, #059669, #10b981)', bg: '#ecfdf5', text: '#059669', border: '#6ee7b7', stroke: '#10b981', ring: '#a7f3d0', glow: 'rgba(16,185,129,0.4)' },
  blue:   { gradient: 'linear-gradient(135deg, #2563eb, #4f46e5)', bg: '#eff6ff', text: '#2563eb', border: '#93c5fd', stroke: '#3b82f6', ring: '#bfdbfe', glow: 'rgba(59,130,246,0.4)' },
  yellow: { gradient: 'linear-gradient(135deg, #d97706, #f59e0b)', bg: '#fffbeb', text: '#b45309', border: '#fcd34d', stroke: '#f59e0b', ring: '#fde68a', glow: 'rgba(245,158,11,0.4)' },
  red:    { gradient: 'linear-gradient(135deg, #dc2626, #ef4444)', bg: '#fef2f2', text: '#dc2626', border: '#fca5a5', stroke: '#ef4444', ring: '#fecaca', glow: 'rgba(239,68,68,0.4)' },
};

function ResultScreen() {
  const { answers, selectedCountry, selectedVisaType, userInfo, resetAll } = useVisaTest();
  const [animScore, setAnimScore] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBreakdownOpen, setIsBreakdownOpen] = useState(false);

  const config = countryConfigs[selectedCountry];

  const handleCallHotline = () => {
    openPhone({ phoneNumber: '18009078' });
  };

  useEffect(() => {
    calculateVisaResultAPI(answers, selectedCountry, selectedVisaType).then(data => {
      if (data) setResult(data);
      setLoading(false);
    });
  }, [answers, selectedCountry, selectedVisaType]);

  const theme = result ? (themes[result.color] || themes.red) : themes.red;

  useEffect(() => {
    if (!result) return;
    let s = 0;
    const end = result.totalScore;
    const inc = Math.max(end / 60, 0.5);
    const timer = setInterval(() => {
      s += inc;
      if (s >= end) { setAnimScore(end); clearInterval(timer); }
      else setAnimScore(Math.round(s));
    }, 25);
    setTimeout(() => setShowContent(true), 800);
    return () => clearInterval(timer);
  }, [result]);

  // ResultScreen.jsx - Phần useEffect xử lý submission
// Thêm useRef vào phần khai báo ở đầu component
const hasSubmitted = useRef(false); 

useEffect(() => {
  // 1. Kiểm tra kỹ: Đã submit chưa? Có kết quả chưa? Có thông tin user chưa?
  if (hasSubmitted.current || !result || !userInfo) {
    console.log("⏭️ Bỏ qua submit vì: ", { 
      da_gui: hasSubmitted.current, 
      co_kq: !!result, 
      co_user: !!userInfo?.full_name 
    });
    return;
  }

  const performSubmit = async () => {
    // 2. Khóa ngay lập tức để không bao giờ chạy lại lần 2
    hasSubmitted.current = true;
    setSubmitted(true); // Vẫn giữ để cập nhật UI nếu cần

    const submissionData = {
      full_name: userInfo.full_name || 'Khách ẩn danh',
      phone: userInfo.phone || '',
      email: userInfo.email || '',
      birth_date: userInfo.birth_date || '',
      country: config?.name || selectedCountry,
      visa_type: selectedVisaType === 'study' ? 'Du học' : 'Du lịch',
      total_score: result.totalScore,
      rating: result.rating,
      status: result.status,
      success_rate: result.rate
    };

    console.log('📤 Đang thực hiện submit tự động...', submissionData);
    
    // 3. Ép điện thoại hiện thông báo để debug
    // alert("Đang gửi hồ sơ của: " + submissionData.full_name); 

    try {
      const res = await submitToGoogleSheet(submissionData);
      if (res.success) {
        console.log('✅ BACKEND XÁC NHẬN: Hồ sơ đã lưu!');
      } else {
        console.error('❌ BACKEND LỖI: ', res.error);
        // Nếu lỗi, có thể mở khóa để user thử lại (tùy bạn)
        // hasSubmitted.current = false; 
      }
    } catch (error) {
      console.error('🔥 LỖI KẾT NỐI MẠNG:', error);
    }
  };

  performSubmit();
}, [result, userInfo]); // Loại bỏ 'submitted' khỏi dependency để tránh loop

  if (loading || !result) {
    return (
      <Page style={{ background: '#f8fafc' }}>
        <Box style={{ padding: 40, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Box className="anim-pulse" style={{ width: 100, height: 100, borderRadius: 30, marginBottom: 20, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
            <Text style={{ fontSize: 44 }} className="anim-bounce">📊</Text>
          </Box>
          <Text style={{ color: '#1e293b', fontSize: 18, fontWeight: 800 }}>Đang thẩm định hồ sơ...</Text>
        </Box>
      </Page>
    );
  }

  const flagUrl = `https://flagcdn.com/w160/${flagMap[selectedCountry] || selectedCountry}.png`;
  const radius = 52;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (result.percentage / 100) * circ;

  return (
    <Page style={{ background: '#f8fafc' }}>
      <Box className="safe-bottom" style={{ padding: '16px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* 1. Header gradient card */}
        <Box className="anim-fade-down" style={{
          width: '100%', maxWidth: 420, borderRadius: 28, padding: '32px 22px 68px',
          background: theme.gradient, textAlign: 'center', position: 'relative', overflow: 'hidden',
          boxShadow: `0 20px 40px ${theme.glow}, inset 0 0 20px rgba(255,255,255,0.1)`,
        }}>
          <div className="anim-float" style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
          <Box style={{ position: 'relative', zIndex: 1 }}>
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 12 }}>
              <img src={flagUrl} alt="" style={{ width: 30, height: 20, borderRadius: 4, objectFit: 'cover', border: '1.5px solid rgba(255,255,255,0.5)' }} />
              <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' }}>
                {selectedVisaType === 'study' ? 'Visa Du Học' : 'Visa Du Lịch'} • {config?.name}
              </Text>
            </Box>
            <Text style={{ color: '#fff', fontSize: 28, fontWeight: 900 }}>Kết Quả Đánh Giá</Text>
          </Box>
        </Box>

        {/* 2. Score gauge */}
        <Box className="anim-scale-in" style={{ marginTop: -52, zIndex: 10, marginBottom: 20 }}>
          <Box style={{ background: '#fff', borderRadius: '50%', padding: 10, boxShadow: `0 15px 35px rgba(0,0,0,0.12)` }}>
            <Box style={{ position: 'relative', width: 125, height: 125, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }} viewBox="0 0 120 120">
                <circle cx="60" cy="60" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="10" />
                <circle cx="60" cy="60" r={radius} fill="none" stroke={theme.stroke} strokeWidth="10" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} style={{ transition: 'stroke-dashoffset 1.5s ease-out' }} />
              </svg>
              <Box style={{ textAlign: 'center', zIndex: 1 }}>
                <Text style={{ fontSize: 38, fontWeight: 900, color: theme.text }}>{animScore}</Text>
                <Text style={{ fontSize: 11, color: '#94a3b8', fontWeight: 800 }}>/ 100 ĐIỂM</Text>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* 3. Status badge */}
        <Box className="anim-fade-up" style={{ textAlign: 'center', marginBottom: 30 }}>
          <Text style={{ fontSize: 44, marginBottom: 10, display: 'block' }}>{result.emoji}</Text>
          <Text style={{ fontSize: 26, fontWeight: 900, color: theme.text }}>Hồ sơ {result.status}</Text>
          {result.rate && (
            <Box style={{ display: 'inline-flex', background: theme.gradient, borderRadius: 50, padding: '8px 20px', marginTop: 15, boxShadow: `0 8px 20px ${theme.glow}` }}>
              <Text style={{ fontSize: 15, fontWeight: 900, color: '#fff' }}>🔥 Tỉ lệ đậu: {result.rate}</Text>
            </Box>
          )}
        </Box>

        {/* 4. Content area */}
        <Box style={{ width: '100%', maxWidth: 420, opacity: showContent ? 1 : 0, transform: showContent ? 'none' : 'translateY(30px)', transition: 'all 0.8s' }}>
          
          {/* CHI TIẾT ĐIỂM SỐ (PHẦN BẠN CẦN) */}
          {result.breakdown?.length > 0 && (
            <Box className="app-card" style={{ padding: '0', marginBottom: 20, borderRadius: 24, border: '1.5px solid #f1f5f9', overflow: 'hidden', background: '#ffffff' }}>
              <Box onClick={() => setIsBreakdownOpen(!isBreakdownOpen)} style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', background: isBreakdownOpen ? '#f8fafc' : '#ffffff', transition: 'background 0.3s' }}>
                <Box style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Box style={{ background: theme.bg, padding: 8, borderRadius: 12, fontSize: 20 }}>📋</Box>
                  <Text style={{ fontWeight: 900, color: '#0f172a', fontSize: 16 }}>Chi Tiết Điểm Số</Text>
                </Box>
                <Box style={{ transform: isBreakdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.4s', color: '#94a3b8' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </Box>
              </Box>
              <Box style={{ maxHeight: isBreakdownOpen ? '1000px' : '0px', opacity: isBreakdownOpen ? 1 : 0, overflow: 'hidden', transition: 'all 0.5s', padding: isBreakdownOpen ? '0 20px 24px' : '0 20px' }}>
                <Box style={{ height: '1px', background: '#f1f5f9', marginBottom: 20 }} />
                <Box style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {result.breakdown.map((item, idx) => (
                    <Box key={idx}>
                      <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <Text style={{ fontSize: 13, color: '#475569', fontWeight: 700 }}>{item.label}</Text>
                        <Text style={{ fontSize: 13, fontWeight: 900, color: (item.score/item.max) >= 0.8 ? '#10b981' : '#ef4444' }}>{item.score}/{item.max}</Text>
                      </Box>
                      <Box style={{ height: 6, background: '#f1f5f9', borderRadius: 10, overflow: 'hidden' }}>
                        <Box style={{ height: '100%', background: (item.score/item.max) >= 0.8 ? '#10b981' : '#ef4444', borderRadius: 10, width: `${(item.score/item.max)*100}%`, transition: 'width 1s ease-out' }} />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          )}

          {/* 5. Sales pitch */}
          <Box style={{ background: 'linear-gradient(135deg, #ffffff 0%, #fff9e6 100%)', borderRadius: 24, padding: '24px 20px', marginBottom: 24, border: '2px solid #fbbf24', boxShadow: '0 12px 30px rgba(245,158,11,0.15)' }}>
             <Text style={{ fontSize: 17, fontWeight: 900, color: '#1e293b', marginBottom: 8 }}>
                {result.color === 'green' || result.color === 'blue' ? '🎉 Cơ hội vàng cho bạn!' : '💪 HTO có giải pháp cho bạn'}
             </Text>
             <button onClick={handleCallHotline} className="btn-primary" style={{ background: theme.gradient, color: '#fff', border: 'none', borderRadius: 16, padding: '14px', fontSize: 15, fontWeight: 800, width: '100%' }}>
                LIÊN HỆ CHUYÊN GIA NGAY
             </button>
          </Box>

          {/* 6. HOTLINE CTA - ĐỒNG BỘ HIỆU ỨNG NÚT START */}
          <Box 
            onClick={handleCallHotline}
            className="hotline-shiny-card"
            style={{ 
              padding: '20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16,
              background: 'linear-gradient(90deg, #01579b, #00acc1, #01579b)',
              backgroundSize: '200% auto',
              borderRadius: 24,
              boxShadow: '0 12px 30px rgba(0, 172, 193, 0.4)', 
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Tia sáng quét ngang (Shiny Sweep) */}
            <div className="shiny-sweep-layer" />

            <Box style={{ width: 52, height: 52, borderRadius: 16, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 2 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
            </Box>
            
            <Box style={{ flex: 1, zIndex: 2 }}>
              <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>Hotline Tư Vấn 24/7</Text>
              <Text style={{ fontSize: 24, fontWeight: 900, color: '#fff', letterSpacing: 1 }}>1800 9078</Text>
            </Box>

            <Box className="anim-pulse" style={{ background: 'rgba(255,255,255,0.2)', padding: 10, borderRadius: '50%', zIndex: 2 }}>
              <Text style={{ fontSize: 20 }}>📞</Text>
            </Box>
          </Box>

          <button className="btn-primary touch-item" onClick={resetAll} style={{ marginBottom: 32 }}>🔄 Làm Bài Đánh Giá Mới</button>
        </Box>
      </Box>

      {/* STYLE CHUNG ĐỒNG BỘ NÚT START */}
      <style>{`
        @keyframes shine-bg {
          to { background-position: 200% center; }
        }
        .hotline-shiny-card {
          animation: shine-bg 3s linear infinite;
        }

        .shiny-sweep-layer {
          position: absolute;
          top: 0;
          left: -150%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            to right,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transform: skewX(-25deg);
          animation: sweep-action 4s infinite;
          z-index: 1;
        }

        @keyframes sweep-action {
          0% { left: -150%; }
          25% { left: 150%; }
          100% { left: 150%; }
        }

        .hotline-shiny-card:active {
          transform: scale(0.97);
          transition: 0.1s;
        }
      `}</style>
    </Page>
  );
}

export default ResultScreen;
