# আৰোহণ — Student Study Portal

Mobile-friendly Assamese-medium SEBA / Assam State Board portal for Classes 6–10.

## Included
- Public student portal; no student account/login.
- Class filters, search, notes, Q&A and MCQ quiz UI.
- Print-to-PDF for notes and Q&A (browser print dialog → Save as PDF).
- Admin login with an 8-hour signed HttpOnly session cookie.
- Admin can publish and delete resources.
- Cloudflare Pages Functions API + D1 database.
- A few sample Assamese learning resources are shown as a preview if the database is empty or the API is not yet configured.

## Deploy free on Cloudflare Pages
1. Create a Cloudflare account and a GitHub repository. Upload the contents of this project to the repository root.
2. In Cloudflare Dashboard, go to **Workers & Pages → Create → Pages → Connect to Git** and select the repository. Use no build command; build output directory is `.`.
3. Create a D1 database named `aarohan-content` under **Storage & databases → D1**.
4. Open the new D1 database → Console and run the SQL in `migrations/0001_create_resources.sql`.
5. In the Pages project → Settings → Functions → D1 database bindings, add binding name `DB` and select `aarohan-content`.
6. In Pages project → Settings → Variables and Secrets, add secrets:
   - `ADMIN_PASSWORD`: choose a strong, unique admin password.
   - `SESSION_SECRET`: a long random secret (at least 32 random characters). Keep it private.
7. Update `database_id` in `wrangler.toml` with the D1 database ID shown in Cloudflare. Redeploy.
8. Open the deployed site. Student materials are public. Use the **এডমিন** button to log in and add materials.

## Add content
Admin → choose material type → class → subject → chapter → title. For notes/Q&A, paste Assamese text. For MCQ, add one question and 2–4 options (one correct answer, option number 1–4) per saved resource. Publish. You can create multiple MCQ resources for a chapter.

## PDF
Open a note or Q&A and select **PDF / প্ৰিণ্ট কৰক**. In the print dialog choose **Save as PDF**.

## Important notes
- The five starter examples are demonstration content, not a complete official textbook solution set. Verify all answers against the current SCERT/SEBA syllabus before publishing.
- The admin panel is protected by server-side password verification and signed cookies. Never put the admin password in HTML/JavaScript.
- Use HTTPS (Cloudflare Pages provides it). Keep `SESSION_SECRET` private and rotate it if exposed.
- The first version stores text and MCQs in D1. It does not yet upload PDF files; PDF export is via the browser print dialog. For downloadable uploaded PDFs, add Cloudflare R2 storage in a later version.
- Cloudflare free-plan limits and product terms can change; check your dashboard for current quotas.
