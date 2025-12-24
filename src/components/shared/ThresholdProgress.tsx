export default function ThresholdProgress({ current, total }: { current: number; total: number }) {
  const percentage = Math.min((current / total) * 100, 100);

  return (
    <div style={{ width: 240 }}>
      <div
        style={{
          fontSize: 14,
          fontWeight: 500,
          marginBottom: 6,
        }}
      >
        ${current} / ${total}
      </div>

      <div
        style={{
          height: 10,
          width: "100%",
          backgroundColor: "#e5e5e5",
          borderRadius: 999,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${percentage}%`,
            backgroundColor: "#6fcf97",
            borderRadius: 999,
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );
}
