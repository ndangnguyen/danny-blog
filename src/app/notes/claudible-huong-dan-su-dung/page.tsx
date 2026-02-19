import CommentSection from "../../components/CommentSection";

export default function ClaudibleHuongDanSuDungNote() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="space-y-2">
        <time className="text-xs text-text-muted">February 13, 2026</time>
        <h1 className="text-2xl font-bold">Claudible - Hướng Dẫn Sử Dụng Claude API Proxy</h1>
      </header>

      <div className="space-y-6 leading-relaxed text-text-muted">
        <p>Claudible là dịch vụ proxy API cho Claude của Anthropic, giúp người dùng truy cập các mô hình Claude (Sonnet, Opus, Haiku) một cách dễ dàng thông qua một endpoint thống nhất. Dịch vụ này đặc biệt hữu ích khi tích hợp vào các ứng dụng AI như OpenClaw.</p>

        <hr className="border-border my-8" />

        <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">Claudible Là Gì?</h2>

        <p>Claudible hoạt động như một lớp trung gian (proxy) giữa ứng dụng của bạn và API của Anthropic. Thay vì gọi trực tiếp đến <code>api.anthropic.com</code>, bạn gọi đến endpoint của Claudible với API key được cung cấp.</p>

        <p><strong>Ưu điểm chính:</strong></p>

        <ul className="list-disc pl-6 space-y-4">
          <li><strong>Đơn giản hóa việc quản lý API key:</strong> Một key duy nhất cho nhiều mô hình.</li>
          <li><strong>Hỗ trợ đầy đủ các model Claude:</strong> Từ Haiku (nhanh, rẻ) đến Opus (mạnh nhất).</li>
          <li><strong>Tương thích OpenAI-style API:</strong> Dễ tích hợp với các framework có sẵn.</li>
          <li><strong>Theo dõi usage:</strong> Kiểm soát chi phí và lượng token sử dụng.</li>
        </ul>

        <hr className="border-border my-8" />

        <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">Các Model Hỗ Trợ</h2>

        <ul className="list-disc pl-6 space-y-4">
          <li><strong>claudible/claude-haiku-3.5:</strong> Nhanh, tiết kiệm, phù hợp cho các tác vụ đơn giản.</li>
          <li><strong>claudible/claude-sonnet-4.5:</strong> Cân bằng giữa hiệu suất và chi phí, tốt cho coding.</li>
          <li><strong>claudible/claude-opus-4.5:</strong> Mạnh nhất, reasoning phức tạp, phân tích sâu.</li>
        </ul>

        <hr className="border-border my-8" />

        <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">Cách Cấu Hình Trong OpenClaw</h2>

        <h3 className="text-lg font-bold text-text-primary mt-6">Bước 1: Thêm Provider vào models.json</h3>

        <p>Mở file <code>~/.openclaw/models.json</code> (hoặc tạo mới nếu chưa có) và thêm cấu hình:</p>

        <figure className="space-y-2 py-4">
          <div className="bg-[#1a1a2e] rounded-lg border border-border p-6 font-mono text-sm overflow-x-auto">
            <div>{`{`}</div>
            <div className="pl-4">{`"providers": [`}</div>
            <div className="pl-8">{`{`}</div>
            <div className="pl-12">{`"name": "claudible",`}</div>
            <div className="pl-12">{`"baseUrl": "https://api.claudible.com/v1",`}</div>
            <div className="pl-12">{`"apiKey": "sk-xxx-your-api-key-here"`}</div>
            <div className="pl-8">{`}`}</div>
            <div className="pl-4">{`]`}</div>
            <div>{`}`}</div>
          </div>
        </figure>

        <h3 className="text-lg font-bold text-text-primary mt-6">Bước 2: Khai Báo Các Model</h3>

        <p>Tiếp tục thêm vào phần <code>models</code>:</p>

        <figure className="space-y-2 py-4">
          <div className="bg-[#1a1a2e] rounded-lg border border-border p-6 font-mono text-sm overflow-x-auto">
            <div>{`{`}</div>
            <div className="pl-4">{`"models": [`}</div>
            <div className="pl-8">{`{`}</div>
            <div className="pl-12">{`"id": "claudible/claude-sonnet-4.5",`}</div>
            <div className="pl-12">{`"provider": "claudible",`}</div>
            <div className="pl-12">{`"model": "claude-sonnet-4-5-20250514"`}</div>
            <div className="pl-8">{`},`}</div>
            <div className="pl-8">{`{`}</div>
            <div className="pl-12">{`"id": "claudible/claude-opus-4.5",`}</div>
            <div className="pl-12">{`"provider": "claudible",`}</div>
            <div className="pl-12">{`"model": "claude-opus-4-5-20250514"`}</div>
            <div className="pl-8">{`},`}</div>
            <div className="pl-8">{`{`}</div>
            <div className="pl-12">{`"id": "claudible/claude-haiku-3.5",`}</div>
            <div className="pl-12">{`"provider": "claudible",`}</div>
            <div className="pl-12">{`"model": "claude-3-5-haiku-20241022"`}</div>
            <div className="pl-8">{`}`}</div>
            <div className="pl-4">{`]`}</div>
            <div>{`}`}</div>
          </div>
        </figure>

        <h3 className="text-lg font-bold text-text-primary mt-6">Bước 3: Đặt Default Model</h3>

        <p>Trong file <code>openclaw.json</code>, đặt model mặc định:</p>

        <figure className="space-y-2 py-4">
          <div className="bg-[#1a1a2e] rounded-lg border border-border p-6 font-mono text-sm overflow-x-auto">
            <div>{`{`}</div>
            <div className="pl-4">{`"model": "claudible/claude-sonnet-4.5"`}</div>
            <div>{`}`}</div>
          </div>
        </figure>

        <h3 className="text-lg font-bold text-text-primary mt-6">Bước 4: Khởi động lại OpenClaw</h3>

        <figure className="space-y-2 py-4">
          <div className="bg-[#1a1a2e] rounded-lg border border-border p-6 font-mono text-sm overflow-x-auto">
            <div>openclaw gateway restart</div>
          </div>
        </figure>

        <hr className="border-border my-8" />

        <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">Chuyển Đổi Model Trong Phiên Chat</h2>

        <p>Khi đang chat với OpenClaw, bạn có thể yêu cầu chuyển model bất cứ lúc nào:</p>

        <ul className="list-disc pl-6 space-y-4">
          <li>&quot;Đổi sang opus cho anh&quot; → Chuyển sang Claude Opus 4.5</li>
          <li>&quot;Dùng haiku đi&quot; → Chuyển sang Claude Haiku 3.5 (nhanh hơn)</li>
          <li>&quot;Chuyển về sonnet&quot; → Quay lại Claude Sonnet 4.5</li>
        </ul>

        <hr className="border-border my-8" />

        <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">Kiểm Tra Trạng Thái</h2>

        <p>Sử dụng lệnh <code>/status</code> trong chat để xem model hiện tại đang được sử dụng, token đã dùng, và các thông tin khác.</p>

        <hr className="border-border my-8" />

        <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">Khi Nào Nên Dùng Model Nào?</h2>

        <ul className="list-disc pl-6 space-y-4">
          <li><strong>Haiku:</strong> Chat nhanh, trả lời câu hỏi đơn giản, draft nội dung.</li>
          <li><strong>Sonnet:</strong> Coding, debug, viết bài, phân tích trung bình.</li>
          <li><strong>Opus:</strong> Reasoning phức tạp, logic nhiều bước, phân tích sâu, creative writing cao cấp.</li>
        </ul>

        <hr className="border-border my-8" />

        <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">Lưu Ý Quan Trọng</h2>

        <ul className="list-disc pl-6 space-y-4">
          <li>API key Claudible cần được bảo mật, không commit vào git.</li>
          <li>Chi phí tính theo token, Opus đắt hơn Sonnet khoảng 5-10x.</li>
          <li>Context window của Opus 4.5 là 200k tokens.</li>
        </ul>

        <hr className="border-border my-8" />

        <p>Với Claudible, việc sử dụng các mô hình Claude trở nên đơn giản và linh hoạt hơn bao giờ hết. Chỉ cần một vài bước cấu hình, bạn đã có thể tận dụng sức mạnh của Claude trong mọi dự án!</p>
      </div>

      <CommentSection slug="claudible-huong-dan-su-dung" />

      <footer className="pt-12 border-t border-border mt-12 text-text-muted">
        <a href="/notes" className="text-sm no-underline hover:underline">← Back to notes</a>
      </footer>
    </div>
  );
}
