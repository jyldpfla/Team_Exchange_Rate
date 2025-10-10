const BASE_URL = import.meta.env.VITE_IMAGE_SERVER_URL;

export default function HtmlFrame({ className, src }: { className?: string, src: string }) {
    const fullSrc = src.startsWith("http")
        ? src
        : `${BASE_URL}${src}`;

    return (
        <iframe
            className={className}
            src={fullSrc}
            style={{ width: "100%", height: "100%", border: "none"}}
            sandbox="allow-scripts allow-same-origin"
        />
    );
}
