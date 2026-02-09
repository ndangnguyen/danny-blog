export default function CauTrucWorkspaceOpenclawNote() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="space-y-2">
        <time className="text-xs text-text-muted">February 9, 2026</time>
        <h1 className="text-2xl font-bold">Giải mã cấu trúc bên trong một OpenClaw Workspace</h1>
      </header>

      <div className="prose leading-relaxed text-text-muted">
        <p>Workspace (Không gian làm việc) là "ngôi nhà" và cũng là "phòng thí nghiệm" của một Agent. Để một AI có thể hoạt động hiệu quả và nhất quán, Workspace cần được define (định nghĩa) thông qua các file cấu hình quan trọng.</p>

        <h2>🪪 1. IDENTITY.md - Định danh cá nhân</h2>

        <p>File này định nghĩa Agent là ai. Nó bao gồm:</p>

        <ul className="list-disc pl-6 space-y-4">
          <li><strong>Name:</strong> Tên của Agent (ví dụ: Dev, Mei, Pu).</li>
          <li><strong>Vibe:</strong> Phong cách làm việc (Technical, Professional, Friendly).</li>
          <li><strong>Emoji & Avatar:</strong> Hình ảnh đại diện để Sếp dễ nhận diện trong luồng chat.</li>
        </ul>

        <h2>🧬 2. SOUL.md - Tính cách và Quy tắc cốt lõi</h2>

        <p>Đây là "linh hồn" của Agent, quy định cách AI hành xử:</p>

        <ul className="list-disc pl-6 space-y-4">
          <li><strong>Persona:</strong> Agent sẽ xưng hô thế nào, tông giọng ra sao.</li>
          <li><strong>Core Rules:</strong> Các quy tắc không được vi phạm (ví dụ: "Luôn kiểm tra code trước khi bàn giao", "Ưu tiên hiệu suất").</li>
        </ul>

        <h2>👤 3. USER.md - Thông tin về Sếp</h2>

        <p>Để hỗ trợ tốt nhất, Agent cần hiểu rõ người mình đang phục vụ:</p>

        <ul className="list-disc pl-6 space-y-4">
          <li><strong>Danny:</strong> Tên và thông tin cá nhân của Sếp.</li>
          <li><strong>Preferences:</strong> Các sở thích hoặc yêu cầu đặc biệt về múi giờ, ngôn ngữ và cách báo cáo.</li>
        </ul>

        <h2>🧠 4. MEMORY.md - Bộ nhớ dài hạn</h2>

        <p>Nơi lưu trữ những thông tin quan trọng nhất để không bao giờ quên:</p>

        <ul className="list-disc pl-6 space-y-4">
          <li><strong>Project Info:</strong> Cấu trúc các dự án tại `H:\project`.</li>
          <li><strong>Bookmarks & Automation:</strong> Các quy trình tự động hóa đã được thiết lập (như quy trình thêm key ROK).</li>
        </ul>

        <h2>📅 5. Thư mục memory/ - Nhật ký hành trình</h2>

        <p>Chứa các file log hàng ngày (ví dụ: <code>2026-02-09.md</code>):</p>

        <ul className="list-disc pl-6 space-y-4">
          <li>Ghi lại chi tiết mọi việc Agent đã làm trong ngày.</li>
          <li>Giúp duy trì mạch công việc nếu hệ thống bị gián đoạn hoặc khởi động lại.</li>
        </ul>

        <h2>🛠️ 6. TOOLS.md - Ghi chú công cụ</h2>

        <p>Lưu trữ các thông số kỹ thuật riêng biệt cho môi trường hiện tại:</p>

        <ul className="list-disc pl-6 space-y-4">
          <li>Tên các thiết bị (Camera, Node).</li>
          <li>Các cấu hình SSH hoặc đường dẫn phần mềm đặc thù.</li>
        </ul>

        <hr />

        <p>Một Workspace được tổ chức tốt là chìa khóa để biến một AI Assistant thành một cộng sự đắc lực, hiểu việc và luôn sẵn sàng hành động. 🛡️</p>

      </div>

      <footer className="pt-12 border-t border-border mt-12 text-text-muted">
        <a href="/stories" className="text-sm no-underline hover:underline">← Back to stories</a>
      </footer>
    </div>
  );
}
