## Goal

Set up a monthly blog digest newsletter that collects subscribers and sends them an automatic roundup of new RightHer articles.

## Constraints

- Lovable's built-in email system cannot be used for newsletters or bulk subscriber sends.
- We'll use the **Brevo connector** (available in Lovable) for actual email delivery.
- Sending from `rightherofficial@gmail.com` is possible for testing, but will likely hurt deliverability and may be restricted by Brevo. A custom domain is strongly recommended before sending to a real list.

## Implementation plan

### 1. Backend setup

- Enable Lovable Cloud (database + Edge Functions).
- Create a `subscribers` table with `email`, `subscribed_at`, `active`, and `unsubscribe_token`.
- Add proper RLS policies, grants, and an index on `active`.

### 2. Collect signups

- Update the existing `Newsletter` component so submitting the form actually inserts the email into `subscribers`.
- Add email-validation and duplicate handling.
- Show clear success/error feedback instead of the current fake toast.

### 3. Generate the monthly digest

- Create a protected admin page (e.g., `/admin/newsletter`) only accessible to you.
- Pull the latest articles from `src/data/articles.ts` or from a future articles table.
- Render a clean email-friendly HTML digest using React Email components.
- Let you add a short custom intro before sending.

### 4. Send the email

- Connect the **Gmail connector** to the project.
- Create a Supabase Edge Function that sends the digest to all active subscribers.
- Use Gmail's SMTP/email API to send the campaign.

### 5. Automation (choose one)

- **Manual (recommended to start):** You log in each month, review the draft, and click "Send digest".
- **Automatic:** Add a scheduled cron job that assembles and sends the digest on a fixed date each month.

## Trade-offs

- Using a personal Gmail sender address may cause emails to land in spam or be rejected by some providers. For a real newsletter, plan to verify a custom domain in Brevo.
- Manual sending gives you control over timing and content; auto-send requires careful monitoring to avoid mistakes.

## Next step

If you approve this plan, I'll start by enabling Lovable Cloud and setting up the subscriber table, then update the signup form and build the admin send page.