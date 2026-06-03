import React, { useState, useEffect } from 'react';
import { Box, Page, Text } from 'zmp-ui';
import { useVisaTest } from '../context/VisaTestContext';
import { fetchCountries } from '../services/apiService';

const flagMap = { usa:'us', canada:'ca', australia:'au', japan:'jp', korea:'kr', schengen:'de', taiwan:'tw', china:'cn', poland:'pl', newzealand:'nz' };

const FISH_HTO_URL = "https://i.ibb.co/nMBrgbBX/unname3.png";

const OceanBackground = () => (
  <Box className="ocean-scene" style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', top: 0, left: 0, background: '#01579b' }}>
    <div className="ocean-sky"></div>
    <div className="wave-layer wave-back"></div>
    <div className="wave-layer wave-middle"></div>
    <div className="wave-layer wave-front"></div>
    <div className="sea-foam foam-1"></div>
    <div className="ocean-overlay"></div>
  </Box>
);

function CountrySelect() {
  const { setSelectedCountry, setStep, selectedVisaType } = useVisaTest();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCode, setSelectedCode] = useState(null);

  useEffect(() => {
    fetchCountries().then(data => {
      setCountries(data || []);
      setLoading(false);
    });
  }, []);

  const handleSelect = (country) => {
    setSelectedCode(country.code);
    setTimeout(() => {
      setSelectedCountry(country.code);
      setStep('quiz');
    }, 280); // Tăng nhẹ thời gian để cảm nhận hiệu ứng "nhấn lún"
  };

  return (
    <Page style={{ position: 'relative', overflow: 'hidden', background: '#e0f7fa' }}>
      <OceanBackground />
      
      <div className="bubbles-container">
        {[...Array(10)].map((_, i) => <div key={i} className={`bubble b${i % 3}`}></div>)}
      </div>

      <Box style={{ position: 'relative', zIndex: 10, padding: 'env(safe-area-inset-top) 14px 16px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box style={{ position: 'relative', width: '100%', maxWidth: 420 }}>
          
          <Box style={{
              position: "absolute",
              top: -100,
              right: -10,
              width: 150,
              height: 150,
              zIndex: 11,
              pointerEvents: "none",
              animation: "fish-float-dynamic 5s ease-in-out infinite",
            }}>
            <img src={FISH_HTO_URL} style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.3))', transform: 'scaleX(-1)' }} />
          </Box>

          <Box className="app-card card-deep-sea anim-fade-up shadow-deep" style={{ 
            padding: "28px 16px",
            width: "100%",
            maxWidth: 460,
            position: 'relative', zIndex: 15,
            border: '5px solid #01579b',
            borderRadius: 55,
            background: 'rgba(255, 255, 255, 0.88)',
            backdropFilter: 'blur(12px)'
          }}>
            
            <Box style={{ textAlign: 'center', marginBottom: 18 }}>
              <Box className="badge-deep-sea pulse-slow shine-effect" style={{ display: 'inline-block', padding: '8px 22px', borderRadius: 50, marginBottom: 12, position: 'relative', overflow: 'hidden' }}>
                 <Text style={{ fontSize: 12, fontWeight: 900, color: '#fff', letterSpacing: '1.5px', position: 'relative', zIndex: 2 }}>ĐIỂM ĐẾN MƠ ƯỚC</Text>
              </Box>
              <Text style={{ fontSize: 28, fontWeight: 900, color: '#01579b', letterSpacing: '-0.5px' }}>Chọn Quốc Gia</Text>
              <Text style={{ fontSize: 14, color: '#01579b', opacity: 0.8, marginTop: 6, fontWeight: 700 }}>
                {selectedVisaType === 'study' ? 'Nơi bạn dự định du học 🎓' : 'Nơi bạn muốn khám phá ✈️'}
              </Text>
            </Box>

            {loading ? (
              <Box style={{ textAlign: 'center', padding: '42px 0' }}>
                <div className="loader-ocean"></div>
                <Text style={{ color: '#01579b', fontWeight: 800, marginTop: 16 }}>Đang dò tìm vùng biển...</Text>
              </Box>
            ) : (
              <Box className="country-grid-scroll custom-scrollbar" style={{ 
                display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', 
                maxHeight: '380px', overflowY: 'auto', padding: '8px', marginBottom: 16 
              }}>
                {countries.map((c, idx) => {
                  const isActive = selectedCode === c.code;
                  return (
                    <button
                      key={c.code}
                      onClick={() => handleSelect(c)}
                      className={`country-item shine-effect ${isActive ? 'selected' : ''}`}
                      style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                        padding: '16px 12px', borderRadius: 28, 
                        border: `3px solid ${isActive ? '#00acc1' : 'rgba(1, 87, 155, 0.12)'}`,
                        background: isActive ? '#fff' : 'rgba(255, 255, 255, 0.7)',
                        position: 'relative', overflow: 'hidden',
                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        transform: isActive ? 'scale(0.92)' : 'none',
                        boxShadow: isActive ? '0 10px 20px rgba(0, 172, 193, 0.2)' : 'none'
                      }}
                    >
                      <Box className="flag-box" style={{ 
                        width: 82, height: 58, borderRadius: 16, overflow: 'hidden', 
                        border: `2px solid ${isActive ? '#00acc1' : '#01579b'}`, 
                        boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
                        transition: 'transform 0.3s ease'
                      }}>
                        <img
                          src={`https://flagcdn.com/w320/${flagMap[c.code] || c.code}.png`}
                          alt={c.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </Box>
                      <Box>
                        <Text style={{ fontSize: 16, fontWeight: 900, color: '#01579b', marginBottom: 2 }}>
                          {c.name}
                        </Text>
                        <Box style={{ 
                          fontSize: 10, fontWeight: 800, color: isActive ? '#fff' : '#01579b', 
                          background: isActive ? '#01579b' : 'rgba(1, 87, 155, 0.08)', 
                          borderRadius: 10, padding: '3px 12px', display: 'inline-block'
                        }}>
                          {c.region}
                        </Box>
                      </Box>
                    </button>
                  );
                })}
              </Box>
            )}

            <button className="btn-secondary active-tap" onClick={() => setStep('visa_type')} 
              style={{ width: '100%', padding: '16px', borderRadius: 22, fontWeight: 800, color: '#01579b', border: '3px solid #01579b', background: 'transparent' }}>
              ← Quay Lại
            </button>

            <Box className="step-dots" style={{ marginTop: 18 }}>
              <Box className="step-dot done" />
              <Box className="step-dot done" />
              <Box className="step-dot done" />
              <Box className="step-dot active" />
              <Box className="step-dot" />
            </Box>
          </Box>
        </Box>
      </Box>

      <style>{`
        /* Luồng sáng chạy qua thẻ */
        .shine-effect::after {
          content: ''; position: absolute; top: 0; left: -150%; width: 50%; height: 100%;
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%);
          transform: skewX(-25deg); animation: shine 4s infinite ease-in-out; z-index: 1;
        }
        @keyframes shine { 0% { left: -150%; } 25% { left: 150%; } 100% { left: 150%; } }
        
        /* Hiệu ứng con cá bơi sống động hơn */
        @keyframes fish-float-dynamic {
          0%, 100% { transform: translate(0, 0) rotate(-8deg) scaleX(-1); }
          50% { transform: translate(-25px, -20px) rotate(2deg) scaleX(-1); }
        }

        /* Bong bóng nước đa dạng */
        .bubble { position: absolute; bottom: -30px; background: rgba(255,255,255,0.25); border-radius: 50%; animation: bubble-up 7s infinite ease-in; }
        .b0 { left: 10%; width: 25px; height: 25px; animation-delay: 0s; }
        .b1 { left: 50%; width: 15px; height: 15px; animation-delay: 2s; }
        .b2 { left: 85%; width: 20px; height: 20px; animation-delay: 4s; }
        @keyframes bubble-up { 0% { transform: translateY(0) scale(1); opacity: 0; } 50% { opacity: 0.4; } 100% { transform: translateY(-100vh) scale(1.5); opacity: 0; } }

        /* Loader phong cách biển */
        .loader-ocean {
          width: 40px; height: 40px; margin: 0 auto;
          border: 4px solid rgba(1, 87, 155, 0.1);
          border-top: 4px solid #01579b;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        /* Tương tác khi nhấn */
        .active-tap:active { background: rgba(1, 87, 155, 0.1); transform: translateY(2px); }
        .country-item:active .flag-box { transform: scale(1.1); }
        .country-item.selected { border-color: #00acc1; }

        /* Scrollbar tinh tế */
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(1, 87, 155, 0.2); border-radius: 10px; }
      `}</style>
    </Page>
  );
}

export default CountrySelect;
