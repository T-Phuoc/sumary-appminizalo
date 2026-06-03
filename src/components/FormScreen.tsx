import React, { useEffect, useState } from "react";

type ApplicantData = {
  fullname: string;
  phone: string;
  email: string;
  agree: boolean;
};

type FormScreenProps = {
  onSubmit: (data: ApplicantData) => void;
  onBack?: () => void;
  initialPhone?: string;
  initialData?: Partial<ApplicantData>;
};

const hasText = (value?: string) => Boolean(String(value || "").trim());

const FormScreen: React.FC<FormScreenProps> = ({
  onSubmit,
  onBack,
  initialPhone = "",
  initialData,
}) => {
  const [formData, setFormData] = useState<ApplicantData>({
    fullname: initialData?.fullname || "",
    phone: initialData?.phone || initialPhone,
    email: initialData?.email || "",
    agree: Boolean(initialData?.agree),
  });
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  useEffect(() => {
    setFormData((current) => ({
      fullname: initialData?.fullname || current.fullname,
      phone: initialData?.phone || initialPhone || current.phone,
      email: initialData?.email || current.email,
      agree:
        typeof initialData?.agree === "boolean"
          ? initialData.agree
          : current.agree,
    }));
  }, [initialData, initialPhone]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.fullname && formData.phone && formData.agree) {
      onSubmit(formData);
    }
  };

  const isPrefilled = hasText(formData.fullname) || hasText(formData.phone) || hasText(formData.email);

  return (
    <div className="w-full min-h-screen relative flex flex-col bg-gradient-to-b from-[#0a1930] via-[#164fa0] to-[#1e3a8a] overflow-hidden fade-in pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-center flex-grow w-full h-full px-6 py-10 overflow-y-auto game-scroll">
        <div className="bg-[#0f172a]/50 backdrop-blur-xl border border-white/20 rounded-[32px] shadow-[0_15px_40px_rgba(0,0,0,0.4)] p-6 sm:p-8 flex flex-col mt-auto mb-auto">
          <h2 className="mb-2 text-3xl font-black tracking-widest text-center text-transparent bg-clip-text bg-gradient-to-b from-white to-[#cbf0f9] drop-shadow-[0_0_10px_rgba(56,189,248,0.5)] uppercase font-['Montserrat']">
            THÔNG TIN ỨNG VIÊN
          </h2>
          <p className="mb-8 text-sm font-medium tracking-wide text-center sm:text-base text-cyan-100/90">
            Hãy để lại thông tin để nhận kết quả phân tích chính xác nhất
          </p>

          {isPrefilled && (
            <div className="mb-5 rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-3 text-sm font-medium text-cyan-50">
              Dữ liệu đã được lấy từ khảo sát ban đầu, bạn chỉ cần kiểm tra lại và xác nhận điều khoản.
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 text-left">
            {!formData.fullname ? (
              <div>
                <input
                  type="text"
                  placeholder="Họ và tên"
                  required
                  value={formData.fullname}
                  onChange={(event) => setFormData({ ...formData, fullname: event.target.value })}
                  className="w-full px-5 py-4 text-base font-medium text-white transition-all border shadow-inner outline-none bg-black/30 border-white/10 rounded-2xl placeholder-white/50 focus:bg-white/10 focus:border-cyan-300 focus:ring-1 focus:ring-cyan-300"
                />
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white">
                <div className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">Họ và tên</div>
                <div className="mt-1 text-base font-semibold">{formData.fullname}</div>
              </div>
            )}

            {!formData.phone ? (
              <div>
                <input
                  type="tel"
                  placeholder="Số điện thoại"
                  required
                  value={formData.phone}
                  onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                  className="w-full px-5 py-4 text-base font-medium text-white transition-all border shadow-inner outline-none bg-black/30 border-white/10 rounded-2xl placeholder-white/50 focus:bg-white/10 focus:border-cyan-300 focus:ring-1 focus:ring-cyan-300"
                />
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white">
                <div className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">Số điện thoại</div>
                <div className="mt-1 text-base font-semibold">{formData.phone}</div>
              </div>
            )}

            {!formData.email ? (
              <div>
                <input
                  type="email"
                  placeholder="Email nhận báo cáo PDF"
                  required
                  value={formData.email}
                  onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                  className="w-full px-5 py-4 text-base font-medium text-white transition-all border shadow-inner outline-none bg-black/30 border-white/10 rounded-2xl placeholder-white/50 focus:bg-white/10 focus:border-cyan-300 focus:ring-1 focus:ring-cyan-300"
                />
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white">
                <div className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">Email</div>
                <div className="mt-1 text-base font-semibold break-all">{formData.email}</div>
              </div>
            )}

            <div className="flex items-start p-4 mt-2 space-x-3 border shadow-inner rounded-2xl bg-white/5 border-white/10">
              <input
                type="checkbox"
                id="agree"
                required
                checked={formData.agree}
                onChange={(event) => setFormData({ ...formData, agree: event.target.checked })}
                className="w-5 h-5 mt-0.5 cursor-pointer accent-cyan-500 shrink-0"
              />
              <label htmlFor="agree" className="text-sm font-medium leading-relaxed cursor-pointer text-white/80">
                Tôi xác nhận đã đọc và đồng ý với{" "}
                <span
                  onClick={(event) => {
                    event.preventDefault();
                    setIsTermsOpen(true);
                  }}
                  className="font-bold underline transition-colors text-cyan-300 hover:text-cyan-200"
                >
                  Điều khoản bảo mật thông tin
                </span>{" "}
                của HTO Group.
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#f8fafc] text-[#164fa0] font-black text-base rounded-full py-4 mt-6 shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95 transition-transform uppercase tracking-widest border border-white"
            >
              Vào làm Trắc nghiệm ➡️
            </button>
          </form>

          <button
            onClick={onBack}
            className="w-full mt-6 text-sm font-semibold tracking-widest text-center underline uppercase transition text-white/50 hover:text-white"
          >
            Quay lại màn hình chính
          </button>
        </div>

        <div className="relative w-full pb-2 mt-8">
          <div className="flex items-center justify-center gap-2 px-5 py-2 mx-auto border rounded-full bg-black/30 border-white/10 w-max backdrop-blur-md">
            <span className="text-xl">📞</span>
            <span className="text-xs font-medium tracking-wider text-blue-200 uppercase">Tổng đài hỗ trợ:</span>
            <span className="text-lg font-bold tracking-wider text-yellow-400">1800 9078</span>
          </div>
        </div>
      </div>

      {isTermsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a1930]/90 backdrop-blur-sm fade-in">
          <div className="relative w-full max-w-sm max-h-[80vh] flex flex-col bg-gradient-to-b from-[#0f172a] to-[#1e3a8a] border border-cyan-400/30 rounded-3xl shadow-[0_15px_50px_rgba(0,0,0,0.6)] overflow-hidden">
            <button
              onClick={() => setIsTermsOpen(false)}
              className="absolute z-10 flex items-center justify-center w-8 h-8 text-lg font-bold border rounded-full top-4 right-4 text-white/60 hover:text-white border-white/20 bg-black/30"
            >
              ✕
            </button>

            <div className="p-6 pb-2 border-b border-white/10">
              <h3 className="text-xl font-black font-['Montserrat'] uppercase tracking-widest text-cyan-300 drop-shadow-sm">
                🔒 CHÍNH SÁCH BẢO MẬT
              </h3>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto text-base custom-scrollbar text-white/80">
              <p>
                Cảm ơn bạn đã tham gia chương trình định hướng nghề nghiệp <strong>HTO FUTURE MAP</strong>. Việc bảo mật
                thông tin cá nhân của bạn là ưu tiên hàng đầu của chúng tôi.
              </p>

              <div>
                <h4 className="mb-1 text-lg font-bold text-yellow-400">1. Mục đích thu thập dữ liệu</h4>
                <ul className="pl-4 space-y-1 text-sm list-disc">
                  <li>Phân tích tự động để trả kết quả trắc nghiệm tính cách.</li>
                  <li>Tự động gửi file báo cáo PDF về Email của bạn.</li>
                  <li>Hỗ trợ chuyên gia HTO liên hệ để tư vấn lộ trình du học/nghề nghiệp 1-1 chuyên sâu.</li>
                </ul>
              </div>

              <div>
                <h4 className="mb-1 text-lg font-bold text-yellow-400">2. Cam kết bảo mật (NDPA)</h4>
                <p className="text-sm">
                  HTO Group cam kết tuân thủ Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân. Thông tin của bạn được
                  mã hóa an toàn và <strong>tuyệt đối không mua bán hay trao đổi</strong> với bất kỳ bên thứ ba nào nằm
                  ngoài hệ sinh thái đối tác giáo dục của HTO.
                </p>
              </div>

              <div>
                <h4 className="mb-1 text-lg font-bold text-yellow-400">3. Quyền của người dùng</h4>
                <p className="text-sm">
                  Bạn có quyền yêu cầu trích xuất, sửa đổi hoặc xóa bỏ hoàn toàn dữ liệu cá nhân của mình khỏi hệ thống
                  của HTO Group bất cứ lúc nào thông qua Tổng đài hỗ trợ.
                </p>
              </div>
            </div>

            <div className="p-5 border-t border-white/10 bg-black/20">
              <button
                onClick={() => {
                  setFormData({ ...formData, agree: true });
                  setIsTermsOpen(false);
                }}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-base rounded-full py-3.5 shadow-lg active:scale-95 transition-transform uppercase tracking-widest"
              >
                Đã hiểu & Đồng ý
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormScreen;
