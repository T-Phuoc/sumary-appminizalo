/**
 * API Service - BE là nguồn sự thật duy nhất (Single Source of Truth).
 * Khi BE không khả dụng → fallback về local data trong visaData.js.
 */
import {
  countryList as localCountryList,
  getQuestions as localGetQuestions,
  calculateVisaResult as localCalculateVisaResult,
  getSuggestions as localGetSuggestions,
} from '../data/visaData';

// Base URL for the Spring Boot backend API
const normalizeBaseUrl = (value) => {
  const raw = String(value || "").trim();
  if (!raw) return "";
  if (raw.startsWith("//")) return `https:${raw}`;
  return raw.replace(/\/+$/, "");
};

const API_BASE_URL =
  normalizeBaseUrl(import.meta.env?.VITE_API_URL) || 'https://survey-api.hto.edu.vn';

// ==================== VISA DATA APIs (BE-first, fallback local) ====================

/**
 * Fetch list of all country configurations.
 * Tries BE first, falls back to local visaData.js.
 */
export async function fetchCountries() {
  try {
    const response = await fetch(`${API_BASE_URL}/countries`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    
    // BỔ SUNG: Nếu data rỗng (do route fallback ở BE), ép nhảy xuống catch để dùng local
    if (!data || data.length === 0) throw new Error('Empty data from BE');

    console.log('✅ Countries loaded from BE');
    return data;
  } catch (error) {
    console.info('BE unavailable, using local countries data:', error.message);
    return localCountryList;
  }
}

/**
 * Fetch questions for a specific visa type and country.
 * Tries BE first, falls back to local visaData.js.
 */
export async function fetchQuestions(visaType, country) {
  try {
    const response = await fetch(`${API_BASE_URL}/questions?visaType=${visaType}&country=${country}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    
    // BỔ SUNG: Tương tự, nếu chưa có câu hỏi trên BE, dùng local
    if (!data || data.length === 0) throw new Error('Empty questions from BE');

    console.log('✅ Questions loaded from BE');
    return data;
  } catch (error) {
    console.info('BE unavailable, using local questions data:', error.message);
    return localGetQuestions(visaType, country);
  }
}

// ==================== SCORING API (BE-first, fallback local) ====================

/**
 * Calculate visa result using backend scoring service.
 */
export async function calculateVisaResultAPI(answers, countryCode, visaType) {
  try {
    const response = await fetch(`${API_BASE_URL}/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers, countryCode, visaType }),
    });
    
    const data = await response.json();
    // Nếu BE lỗi hoặc trả về 0 điểm, ép dùng logic local từ visaData.js
    if (!response.ok || data.totalScore === 0) throw new Error("Fallback to Local");
    
    return data;
  } catch (error) {
    // Sử dụng hàm calculate từ file visaData.js bạn đã cung cấp
    const result = localCalculateVisaResult(answers, countryCode, visaType);
    result.suggestions = localGetSuggestions(result.breakdown || []);
    return result;
  }
}

// ==================== SUBMISSION API ====================

export async function submitToGoogleSheet(data) {
  try {
    const visaTypeLabel =
      data.visa_type === 'study' || data.visa_type === 'Du học'
        ? 'Du học'
        : 'Du lịch';

    const payload = {
      fullName: data.full_name || 'Khách hàng Zalo',
      phone: data.phone || '',
      email: data.email || '',
      birthDate: data.birth_date || '',
      country: data.country || '', 
      visaType: visaTypeLabel,
      totalScore: data.total_score || 0,
      rating: data.rating || '', 
      status: data.status || 'Hoàn thành bài test',
      successRate: String(data.success_rate || 'N/A')
    };

    const response = await fetch(`${API_BASE_URL}/api/visa/submit-full`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    const result = text ? JSON.parse(text) : {};
    const success = response.ok && result.success !== false;

    return {
      success,
      error: success ? undefined : result.error || result.message || `HTTP ${response.status}`,
    };
  } catch (error) {
    console.error('❌ Lỗi kết nối:', error.message);
    return { success: false, error: error.message };
  }
}

export async function submitToCRM(userData, visaResults) {
  return submitToGoogleSheet({
    full_name: userData.full_name,
    birth_date: userData.birth_date,
    phone: userData.phone,
    email: userData.email,
    country: visaResults.selectedCountry,
    country_code: visaResults.countryCode || '',
    visa_type: visaResults.selectedVisaType || '',
    total_score: visaResults.totalScore,
    success_rate: visaResults.lastRate,
    rating: visaResults.rating || '',
    status: visaResults.lastStatus || '',
  });
}

// ==================== ZALO APIs (Giữ nguyên cấu trúc cũ) ====================

// Sửa lại hàm này trong apiService.js
export async function decodeZaloPhone(phoneToken) {
  try {
    const { accessToken, code } = phoneToken;
    
    // Ưu tiên route mới để đồng bộ với các màn đã cập nhật.
    const response = await fetch(`${API_BASE_URL}/get-phone`, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessToken, code }),
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const data = await response.json();

    // Lưu ý: Backend của bạn trả về { success: true, phone: "..." }
    // hoặc trả về trực tiếp response.data tùy theo cách bạn viết ở BE
    if (data.success && data.phone) {
      return data.phone; 
    }
    
    // Nếu BE trả về thẳng object data của Zalo (response.data)
    if (data.data && data.data.number) {
        return data.data.number;
    }

    return null;
  } catch (error) {
    console.error('❌ Error decoding phone:', error.message);
    return null;
  }
}

export async function getUserInfoFromBackend(userToken) {
  try {
    const { accessToken, code } = userToken;
    const response = await fetch(`${API_BASE_URL}/user-info`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessToken, code }),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (data.success && data.data) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error('❌ Error getting user info:', error.message);
    return null;
  }
}
