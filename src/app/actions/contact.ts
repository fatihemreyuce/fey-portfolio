"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactResult {
  success: boolean;
  error?: string;
}

export async function sendContactEmail(
  _prev: ContactResult,
  formData: FormData,
): Promise<ContactResult> {
  const name    = (formData.get("name")    as string | null)?.trim()  ?? "";
  const email   = (formData.get("email")   as string | null)?.trim()  ?? "";
  const subject = (formData.get("subject") as string | null)?.trim()  ?? "";
  const message = (formData.get("message") as string | null)?.trim()  ?? "";

  /* ── Validation ── */
  if (!name || !email || !subject || !message) {
    return { success: false, error: "Lütfen tüm alanları doldurun." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Geçerli bir e-posta adresi girin." };
  }
  if (message.length < 10) {
    return { success: false, error: "Mesaj en az 10 karakter olmalıdır." };
  }

  try {
    await resend.emails.send({
      from:    "Portfolio İletişim <onboarding@resend.dev>",
      to:      "fatihemreyuce@gmail.com",
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#09090b;color:#e4e4e7;padding:32px;border-radius:12px;border:1px solid rgba(255,255,255,0.08)">
          <h2 style="margin:0 0 24px;font-size:20px;color:#60a5fa">Yeni Mesaj — Portfolio</h2>

          <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:#71717a;width:100px;font-size:13px">Ad Soyad</td>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);font-size:14px">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:#71717a;font-size:13px">E-posta</td>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);font-size:14px">
                <a href="mailto:${email}" style="color:#60a5fa">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:#71717a;font-size:13px">Konu</td>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);font-size:14px">${subject}</td>
            </tr>
          </table>

          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:16px;font-size:14px;line-height:1.7;white-space:pre-wrap">${message}</div>

          <p style="margin:24px 0 0;font-size:12px;color:#52525b">Bu e-posta portfolyo iletişim formu üzerinden gönderildi.</p>
        </div>
      `,
    });

    return { success: true };
  } catch {
    return { success: false, error: "Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin." };
  }
}
