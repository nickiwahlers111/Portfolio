
  # Resume Portfolio Website

  This is a code bundle for Resume Portfolio Website. The original project is available at https://www.figma.com/design/p48TgpVkrnA3N2nz9ipIya/Resume-Portfolio-Website.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

## Contact form

The `/contact` page sends submissions to `nicki.wahlers@gmail.com` through
[FormSubmit](https://formsubmit.co/documentation). No API key or environment
configuration is required. Messages include the sender's name, email, subject,
and message; Reply-To is set to the sender's email address.

### One-time activation

1. Run the site with `npm run dev` and open `/contact` at the printed local URL.
2. Submit a test message with your own email address.
3. Look for FormSubmit's activation email in `nicki.wahlers@gmail.com`
   (including Spam) and click the confirmation link.
4. Submit another test message and confirm it arrives in your inbox.

Delivery has not been verified until activation and the second test are complete.
Test the form again on the published domain after deploying.

To use a different compatible service, set `VITE_CONTACT_FORM_ENDPOINT` in
`.env.local` and in your hosting environment, then restart or rebuild. This is a
public URL, never a secret API key. The endpoint must accept multipart form data
and return JSON with `success: true` (or `"true"`) and a successful HTTP status.
