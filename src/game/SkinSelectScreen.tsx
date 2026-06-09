import type { SkinConfig } from "../types";
import { isEmbedded } from "../engine/embed";

interface Props {
  skins: SkinConfig[];
  onSelectSkin: (skinId: string) => void;
}

const SKIN_VISUALS: Record<string, { colors: string[]; flag: string }> = {
  belarus: {
    colors: ["#cc0000", "#009900"],
    flag: "BY",
  },
  ethiopia: {
    colors: ["#009900", "#ffcc00", "#cc0000"],
    flag: "ET",
  },
  italy: {
    colors: ["#009246", "#ffffff", "#ce2b37"],
    flag: "IT",
  },
};

export function SkinSelectScreen({ skins, onSelectSkin }: Props) {
  return (
    <div style={{ ...styles.container, ...(isEmbedded ? styles.containerEmbed : {}) }}>
      {!isEmbedded && <h1 style={styles.title}>CHAD RESCUES NOBODY</h1>}
      {!isEmbedded && <div style={styles.subtitle}>Different language. Same cargo shorts.</div>}

      <div className="skin-grid" style={styles.skinGrid}>
        {skins.map((skin) => {
          const vis = SKIN_VISUALS[skin.id];
          return (
            <button
              key={skin.id}
              style={styles.skinCard}
              onClick={() => onSelectSkin(skin.id)}
            >
              <div style={styles.flagStripe}>
                {vis?.colors.map((c, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      background: c,
                    }}
                  />
                ))}
              </div>
              <div style={styles.skinInfo}>
                <div style={styles.skinName}>{skin.name}</div>
                <div style={styles.skinLanguage}>{skin.language}</div>
                <div style={styles.skinMentor}>
                  <span
                    style={{
                      ...styles.mentorAvatar,
                      background: skin.mentorColor,
                    }}
                  >
                    {skin.mentorAvatar}
                  </span>
                  <span style={styles.mentorName}>{skin.mentorName}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {!isEmbedded && (
        <div style={styles.footer}>
          Same Chad. Different groceries.
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    overflowY: "auto",
    background: "#0a0a1a",
    color: "#fff",
    fontFamily: "'SF Pro', -apple-system, sans-serif",
    padding: "var(--game-pad)",
    gap: "var(--game-gap)",
  },
  containerEmbed: {
    justifyContent: "center",
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: "var(--game-font-title)",
    fontWeight: "bold",
    color: "#FFD54F",
    letterSpacing: 3,
    marginBottom: 0,
  },
  subtitle: {
    fontSize: "var(--game-font-sm)",
    color: "#666",
  },
  skinGrid: {
    display: "flex",
    gap: "var(--game-list-gap)",
    flexWrap: "wrap",
    justifyContent: "center",
    maxWidth: 600,
    width: "100%",
  },
  skinCard: {
    width: "min(100%, 240px)",
    background: "#1a1a2e",
    border: "2px solid #2a2a3e",
    borderRadius: 16,
    overflow: "hidden",
    cursor: "pointer",
    color: "#fff",
    textAlign: "left",
    fontFamily: "inherit",
    fontSize: "inherit",
    transition: "border-color 0.2s, transform 0.2s",
  },
  flagStripe: {
    display: "flex",
    height: 8,
  },
  skinInfo: {
    padding: "16px 20px 20px",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  skinName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  skinLanguage: {
    fontSize: 14,
    color: "#888",
    fontStyle: "italic",
  },
  skinMentor: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginTop: 8,
  },
  mentorAvatar: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  mentorName: {
    fontSize: 15,
    color: "#ccc",
  },
  footer: {
    fontSize: 13,
    color: "#444",
    fontStyle: "italic",
    textAlign: "center",
    maxWidth: 400,
  },
};
