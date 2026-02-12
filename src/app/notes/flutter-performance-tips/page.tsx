"use client";

import CommentSection from "../../components/CommentSection";

export default function FlutterPerformanceTipsNote() {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <header className="space-y-2">
                <time className="text-xs text-text-muted">February 4, 2026</time>
                <h1 className="text-2xl font-bold">Flutter Performance: 10 Tips Tối Ưu Hiệu Năng</h1>
            </header>

            <div className="space-y-6 leading-relaxed text-text-muted">
                <p>Hiệu năng là yếu tố quyết định trải nghiệm người dùng. Sau khi xây dựng LumiLED — một ứng dụng Flutter render hàng ngàn pixel LED ở 60fps — mình đã tích lũy được nhiều bài học quý giá về tối ưu hiệu năng.</p>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">1. Sử dụng <code>const</code> ở mọi nơi có thể</h2>

                <p>Widget với <code>const</code> constructor sẽ được Flutter bỏ qua trong quá trình rebuild. Đây là cách tối ưu đơn giản nhất nhưng hiệu quả nhất.</p>

                <figure className="space-y-2 py-4">
                    <div className="bg-[#1a1a2e] rounded-lg border border-border p-6 font-mono text-sm">
                        <div className="text-[#7c8db5]">// ❌ Sẽ rebuild mỗi lần parent thay đổi</div>
                        <div>Container(child: Text(<span className="text-[#c3e88d]">&apos;Hello&apos;</span>))</div>
                        <div className="mt-4 text-[#7c8db5]">// ✅ Bỏ qua rebuild vì immutable</div>
                        <div><span className="text-[#c792ea]">const</span> Text(<span className="text-[#c3e88d]">&apos;Hello&apos;</span>)</div>
                    </div>
                </figure>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">2. ListView.builder thay vì ListView</h2>

                <p><code>ListView.builder</code> chỉ render các item hiện đang hiển thị trên màn hình. Với danh sách 1000 items, sự khác biệt là <strong>rất lớn</strong>.</p>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">3. RepaintBoundary cho animation</h2>

                <p>Khi một phần nhỏ của màn hình thay đổi liên tục (như animation), hãy wrap nó trong <code>RepaintBoundary</code> để Flutter không phải vẽ lại toàn bộ cây Widget.</p>

                <figure className="space-y-2 py-4">
                    <div className="bg-[#1a1a2e] rounded-lg border border-border p-6 font-mono text-sm">
                        <div>RepaintBoundary(</div>
                        <div className="pl-4">child: MyAnimatedWidget(),</div>
                        <div>)</div>
                    </div>
                </figure>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">4. Tránh <code>setState</code> ở đầu cây Widget</h2>

                <p>Gọi <code>setState</code> trên widget gốc sẽ rebuild toàn bộ cây con. Hãy đẩy state xuống widget con nhỏ nhất có thể, hoặc sử dụng state management.</p>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">5. Cache expensive computations</h2>

                <p>Dùng <code>ValueNotifier</code>, <code>Selector</code>, hoặc <code>useMemoized</code> (với flutter_hooks) để tránh tính toán lại những giá trị tốn kém.</p>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">6. Image optimization</h2>

                <ul className="list-disc pl-6 space-y-4">
                    <li>Sử dụng <code>CachedNetworkImage</code> cho ảnh từ internet.</li>
                    <li>Resize ảnh về đúng kích thước hiển thị.</li>
                    <li>Sử dụng <code>precacheImage</code> cho ảnh quan trọng.</li>
                </ul>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">7. Isolate cho tác vụ nặng</h2>

                <p>Dart chạy trên single thread. Các tác vụ nặng như xử lý ảnh, parse JSON lớn nên được chuyển sang <code>Isolate</code> hoặc <code>compute()</code>.</p>

                <figure className="space-y-2 py-4">
                    <div className="bg-[#1a1a2e] rounded-lg border border-border p-6 font-mono text-sm">
                        <div><span className="text-[#c792ea]">final</span> result = <span className="text-[#c792ea]">await</span> compute(</div>
                        <div className="pl-4">expensiveFunction,</div>
                        <div className="pl-4">largeData,</div>
                        <div>);</div>
                    </div>
                    <figcaption className="text-center text-sm text-text-muted italic">compute() tự động tạo và quản lý Isolate.</figcaption>
                </figure>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">8. Lazy loading và Pagination</h2>

                <p>Không load tất cả data cùng lúc. Sử dụng pagination hoặc infinite scroll để load dần khi người dùng cuộn.</p>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">9. Profile trước khi optimize</h2>

                <p>Đừng optimize mù quáng. Sử dụng Flutter DevTools để xác định bottleneck thực sự:</p>

                <ul className="list-disc pl-6 space-y-4">
                    <li><strong>Performance overlay:</strong> Hiển thị frame time.</li>
                    <li><strong>Widget inspector:</strong> Xem rebuild count.</li>
                    <li><strong>Memory tab:</strong> Phát hiện memory leak.</li>
                </ul>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">10. Shader warm-up</h2>

                <p>Hiện tượng &quot;jank&quot; khi mở app lần đầu thường do shader compilation. Sử dụng <code>--cache-sksl</code> để pre-compile shader hoặc chuyển sang <strong>Impeller</strong> (mặc định trên iOS từ Flutter 3.16).</p>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">Kết luận</h2>

                <p>Hiệu năng không phải là thứ bạn thêm vào cuối cùng, mà là thứ bạn <strong>nghĩ đến từ đầu</strong>. Hãy profile thường xuyên và optimize có chủ đích.</p>
            </div>

            <CommentSection slug="flutter-performance-tips" />

            <footer className="pt-12 border-t border-border mt-12 text-text-muted">
                <a href="/notes" className="text-sm no-underline hover:underline">← Back to notes</a>
            </footer>
        </div>
    );
}
