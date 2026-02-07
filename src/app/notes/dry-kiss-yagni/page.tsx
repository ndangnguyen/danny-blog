export default function DryKissYagniNote() {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <header className="space-y-2">
                <time className="text-xs text-text-muted">February 8, 2026</time>
                <h1 className="text-2xl font-bold">DRY, KISS, YAGNI: Ba Nguyên Tắc Vàng Của Lập Trình</h1>
            </header>

            <div className="space-y-6 leading-relaxed text-text-muted">
                <p>Ba nguyên tắc này tưởng đơn giản nhưng là nền tảng để viết code chất lượng. Chúng bổ sung cho nhau và giúp developer tránh được những sai lầm phổ biến nhất trong quá trình phát triển phần mềm.</p>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">DRY — Don&apos;t Repeat Yourself</h2>

                <p><em>&quot;Every piece of knowledge must have a single, unambiguous, authoritative representation.&quot;</em></p>

                <p>DRY không chỉ là &quot;đừng copy-paste code&quot;. Nó nói về <strong>knowledge duplication</strong> — khi cùng một logic, rule, hoặc concept được thể hiện ở nhiều nơi.</p>

                <figure className="space-y-2 py-4">
                    <div className="bg-[#1a1a2e] rounded-lg border border-border p-6 font-mono text-sm overflow-x-auto">
                        <div className="text-[#7c8db5]">// ❌ WET (Write Everything Twice)</div>
                        <div><span className="text-[#c792ea]">double</span> <span className="text-[#82aaff]">calculateShippingUS</span>(Order order) {"{"}</div>
                        <div className="pl-4"><span className="text-[#c792ea]">final</span> base = order.total * <span className="text-[#f78c6c]">0.05</span>;</div>
                        <div className="pl-4"><span className="text-[#c792ea]">if</span> (order.total &gt; <span className="text-[#f78c6c]">100</span>) <span className="text-[#c792ea]">return</span> <span className="text-[#f78c6c]">0</span>;</div>
                        <div className="pl-4"><span className="text-[#c792ea]">return</span> base;</div>
                        <div>{"}"}</div>
                        <div></div>
                        <div><span className="text-[#c792ea]">double</span> <span className="text-[#82aaff]">calculateShippingEU</span>(Order order) {"{"}</div>
                        <div className="pl-4"><span className="text-[#c792ea]">final</span> base = order.total * <span className="text-[#f78c6c]">0.05</span>; <span className="text-[#7c8db5]">// duplicated logic!</span></div>
                        <div className="pl-4"><span className="text-[#c792ea]">if</span> (order.total &gt; <span className="text-[#f78c6c]">100</span>) <span className="text-[#c792ea]">return</span> <span className="text-[#f78c6c]">0</span>; <span className="text-[#7c8db5]">// duplicated!</span></div>
                        <div className="pl-4"><span className="text-[#c792ea]">return</span> base * <span className="text-[#f78c6c]">1.2</span>;</div>
                        <div>{"}"}</div>
                    </div>
                    <figcaption className="text-center text-sm text-text-muted italic">Logic tính shipping bị duplicate giữa hai region.</figcaption>
                </figure>

                <figure className="space-y-2 py-4">
                    <div className="bg-[#1a1a2e] rounded-lg border border-border p-6 font-mono text-sm overflow-x-auto">
                        <div className="text-[#7c8db5]">// ✅ DRY — Extract common logic</div>
                        <div><span className="text-[#c792ea]">double</span> <span className="text-[#82aaff]">_baseShipping</span>(Order order) {"{"}</div>
                        <div className="pl-4"><span className="text-[#c792ea]">if</span> (order.total &gt; <span className="text-[#f78c6c]">100</span>) <span className="text-[#c792ea]">return</span> <span className="text-[#f78c6c]">0</span>;</div>
                        <div className="pl-4"><span className="text-[#c792ea]">return</span> order.total * <span className="text-[#f78c6c]">0.05</span>;</div>
                        <div>{"}"}</div>
                        <div></div>
                        <div><span className="text-[#c792ea]">double</span> <span className="text-[#82aaff]">shippingUS</span>(Order o) =&gt; _baseShipping(o);</div>
                        <div><span className="text-[#c792ea]">double</span> <span className="text-[#82aaff]">shippingEU</span>(Order o) =&gt; _baseShipping(o) * <span className="text-[#f78c6c]">1.2</span>;</div>
                    </div>
                    <figcaption className="text-center text-sm text-text-muted italic">Extract logic chung, chỉ customize phần khác biệt.</figcaption>
                </figure>

                <p><strong>⚠️ Cảnh báo:</strong> Đừng DRY quá mức! Nếu hai đoạn code trông giống nhau nhưng phục vụ <strong>mục đích khác nhau</strong>, việc merge chúng có thể gây coupling không cần thiết.</p>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">KISS — Keep It Simple, Stupid</h2>

                <p><em>&quot;Simplicity is the ultimate sophistication.&quot; — Leonardo da Vinci</em></p>

                <p>Code đơn giản không có nghĩa là code ngắn. KISS nghĩa là chọn <strong>giải pháp đơn giản nhất mà vẫn đúng đắn</strong>. Over-engineering là kẻ thù hàng đầu.</p>

                <figure className="space-y-2 py-4">
                    <div className="bg-[#1a1a2e] rounded-lg border border-border p-6 font-mono text-sm overflow-x-auto">
                        <div className="text-[#7c8db5]">// ❌ Over-engineered</div>
                        <div><span className="text-[#c792ea]">class</span> <span className="text-[#82aaff]">StringReverserFactory</span> {"{"}</div>
                        <div className="pl-4"><span className="text-[#c792ea]">static</span> StringReverser create(ReverseStrategy strategy) {"{"}</div>
                        <div className="pl-8"><span className="text-[#c792ea]">return</span> StringReverser(strategy);</div>
                        <div className="pl-4">{"}"}</div>
                        <div>{"}"}</div>
                        <div></div>
                        <div className="text-[#7c8db5]">// ✅ KISS</div>
                        <div>String <span className="text-[#82aaff]">reverse</span>(String s) =&gt; s.split(<span className="text-[#c3e88d]">&apos;&apos;</span>).reversed.join(<span className="text-[#c3e88d]">&apos;&apos;</span>);</div>
                    </div>
                    <figcaption className="text-center text-sm text-text-muted italic">Không cần Factory Pattern cho một hàm reverse string.</figcaption>
                </figure>

                <h3 className="text-lg font-bold text-text-primary mt-6">Dấu hiệu vi phạm KISS:</h3>
                <ul className="list-disc pl-6 space-y-4">
                    <li>Dùng Design Pattern khi chưa cần thiết.</li>
                    <li>Abstract quá sớm, quá nhiều layer.</li>
                    <li>Code mà người khác (hoặc chính mình sau 2 tuần) không hiểu được.</li>
                    <li>Tối ưu performance trước khi đo lường.</li>
                </ul>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">YAGNI — You Ain&apos;t Gonna Need It</h2>

                <p><em>&quot;Always implement things when you actually need them, never when you just foresee that you need them.&quot;</em></p>

                <p>Nguyên tắc từ Extreme Programming: <strong>Đừng code tính năng &quot;phòng xa&quot;</strong>. Chỉ implement những gì hiện tại thực sự cần.</p>

                <ul className="list-disc pl-6 space-y-4">
                    <li><strong>Anti-pattern:</strong> &quot;Có thể sau này cần multi-language, nên mình abstract tất cả strings ra file riêng từ đầu.&quot;</li>
                    <li><strong>YAGNI:</strong> Dùng string trực tiếp. Khi thực sự cần i18n, IDE có thể extract tự động trong vài phút.</li>
                </ul>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">Ba nguyên tắc phối hợp</h2>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-white/5">
                                <th className="p-3 text-left border-b border-border text-text-primary">Nguyên tắc</th>
                                <th className="p-3 text-left border-b border-border text-text-primary">Hỏi bản thân</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-border/50">
                                <td className="p-3"><strong>DRY</strong></td>
                                <td className="p-3">&quot;Logic này đã tồn tại ở đâu chưa?&quot;</td>
                            </tr>
                            <tr className="border-b border-border/50">
                                <td className="p-3"><strong>KISS</strong></td>
                                <td className="p-3">&quot;Có cách nào đơn giản hơn không?&quot;</td>
                            </tr>
                            <tr>
                                <td className="p-3"><strong>YAGNI</strong></td>
                                <td className="p-3">&quot;Mình có thực sự cần cái này ngay bây giờ không?&quot;</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">Kết luận</h2>

                <p>DRY, KISS, YAGNI — ba nguyên tắc này giúp bạn tránh được 80% các vấn đề phổ biến trong code. Khi review code, mình luôn tự hỏi: <strong>&quot;Nó có lặp lại? Có quá phức tạp? Có thực sự cần không?&quot;</strong></p>

                <p>Đơn giản là khó. Nhưng code đơn giản là code tốt nhất.</p>
            </div>

            <footer className="pt-12 border-t border-border mt-12 text-text-muted">
                <a href="/notes" className="text-sm no-underline hover:underline">← Back to notes</a>
            </footer>
        </div>
    );
}
