import { useState, useRef, useEffect } from "react";
import type { CollectibleItem } from "../types/content";
import { getItemSprite, drawSprite } from "../engine/sprites";

function ItemSpriteThumb({ itemId }: { itemId: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sprite = getItemSprite(itemId);
    if (!sprite) return;

    const spriteW = (sprite[0]?.length ?? 0) * 2;
    const spriteH = sprite.length * 2;
    canvas.width = spriteW;
    canvas.height = spriteH;
    ctx.clearRect(0, 0, spriteW, spriteH);
    drawSprite(ctx, sprite, 0, 0, 2);
  }, [itemId]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 32, height: 26, imageRendering: "pixelated" }}
    />
  );
}

interface Props {
  collectedItems: string[];
  itemDefs: Map<string, CollectibleItem>;
  onDropItem: (itemId: string) => void;
  onClose: () => void;
}

export function InventoryPanel({ collectedItems, itemDefs, onDropItem, onClose }: Props) {
  const [confirmDrop, setConfirmDrop] = useState<string | null>(null);

  const handleDrop = (itemId: string) => {
    if (confirmDrop === itemId) {
      onDropItem(itemId);
      setConfirmDrop(null);
    } else {
      setConfirmDrop(itemId);
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.panel} onClick={e => e.stopPropagation()}>
        <div style={styles.header}>
          <span style={styles.title}>INVENTORY</span>
          <button style={styles.closeBtn} onClick={onClose}>&times;</button>
        </div>
        {collectedItems.length === 0 ? (
          <div style={styles.empty}>No items collected</div>
        ) : (
          <div style={styles.grid}>
            {collectedItems.map((itemId, i) => {
              const def = itemDefs.get(itemId);
              return (
                <div key={`${itemId}-${i}`} style={styles.itemCard}>
                  <ItemSpriteThumb itemId={itemId} />
                  <span style={styles.itemName}>{def?.name ?? itemId}</span>
                  <button
                    style={confirmDrop === itemId ? styles.confirmBtn : styles.dropBtn}
                    onClick={() => handleDrop(itemId)}
                  >
                    {confirmDrop === itemId ? "Confirm?" : "Drop"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  panel: {
    background: "#1a1a2e",
    borderRadius: 12,
    padding: 20,
    minWidth: 300,
    maxWidth: 500,
    maxHeight: "80%",
    overflowY: "auto",
    border: "2px solid #333",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    color: "#FFD54F",
    fontFamily: "monospace",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  closeBtn: {
    background: "none",
    border: "none",
    color: "#666",
    fontSize: 24,
    cursor: "pointer",
    padding: "0 4px",
  },
  empty: {
    color: "#555",
    fontFamily: "monospace",
    fontSize: 14,
    textAlign: "center",
    padding: 24,
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  itemCard: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "8px 12px",
    background: "#0d0d1a",
    borderRadius: 8,
  },
  itemName: {
    flex: 1,
    color: "#ccc",
    fontFamily: "monospace",
    fontSize: 13,
  },
  dropBtn: {
    background: "none",
    border: "1px solid #555",
    color: "#888",
    borderRadius: 6,
    padding: "4px 12px",
    fontSize: 12,
    fontFamily: "monospace",
    cursor: "pointer",
  },
  confirmBtn: {
    background: "#991111",
    border: "1px solid #cc2222",
    color: "#fff",
    borderRadius: 6,
    padding: "4px 12px",
    fontSize: 12,
    fontFamily: "monospace",
    cursor: "pointer",
  },
};
