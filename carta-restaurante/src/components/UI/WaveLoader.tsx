
export default function WaveLoader({ bars = 5, color = "#d29a5a", height = 40 }) {
  return (
    <div className="center-screen">
        <div className="wave-loader">
            {Array.from({ length: bars }).map((_, i) => (
            <div
                key={i}
                className="bar"
                style={{
                animationDelay: `${i * 0.1}s`,
                backgroundColor: color,
                height: `${height}px`,
                }}
            ></div>
            ))}
        </div>
    </div>
  );
}
