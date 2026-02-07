export default function FlutterStateManagementNote() {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <header className="space-y-2">
                <time className="text-xs text-text-muted">February 7, 2026</time>
                <h1 className="text-2xl font-bold">Flutter State Management: Riverpod vs Bloc</h1>
            </header>

            <div className="space-y-6 leading-relaxed text-text-muted">
                <p>State Management là một trong những chủ đề quan trọng nhất khi xây dựng ứng dụng Flutter. Trong bài viết này, mình sẽ so sánh chi tiết hai giải pháp được cộng đồng Flutter tin dùng nhất: <strong>Riverpod</strong> và <strong>Bloc</strong>.</p>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">Tại sao State Management lại quan trọng?</h2>

                <p>Khi ứng dụng Flutter của bạn phát triển, việc quản lý state bằng <code>setState()</code> đơn thuần sẽ nhanh chóng trở nên hỗn loạn. Bạn cần một kiến trúc rõ ràng để quản lý dữ liệu, tách biệt logic và UI.</p>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">Riverpod — Sự tiến hóa của Provider</h2>

                <p>Riverpod là thế hệ tiếp theo của Provider, được tạo bởi Remi Rousselet. Điểm nổi bật:</p>

                <ul className="list-disc pl-6 space-y-4">
                    <li><strong>Compile-safe:</strong> Không còn lỗi runtime do thiếu Provider.</li>
                    <li><strong>Không phụ thuộc BuildContext:</strong> Có thể truy cập state từ bất kỳ đâu.</li>
                    <li><strong>Auto-dispose:</strong> Tự động giải phóng tài nguyên khi không còn listener.</li>
                    <li><strong>Code generation:</strong> Hỗ trợ <code>@riverpod</code> annotation giúp giảm boilerplate.</li>
                </ul>

                <figure className="space-y-2 py-4">
                    <div className="bg-[#1a1a2e] rounded-lg border border-border p-6 font-mono text-sm">
                        <div className="text-[#7c8db5]">// Riverpod example</div>
                        <div className="text-[#c792ea]">@riverpod</div>
                        <div><span className="text-[#c792ea]">class</span> <span className="text-[#82aaff]">Counter</span> <span className="text-[#c792ea]">extends</span> <span className="text-[#82aaff]">_$Counter</span> {"{"}</div>
                        <div className="pl-4"><span className="text-[#c792ea]">int</span> <span className="text-[#82aaff]">build</span>() =&gt; <span className="text-[#f78c6c]">0</span>;</div>
                        <div className="pl-4"><span className="text-[#c792ea]">void</span> <span className="text-[#82aaff]">increment</span>() =&gt; state++;</div>
                        <div>{"}"}</div>
                    </div>
                    <figcaption className="text-center text-sm text-text-muted italic">Riverpod sử dụng code generation để giảm boilerplate.</figcaption>
                </figure>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">Bloc — Kiến trúc rõ ràng cho Enterprise</h2>

                <p>Bloc (Business Logic Component) tuân theo pattern <strong>Event → State</strong>:</p>

                <ul className="list-disc pl-6 space-y-4">
                    <li><strong>Tách biệt hoàn toàn:</strong> Event, State, và Logic nằm ở các file riêng.</li>
                    <li><strong>Testable:</strong> Dễ dàng viết unit test cho từng Bloc.</li>
                    <li><strong>Predictable:</strong> Mỗi Event chỉ tạo ra một State mới.</li>
                    <li><strong>DevTools:</strong> Có công cụ debug mạnh mẽ.</li>
                </ul>

                <figure className="space-y-2 py-4">
                    <div className="bg-[#1a1a2e] rounded-lg border border-border p-6 font-mono text-sm">
                        <div className="text-[#7c8db5]">// Bloc example</div>
                        <div><span className="text-[#c792ea]">class</span> <span className="text-[#82aaff]">CounterBloc</span> <span className="text-[#c792ea]">extends</span> <span className="text-[#82aaff]">Bloc</span>&lt;CounterEvent, <span className="text-[#c792ea]">int</span>&gt; {"{"}</div>
                        <div className="pl-4"><span className="text-[#82aaff]">CounterBloc</span>() : <span className="text-[#c792ea]">super</span>(<span className="text-[#f78c6c]">0</span>) {"{"}</div>
                        <div className="pl-8">on&lt;Increment&gt;((event, emit) {"{"}</div>
                        <div className="pl-12">emit(state + <span className="text-[#f78c6c]">1</span>);</div>
                        <div className="pl-8">{"})"}</div>
                        <div className="pl-4">{"}"}</div>
                        <div>{"}"}</div>
                    </div>
                    <figcaption className="text-center text-sm text-text-muted italic">Bloc sử dụng pattern Event → State rõ ràng.</figcaption>
                </figure>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">So sánh trực quan</h2>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-white/5">
                                <th className="p-3 text-left border-b border-border text-text-primary">Tiêu chí</th>
                                <th className="p-3 text-left border-b border-border text-[#82aaff]">Riverpod</th>
                                <th className="p-3 text-left border-b border-border text-[#c792ea]">Bloc</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-border/50">
                                <td className="p-3">Boilerplate</td>
                                <td className="p-3">Ít (với codegen)</td>
                                <td className="p-3">Nhiều hơn</td>
                            </tr>
                            <tr className="border-b border-border/50">
                                <td className="p-3">Learning curve</td>
                                <td className="p-3">Trung bình</td>
                                <td className="p-3">Cao</td>
                            </tr>
                            <tr className="border-b border-border/50">
                                <td className="p-3">Testability</td>
                                <td className="p-3">Tốt</td>
                                <td className="p-3">Rất tốt</td>
                            </tr>
                            <tr className="border-b border-border/50">
                                <td className="p-3">Scalability</td>
                                <td className="p-3">Tốt</td>
                                <td className="p-3">Rất tốt</td>
                            </tr>
                            <tr>
                                <td className="p-3">Cộng đồng</td>
                                <td className="p-3">Đang phát triển</td>
                                <td className="p-3">Lớn & ổn định</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">Kết luận</h2>

                <p>Cá nhân mình hiện tại dùng <strong>Riverpod</strong> cho LumiLED vì tính linh hoạt và ít boilerplate. Nhưng nếu làm việc trong team lớn, mình sẽ chọn <strong>Bloc</strong> vì kiến trúc rõ ràng giúp onboarding thành viên mới dễ dàng hơn.</p>

                <p>Không có giải pháp nào &quot;tốt nhất&quot; — chỉ có giải pháp <strong>phù hợp nhất</strong> cho dự án và team của bạn.</p>
            </div>

            <footer className="pt-12 border-t border-border mt-12 text-text-muted">
                <a href="/notes" className="text-sm no-underline hover:underline">← Back to notes</a>
            </footer>
        </div>
    );
}
