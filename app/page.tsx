"use client";

import Script from "next/script";
import { useState } from "react";

type GoogleIdentity = {
  accounts: {
    id: {
      initialize: (options: { client_id: string; callback: (response: { credential: string }) => void }) => void;
      prompt: () => void;
    };
  };
};

declare global {
  interface Window { google?: GoogleIdentity; }
}

function emailFromCredential(credential: string) {
  try {
    const payload = credential.split(".")[1];
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/"))).email as string;
  } catch { return ""; }
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  const startGoogle = () => {
    if (!clientId) { setMessage("網站尚未設定 Google 登入，請先完成下方設定。 "); return; }
    if (!window.google) { setMessage("Google 登入準備中，請稍候再試。 "); return; }
    window.google.accounts.id.initialize({ client_id: clientId, callback: ({ credential }) => {
      const value = emailFromCredential(credential);
      if (value) { setEmail(value); setMessage("查詢完成，這就是您的電子信箱。 "); }
      else setMessage("沒有取得信箱，請重新選擇 Google 帳號。 ");
    }});
    window.google.accounts.id.prompt();
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2600);
  };

  return (
    <main className="page-shell">
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />
      <section className="card" aria-live="polite">
        <div className="brand-mark" aria-hidden="true">信</div>
        <p className="eyebrow">會員服務小幫手</p>
        <h1>查詢我的<br /><span>電子信箱</span></h1>
        <p className="intro">不知道自己的電子信箱嗎？<br />按下按鈕，選擇您平常使用的 Google 帳號。</p>
        {!email ? <button className="google-button" onClick={startGoogle}><span className="google-g">G</span>使用 Google 查詢我的電子信箱</button> : (
          <div className="result-box">
            <p>您的電子信箱是</p><strong>{email}</strong>
            <button className="copy-button" onClick={copyEmail}>{copied ? "✓ 已複製電子信箱" : "一鍵複製電子信箱"}</button>
          </div>
        )}
        {message && <p className="status" role="status">{message}</p>}
        <p className="privacy">🔒 Google 會先向您確認授權，我們只顯示您的信箱地址。</p>
      </section>
      <footer>使用手機瀏覽器即可　・　Android 與 iPhone 都能使用</footer>
    </main>
  );
}
