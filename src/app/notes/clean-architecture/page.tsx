export default function CleanArchitectureNote() {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <header className="space-y-2">
                <time className="text-xs text-text-muted">February 8, 2026</time>
                <h1 className="text-2xl font-bold">Clean Architecture: Kiến Trúc Phần Mềm Bền Vững</h1>
            </header>

            <div className="space-y-6 leading-relaxed text-text-muted">
                <p>Clean Architecture của Uncle Bob là một trong những mô hình kiến trúc được áp dụng rộng rãi nhất. Mình đã áp dụng nó trong mọi dự án Flutter và Backend — và nó thực sự thay đổi cách mình tư duy về cấu trúc code.</p>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">Tại sao cần Clean Architecture?</h2>

                <p>Khi dự án phát triển, nếu không có kiến trúc rõ ràng:</p>

                <ul className="list-disc pl-6 space-y-4">
                    <li>Thay đổi một tính năng có thể <strong>break 10 tính năng khác</strong>.</li>
                    <li>Test trở nên <strong>khó hoặc không thể</strong> vì mọi thứ coupled chặt.</li>
                    <li>Mỗi lần đổi database/API, phải <strong>sửa hàng trăm file</strong>.</li>
                    <li>Onboarding developer mới mất <strong>tuần thay vì ngày</strong>.</li>
                </ul>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">Các tầng (Layers)</h2>

                <div className="bg-white/[0.03] border border-border rounded-xl p-6 space-y-4">
                    <div className="text-center space-y-3">
                        <div className="bg-[#6366f1]/20 border border-[#6366f1]/40 rounded-lg p-3 max-w-sm mx-auto">
                            <p className="text-[#a5b4fc] font-bold text-sm">🎯 Entities</p>
                            <p className="text-xs mt-1">Business rules cốt lõi</p>
                        </div>
                        <div className="text-text-muted text-xs">↕</div>
                        <div className="bg-[#8b5cf6]/20 border border-[#8b5cf6]/40 rounded-lg p-3 max-w-md mx-auto">
                            <p className="text-[#c4b5fd] font-bold text-sm">⚡ Use Cases</p>
                            <p className="text-xs mt-1">Application-specific business rules</p>
                        </div>
                        <div className="text-text-muted text-xs">↕</div>
                        <div className="bg-[#ec4899]/20 border border-[#ec4899]/40 rounded-lg p-3 max-w-lg mx-auto">
                            <p className="text-[#f9a8d4] font-bold text-sm">🔌 Interface Adapters</p>
                            <p className="text-xs mt-1">Controllers, Presenters, Gateways</p>
                        </div>
                        <div className="text-text-muted text-xs">↕</div>
                        <div className="bg-[#f59e0b]/20 border border-[#f59e0b]/40 rounded-lg p-3">
                            <p className="text-[#fcd34d] font-bold text-sm">🌐 Frameworks & Drivers</p>
                            <p className="text-xs mt-1">UI, Database, API, External Services</p>
                        </div>
                    </div>
                </div>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">Dependency Rule</h2>

                <p>Quy tắc quan trọng nhất: <strong>Dependencies chỉ hướng vào trong</strong>. Layer bên trong KHÔNG ĐƯỢC biết gì về layer bên ngoài.</p>

                <ul className="list-disc pl-6 space-y-4">
                    <li><strong>Entities</strong> không biết Use Cases.</li>
                    <li><strong>Use Cases</strong> không biết UI framework nào đang dùng.</li>
                    <li><strong>Use Cases</strong> chỉ biết Repository <strong>interface</strong>, không biết implementation.</li>
                </ul>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">Áp dụng trong Flutter</h2>

                <figure className="space-y-2 py-4">
                    <div className="bg-[#1a1a2e] rounded-lg border border-border p-6 font-mono text-sm overflow-x-auto">
                        <div className="text-[#7c8db5]">// Cấu trúc thư mục</div>
                        <div>lib/</div>
                        <div>├── <span className="text-[#6366f1]">domain/</span> <span className="text-[#7c8db5]">← Core logic</span></div>
                        <div>│   ├── entities/</div>
                        <div>│   ├── repositories/ <span className="text-[#7c8db5]">← Interfaces</span></div>
                        <div>│   └── usecases/</div>
                        <div>├── <span className="text-[#8b5cf6]">data/</span> <span className="text-[#7c8db5]">← Data layer</span></div>
                        <div>│   ├── models/</div>
                        <div>│   ├── datasources/</div>
                        <div>│   └── repositories/ <span className="text-[#7c8db5]">← Implementations</span></div>
                        <div>└── <span className="text-[#ec4899]">presentation/</span> <span className="text-[#7c8db5]">← UI</span></div>
                        <div>    ├── pages/</div>
                        <div>    ├── widgets/</div>
                        <div>    └── bloc/</div>
                    </div>
                    <figcaption className="text-center text-sm text-text-muted italic">Cấu trúc folder theo Clean Architecture trong Flutter.</figcaption>
                </figure>

                <figure className="space-y-2 py-4">
                    <div className="bg-[#1a1a2e] rounded-lg border border-border p-6 font-mono text-sm overflow-x-auto">
                        <div className="text-[#7c8db5]">// UseCase — chỉ biết interface</div>
                        <div><span className="text-[#c792ea]">class</span> <span className="text-[#82aaff]">GetUserProfile</span> {"{"}</div>
                        <div className="pl-4"><span className="text-[#c792ea]">final</span> UserRepository _repo;</div>
                        <div className="pl-4"><span className="text-[#82aaff]">GetUserProfile</span>(<span className="text-[#c792ea]">this</span>._repo);</div>
                        <div className="pl-4">Future&lt;User&gt; <span className="text-[#82aaff]">call</span>(String id) =&gt; _repo.getUserById(id);</div>
                        <div>{"}"}</div>
                        <div></div>
                        <div className="text-[#7c8db5]">// Implementation — cache-first strategy</div>
                        <div><span className="text-[#c792ea]">class</span> <span className="text-[#82aaff]">UserRepoImpl</span> <span className="text-[#c792ea]">implements</span> UserRepository {"{"}</div>
                        <div className="pl-4"><span className="text-[#c792ea]">final</span> ApiClient _api;</div>
                        <div className="pl-4"><span className="text-[#c792ea]">final</span> LocalDB _db;</div>
                        <div className="pl-4">Future&lt;User&gt; <span className="text-[#82aaff]">getUserById</span>(String id) <span className="text-[#c792ea]">async</span> {"{"}</div>
                        <div className="pl-8"><span className="text-[#c792ea]">try</span> {"{"}</div>
                        <div className="pl-12"><span className="text-[#c792ea]">final</span> u = <span className="text-[#c792ea]">await</span> _api.fetch(id);</div>
                        <div className="pl-12"><span className="text-[#c792ea]">await</span> _db.cache(u);</div>
                        <div className="pl-12"><span className="text-[#c792ea]">return</span> u;</div>
                        <div className="pl-8">{"}"} <span className="text-[#c792ea]">catch</span> (_) {"{"}</div>
                        <div className="pl-12"><span className="text-[#c792ea]">return</span> _db.getCached(id);</div>
                        <div className="pl-8">{"}"}</div>
                        <div className="pl-4">{"}"}</div>
                        <div>{"}"}</div>
                    </div>
                    <figcaption className="text-center text-sm text-text-muted italic">UseCase chỉ biết interface, Repository impl nằm ở data layer.</figcaption>
                </figure>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">Lợi ích thực tế</h2>

                <ul className="list-disc pl-6 space-y-4">
                    <li><strong>Testable:</strong> Mock repository interface, test use case dễ dàng.</li>
                    <li><strong>Flexible:</strong> Đổi từ REST sang GraphQL? Chỉ sửa data layer.</li>
                    <li><strong>Scalable:</strong> Team mới join có thể làm việc trên feature mới mà không cần hiểu toàn bộ codebase.</li>
                    <li><strong>Maintainable:</strong> Bug ở đâu? Logic sai → domain. API sai → data. UI sai → presentation.</li>
                </ul>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">Kết luận</h2>

                <p>Clean Architecture không phải silver bullet. Với dự án nhỏ, nó có thể <strong>overkill</strong>. Nhưng với dự án có team từ 3 người trở lên hoặc dự án dài hạn, nó là <strong>investment xứng đáng</strong>.</p>

                <p><strong>&quot;The only way to go fast, is to go well.&quot;</strong> — Uncle Bob</p>
            </div>

            <footer className="pt-12 border-t border-border mt-12 text-text-muted">
                <a href="/notes" className="text-sm no-underline hover:underline">← Back to notes</a>
            </footer>
        </div>
    );
}
