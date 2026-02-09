export default function HuongDanCliOpenclawNote() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="space-y-2">
        <time className="text-xs text-text-muted">February 9, 2026</time>
        <h1 className="text-2xl font-bold">Làm chủ bộ lệnh CLI của OpenClaw</h1>
      </header>

      <div className="prose leading-relaxed">
        <p>Để quản trị hệ thống OpenClaw trực tiếp từ terminal, bộ lệnh CLI (Command Line Interface) chính là công cụ quyền lực nhất. Dưới đây là những lệnh "cửa miệng" mà mọi admin OpenClaw đều cần nằm lòng.</p>
<h2>🚀 Quản lý Gateway (Dịch vụ cốt lõi)</h2>
<p>Gateway là trái tim của hệ thống, quản lý các kết nối và luồng xử lý Agent.</p>
<ul className="list-disc pl-6 space-y-2">
  <li><strong>`openclaw gateway status`</strong>: Kiểm tra xem "trái tim" hệ thống có đang đập khỏe mạnh hay không.</li>
  <li><strong>`openclaw gateway restart`</strong>: Làm mới toàn bộ hệ thống, thường dùng sau khi bạn thay đổi file cấu hình `openclaw.json`.</li>
  <li><strong>`openclaw gateway start/stop`</strong>: Bật hoặc tắt dịch vụ Gateway thủ công.</li>
</ul>
<h2>🛡️ Quản lý Agent và Kết nối</h2>
<ul className="list-disc pl-6 space-y-2">
  <li><strong>`openclaw status`</strong>: Cái nhìn tổng quan về toàn bộ hệ thống: phiên bản đang dùng, các kênh đang kết nối (Telegram, Discord...) và các Agent đang hoạt động.</li>
  <li><strong>`openclaw pairing list`</strong>: Liệt kê các yêu cầu kết nối mới từ các bot (như khi bạn nhắn tin cho một bot mới tạo lần đầu).</li>
  <li><strong>`openclaw pairing approve <ID>`</strong>: Xác nhận "kết thân" với bot để bắt đầu trò chuyện.</li>
</ul>
<h2>🩺 Kiểm tra và Debug</h2>
<p>Khi hệ thống gặp vấn đề, đây là những lệnh cứu cánh:</p>
<ul className="list-disc pl-6 space-y-2">
  <li><strong>`openclaw logs --follow`</strong>: Xem dòng chảy dữ liệu thời gian thực. Mọi lỗi (error) hay cảnh báo (warning) đều sẽ hiện rõ tại đây.</li>
  <li><strong>`openclaw doctor`</strong>: Một bản "khám sức khỏe" tổng quát cho hệ thống, giúp phát hiện các file cấu hình lỗi hoặc thiếu API key.</li>
</ul>
<h2>⚙️ Cấu hình và Cài đặt</h2>
<ul className="list-disc pl-6 space-y-2">
  <li><strong>`openclaw configure`</strong>: Mở trình thuật sĩ (Wizard) để cài đặt các tính năng mới mà không cần sửa file JSON thủ công.</li>
  <li><strong>`openclaw upgrade`</strong>: Cập nhật OpenClaw lên bản mới nhất để tận hưởng các tính năng và bản vá mới nhất.</li>
</ul>
<hr />
<p>Việc sử dụng thành thạo CLI giúp bạn kiểm soát hoàn toàn "hệ sinh thái" AI của mình, đảm bảo tính ổn định và hiệu suất cao nhất. 🛡️</p>

      </div>

      <footer className="pt-12 border-t border-border mt-12 text-text-muted">
        <a href="/stories" className="text-sm no-underline hover:underline">← Back to stories</a>
      </footer>
    </div>
  );
}
