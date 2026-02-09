export default function ThuatNguOpenclawNote() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="space-y-2">
        <time className="text-xs text-text-muted">February 9, 2026</time>
        <h1 className="text-2xl font-bold">Từ điển thuật ngữ OpenClaw cho người mới</h1>
      </header>

      <div className="prose leading-relaxed text-text-muted">
        <p>Để giao tiếp và quản trị OpenClaw hiệu quả, việc hiểu rõ các thuật ngữ nền tảng là điều bắt buộc. Dưới đây là "từ điển" bỏ túi cho các Admin OpenClaw.</p>

        <h2>1. Gateway (Cổng kết nối)</h2>

        <p>Gateway là thành phần quan trọng nhất, đóng vai trò là "bộ não" trung tâm. Nó quản lý mọi kết nối từ các kênh (Telegram, Discord), điều phối các Agent và xử lý dữ liệu đầu vào.</p>

        <h2>2. Agent (Đặc vụ AI)</h2>

        <p>Agent là một định danh AI có tính cách (Soul), kỹ năng và nhiệm vụ riêng biệt.</p>

        <ul className="list-disc pl-6 space-y-4">
          <li><strong>Ví dụ:</strong> <strong>Dev</strong> chuyên về code, <strong>Mei</strong> chuyên điều phối, <strong>Researcher</strong> chuyên tìm kiếm thông tin.</li>
        </ul>

        <h2>3. Skill (Kỹ năng)</h2>

        <p>Skill là các bộ công cụ bổ trợ được đóng gói để mở rộng khả năng của Agent. Mỗi Skill cho phép Agent thực hiện các tác vụ chuyên sâu như quản lý lịch trình, phân tích chứng khoán, hay chụp ảnh màn hình máy tính.</p>

        <h2>4. Workspace (Không gian làm việc)</h2>

        <p>Mỗi Agent có một Workspace riêng — một thư mục trên ổ đĩa nơi nó có toàn quyền đọc, ghi và quản lý file. Đây là nơi các dự án của Sếp được lưu trữ và xử lý.</p>

        <h2>5. Session (Phiên làm việc)</h2>

        <p>Session là một luồng hội thoại cụ thể.</p>

        <ul className="list-disc pl-6 space-y-4">
          <li><strong>Main Session:</strong> Cuộc trò chuyện trực tiếp giữa Sếp và Agent.</li>
          <li><strong>Isolated Session:</strong> Một phiên làm việc độc lập, chạy ngầm để xử lý các tác vụ nặng hoặc tốn thời gian mà không làm phiền luồng chat chính.</li>
        </ul>

        <h2>6. Heartbeat (Nhịp đập hệ thống)</h2>

        <p>Đây là cơ chế giúp Agent không bị "thụ động". Cứ sau một khoảng thời gian nhất định, Heartbeat sẽ kích hoạt để Agent chủ động kiểm tra email, lịch trình hoặc trạng thái các dự án và báo cáo cho Sếp nếu có gì cần chú ý.</p>

        <h2>7. Node (Nút kết nối)</h2>

        <p>Node đại diện cho các thiết bị vật lý hoặc trình duyệt mà OpenClaw có thể điều khiển từ xa. Sếp có thể ra lệnh cho một Node chụp ảnh từ camera điện thoại hoặc lấy dữ liệu từ một tab trình duyệt đang mở.</p>

        <hr />

        <p>Việc nắm vững các thuật ngữ này sẽ giúp Sếp hiểu sâu hơn về cách hệ thống vận hành và khai thác tối đa sức mạnh của đội quân AI này. 🛡️</p>

      </div>

      <footer className="pt-12 border-t border-border mt-12 text-text-muted">
        <a href="/stories" className="text-sm no-underline hover:underline">← Back to stories</a>
      </footer>
    </div>
  );
}
