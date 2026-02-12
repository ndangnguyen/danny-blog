"use client";

import CommentSection from "../../components/CommentSection";

export default function EightStagesAIProgrammingNote() {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <header className="space-y-2">
                <time className="text-xs text-text-muted">February 12, 2026</time>
                <h1 className="text-2xl font-bold">Tám Giai Đoạn Tiến Hóa Của Lập Trình Viên Với AI</h1>
            </header>

            <div className="space-y-6 leading-relaxed text-text-muted">
                <p>Bạn đang ở giai đoạn nào trong hành trình làm việc cùng AI? Dựa trên bài viết nổi tiếng của <strong>Steve Yegge</strong> (cựu kỹ sư Amazon và Google), có 8 cấp độ mà một lập trình viên sẽ trải qua khi tích hợp AI vào quy trình làm việc — từ việc chỉ hỏi cú pháp cơ bản cho đến khi trở thành một <strong>Product Manager</strong> điều phối hàng chục AI Agent.</p>

                <p>Mỗi giai đoạn đại diện cho một bước nhảy về <strong>tư duy</strong>, không chỉ là công cụ. Càng lên cao, bạn càng ít viết code trực tiếp và càng nhiều thời gian dành cho việc <em>thiết kế hệ thống</em> và <em>ra quyết định</em>.</p>

                {/* YouTube Video */}
                <div className="my-8">
                    <div className="relative w-full overflow-hidden rounded-lg border border-border" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src="https://www.youtube.com/embed/sqZAjzI9P7o"
                            title="8 Giai Đoạn Tiến Hóa Của Lập Trình Viên Với AI"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>
                </div>

                <hr className="border-border my-8" />

                {/* Giai đoạn 1 */}
                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">
                    Giai đoạn 1: &quot;Google 2.0&quot; — Hỏi AI như hỏi StackOverflow
                </h2>

                <p>Đây là giai đoạn phổ biến nhất, nơi mà hầu hết lập trình viên bắt đầu tiếp xúc với AI. Bạn mở ChatGPT hoặc Copilot lên và hỏi những câu kiểu:</p>

                <figure className="space-y-2 py-4">
                    <div className="bg-[#1a1a2e] rounded-lg border border-border p-6 font-mono text-sm">
                        <div className="text-[#7c8db5]">// Hỏi AI những câu cú pháp cơ bản</div>
                        <div className="mt-2">&quot;Cách tạo một list trong Python?&quot;</div>
                        <div>&quot;Regex match email trong JavaScript?&quot;</div>
                        <div>&quot;Flutter Navigator push replacement?&quot;</div>
                    </div>
                </figure>

                <p>Ở giai đoạn này, AI chỉ là một <strong>công cụ tìm kiếm thông minh hơn</strong>. Bạn vẫn viết mọi dòng code, vẫn kiểm soát 100%. AI chỉ tiết kiệm cho bạn vài phút Google.</p>

                <hr className="border-border my-8" />

                {/* Giai đoạn 2 */}
                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">
                    Giai đoạn 2: AI Agent trong IDE — Nhưng vẫn &quot;giám sát chặt&quot;
                </h2>

                <p>Bạn bắt đầu tích hợp AI Agent trực tiếp vào IDE — như <strong>Claude Dev</strong>, <strong>Cursor</strong>, hay <strong>GitHub Copilot Workspace</strong>. Agent có thể đọc code, đề xuất thay đổi, thậm chí tạo file mới.</p>

                <p>Nhưng ở giai đoạn này, bạn vẫn <strong>cấp quyền phê duyệt cho từng hành động nhỏ</strong>:</p>

                <figure className="space-y-2 py-4">
                    <div className="bg-[#1a1a2e] rounded-lg border border-border p-6 font-mono text-sm">
                        <div className="text-[#82aaff]">Agent:</div>
                        <div>&quot;Tôi muốn tạo file <span className="text-[#c3e88d]">user_repository.dart</span>&quot;</div>
                        <div className="text-[#f78c6c] mt-2">→ [Approve] [Deny]</div>
                        <div className="mt-4 text-[#82aaff]">Agent:</div>
                        <div>&quot;Tôi muốn sửa <span className="text-[#c3e88d]">main.dart</span> dòng 42&quot;</div>
                        <div className="text-[#f78c6c]">→ [Approve] [Deny]</div>
                    </div>
                </figure>

                <p>Cảm giác như có một junior developer ngồi bên cạnh — bạn phải review và approve từng bước. An toàn nhưng <strong>chậm</strong>.</p>

                <hr className="border-border my-8" />

                {/* Giai đoạn 3 */}
                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">
                    Giai đoạn 3: Tắt quyền — &quot;Cứ làm đi, tao tin mày&quot;
                </h2>

                <p>Đây là bước nhảy lớn về <strong>tư duy tin tưởng</strong>. Bạn tắt chế độ phê duyệt (<em>Permissionless mode</em>), cho phép Agent tự chỉnh sửa nhiều file mà không cần hỏi từng bước.</p>

                <p>Thay vì approve 20 action nhỏ, bạn chỉ cần nói:</p>

                <figure className="space-y-2 py-4">
                    <div className="bg-[#1a1a2e] rounded-lg border border-border p-6 font-mono text-sm">
                        <div className="text-[#c3e88d]">&quot;Refactor toàn bộ module authentication</div>
                        <div className="text-[#c3e88d]"> sang Clean Architecture, tách repository,</div>
                        <div className="text-[#c3e88d]"> usecase, và datasource.&quot;</div>
                        <div className="mt-4 text-[#7c8db5]">// Agent tự tạo 8 file, sửa 3 file, xóa 2 file</div>
                        <div className="text-[#7c8db5]">// Không hỏi gì cả. Done in 30 seconds.</div>
                    </div>
                </figure>

                <p>Ban đầu sẽ hơi <em>lo lắng</em>, nhưng khi thấy kết quả chính xác 90%+, bạn sẽ không muốn quay lại giai đoạn 2 nữa.</p>

                <hr className="border-border my-8" />

                {/* Giai đoạn 4 */}
                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">
                    Giai đoạn 4: Agent chiếm toàn màn hình — Xem &quot;bức tranh lớn&quot;
                </h2>

                <p>Ở giai đoạn này, bạn không còn đọc từng dòng code nữa. Agent chiếm toàn bộ màn hình IDE, và bạn chỉ xem các <strong>thay đổi logic lớn</strong> — giống như một architect review blueprint thay vì xem từng viên gạch.</p>

                <ul className="list-disc pl-6 space-y-4">
                    <li>Bạn nhìn vào <strong>diff summary</strong> thay vì đọc từng dòng diff.</li>
                    <li>Bạn quan tâm <strong>&quot;module nào bị ảnh hưởng?&quot;</strong> thay vì &quot;dòng nào thay đổi?&quot;</li>
                    <li>Bạn bắt đầu hỏi Agent: <em>&quot;Giải thích cho tao logic flow sau khi thay đổi&quot;</em> thay vì tự đọc.</li>
                </ul>

                <p>Đây là lúc bạn chuyển từ <strong>coder</strong> sang <strong>reviewer</strong>.</p>

                <hr className="border-border my-8" />

                {/* Giai đoạn 5 */}
                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">
                    Giai đoạn 5: Terminal-first — Claude Code và sức mạnh dòng lệnh
                </h2>

                <p>Bạn rời bỏ IDE truyền thống và chuyển sang sử dụng AI Agent trong terminal — như <strong>Claude Code</strong> hoặc tương tự. Agent giờ đây có thể:</p>

                <ul className="list-disc pl-6 space-y-4">
                    <li><strong>Tự đọc toàn bộ kiến trúc</strong> dự án (folder structure, dependencies, configs).</li>
                    <li><strong>Thực thi shell commands</strong> để build, test, deploy.</li>
                    <li><strong>Phân tích logs</strong> và tự debug lỗi.</li>
                    <li>Thực hiện các <strong>tác vụ cross-cutting</strong> mà IDE-based agent khó làm được.</li>
                </ul>

                <figure className="space-y-2 py-4">
                    <div className="bg-[#1a1a2e] rounded-lg border border-border p-6 font-mono text-sm">
                        <div className="text-[#82aaff]">$ claude</div>
                        <div className="mt-2 text-[#c3e88d]">&gt; &quot;Phân tích dự án này, tìm tất cả API endpoints</div>
                        <div className="text-[#c3e88d]">  chưa có error handling, và fix chúng.&quot;</div>
                        <div className="mt-4 text-[#7c8db5]">// Agent đọc 200+ files, tìm 12 endpoints,</div>
                        <div className="text-[#7c8db5]">// thêm try-catch + proper error responses,</div>
                        <div className="text-[#7c8db5]">// chạy test suite, report kết quả.</div>
                    </div>
                </figure>

                <hr className="border-border my-8" />

                {/* Giai đoạn 6 */}
                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">
                    Giai đoạn 6: Multi-Agent — Nhiều Agent, nhiều task cùng lúc
                </h2>

                <p>Tại sao chỉ chạy 1 Agent khi bạn có thể chạy <strong>nhiều Agent song song</strong>? Ở giai đoạn này, bạn mở nhiều tab terminal, mỗi tab một Agent đang xử lý một task khác nhau:</p>

                <figure className="space-y-2 py-4">
                    <div className="bg-[#1a1a2e] rounded-lg border border-border p-6 font-mono text-sm">
                        <div className="text-[#82aaff]">Tab 1:</div>
                        <div> Agent A → Refactor authentication module</div>
                        <div className="mt-2 text-[#82aaff]">Tab 2:</div>
                        <div> Agent B → Viết unit tests cho payment service</div>
                        <div className="mt-2 text-[#82aaff]">Tab 3:</div>
                        <div> Agent C → Tối ưu database queries</div>
                        <div className="mt-2 text-[#82aaff]">Tab 4:</div>
                        <div> Agent D → Update documentation</div>
                    </div>
                </figure>

                <p>Bạn trở thành một <strong>điều phối viên</strong> — phân công việc, kiểm tra tiến độ, merge kết quả. Productivity nhân lên <strong>gấp 3-5 lần</strong> so với giai đoạn 5.</p>

                <hr className="border-border my-8" />

                {/* Giai đoạn 7 */}
                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">
                    Giai đoạn 7: Scale lên hàng chục Agent
                </h2>

                <p>Từ 4-5 Agent, bạn nâng lên <strong>hàng chục Agent</strong> chạy đồng thời. Mỗi Agent xử lý một phần nhỏ của dự án, và bạn cần bắt đầu nghĩ đến:</p>

                <ul className="list-disc pl-6 space-y-4">
                    <li><strong>Conflict resolution:</strong> Khi 2 Agent sửa cùng một file.</li>
                    <li><strong>Task dependency:</strong> Agent B cần kết quả của Agent A trước khi bắt đầu.</li>
                    <li><strong>Quality control:</strong> Không thể review tất cả output thủ công — cần automated tests và CI/CD.</li>
                    <li><strong>Context sharing:</strong> Làm sao để Agent mới biết được những gì Agent khác đã làm?</li>
                </ul>

                <p>Đây là lúc kỹ năng <strong>system design</strong> trở nên quan trọng hơn kỹ năng coding.</p>

                <hr className="border-border my-8" />

                {/* Giai đoạn 8 */}
                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">
                    Giai đoạn 8: Orchestrator — Lập trình viên trở thành Product Manager
                </h2>

                <p>Giai đoạn cuối cùng — và cũng là tương lai gần. Bạn không còn trực tiếp điều phối từng Agent, mà xây dựng một <strong>hệ thống tự động quản lý các Agent</strong>:</p>

                <figure className="space-y-2 py-4">
                    <div className="bg-[#1a1a2e] rounded-lg border border-border p-6 font-mono text-sm">
                        <div className="text-[#7c8db5]">// Workflow tự động</div>
                        <div className="mt-2"><span className="text-[#c792ea]">Input:</span> &quot;Thêm tính năng payment QR code&quot;</div>
                        <div className="mt-4"><span className="text-[#c792ea]">Orchestrator</span> tự động:</div>
                        <div className="pl-4">1. Phân tích requirements</div>
                        <div className="pl-4">2. Tạo task breakdown</div>
                        <div className="pl-4">3. Spawn 5 Agents cho 5 sub-tasks</div>
                        <div className="pl-4">4. Monitor tiến độ</div>
                        <div className="pl-4">5. Resolve conflicts</div>
                        <div className="pl-4">6. Run tests</div>
                        <div className="pl-4">7. Merge & deploy</div>
                    </div>
                </figure>

                <p>Vai trò của bạn lúc này là:</p>

                <ul className="list-disc pl-6 space-y-4">
                    <li><strong>Định hướng sản phẩm:</strong> &quot;Mình cần tính năng gì?&quot;</li>
                    <li><strong>Đánh giá chất lượng:</strong> &quot;Kết quả có đúng yêu cầu không?&quot;</li>
                    <li><strong>Ra quyết định kiến trúc:</strong> &quot;Nên dùng approach nào?&quot;</li>
                </ul>

                <p>Bạn đã trở thành một <strong>Product Manager thực thụ</strong> — không phải vì bạn bỏ code, mà vì code giờ đây là phần được <em>tự động hóa</em>.</p>

                <hr className="border-border my-8" />

                {/* Kết luận */}
                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">
                    Bạn đang ở đâu?
                </h2>

                <p>Hầu hết lập trình viên hiện tại đang ở <strong>giai đoạn 1-3</strong>. Một số team tiên phong đã đạt đến <strong>giai đoạn 5-6</strong>. Giai đoạn 7-8 vẫn còn ở giai đoạn thử nghiệm, nhưng với tốc độ phát triển hiện tại của AI, nó có thể trở thành bình thường trong <strong>1-2 năm tới</strong>.</p>

                <p>Điều quan trọng không phải là bạn đang ở giai đoạn nào, mà là bạn có <strong>sẵn sàng tiến lên giai đoạn tiếp theo</strong> hay không. Mỗi bước nhảy đòi hỏi bạn phải <em>bỏ bớt kiểm soát</em> và <em>tin tưởng hơn vào AI</em> — đó không phải là điều dễ dàng, nhưng là điều <strong>tất yếu</strong>.</p>

                <p>Hãy bắt đầu từ việc nhỏ: thử tắt chế độ approval trong IDE Agent của bạn, xem điều gì xảy ra. Bạn có thể sẽ ngạc nhiên. 🚀</p>
            </div>

            <CommentSection slug="8-stages-ai-programming" />

            <footer className="pt-12 border-t border-border mt-12 text-text-muted">
                <a href="/notes" className="text-sm no-underline hover:underline">← Back to notes</a>
            </footer>
        </div>
    );
}
