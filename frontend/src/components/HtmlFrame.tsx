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
            <div>
                <iframe
                    className={className}
                    src={fullSrc}
                    style={{
                        width: "100%",
                        height: "auto",
                        aspectRatio: "16 / 9",
                        border: "none",
                        borderRadius: "8px",
                        objectFit: "contain",
                        display: "block",
                        overflowX: "hidden",
                        overflow: "auto",
                        minHeight: "500px"
                    }}
                    sandbox="allow-scripts allow-same-origin"
                />
            </div>
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
                overflowX: "hidden",
                overflow: "auto",
                minHeight: "500px"
            }}
            alt="chart"
        />
    );

}
