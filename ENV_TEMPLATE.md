# ContractReady Environment Template

The app reads **all secrets from environment variables**. Nothing secret is committed to the repo.

## 1. Copy the example file

```bash
cp .env.example .env
```

## 2. Values you must paste

| Variable | Where to get it | Required now? |
|---|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk dashboard > your application > API Keys > Publishable key | Yes, to run |
| `CLERK_SECRET_KEY` | Clerk dashboard > same page > Secret key | Yes, to run |
| `DATABASE_URL` | Neon console > your project > Connection string (use the pooled one) | Yes, to run |
| `STRIPE_SECRET_KEY` | Stripe dashboard (toggle **Test mode**) > Developers > API keys > Secret key (`sk_test_...`) | Yes for checkout |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Same page > Publishable key (`pk_test_...`) | Yes for checkout |
| `STRIPE_WEBHOOK_SECRET` | Stripe dashboard > Developers > Webhooks > add endpoint `https://YOUR-DOMAIN/api/webhooks/stripe` > Signing secret (`whsec_...`). For local dev, use the Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhooks/stripe` | Yes for provisioning |
| `NEXT_PUBLIC_APP_URL` | Planned production domain: `https://getcontractready.com` (not registered yet — use the Railway-provided URL until it is) | Yes on deploy |
| `RESEND_API_KEY` | Resend dashboard > API Keys (recommended email provider) | For sending email |
| `EMAIL_FROM` | A verified sending domain address, e.g. `hello@getcontractready.com` (domain verification requires the planned domain to be registered) | For sending email |
| `CRON_SECRET` | Generate locally: `openssl rand -hex 32`. Paste the same value in Railway env and in the scheduler that calls `/api/admin/reconcile?cron=1` | For scheduled reconciliation |

## 3. Going live later

When you are ready to take real payments:

1. In Stripe, toggle off Test mode and paste the **live** keys (`sk_live_...`, `pk_live_...`) over the test keys.
2. Create a **live** webhook endpoint and paste the new `STRIPE_WEBHOOK_SECRET`.
3. Have an attorney review the legal pages (`/legal/terms`, `/legal/privacy`, `/legal/refunds`) and remove the draft banners.
4. Set `NEXT_PUBLIC_APP_URL` to `https://getcontractready.com` once the domain is registered; until then, use the Railway-provided URL.

## 4. What is stubbed without keys

- **No Clerk keys:** sign-in, sign-up, dashboard, and admin pages will not work (Clerk throws). Marketing pages still render.
- **No DATABASE_URL:** purchases, leads, and the admin view cannot read or write. The app will error on those routes; marketing pages still render.
- **No Stripe keys:** the pricing buttons will error when clicked. Everything else works.
