// Webhook URL và CRM Token
export const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbx4JcJZQW2CvEYCkswwvvLwgJMSokUbqTPa-ZwMDnNw4oIa9r4chnRPdHzjF0tjpi0P/exec';
export const CRM_TOKEN = '09a169fdc3b13fa820711e4d0c85f3ebfbbda923';

// Câu hỏi chung cho visa du học (60 điểm)
export const defaultQuestionsStudy = [
  { id: 'job_status', question: 'Tình trạng công việc hiện tại', options: [
    { text: 'Chủ doanh nghiệp / Quản lý > 1 năm', points: 6 },
    { text: 'Nhân viên có HĐLĐ & BHXH', points: 4 },
    { text: 'Lao động tự do có thu nhập', points: 2 },
    { text: 'Không chứng minh được', points: 0 },
  ]},
  { id: 'income', question: 'Thu nhập trung bình hàng tháng', options: [
    { text: 'Trên 30 triệu VNĐ', points: 6 },
    { text: '15 – 30 triệu', points: 4 },
    { text: '8 – 15 triệu', points: 2 },
    { text: 'Dưới 8 triệu', points: 0 },
  ]},
  { id: 'saving', question: 'Sổ tiết kiệm', options: [
    { text: 'Trên 300tr, mở > 6 tháng', points: 6 },
    { text: 'Trên 300tr, mở < 6 tháng', points: 4 },
    { text: 'Dưới 300 triệu', points: 2 },
    { text: 'Không có sổ', points: 0 },
  ]},
  { id: 'asset', question: 'Tài sản đứng tên', options: [
    { text: 'Nhà đất / ô tô đứng tên', points: 6 },
    { text: 'Tài sản đứng tên chung', points: 4 },
    { text: 'Không tài sản', points: 0 },
  ]},
  { id: 'travel_history', question: 'Lịch sử du lịch', options: [
    { text: 'Đi Mỹ/Úc/Âu/Can', points: 6 },
    { text: 'Đi Nhật/Hàn/Đài', points: 4 },
    { text: 'Chỉ đi ĐNA', points: 2 },
    { text: 'Hộ chiếu trắng', points: 0 },
  ]},
  { id: 'marital', question: 'Tình trạng hôn nhân', options: [
    { text: 'Đã kết hôn, có con', points: 6 },
    { text: 'Độc thân lớn tuổi', points: 4 },
    { text: 'Độc thân, trẻ tuổi', points: 1 },
  ]},
  { id: 'purpose', question: 'Mục đích chuyến đi', options: [
    { text: 'Du lịch rõ ràng, chi tiết', points: 6 },
    { text: 'Thăm thân có thư mời', points: 3 },
    { text: 'Chưa rõ ràng', points: 0 },
  ]},
  { id: 'job_time', question: 'Thời gian làm việc', options: [
    { text: 'Trên 2 năm', points: 6 },
    { text: 'Dưới 1 năm', points: 2 },
  ]},
  { id: 'documents', question: 'Hồ sơ nhân thân', options: [
    { text: 'Đầy đủ, hợp lệ', points: 6 },
    { text: 'Thiếu nhiều', points: 0 },
  ]},
  { id: 'return', question: 'Cam kết quay về VN', options: [
    { text: 'Ràng buộc rất mạnh', points: 6 },
    { text: 'Không rõ ràng', points: 0 },
  ]},
];

// Câu hỏi chung cho visa du lịch (60 điểm)
export const defaultQuestionsTourist = [
  { id: 'tour_plan', question: 'Lịch trình du lịch', options: [
    { text: 'Chi tiết, có ngày/địa điểm', points: 6 },
    { text: 'Có nhưng còn chung chung', points: 3 },
    { text: 'Chưa có', points: 0 },
  ]},
  { id: 'tour_finance', question: 'Khả năng tài chính đi du lịch', options: [
    { text: 'Tự chi trả, đủ minh bạch', points: 6 },
    { text: 'Có người bảo lãnh', points: 3 },
    { text: 'Chưa chứng minh rõ', points: 0 },
  ]},
  { id: 'tour_job', question: 'Công việc hiện tại', options: [
    { text: 'Ổn định lâu dài', points: 6 },
    { text: 'Công việc tự do', points: 3 },
    { text: 'Không ổn định', points: 0 },
  ]},
  { id: 'tour_income', question: 'Thu nhập bình quân', options: [
    { text: 'Trên 25 triệu', points: 6 },
    { text: '10 – 25 triệu', points: 3 },
    { text: 'Dưới 10 triệu', points: 0 },
  ]},
  { id: 'tour_saving', question: 'Sổ tiết kiệm', options: [
    { text: 'Có, mở > 3 tháng', points: 6 },
    { text: 'Có, mới mở', points: 3 },
    { text: 'Không có', points: 0 },
  ]},
  { id: 'tour_travel_history', question: 'Lịch sử xuất nhập cảnh', options: [
    { text: 'Có nhiều dấu', points: 6 },
    { text: 'Có ít dấu', points: 3 },
    { text: 'Hộ chiếu trắng', points: 0 },
  ]},
  { id: 'tour_marital', question: 'Tình trạng hôn nhân', options: [
    { text: 'Đã kết hôn, có con', points: 6 },
    { text: 'Độc thân lớn tuổi', points: 3 },
    { text: 'Độc thân, trẻ tuổi', points: 1 },
  ]},
  { id: 'tour_asset', question: 'Tài sản đứng tên', options: [
    { text: 'Nhà đất / ô tô', points: 6 },
    { text: 'Tài sản chung', points: 3 },
    { text: 'Không tài sản', points: 0 },
  ]},
  { id: 'tour_docs', question: 'Hồ sơ hợp pháp', options: [
    { text: 'Đầy đủ, hợp lệ', points: 6 },
    { text: 'Còn thiếu', points: 0 },
  ]},
  { id: 'tour_return', question: 'Cam kết quay về', options: [
    { text: 'Ràng buộc mạnh', points: 6 },
    { text: 'Không rõ', points: 0 },
  ]},
];

// Câu hỏi riêng theo quốc gia - visa du học (25 điểm)
export const questionSetsStudy = {
  usa: [
    { id: 'us_1', question: 'Tên trong hồ sơ định cư?', options: [{ text: 'Chưa từng', points: 5 }, { text: 'Đã từng', points: 0 }] },
    { id: 'us_2', question: 'Người thân ở Mỹ?', options: [{ text: 'Không có', points: 5 }, { text: 'Có', points: 1 }] },
    { id: 'us_3', question: 'Khối nhà nước/Nhạy cảm?', options: [{ text: 'Không', points: 5 }, { text: 'Có', points: 2 }] },
    { id: 'us_4', question: 'Tài sản BĐS/Cổ phiếu?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 0 }] },
    { id: 'us_5', question: 'Từng bị từ chối visa Mỹ?', options: [{ text: 'Chưa từng', points: 5 }, { text: 'Đã từng', points: -10 }] },
  ],
  canada: [
    { id: 'ca_1', question: 'Sở hữu Visa Mỹ còn hạn?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 0 }] },
    { id: 'ca_2', question: 'Thư mời người thân Can?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 2 }] },
    { id: 'ca_3', question: 'Chứng minh nguồn tiền?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 0 }] },
    { id: 'ca_4', question: 'Dấu mộc nước phát triển?', options: [{ text: 'Có >2 dấu', points: 5 }, { text: 'Chưa có', points: 0 }] },
    { id: 'ca_5', question: 'Kế hoạch du lịch cụ thể?', options: [{ text: 'Đã có', points: 5 }, { text: 'Chưa có', points: 0 }] },
  ],
  australia: [
    { id: 'au_1', question: 'Đóng BHXH liên tục?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 0 }] },
    { id: 'au_2', question: 'Hộ khẩu vùng High-risk?', options: [{ text: 'Không', points: 5 }, { text: 'Có', points: -5 }] },
    { id: 'au_3', question: 'Sổ 500tr mở >3 tháng?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 1 }] },
    { id: 'au_4', question: 'Người thân trốn tại Úc?', options: [{ text: 'Không', points: 5 }, { text: 'Có', points: -15 }] },
    { id: 'au_5', question: 'Làm việc trên 3 năm?', options: [{ text: 'Trên 3 năm', points: 5 }, { text: 'Dưới 1 năm', points: 2 }] },
  ],
  japan: [
    { id: 'jp_1', question: 'Đại lý ủy thác?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 1 }] },
    { id: 'jp_2', question: 'Xác nhận số dư bản gốc?', options: [{ text: 'Có', points: 5 }, { text: 'Photo', points: 0 }] },
    { id: 'jp_3', question: 'Vùng giám sát đặc biệt?', options: [{ text: 'Không', points: 5 }, { text: 'Có', points: -5 }] },
    { id: 'jp_4', question: 'Làm việc công ty Nhật?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 2 }] },
    { id: 'jp_5', question: 'Từng đi Nhật đúng hạn?', options: [{ text: 'Rồi', points: 5 }, { text: 'Chưa', points: 2 }] },
  ],
  korea: [
    { id: 'kr_1', question: 'Hộ khẩu 3 TP lớn?', options: [{ text: 'Có', points: 5 }, { text: 'Tỉnh khác', points: 2 }] },
    { id: 'kr_2', question: 'BHXH 1 năm (VssID)?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 0 }] },
    { id: 'kr_3', question: 'Sổ tiết kiệm >100tr?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 1 }] },
    { id: 'kr_4', question: 'Miễn CMTC (Top 500)?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 1 }] },
    { id: 'kr_5', question: 'Người thân trốn tại Hàn?', options: [{ text: 'Không', points: 5 }, { text: 'Có', points: -15 }] },
  ],
  schengen: [
    { id: 'de_1', question: 'Giấy bảo lãnh gốc?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 1 }] },
    { id: 'de_2', question: 'Bảo hiểm 30.000 Euro?', options: [{ text: 'Đã mua', points: 5 }, { text: 'Chưa', points: 0 }] },
    { id: 'de_3', question: 'Đức lưu trú lâu nhất?', options: [{ text: 'Đúng', points: 5 }, { text: 'Không', points: -5 }] },
    { id: 'de_4', question: 'Nghỉ phép đóng mộc?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 0 }] },
    { id: 'de_5', question: 'Từng đi Schengen đúng hạn?', options: [{ text: 'Rồi', points: 5 }, { text: 'Chưa', points: 2 }] },
  ],
  taiwan: [
    { id: 'tw_1', question: 'Visa Mỹ/Âu/Úc/Nhật?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 0 }] },
    { id: 'tw_2', question: 'HĐLĐ bản gốc?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 0 }] },
    { id: 'tw_3', question: 'Từng lao động tại Đài?', options: [{ text: 'Chưa', points: 5 }, { text: 'Rồi', points: -5 }] },
    { id: 'tw_4', question: 'Thu nhập >15tr/tháng?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 1 }] },
    { id: 'tw_5', question: 'Mục đích du lịch?', options: [{ text: 'Đúng', points: 5 }, { text: 'Thăm thân', points: 2 }] },
  ],
  china: [
    { id: 'cn_1', question: 'Visa dán TQ cũ?', options: [{ text: 'Có', points: 5 }, { text: 'Chưa', points: 2 }] },
    { id: 'cn_2', question: 'HC có nơi sinh?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 0 }] },
    { id: 'cn_3', question: 'Báo chí/Tôn giáo?', options: [{ text: 'Không', points: 5 }, { text: 'Có', points: -10 }] },
    { id: 'cn_4', question: 'Thư mời phía TQ?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 2 }] },
    { id: 'cn_5', question: 'Visa cá nhân?', options: [{ text: 'Đúng', points: 5 }, { text: 'Đoàn', points: 3 }] },
  ],
  poland: [
    { id: 'pl_1', question: 'Thư mời tổ chức PL?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 2 }] },
    { id: 'pl_2', question: 'Khách sạn full ngày?', options: [{ text: 'Có', points: 5 }, { text: 'Chưa', points: 0 }] },
    { id: 'pl_3', question: 'Tài chính 100PLN/ngày?', options: [{ text: 'Đủ', points: 5 }, { text: 'Thiếu', points: 0 }] },
    { id: 'pl_4', question: 'HC còn 2 trang trống?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 0 }] },
    { id: 'pl_5', question: 'Mục đích rõ ràng?', options: [{ text: 'Rõ', points: 5 }, { text: 'Mơ hồ', points: 2 }] },
  ],
  newzealand: [
    { id: 'nz_1', question: 'Đi cùng gia đình?', options: [{ text: 'Có', points: 5 }, { text: 'Một mình', points: 2 }] },
    { id: 'nz_2', question: 'Thẻ tín dụng >100tr?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 2 }] },
    { id: 'nz_3', question: 'Sao kê lương 6 tháng?', options: [{ text: 'Có', points: 5 }, { text: 'Tiền mặt', points: 0 }] },
    { id: 'nz_4', question: 'Ô tô đứng tên?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 0 }] },
    { id: 'nz_5', question: 'Lý lịch sạch?', options: [{ text: 'Sạch', points: 5 }, { text: 'Vi phạm', points: -20 }] },
  ],
};

// Câu hỏi riêng theo quốc gia - visa du lịch (25 điểm)
export const questionSetsTourist = {
  usa: [
    { id: 'us_t1', question: 'Kế hoạch tham quan Mỹ?', options: [{ text: 'Có lịch trình rõ', points: 5 }, { text: 'Chung chung', points: 2 }, { text: 'Chưa có', points: 0 }] },
    { id: 'us_t2', question: 'Có lịch sử đi Mỹ/Schengen?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 1 }] },
    { id: 'us_t3', question: 'Ràng buộc công việc tại VN?', options: [{ text: 'Hợp đồng dài hạn', points: 5 }, { text: 'Ngắn hạn', points: 2 }, { text: 'Không', points: 0 }] },
    { id: 'us_t4', question: 'Người thân ở Mỹ?', options: [{ text: 'Không có', points: 5 }, { text: 'Có', points: 1 }] },
    { id: 'us_t5', question: 'Từng bị từ chối visa Mỹ?', options: [{ text: 'Chưa', points: 5 }, { text: 'Có', points: -10 }] },
  ],
  canada: [
    { id: 'ca_t1', question: 'Có visa Mỹ còn hạn?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 1 }] },
    { id: 'ca_t2', question: 'Lịch trình tham quan Canada?', options: [{ text: 'Rõ ràng', points: 5 }, { text: 'Chưa rõ', points: 2 }] },
    { id: 'ca_t3', question: 'Tài chính đủ cho chuyến đi?', options: [{ text: 'Đủ', points: 5 }, { text: 'Thiếu', points: 0 }] },
    { id: 'ca_t4', question: 'Chứng minh ràng buộc VN?', options: [{ text: 'Có', points: 5 }, { text: 'Chưa rõ', points: 1 }] },
    { id: 'ca_t5', question: 'Đặt vé/khách sạn?', options: [{ text: 'Đã đặt', points: 5 }, { text: 'Chưa', points: 0 }] },
  ],
  australia: [
    { id: 'au_t1', question: 'Đi Úc theo tour hay tự túc?', options: [{ text: 'Tour trọn gói', points: 5 }, { text: 'Tự túc', points: 2 }] },
    { id: 'au_t2', question: 'Có thư mời người thân?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 2 }] },
    { id: 'au_t3', question: 'Lịch sử du lịch nước phát triển?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 0 }] },
    { id: 'au_t4', question: 'Ràng buộc tài sản tại VN?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 1 }] },
    { id: 'au_t5', question: 'Kế hoạch quay về rõ?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 0 }] },
  ],
  japan: [
    { id: 'jp_t1', question: 'Đặt lịch trình/khách sạn?', options: [{ text: 'Đầy đủ', points: 5 }, { text: 'Chưa đủ', points: 2 }] },
    { id: 'jp_t2', question: 'Từng đi Nhật đúng hạn?', options: [{ text: 'Rồi', points: 5 }, { text: 'Chưa', points: 1 }] },
    { id: 'jp_t3', question: 'Có người bảo lãnh tài chính?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 2 }] },
    { id: 'jp_t4', question: 'Hộ khẩu vùng rủi ro?', options: [{ text: 'Không', points: 5 }, { text: 'Có', points: 0 }] },
    { id: 'jp_t5', question: 'Kế hoạch quay về rõ?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 0 }] },
  ],
  korea: [
    { id: 'kr_t1', question: 'Có sổ tiết kiệm >100tr?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 1 }] },
    { id: 'kr_t2', question: 'Đặt khách sạn/tour?', options: [{ text: 'Đã đặt', points: 5 }, { text: 'Chưa', points: 2 }] },
    { id: 'kr_t3', question: 'Có lịch sử đi Hàn/Nhật?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 0 }] },
    { id: 'kr_t4', question: 'Ràng buộc gia đình tại VN?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 1 }] },
    { id: 'kr_t5', question: 'Từng bị từ chối visa Hàn?', options: [{ text: 'Chưa', points: 5 }, { text: 'Có', points: -10 }] },
  ],
  schengen: [
    { id: 'de_t1', question: 'Bảo hiểm du lịch Schengen?', options: [{ text: 'Đã mua', points: 5 }, { text: 'Chưa', points: 0 }] },
    { id: 'de_t2', question: 'Lịch trình đa quốc gia?', options: [{ text: 'Có chi tiết', points: 5 }, { text: 'Chưa rõ', points: 2 }] },
    { id: 'de_t3', question: 'Đặt khách sạn đầy đủ?', options: [{ text: 'Đã đặt', points: 5 }, { text: 'Chưa', points: 0 }] },
    { id: 'de_t4', question: 'Chứng minh tài chính đủ?', options: [{ text: 'Đủ', points: 5 }, { text: 'Thiếu', points: 0 }] },
    { id: 'de_t5', question: 'Lịch sử Schengen?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 1 }] },
  ],
  taiwan: [
    { id: 'tw_t1', question: 'Có visa Mỹ/Âu/Úc/Nhật?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 1 }] },
    { id: 'tw_t2', question: 'Đặt vé/khách sạn?', options: [{ text: 'Đã đặt', points: 5 }, { text: 'Chưa', points: 2 }] },
    { id: 'tw_t3', question: 'Thu nhập ổn định?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 1 }] },
    { id: 'tw_t4', question: 'Ràng buộc gia đình?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 1 }] },
    { id: 'tw_t5', question: 'Kế hoạch quay về rõ?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 0 }] },
  ],
  china: [
    { id: 'cn_t1', question: 'Có thư mời từ TQ?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 2 }] },
    { id: 'cn_t2', question: 'Lịch trình tham quan rõ?', options: [{ text: 'Rõ ràng', points: 5 }, { text: 'Chưa rõ', points: 2 }] },
    { id: 'cn_t3', question: 'Từng đi Trung Quốc?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 1 }] },
    { id: 'cn_t4', question: 'Chứng minh tài chính đủ?', options: [{ text: 'Đủ', points: 5 }, { text: 'Thiếu', points: 0 }] },
    { id: 'cn_t5', question: 'Ràng buộc công việc?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 0 }] },
  ],
  poland: [
    { id: 'pl_t1', question: 'Có thư mời/tour rõ?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 2 }] },
    { id: 'pl_t2', question: 'Đặt khách sạn đủ ngày?', options: [{ text: 'Đã đặt', points: 5 }, { text: 'Chưa', points: 0 }] },
    { id: 'pl_t3', question: 'Chứng minh tài chính đủ?', options: [{ text: 'Đủ', points: 5 }, { text: 'Thiếu', points: 0 }] },
    { id: 'pl_t4', question: 'Lịch sử Schengen?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 1 }] },
    { id: 'pl_t5', question: 'Ràng buộc gia đình?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 0 }] },
  ],
  newzealand: [
    { id: 'nz_t1', question: 'Đi cùng gia đình?', options: [{ text: 'Có', points: 5 }, { text: 'Một mình', points: 2 }] },
    { id: 'nz_t2', question: 'Lịch sử đi Úc/NZ?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 1 }] },
    { id: 'nz_t3', question: 'Sổ tiết kiệm đủ?', options: [{ text: 'Đủ', points: 5 }, { text: 'Thiếu', points: 0 }] },
    { id: 'nz_t4', question: 'Ràng buộc tài sản tại VN?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 1 }] },
    { id: 'nz_t5', question: 'Kế hoạch quay về rõ?', options: [{ text: 'Có', points: 5 }, { text: 'Không', points: 0 }] },
  ],
};

// Cấu hình quốc gia (giống y nguyên file gốc index.js)
export const countryConfigs = {
  japan: {
    code: 'japan', name: 'Nhật Bản', flag: '🇯🇵', region: 'Đông Á',
    passScore: { strong: 80, good: 65, medium: 50, weak: 35 },
    successRate: { strong: '90-95%', good: '75-85%', medium: '55-70%', risk: 'Dưới 30%' },
  },
  korea: {
    code: 'korea', name: 'Hàn Quốc', flag: '🇰🇷', region: 'Đông Á',
    passScore: { strong: 80, good: 65, medium: 50, weak: 35 },
    successRate: { strong: '85-90%', good: '70-80%', medium: '50-65%', risk: 'Dưới 30%' },
  },
  usa: {
    code: 'usa', name: 'Mỹ', flag: '🇺🇸', region: 'Bắc Mỹ',
    passScore: { strong: 82, good: 70, medium: 55, weak: 40 },
    successRate: { strong: '85-90%', good: '65-75%', medium: '45-60%', risk: 'Dưới 30%' },
  },
  canada: {
    code: 'canada', name: 'Canada', flag: '🇨🇦', region: 'Bắc Mỹ',
    passScore: { strong: 80, good: 65, medium: 50, weak: 35 },
    successRate: { strong: '85-90%', good: '70-80%', medium: '50-65%', risk: 'Dưới 30%' },
  },
  australia: {
    code: 'australia', name: 'Úc', flag: '🇦🇺', region: 'Châu Đại Dương',
    passScore: { strong: 80, good: 65, medium: 50, weak: 35 },
    successRate: { strong: '85-90%', good: '70-80%', medium: '50-65%', risk: 'Dưới 30%' },
  },
  schengen: {
    code: 'schengen', name: 'Schengen (Đức)', flag: '🇩🇪', region: 'Châu Âu',
    passScore: { strong: 80, good: 65, medium: 55, weak: 40 },
    successRate: { strong: '90-95%', good: '75-85%', medium: '55-70%', risk: 'Dưới 35%' },
  },
  taiwan: {
    code: 'taiwan', name: 'Đài Loan', flag: '🇹🇼', region: 'Đông Á',
    passScore: { strong: 70, good: 55, medium: 40, weak: 30 },
    successRate: { strong: '85-90%', good: '65-75%', medium: '45-60%', risk: 'Dưới 25%' },
  },
  china: {
    code: 'china', name: 'Trung Quốc', flag: '🇨🇳', region: 'Đông Á',
    passScore: { strong: 75, good: 60, medium: 45, weak: 30 },
    successRate: { strong: '90%', good: '75%', medium: '55%', risk: 'Dưới 30%' },
  },
  poland: {
    code: 'poland', name: 'Ba Lan', flag: '🇵🇱', region: 'Châu Âu',
    passScore: { strong: 80, good: 65, medium: 55, weak: 40 },
    successRate: { strong: '90-95%', good: '75-85%', medium: '55-70%', risk: 'Dưới 35%' },
  },
  newzealand: {
    code: 'newzealand', name: 'New Zealand', flag: '🇳🇿', region: 'Châu Đại Dương',
    passScore: { strong: 80, good: 65, medium: 50, weak: 35 },
    successRate: { strong: '85%', good: '70%', medium: '50%', risk: 'Dưới 30%' },
  },
};

// Helper: lấy danh sách quốc gia dạng array (cho CountrySelect render)
export const countryList = Object.values(countryConfigs);

// Hàm lấy câu hỏi theo loại visa và quốc gia
export function getQuestions(visaType, countryCode) {
  const baseQuestions = visaType === 'study' ? defaultQuestionsStudy : defaultQuestionsTourist;
  const countryQuestions = visaType === 'study' ? questionSetsStudy[countryCode] : questionSetsTourist[countryCode];
  
  return [...baseQuestions, ...(countryQuestions || [])];
}

// Hàm tính kết quả visa (giống y nguyên logic gốc: country-specific passScore thresholds)
export function calculateVisaResult(answers, countryCode, visaType) {
  const questions = getQuestions(visaType, countryCode);
  let totalScore = 0;
  const breakdown = [];

  questions.forEach(q => {
    const val = answers[q.id] || 0;
    totalScore += val;
    const maxPoints = Math.max(...q.options.map(o => o.points));
    breakdown.push({ id: q.id, label: q.question, score: val, max: maxPoints });
  });

  // Cap score at 85 like original
  if (totalScore > 85) totalScore = 85;

  const config = countryConfigs[countryCode];
  if (!config) {
    return { totalScore, percentage: 0, rating: 'RISK', status: 'LỖI', rate: 'N/A', emoji: '🔴', color: 'red', breakdown };
  }

  const ps = config.passScore;
  const sr = config.successRate;

  let status, rate, color, emoji, rating;

  if (totalScore >= ps.strong) {
    status = 'RẤT TỐT';
    rate = sr.strong;
    color = 'green';
    emoji = '🟢';
    rating = 'STRONG';
  } else if (totalScore >= ps.good) {
    status = 'TỐT';
    rate = sr.good;
    color = 'blue';
    emoji = '🔵';
    rating = 'GOOD';
  } else if (totalScore >= ps.medium) {
    status = 'TRUNG BÌNH';
    rate = sr.medium;
    color = 'yellow';
    emoji = '🟡';
    rating = 'MEDIUM';
  } else {
    status = 'RỦI RO';
    rate = sr.risk;
    color = 'red';
    emoji = '🔴';
    rating = 'RISK';
  }

  const percentage = Math.round((totalScore / 85) * 100);

  return { totalScore, percentage, rating, emoji, color, status, rate, breakdown };
}

// Hàm tạo gợi ý chi tiết theo từng câu trả lời (giống renderSuggestions gốc)
export function getSuggestions(breakdown) {
  const suggestions = [];

  breakdown.forEach(item => {
    const percent = item.max > 0 ? item.score / item.max : 1;

    if (percent <= 0.6) {
      switch (item.id) {
        case 'job_status':
        case 'job_time':
        case 'tour_job':
          suggestions.push('💼 Công việc: Cần bổ sung HĐLĐ, sao kê lương, hoặc Giấy phép kinh doanh để chứng minh sự ổn định.');
          break;
        case 'saving':
        case 'tour_saving':
          suggestions.push('💰 Sổ tiết kiệm: Đại sứ quán nghi ngờ sổ mới mở. Hãy duy trì sổ trên 6 tháng trước khi nộp.');
          break;
        case 'asset':
        case 'tour_asset':
          suggestions.push('🏠 Tài sản: Bổ sung giấy tờ nhà đất, ô tô chính chủ để tăng trọng lượng hồ sơ.');
          break;
        case 'travel_history':
        case 'tour_travel_history':
          suggestions.push('🛫 Lịch sử du lịch: Hộ chiếu trắng là điểm trừ. Hãy đi thêm 1-2 nước Đông Nam Á trước khi nộp nước lớn.');
          break;
        case 'marital':
        case 'tour_marital':
          suggestions.push('👨‍👩‍👧 Ràng buộc gia đình: Khai báo độc thân dễ bị nghi ngờ. Cần chứng minh có người thân ở VN để quay về.');
          break;
        case 'purpose':
        case 'tour_plan':
          suggestions.push('📝 Mục đích: Cần viết lịch trình du lịch (Itinerary) chi tiết từng ngày, khớp với vé máy bay và khách sạn.');
          break;
        case 'income':
        case 'tour_income':
          suggestions.push('💵 Thu nhập: Cần bổ sung chứng từ thu nhập như sao kê ngân hàng, hợp đồng lao động có mức lương rõ ràng.');
          break;
        case 'documents':
        case 'tour_docs':
          suggestions.push('📋 Hồ sơ: Chuẩn bị hồ sơ nhân thân đầy đủ, bản gốc, có công chứng nếu cần.');
          break;
        case 'return':
        case 'tour_return':
          suggestions.push('🔗 Cam kết quay về: Cần chứng minh ràng buộc với VN như tài sản, gia đình, công việc ổn định.');
          break;
        case 'us_5':
          if (item.score < 0) suggestions.push('⚠️ Lịch sử Visa: Bạn từng bị từ chối, lần nộp tới bắt buộc phải có Thư giải trình (LOE).');
          break;
        case 'jp_3':
        case 'kr_5':
        case 'au_4':
          if (item.score < 0) suggestions.push('⚠️ Vùng miền/Người thân: Bạn thuộc diện bị kiểm duyệt gắt gao. Hãy chuẩn bị tài chính thật mạnh.');
          break;
        default:
          break;
      }
    }
  });

  if (suggestions.length === 0) {
    suggestions.push('✅ Hồ sơ của bạn đạt tiêu chuẩn rất cao! Hãy in và sắp xếp giấy tờ bản gốc thật khoa học để đi nộp.');
  }

  // Deduplicate
  return [...new Set(suggestions)];
}
