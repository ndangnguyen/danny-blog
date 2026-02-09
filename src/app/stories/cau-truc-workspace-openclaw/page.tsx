export default function CauTrucWorkspaceOpenclawNote() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="space-y-2">
        <time className="text-xs text-text-muted">February 9, 2026</time>
        <h1 className="text-2xl font-bold">Giải mã cấu trúc bên trong một OpenClaw Workspace</h1>
      </header>

      <div className="space-y-6 leading-relaxed text-text-muted">
        <p>Workspace (Không gian làm việc) là "ngôi nhà" và cũng là "phòng thí nghiệm" của một Agent. Để một AI có thể hoạt động hiệu quả và nhất quán, Workspace cần được define (định nghĩa) thông qua các file cấu hình quan trọng.</p>

<h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">🪪 1. IDENTITY.md - Định danh cá nhân
File này định nghĩa Agent là ai. Nó bao gồm:
- **Name:** Tên của Agent (ví dụ: Dev, Mei, Pu).
- **Vibe:** Phong cách làm việc (Technical, Professional, Friendly).
- **Emoji & Avatar:** Hình ảnh đại diện để Sếp dễ nhận diện trong luồng chat.</h2>

<h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">🧬 2. SOUL.md - Tính cách và Quy tắc cốt lõi
Đây là "linh hồn" của Agent, quy định cách AI hành xử:
- **Persona:** Agent sẽ xưng hô thế nào, tông giọng ra sao.
- **Core Rules:** Các quy tắc không được vi phạm (ví dụ: "Luôn kiểm tra code trước khi bàn giao", "Ưu tiên hiệu suất").</h2>

<h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">👤 3. USER.md - Thông tin về Sếp
Để hỗ trợ tốt nhất, Agent cần hiểu rõ người mình đang phục vụ:
- **Danny:** Tên và thông tin cá nhân của Sếp.
- **Preferences:** Các sở thích hoặc yêu cầu đặc biệt về múi giờ, ngôn ngữ và cách báo cáo.</h2>

<h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">🧠 4. MEMORY.md - Bộ nhớ dài hạn
Nơi lưu trữ những thông tin quan trọng nhất để không bao giờ quên:
- **Project Info:** Cấu trúc các dự án tại `H:\project`.
- **Bookmarks & Automation:** Các quy trình tự động hóa đã được thiết lập (như quy trình thêm key ROK).</h2>

<h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">📅 5. Thư mục memory/ - Nhật ký hành trình
Chứa các file log hàng ngày (ví dụ: `2026-02-09.md`):
- Ghi lại chi tiết mọi việc Agent đã làm trong ngày.
- Giúp duy trì mạch công việc nếu hệ thống bị gián đoạn hoặc khởi động lại.</h2>

<h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">🛠️ 6. TOOLS.md - Ghi chú công cụ
Lưu trữ các thông số kỹ thuật riêng biệt cho môi trường hiện tại:
- Tên các thiết bị (Camera, Node).
- Các cấu hình SSH hoặc đường dẫn phần mềm đặc thù.</h2>

<p>---
Một Workspace được tổ chức tốt là chìa khóa để biến một AI Assistant thành một cộng sự đắc lực, hiểu việc và luôn sẵn sàng hành động. 🛡️</p>


      </div>

      <footer className="pt-12 border-t border-border mt-12 text-text-muted">
        <a href="/stories" className="text-sm no-underline hover:underline">← Back to stories</a>
      </footer>
    </div>
  );
}
