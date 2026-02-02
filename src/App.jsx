import { useState, useEffect } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Slider } from "./components/ui/slider";

/* =====================
   BRAND STYLE
===================== */
const BRAND_STYLE = `
:root{
  --bg:#F6F3EE;
  --green:#6B8E6E;
  --dark:#2F3A33;
  --cream:#FFF7EC;
  --accent:#C8A97E;
}

body{
  margin:0;
  background:var(--bg);
  color:var(--dark);
}

.font-logo{font-family:'Paytone One', cursive;}
.font-title{font-family:'Paytone One', sans-serif;}
.font-subtitle{font-family:'Quicksand', sans-serif;}
.font-text{
  font-family:'JetBrains Mono', monospace;
  line-height:1.6;
}

.card{
  background:var(--cream);
  border-radius:18px;
  padding:20px;
  box-shadow:0 6px 16px rgba(0,0,0,.06);
}
.btn{
  width:100%;
  padding:12px;
  border-radius:14px;
  border:none;
  background:var(--green);
  color:white;
  cursor:pointer;
  font-size:15px;
}
.btn-outline{
  background:transparent;
  border:1px solid var(--green);
  color:var(--green);
}
.range{ width:100%; }
`;

/* =====================
   DATA
===================== */
const MENU_MAIN = [
  { name: "Matcha Việt", sweet: 40, bitter: 50, nutty: 30 },
  { name: "Matcha Semi", sweet: 50, bitter: 60, nutty: 20 },
  { name: "Coldwhisk", sweet: 75, bitter: 30, nutty: 30 },
  { name: "Dừa Trắng", sweet: 45, bitter: 40, nutty: 60 },
  { name: "Chuối Vàng", sweet: 70, bitter: 50, nutty: 50 },
  { name: "Mận Đỏ", sweet: 60, bitter: 45, nutty: 20 },
];

const MENU_RD = [
  "Pistachio",
  "Oreo",
  "Chocolate",
];

/* =====================
   LOGIC
===================== */
function score(drink, taste) {
  return (
    100 -
    Math.abs(drink.sweet - taste.sweet) -
    Math.abs(drink.bitter - taste.bitter) -
    Math.abs(drink.nutty - taste.nutty)
  );
}

/* =====================
   APP
===================== */
export default function App() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Caveat+Brush&family=Paytone+One&family=Quicksand:wght@400;600&family=JetBrains+Mono&display=swap";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.innerHTML = BRAND_STYLE;
    document.head.appendChild(style);
  }, []);

  // step: -1 intro | 0 taste | 1 result
  const [step, setStep] = useState(-1);
  const [experience, setExperience] = useState(null);
  const [taste, setTaste] = useState({ sweet: 50, bitter: 50, nutty: 50 });
  const [showDeal, setShowDeal] = useState(false);


  const ranked = [...MENU_MAIN]
    .map((m) => ({ ...m, s: score(m, taste) }))
    .sort((a, b) => b.s - a.s);

  return (
    <div className="font-text" style={{ maxWidth: 720, margin: "auto", padding: 24 }}>
      <h1 className="font-logo" style={{ fontSize: 40, textAlign: "center", color: "var(--green)" }}>
        Tịnh matcha
      </h1>
      <p className="font-subtitle" style={{ textAlign: "center", marginBottom: 24 }}>
        Chọn matcha hợp gu của bạn
      </p>

      {/* STEP -1 */}
      {step === -1 && (
        <div className="card">
          <h2 className="font-title">Bạn có hay uống matcha không?</h2>
          <div style={{ marginTop: 16 }}>
            <button className="btn" onClick={() => { setExperience("regular"); setStep(0); }}>
              Uống thường xuyên
            </button>
            <button className="btn btn-outline" style={{ marginTop: 10 }}
              onClick={() => { setExperience("new"); setStep(0); }}>
              Mới uống / thỉnh thoảng
            </button>
          </div>
        </div>
      )}

      {/* STEP 0 */}
      {step === 0 && (
        <div className="card">
          <h2 className="font-title">Gu vị của bạn</h2>

          {["sweet", "bitter", "nutty"].map((k) => (
            <div key={k} style={{ marginTop: 16 }}>
              <p>{k === "sweet" ? "Ngọt" : k === "bitter" ? "Đắng" : "Bùi"}: {taste[k]}%</p>
              <input
                className="range"
                type="range"
                min="0"
                max="100"
                value={taste[k]}
                onChange={(e) =>
                  setTaste({ ...taste, [k]: Number(e.target.value) })
                }
              />
            </div>
          ))}

          <div style={{ marginTop: 20, display: "flex", gap: 8 }}>
            <button className="btn btn-outline" onClick={() => setStep(-1)}>Quay lại</button>
            <button className="btn" onClick={() => setStep(1)}>Tiếp tục</button>
          </div>
        </div>
      )}

      {/* STEP 1 */}
      {step === 1 && (
        <div className="card">
          <h2 className="font-title">Gợi ý cho bạn</h2>

          <p className="font-subtitle" style={{ marginTop: 12 }}>Phù hợp nhất</p>
          <p style={{ fontSize: 18 }}>⋆˚ ꕤ࿔ 🍵  {ranked[0].name}  🍵 ༘⋆ ܁˖</p>

          <p className="font-subtitle" style={{ marginTop: 16 }}>Có thể bạn sẽ thích</p>
          <ul>
            {ranked.slice(1, 3).map((m) => (
              <li key={m.name}>{m.name}</li>
            ))}
          </ul>

          {/* TOPPING DEPTH */}
          <div style={{ marginTop: 16 }}>
            <p className="font-subtitle">Gợi ý topping</p>
            <ul>
              {experience === "new"
                ? <li>Sữa yến mạch · trân trâu trắng</li>
                : <li>Pistachio cream · cold foam</li>}
            </ul>
          </div>

          {/* R&D */}
          <div style={{ marginTop: 16, padding: 12, background: "#EFE6DA", borderRadius: 12 }}>
            <p className="font-subtitle">Món R&D</p>
            <ul>
              {MENU_RD.map((m) => <li key={m}>{m}</li>)}
            </ul>
            <p style={{ fontSize: 12, fontStyle: "italic" }}>
              Món này Tịnh đang test – nếu thấy thích thích, bạn hãy ib cho sốp để thử với 50% off cho món đó nhé
            </p>
          </div>

          <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button className="btn btn-outline" onClick={() => setStep(0)}>Chọn lại gu</button>
            <button className="btn"
              onClick={() =>
                window.open("https://www.instagram.com/tinh.matchalatte/", "_blank")
              }>
              Nhắn Tịnh đặt món
            </button>
              <button className="btn btn-outline" onClick={() => setShowDeal(true)}>
    
              Lấy deal
            </button>
          </div>
        </div>
      )}
      {/* MODAL */}
      {showDeal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            zIndex: 50,
          }}
        >
          <div className="card" style={{ maxWidth: 360, width: "100%" }}>
            <h2 className="font-title">Ưu đãi</h2>
            <ul style={{ fontSize: 14, marginTop: 8  }}>
              <li>Freeship dưới bán kính 3km (Thanh Xuân, Hà Nội)</li>
              <li>Giảm 10% → Mua 4 cốc (không áp dụng với món Viet)</li>
              <li>Tặng bao lì xì collab Mộtnháymắt</li>
              <li>Bill 20+ cốc giảm tới 30%</li>
            </ul>
            <button
              className="btn"
              style={{ marginTop: 16 }}
              onClick={() => setShowDeal(false)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
