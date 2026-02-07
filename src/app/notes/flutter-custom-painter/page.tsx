export default function FlutterCustomPainterNote() {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <header className="space-y-2">
                <time className="text-xs text-text-muted">February 5, 2026</time>
                <h1 className="text-2xl font-bold">Flutter Custom Painter: Vẽ Mọi Thứ Bạn Muốn</h1>
            </header>

            <div className="space-y-6 leading-relaxed text-text-muted">
                <p>Khi các Widget có sẵn của Flutter không đủ để thể hiện ý tưởng thiết kế, <strong>CustomPainter</strong> chính là vũ khí bí mật của bạn. Đây là cách LumiLED tạo ra hiệu ứng LED phát sáng thực tế.</p>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">CustomPainter là gì?</h2>

                <p><code>CustomPainter</code> cho phép bạn vẽ trực tiếp lên Canvas bằng các API đồ hoạ cấp thấp. Bạn có thể vẽ đường thẳng, hình tròn, gradient, path phức tạp, và thậm chí cả text.</p>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">Cấu trúc cơ bản</h2>

                <p>Một CustomPainter bao gồm hai method cần implement:</p>

                <figure className="space-y-2 py-4">
                    <div className="bg-[#1a1a2e] rounded-lg border border-border p-6 font-mono text-sm overflow-x-auto">
                        <div><span className="text-[#c792ea]">class</span> <span className="text-[#82aaff]">MyPainter</span> <span className="text-[#c792ea]">extends</span> <span className="text-[#82aaff]">CustomPainter</span> {"{"}</div>
                        <div className="pl-4 text-[#7c8db5]">// Cached Paint object for performance</div>
                        <div className="pl-4"><span className="text-[#c792ea]">final</span> Paint _paint = Paint()</div>
                        <div className="pl-8">..color = Colors.orange</div>
                        <div className="pl-8">..style = PaintingStyle.fill;</div>
                        <div></div>
                        <div className="pl-4"><span className="text-[#c792ea]">@override</span></div>
                        <div className="pl-4"><span className="text-[#c792ea]">void</span> <span className="text-[#82aaff]">paint</span>(Canvas canvas, Size size) {"{"}</div>
                        <div className="pl-8 text-[#7c8db5]">// Draw a glowing circle</div>
                        <div className="pl-8">canvas.drawCircle(</div>
                        <div className="pl-12">Offset(size.width / <span className="text-[#f78c6c]">2</span>, size.height / <span className="text-[#f78c6c]">2</span>),</div>
                        <div className="pl-12"><span className="text-[#f78c6c]">50</span>,</div>
                        <div className="pl-12">_paint,</div>
                        <div className="pl-8">);</div>
                        <div className="pl-4">{"}"}</div>
                        <div></div>
                        <div className="pl-4"><span className="text-[#c792ea]">@override</span></div>
                        <div className="pl-4"><span className="text-[#c792ea]">bool</span> <span className="text-[#82aaff]">shouldRepaint</span>(MyPainter old) =&gt; <span className="text-[#f78c6c]">false</span>;</div>
                        <div>{"}"}</div>
                    </div>
                    <figcaption className="text-center text-sm text-text-muted italic">Cấu trúc cơ bản của một CustomPainter với Paint object được cache.</figcaption>
                </figure>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">Các kỹ thuật quan trọng</h2>

                <h3 className="text-lg font-bold text-text-primary mt-6">1. Vẽ hình cơ bản</h3>
                <p>Canvas cung cấp các method như <code>drawCircle</code>, <code>drawRect</code>, <code>drawLine</code>, <code>drawPath</code> để vẽ các hình cơ bản.</p>

                <h3 className="text-lg font-bold text-text-primary mt-6">2. Gradient và Shader</h3>
                <p>Sử dụng <code>Paint()..shader</code> để tạo gradient tuyến tính, hướng tâm, hoặc sweep gradient. Đây là cách LumiLED tạo hiệu ứng phát sáng cho mỗi pixel LED.</p>

                <figure className="space-y-2 py-4">
                    <div className="bg-[#1a1a2e] rounded-lg border border-border p-6 font-mono text-sm overflow-x-auto">
                        <div><span className="text-[#c792ea]">final</span> paint = Paint()</div>
                        <div className="pl-2">..shader = RadialGradient(</div>
                        <div className="pl-4">colors: [</div>
                        <div className="pl-6"><span className="text-[#f78c6c]">Colors.orange</span>,</div>
                        <div className="pl-6"><span className="text-[#f78c6c]">Colors.orange.withOpacity(0)</span>,</div>
                        <div className="pl-4">],</div>
                        <div className="pl-2">).createShader(Rect.fromCircle(</div>
                        <div className="pl-4">center: center,</div>
                        <div className="pl-4">radius: <span className="text-[#f78c6c]">20</span>,</div>
                        <div className="pl-2">));</div>
                    </div>
                    <figcaption className="text-center text-sm text-text-muted italic">RadialGradient tạo hiệu ứng phát sáng mềm mại.</figcaption>
                </figure>

                <h3 className="text-lg font-bold text-text-primary mt-6">3. Compositing với BlendMode</h3>
                <p><code>BlendMode</code> cho phép bạn kết hợp nhiều lớp vẽ với nhau theo các cách khác nhau — tương tự layer blending trong Photoshop.</p>

                <h3 className="text-lg font-bold text-text-primary mt-6">4. Animation với CustomPainter</h3>
                <p>Kết hợp <code>AnimationController</code> với <code>CustomPainter</code> để tạo ra các hiệu ứng động mượt mà ở 60fps. Truyền animation value vào painter thông qua constructor.</p>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">Tips từ thực tế</h2>

                <ul className="list-disc pl-6 space-y-4">
                    <li><strong>Luôn cache Paint objects:</strong> Tạo <code>Paint</code> trong constructor, không phải trong <code>paint()</code>.</li>
                    <li><strong>Sử dụng <code>shouldRepaint</code> đúng cách:</strong> Return <code>false</code> khi data không đổi.</li>
                    <li><strong><code>RepaintBoundary</code>:</strong> Wrap <code>CustomPaint</code> trong <code>RepaintBoundary</code> để tránh vẽ lại không cần thiết.</li>
                    <li><strong>Tách nhỏ painter:</strong> Nếu drawing logic phức tạp, chia thành nhiều layer.</li>
                </ul>

                <hr className="border-border my-8" />

                <h2 className="text-xl font-bold text-text-primary mt-8 border-b border-border pb-2">Kết luận</h2>

                <p>CustomPainter là công cụ mạnh mẽ nhưng cần sử dụng có trách nhiệm. Hãy nhớ: <strong>Widget vẫn là lựa chọn đầu tiên, CustomPainter là cho những lúc bạn thực sự cần kiểm soát từng pixel.</strong></p>
            </div>

            <footer className="pt-12 border-t border-border mt-12 text-text-muted">
                <a href="/notes" className="text-sm no-underline hover:underline">← Back to notes</a>
            </footer>
        </div>
    );
}
