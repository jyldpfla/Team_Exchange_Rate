const BASE_URL = import.meta.env.VITE_IMAGE_SERVER_URL;

export default function HtmlFrame({
    className,
    src,
    useBase = true, // 기본값 true
}: { className?: string; src: string; useBase?: boolean | undefined }) {
    const fullSrc =
        useBase
            ? `${BASE_URL}${src}`
            : src;
    if (useBase) {
        return (
            <iframe
                className={className}
                src={fullSrc}
                style={{
                    width: "100%",
                    aspectRatio: "16 / 9",
                    border: "none",
                    borderRadius: "8px",
                }}
                sandbox="allow-scripts allow-same-origin"
            />
        );
    }

    return (
            <img
                src={fullSrc}
                className={className}
                style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    objectFit: "contain",
                    display: "block",
                }}
                alt="chart"
            />
        );

}
