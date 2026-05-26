/**
 * ⚠️ DEPRECATED — File này KHÔNG nên dùng trực tiếp nữa.
 *
 * Lý do: Logic tính điểm ở đây dùng threshold % cố định (80/65/50/35),
 * KHÔNG khớp với country-specific passScore (vd: USA strong = 82 điểm).
 *
 * Cách đúng:
 *   - Dùng `calculateVisaResultAPI()` từ apiService.js (gọi BE trước, fallback local).
 *   - BE là nguồn sự thật duy nhất (Single Source of Truth).
 *
 * File này chỉ export lại từ apiService.js để đảm bảo backward compatibility.
 */

// Re-export API-based scoring (BE-first, auto fallback local)
export { calculateVisaResultAPI as calculateVisaResult } from './apiService';

// Re-export submission
export { submitToGoogleSheet, submitToCRM } from './apiService';
