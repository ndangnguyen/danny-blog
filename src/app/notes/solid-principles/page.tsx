export default function SolidPrinciplesNote() {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <header className="space-y-2">
                <time className="text-xs text-text-muted">February 8, 2026</time>
                <h1 className="text-2xl font-bold">SOLID Principles: 5 Nguyên Tắc Nền Tảng Của Clean Code</h1>
            </header>

            <div className="space-y-6 leading-relaxed text-text-muted">
                <p>SOLID là 5 nguyên tắc thiết kế hướng đối tượng giúp code dễ bảo trì, mở rộng, và test. Đây không phải lý thuyết suông — mình áp dụng chúng hàng ngày trong mọi dự án, từ Flutter đến backend Node.js.</p>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">S — Single Responsibility Principle</h2>

                <p><em>&quot;Một class chỉ nên có một lý do để thay đổi.&quot;</em></p>

                <p>Mỗi class/module chỉ nên đảm nhận <strong>một trách nhiệm duy nhất</strong>. Nếu một class vừa xử lý business logic, vừa gọi API, vừa format data — đó là dấu hiệu vi phạm SRP.</p>

                <figure className="space-y-2 py-4">
                    <div className="bg-[#1a1a2e] rounded-lg border border-border p-6 font-mono text-sm overflow-x-auto">
                        <div className="text-[#7c8db5]">// ❌ Vi phạm SRP</div>
                        <div><span className="text-[#c792ea]">class</span> <span className="text-[#82aaff]">UserService</span> {"{"}</div>
                        <div className="pl-4"><span className="text-[#82aaff]">fetchUser</span>() {"{ /* gọi API */ }"}</div>
                        <div className="pl-4"><span className="text-[#82aaff]">saveToDatabase</span>() {"{ /* lưu DB */ }"}</div>
                        <div className="pl-4"><span className="text-[#82aaff]">sendEmail</span>() {"{ /* gửi email */ }"}</div>
                        <div className="pl-4"><span className="text-[#82aaff]">generateReport</span>() {"{ /* tạo báo cáo */ }"}</div>
                        <div>{"}"}</div>
                        <div></div>
                        <div className="text-[#7c8db5]">// ✅ Tuân thủ SRP</div>
                        <div><span className="text-[#c792ea]">class</span> <span className="text-[#82aaff]">UserRepository</span> {"{ /* chỉ xử lý data */ }"}</div>
                        <div><span className="text-[#c792ea]">class</span> <span className="text-[#82aaff]">EmailService</span> {"{ /* chỉ gửi email */ }"}</div>
                        <div><span className="text-[#c792ea]">class</span> <span className="text-[#82aaff]">ReportGenerator</span> {"{ /* chỉ tạo báo cáo */ }"}</div>
                    </div>
                    <figcaption className="text-center text-sm text-text-muted italic">Tách một class &quot;thần thánh&quot; thành nhiều class đơn trách nhiệm.</figcaption>
                </figure>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">O — Open/Closed Principle</h2>

                <p><em>&quot;Open for extension, closed for modification.&quot;</em></p>

                <p>Code nên được thiết kế để <strong>mở rộng tính năng mới mà không cần sửa code cũ</strong>. Sử dụng abstraction và polymorphism thay vì if-else chains.</p>

                <figure className="space-y-2 py-4">
                    <div className="bg-[#1a1a2e] rounded-lg border border-border p-6 font-mono text-sm overflow-x-auto">
                        <div className="text-[#7c8db5]">// ✅ Open/Closed với Strategy Pattern</div>
                        <div><span className="text-[#c792ea]">abstract class</span> <span className="text-[#82aaff]">PaymentStrategy</span> {"{"}</div>
                        <div className="pl-4"><span className="text-[#c792ea]">void</span> <span className="text-[#82aaff]">pay</span>(<span className="text-[#c792ea]">double</span> amount);</div>
                        <div>{"}"}</div>
                        <div></div>
                        <div><span className="text-[#c792ea]">class</span> <span className="text-[#82aaff]">CreditCardPayment</span> <span className="text-[#c792ea]">extends</span> PaymentStrategy {"{"}</div>
                        <div className="pl-4"><span className="text-[#c792ea]">void</span> <span className="text-[#82aaff]">pay</span>(<span className="text-[#c792ea]">double</span> amount) =&gt; <span className="text-[#7c8db5]">/* ... */</span>;</div>
                        <div>{"}"}</div>
                        <div></div>
                        <div className="text-[#7c8db5]">// Thêm payment mới — KHÔNG sửa code cũ</div>
                        <div><span className="text-[#c792ea]">class</span> <span className="text-[#82aaff]">CryptoPayment</span> <span className="text-[#c792ea]">extends</span> PaymentStrategy {"{"}</div>
                        <div className="pl-4"><span className="text-[#c792ea]">void</span> <span className="text-[#82aaff]">pay</span>(<span className="text-[#c792ea]">double</span> amount) =&gt; <span className="text-[#7c8db5]">/* ... */</span>;</div>
                        <div>{"}"}</div>
                    </div>
                    <figcaption className="text-center text-sm text-text-muted italic">Thêm phương thức thanh toán mới mà không cần thay đổi code hiện tại.</figcaption>
                </figure>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">L — Liskov Substitution Principle</h2>

                <p><em>&quot;Subclass phải thay thế được parent class mà không làm hỏng chương trình.&quot;</em></p>

                <p>Nếu class B kế thừa class A, thì mọi nơi sử dụng A đều có thể thay bằng B <strong>mà không gây lỗi hay thay đổi hành vi mong đợi</strong>.</p>

                <ul className="list-disc pl-6 space-y-4">
                    <li><strong>Vi phạm điển hình:</strong> Class <code>Square</code> kế thừa <code>Rectangle</code> nhưng override <code>setWidth</code> thay đổi cả height.</li>
                    <li><strong>Giải pháp:</strong> Sử dụng composition thay vì inheritance khi hành vi khác biệt.</li>
                </ul>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">I — Interface Segregation Principle</h2>

                <p><em>&quot;Client không nên bị ép buộc phụ thuộc vào interface mà nó không sử dụng.&quot;</em></p>

                <figure className="space-y-2 py-4">
                    <div className="bg-[#1a1a2e] rounded-lg border border-border p-6 font-mono text-sm overflow-x-auto">
                        <div className="text-[#7c8db5]">// ❌ Interface quá lớn</div>
                        <div><span className="text-[#c792ea]">abstract class</span> <span className="text-[#82aaff]">Worker</span> {"{"}</div>
                        <div className="pl-4"><span className="text-[#c792ea]">void</span> work();</div>
                        <div className="pl-4"><span className="text-[#c792ea]">void</span> eat();</div>
                        <div className="pl-4"><span className="text-[#c792ea]">void</span> sleep();</div>
                        <div>{"}"}</div>
                        <div></div>
                        <div className="text-[#7c8db5]">// ✅ Interface nhỏ, focused</div>
                        <div><span className="text-[#c792ea]">abstract class</span> <span className="text-[#82aaff]">Workable</span> {"{"} <span className="text-[#c792ea]">void</span> work(); {"}"}</div>
                        <div><span className="text-[#c792ea]">abstract class</span> <span className="text-[#82aaff]">Feedable</span> {"{"} <span className="text-[#c792ea]">void</span> eat(); {"}"}</div>
                        <div><span className="text-[#c792ea]">abstract class</span> <span className="text-[#82aaff]">Sleepable</span> {"{"} <span className="text-[#c792ea]">void</span> sleep(); {"}"}</div>
                    </div>
                    <figcaption className="text-center text-sm text-text-muted italic">Tách interface lớn thành các interface nhỏ, chuyên biệt.</figcaption>
                </figure>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">D — Dependency Inversion Principle</h2>

                <p><em>&quot;Module cấp cao không nên phụ thuộc vào module cấp thấp. Cả hai nên phụ thuộc vào abstraction.&quot;</em></p>

                <figure className="space-y-2 py-4">
                    <div className="bg-[#1a1a2e] rounded-lg border border-border p-6 font-mono text-sm overflow-x-auto">
                        <div className="text-[#7c8db5]">// ✅ Dependency Inversion</div>
                        <div><span className="text-[#c792ea]">abstract class</span> <span className="text-[#82aaff]">AuthRepository</span> {"{"}</div>
                        <div className="pl-4">Future&lt;User&gt; <span className="text-[#82aaff]">login</span>(String email, String password);</div>
                        <div>{"}"}</div>
                        <div></div>
                        <div className="text-[#7c8db5]">// UseCase phụ thuộc vào abstraction, không phải implementation</div>
                        <div><span className="text-[#c792ea]">class</span> <span className="text-[#82aaff]">LoginUseCase</span> {"{"}</div>
                        <div className="pl-4"><span className="text-[#c792ea]">final</span> AuthRepository _repo;</div>
                        <div className="pl-4"><span className="text-[#82aaff]">LoginUseCase</span>(<span className="text-[#c792ea]">this</span>._repo);</div>
                        <div>{"}"}</div>
                    </div>
                    <figcaption className="text-center text-sm text-text-muted italic">UseCase phụ thuộc vào interface, dễ dàng swap implementation.</figcaption>
                </figure>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">Kết luận</h2>

                <p>SOLID không phải là quy tắc cứng nhắc — nó là <strong>kim chỉ nam</strong>. Đừng cố áp dụng 100% mọi lúc mọi nơi. Hãy hiểu <strong>tại sao</strong> mỗi nguyên tắc tồn tại, và áp dụng khi nó thực sự mang lại giá trị cho codebase của bạn.</p>

                <p>Một điều mình học được: <strong>SOLID giúp code &quot;mềm dẻo&quot;</strong> — dễ thay đổi khi requirement thay đổi, mà không cần refactor cả thế giới.</p>
            </div>

            <footer className="pt-12 border-t border-border mt-12 text-text-muted">
                <a href="/notes" className="text-sm no-underline hover:underline">← Back to notes</a>
            </footer>
        </div>
    );
}
