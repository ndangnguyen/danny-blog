export default function FlutterRenderingDeepDiveNote() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="space-y-2">
        <time className="text-xs text-text-muted">February 7, 2026</time>
        <h1 className="text-2xl font-bold">Flutter Rendering Deep Dive: Từ Code đến Điểm Ảnh</h1>
      </header>

      <div className="space-y-6 leading-relaxed text-text-muted">
        <p>Trong thế giới phát triển ứng dụng di động, Flutter nổi bật với khả năng tạo ra giao diện mượt mà và nhất quán trên nhiều nền tảng. Bí mật đằng sau sức mạnh này chính là cơ chế rendering độc đáo. Bài viết này sẽ giúp bạn hiểu rõ cách Flutter đưa những dòng code Dart của bạn trở thành những điểm ảnh (pixels) trên màn hình.</p>

        <hr className="border-border my-8" />

        <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">1. Kiến trúc "Ba Cái Cây" (The Three Trees)</h2>

        <p>Để hiểu cách Flutter render, trước hết chúng ta cần nắm rõ ba thành phần cốt lõi hoạt động song song:</p>

        <h3 className="text-lg font-bold text-text-primary mt-6">1.1. Widget Tree (Cây Widget)</h3>
        <p>Đây là tầng mà lập trình viên làm việc trực tiếp. Widget là các cấu trúc dữ liệu <strong>immutable</strong> (bất biến), đóng vai trò như bản thiết kế (blueprint) cho giao diện. Vì chúng rất nhẹ, Flutter có thể tạo và hủy hàng ngàn Widget mà không gây ảnh hưởng đáng kể đến hiệu năng.</p>

        <h3 className="text-lg font-bold text-text-primary mt-6">1.2. Element Tree (Cây Element)</h3>
        <p>Đây là tầng trung gian, đóng vai trò là "chất keo" kết nối Widget và RenderObject. Element là phiên bản <strong>mutable</strong> (có thể thay đổi) của Widget tại một vị trí cụ thể trên cây. Nó quản lý vòng đời của Widget và điều phối việc cập nhật giao diện.</p>

        <h3 className="text-lg font-bold text-text-primary mt-6">1.3. RenderObject Tree (Cây RenderObject)</h3>
        <p>Đây là nơi công việc nặng nhọc diễn ra. Mỗi <code>RenderObject</code> chứa thông tin chi tiết về kích thước, vị trí và cách vẽ của chính nó. Cây này trực tiếp tham gia vào các giai đoạn Layout và Paint của pipeline.</p>

        <figure className="space-y-2 py-4">
          <img src="https://docs.flutter.dev/assets/images/docs/arch-overview/trees.png" alt="Sơ đồ Ba cái cây trong Flutter" className="rounded-lg border border-border w-full h-auto shadow-sm" />
          <figcaption className="text-center text-sm text-text-muted italic">Hình 1: Mối quan hệ giữa Widget Tree, Element Tree và RenderObject Tree.</figcaption>
        </figure>

        <hr className="border-border my-8" />

        <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">2. Quy trình Rendering Pipeline</h2>

        <p>Khi một frame hình cần được vẽ (thường là 60 hoặc 120 lần mỗi giây), Flutter sẽ trải qua 5 giai đoạn chính:</p>

        <figure className="space-y-2 py-4">
          <img src="https://docs.flutter.dev/assets/images/docs/arch-overview/render-pipeline.png" alt="Quy trình Rendering Pipeline" className="rounded-lg border border-border w-full h-auto shadow-sm" />
          <figcaption className="text-center text-sm text-text-muted italic">Hình 2: Các bước trong quy trình Rendering Pipeline của Flutter.</figcaption>
        </figure>

        <h3 className="text-lg font-bold text-text-primary mt-6">Bước 1: Animate (Hoạt ảnh)</h3>
        <p>Flutter kiểm tra xem có chuyển động nào cần thực hiện không (ví dụ: một animation đang chạy). Các giá trị của animation sẽ được cập nhật để chuẩn bị cho bước tiếp theo.</p>

        <h3 className="text-lg font-bold text-text-primary mt-6">Bước 2: Build (Xây dựng)</h3>
        <p>Giai đoạn này diễn ra ở tầng Widget và Element. Khi bạn gọi <code>setState()</code>, Flutter sẽ đánh dấu các Element tương ứng là "dirty". Trong bước Build, Flutter sẽ tạo ra các Widget mới và so sánh với Widget cũ để cập nhật Element Tree một cách tối ưu nhất.</p>

        <figure className="space-y-2 py-4">
          <img src="https://docs.flutter.dev/assets/images/docs/arch-overview/widget-element.png" alt="Quá trình chuyển đổi từ Widget sang Element" className="rounded-lg border border-border w-full h-auto shadow-sm" />
          <figcaption className="text-center text-sm text-text-muted italic">Hình 3: Flutter chuyển đổi các Widget trong code thành Element Tree.</figcaption>
        </figure>

        <h3 className="text-lg font-bold text-text-primary mt-6">Bước 3: Layout (Bố cục)</h3>
        <p>Flutter thực hiện Layout theo nguyên tắc: <strong>"Constraints go down. Sizes go up."</strong></p>
        <ul className="list-disc pl-6 space-y-4">
          <li><strong>Constraints go down:</strong> Widget cha gửi các ràng buộc xuống cho Widget con.</li>
          <li><strong>Sizes go up:</strong> Widget con tự xác định kích thước và báo lại cho cha.</li>
        </ul>

        <figure className="space-y-2 py-4">
          <img src="https://docs.flutter.dev/assets/images/docs/arch-overview/constraints-sizes.png" alt="Nguyên tắc Layout" className="rounded-lg border border-border w-full h-auto shadow-sm" />
          <figcaption className="text-center text-sm text-text-muted italic">Hình 4: Cơ chế truyền Constraints xuống và trả Size lên trong giai đoạn Layout.</figcaption>
        </figure>

        <h3 className="text-lg font-bold text-text-primary mt-6">Bước 4: Paint (Vẽ)</h3>
        <p>Ở bước này, <code>RenderObject</code> sẽ tạo ra các lệnh vẽ. Lưu ý rằng bước này chưa thực sự vẽ lên màn hình mà chỉ tạo ra danh sách các chỉ dẫn vẽ.</p>

        <h3 className="text-lg font-bold text-text-primary mt-6">Bước 5: Compositing & Rasterizing</h3>
        <p>Các chỉ dẫn vẽ được gửi đến <strong>Flutter Engine</strong>. Engine sẽ sử dụng thư viện đồ họa <strong>Skia</strong> hoặc <strong>Impeller</strong> để chuyển đổi các lệnh này thành các điểm ảnh thực sự.</p>

        <figure className="space-y-2 py-4">
          <img src="https://docs.flutter.dev/assets/images/docs/arch-overview/archdiagram.png" alt="Kiến trúc các lớp của Flutter" className="rounded-lg border border-border w-full h-auto shadow-sm" />
          <figcaption className="text-center text-sm text-text-muted italic">Hình 5: Các lớp kiến trúc của Flutter từ Framework đến Engine và Embedder.</figcaption>
        </figure>

        <hr className="border-border my-8" />

        <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">3. Tại sao Flutter lại nhanh?</h2>

        <p>Khác với React Native, Flutter <strong>không</strong> sử dụng Native Widgets. Thay vào đó, nó tự vẽ mọi thứ lên Canvas thông qua Engine riêng. Điều này giúp:</p>
        <ul className="list-disc pl-6 space-y-4">
          <li>Loại bỏ hiện tượng "bridge" gây chậm trễ.</li>
          <li>Đảm bảo giao diện nhất quán trên mọi nền tảng.</li>
        </ul>

        <hr className="border-border my-8" />

        <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">4. Các lưu ý để tối ưu hiệu năng Render</h2>

        <ul className="list-disc pl-6 space-y-4">
          <li><strong>Sử dụng từ khóa <code>const</code>:</strong> Giúp Flutter bỏ qua bước Build cho các Widget không đổi.</li>
          <li><strong>Tận dụng <code>RepaintBoundary</code>:</strong> Tách lớp vẽ cho các phần giao diện thay đổi thường xuyên.</li>
          <li><strong>Sử dụng <code>ListView.builder</code>:</strong> Chỉ render những item thực sự hiển thị.</li>
          <li><strong>Giảm thiểu Rebuild:</strong> Sử dụng Provider, Riverpod hoặc Bloc để cập nhật đúng chỗ.</li>
        </ul>

        <hr className="border-border my-8" />

        <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">Kết luận</h2>

        <p>Hiểu rõ cơ chế rendering của Flutter không chỉ giúp bạn trở thành một lập trình viên giỏi hơn mà còn giúp bạn xây dựng được những ứng dụng có trải nghiệm người dùng tuyệt vời. Hãy nhớ rằng: <strong>Widget là bản thiết kế, Element là người quản lý, và RenderObject là người thực thi.</strong></p>
      </div>

      <footer className="pt-12 border-t border-border mt-12 text-text-muted">
        <a href="/notes" className="text-sm no-underline hover:underline">← Back to notes</a>
      </footer>
    </div>
  );
}
