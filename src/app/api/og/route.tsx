import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Danny Blog";
    const date = searchParams.get("date") || "";

    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#111111",
                    fontFamily: "sans-serif",
                }}
            >
                {/* Top accent bar */}
                <div
                    style={{
                        height: "4px",
                        width: "100%",
                        background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7)",
                    }}
                />

                {/* Content */}
                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        padding: "60px 80px",
                    }}
                >
                    {/* Date */}
                    {date && (
                        <div
                            style={{
                                fontSize: "20px",
                                color: "#666",
                                marginBottom: "16px",
                                fontFamily: "monospace",
                            }}
                        >
                            {date}
                        </div>
                    )}

                    {/* Title */}
                    <div
                        style={{
                            fontSize: title.length > 40 ? "48px" : "56px",
                            fontWeight: "bold",
                            color: "#ffffff",
                            lineHeight: 1.2,
                            maxWidth: "900px",
                        }}
                    >
                        {title}
                    </div>
                </div>

                {/* Footer */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "24px 80px",
                        borderTop: "1px solid #222",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                        }}
                    >
                        {/* Avatar placeholder */}
                        <div
                            style={{
                                width: "48px",
                                height: "48px",
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, #6366f1, #a855f7)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "20px",
                                fontWeight: "bold",
                                color: "white",
                            }}
                        >
                            D
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div
                                style={{
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    color: "#fff",
                                }}
                            >
                                Dang Nguyen (Danny)
                            </div>
                            <div
                                style={{
                                    fontSize: "14px",
                                    color: "#666",
                                }}
                            >
                                Senior Software Engineer
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            fontSize: "18px",
                            color: "#444",
                            fontFamily: "monospace",
                        }}
                    >
                        danny.blog
                    </div>
                </div>

                {/* Bottom accent bar */}
                <div
                    style={{
                        height: "4px",
                        width: "100%",
                        background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7)",
                    }}
                />
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
