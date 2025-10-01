import React from "react";

export default function HtmlFrame({ src }: { src: string }) {
    return (
        <iframe
            src={src}
            style={{ width: "100%", height: "80vh", border: "none" }}
            // 필요 권한만 최소 허용
            sandbox="allow-scripts allow-same-origin"
        />
    );
}
