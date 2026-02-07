export default function DesignPatternsNote() {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <header className="space-y-2">
                <time className="text-xs text-text-muted">February 8, 2026</time>
                <h1 className="text-2xl font-bold">Design Patterns: Các Pattern Thực Chiến Trong Dự Án Thực Tế</h1>
            </header>

            <div className="space-y-6 leading-relaxed text-text-muted">
                <p>Design Patterns không phải là thứ bạn học để phỏng vấn rồi quên. Chúng là <strong>giải pháp đã được kiểm chứng</strong> cho các bài toán lặp lại. Bài viết này tập trung vào những pattern mình dùng <strong>hàng ngày</strong> trong các dự án Flutter và Web.</p>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">1. Repository Pattern</h2>

                <p>Pattern phổ biến nhất khi làm việc với data. Repository đóng vai trò <strong>trung gian giữa domain logic và data source</strong>.</p>

                <figure className="space-y-2 py-4">
                    <div className="bg-[#1a1a2e] rounded-lg border border-border p-6 font-mono text-sm overflow-x-auto">
                        <div><span className="text-[#c792ea]">abstract class</span> <span className="text-[#82aaff]">ProductRepository</span> {"{"}</div>
                        <div className="pl-4">Future&lt;List&lt;Product&gt;&gt; getAll();</div>
                        <div className="pl-4">Future&lt;Product&gt; getById(String id);</div>
                        <div className="pl-4">Future&lt;<span className="text-[#c792ea]">void</span>&gt; save(Product product);</div>
                        <div>{"}"}</div>
                        <div></div>
                        <div><span className="text-[#c792ea]">class</span> <span className="text-[#82aaff]">ProductRepoImpl</span> <span className="text-[#c792ea]">implements</span> ProductRepository {"{"}</div>
                        <div className="pl-4"><span className="text-[#c792ea]">final</span> ApiClient _api;</div>
                        <div className="pl-4"><span className="text-[#c792ea]">final</span> CacheManager _cache;</div>
                        <div className="pl-4 text-[#7c8db5]">// Try cache first, fallback to API</div>
                        <div>{"}"}</div>
                    </div>
                    <figcaption className="text-center text-sm text-text-muted italic">Repository ẩn chi tiết data source khỏi business logic.</figcaption>
                </figure>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">2. Observer Pattern</h2>

                <p>Nền tảng của reactive programming. Trong Flutter, đây là cách <code>Stream</code>, <code>ChangeNotifier</code>, và <code>BlocObserver</code> hoạt động.</p>

                <figure className="space-y-2 py-4">
                    <div className="bg-[#1a1a2e] rounded-lg border border-border p-6 font-mono text-sm overflow-x-auto">
                        <div><span className="text-[#c792ea]">class</span> <span className="text-[#82aaff]">EventBus</span> {"{"}</div>
                        <div className="pl-4"><span className="text-[#c792ea]">final</span> _controller = StreamController.broadcast();</div>
                        <div></div>
                        <div className="pl-4"><span className="text-[#c792ea]">void</span> <span className="text-[#82aaff]">emit</span>(Event event) =&gt; _controller.add(event);</div>
                        <div></div>
                        <div className="pl-4">Stream&lt;T&gt; <span className="text-[#82aaff]">on</span>&lt;T <span className="text-[#c792ea]">extends</span> Event&gt;() =&gt;</div>
                        <div className="pl-8">_controller.stream.whereType&lt;T&gt;();</div>
                        <div>{"}"}</div>
                    </div>
                    <figcaption className="text-center text-sm text-text-muted italic">EventBus — Observer Pattern đơn giản với Dart Streams.</figcaption>
                </figure>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">3. Singleton Pattern</h2>

                <p>Đảm bảo chỉ có <strong>một instance duy nhất</strong> trong toàn app. Hữu ích cho services, database connections, analytics.</p>

                <figure className="space-y-2 py-4">
                    <div className="bg-[#1a1a2e] rounded-lg border border-border p-6 font-mono text-sm overflow-x-auto">
                        <div><span className="text-[#c792ea]">class</span> <span className="text-[#82aaff]">AppLogger</span> {"{"}</div>
                        <div className="pl-4"><span className="text-[#c792ea]">static final</span> AppLogger _instance = AppLogger._();</div>
                        <div className="pl-4"><span className="text-[#c792ea]">factory</span> <span className="text-[#82aaff]">AppLogger</span>() =&gt; _instance;</div>
                        <div className="pl-4">AppLogger._();</div>
                        <div></div>
                        <div className="pl-4"><span className="text-[#c792ea]">void</span> <span className="text-[#82aaff]">log</span>(String msg) =&gt; <span className="text-[#7c8db5]">/* ... */</span>;</div>
                        <div>{"}"}</div>
                    </div>
                    <figcaption className="text-center text-sm text-text-muted italic">Dart&apos;s factory constructor tạo Singleton cực kỳ clean.</figcaption>
                </figure>

                <p><strong>⚠️ Lưu ý:</strong> Singleton gây khó khăn cho testing. Ưu tiên dùng Dependency Injection thay vì Singleton.</p>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">4. Strategy Pattern</h2>

                <p>Cho phép thay đổi algorithm tại runtime. Ví dụ: chọn cách sort, chọn phương thức thanh toán, chọn animation style.</p>

                <figure className="space-y-2 py-4">
                    <div className="bg-[#1a1a2e] rounded-lg border border-border p-6 font-mono text-sm overflow-x-auto">
                        <div><span className="text-[#c792ea]">abstract class</span> <span className="text-[#82aaff]">CompressionStrategy</span> {"{"}</div>
                        <div className="pl-4">List&lt;int&gt; compress(List&lt;int&gt; data);</div>
                        <div>{"}"}</div>
                        <div></div>
                        <div><span className="text-[#c792ea]">class</span> <span className="text-[#82aaff]">GzipCompression</span> <span className="text-[#c792ea]">implements</span> CompressionStrategy {"{"}</div>
                        <div className="pl-4">List&lt;int&gt; compress(List&lt;int&gt; data) =&gt; gzip.encode(data);</div>
                        <div>{"}"}</div>
                        <div></div>
                        <div><span className="text-[#c792ea]">class</span> <span className="text-[#82aaff]">FileExporter</span> {"{"}</div>
                        <div className="pl-4"><span className="text-[#c792ea]">final</span> CompressionStrategy _strategy;</div>
                        <div className="pl-4"><span className="text-[#82aaff]">FileExporter</span>(<span className="text-[#c792ea]">this</span>._strategy);</div>
                        <div className="pl-4"><span className="text-[#c792ea]">void</span> <span className="text-[#82aaff]">export</span>(data) =&gt; _strategy.compress(data);</div>
                        <div>{"}"}</div>
                    </div>
                    <figcaption className="text-center text-sm text-text-muted italic">Swap compression algorithm mà không sửa FileExporter.</figcaption>
                </figure>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">5. Builder Pattern</h2>

                <p>Xây dựng object phức tạp từng bước. Flutter sử dụng pattern này rất nhiều — <code>ThemeData</code>, <code>TextStyle</code>, <code>BoxDecoration</code>.</p>

                <figure className="space-y-2 py-4">
                    <div className="bg-[#1a1a2e] rounded-lg border border-border p-6 font-mono text-sm overflow-x-auto">
                        <div><span className="text-[#c792ea]">final</span> query = QueryBuilder(<span className="text-[#c3e88d]">&apos;users&apos;</span>)</div>
                        <div className="pl-2">.where(<span className="text-[#c3e88d]">&apos;age&apos;</span>, <span className="text-[#c3e88d]">&apos;&gt;&apos;</span>, <span className="text-[#f78c6c]">18</span>)</div>
                        <div className="pl-2">.orderBy(<span className="text-[#c3e88d]">&apos;name&apos;</span>)</div>
                        <div className="pl-2">.limit(<span className="text-[#f78c6c]">10</span>)</div>
                        <div className="pl-2">.build();</div>
                    </div>
                    <figcaption className="text-center text-sm text-text-muted italic">Builder Pattern — fluent API dễ đọc, dễ dùng.</figcaption>
                </figure>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">Khi nào dùng pattern nào?</h2>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-white/5">
                                <th className="p-3 text-left border-b border-border text-text-primary">Pattern</th>
                                <th className="p-3 text-left border-b border-border text-text-primary">Khi nào</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-border/50"><td className="p-3"><strong>Repository</strong></td><td className="p-3">Truy xuất data từ nhiều nguồn</td></tr>
                            <tr className="border-b border-border/50"><td className="p-3"><strong>Observer</strong></td><td className="p-3">Notify nhiều listener khi state thay đổi</td></tr>
                            <tr className="border-b border-border/50"><td className="p-3"><strong>Strategy</strong></td><td className="p-3">Swap algorithm tại runtime</td></tr>
                            <tr className="border-b border-border/50"><td className="p-3"><strong>Builder</strong></td><td className="p-3">Tạo object phức tạp với nhiều optional params</td></tr>
                            <tr><td className="p-3"><strong>Singleton</strong></td><td className="p-3">Global service (nhưng ưu tiên DI)</td></tr>
                        </tbody>
                    </table>
                </div>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">Kết luận</h2>

                <p>Design Patterns là <strong>công cụ, không phải mục tiêu</strong>. Đừng ép pattern vào code — hãy nhận ra bài toán rồi áp dụng pattern phù hợp. Kinh nghiệm của mình: <strong>hiểu rõ 5-7 patterns cốt lõi sẽ giải quyết được 90% các bài toán thiết kế</strong>.</p>
            </div>

            <footer className="pt-12 border-t border-border mt-12 text-text-muted">
                <a href="/notes" className="text-sm no-underline hover:underline">← Back to notes</a>
            </footer>
        </div>
    );
}
