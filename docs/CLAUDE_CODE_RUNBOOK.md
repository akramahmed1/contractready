# Claude Code runbook: ContractReady Phase 1 (hardening)

Branch: `claude/p1-hardening`. Goal: finish the steps the cloud workspace could
not do (dependency bump with a regenerated lockfile, full build), verify end to
end, open the PR, get CI green, get Akram's approval, merge, deploy, and verify
live. Follow the loop plan → approve → build → verify-live → PR → merge.

## Ground rules

- Stay in scope. Explicitly out of scope (Phase 2, needs Akram's approval):
  deleting the `master` branch, moving videos out of git or rewriting history,
  drizzle migration journal changes, Stripe live mode, legal page banners.
- If a test fails, fix the root cause. Never weaken, skip or delete a test.
- Never commit `.env` or any key. Use the local `.env` only to build and run.
- Stop and ask Akram whenever something is ambiguous.

## 1. Plan (show Akram, wait for "go")

Print a short plan of steps 2 to 8 and wait for approval.

## 2. Preflight

```bash
git fetch origin && git checkout claude/p1-hardening && git pull
gh auth status        # logged in as akramahmed1
node --version        # must be >= 22.6 (tests use built-in type stripping)
ls .env               # local env file with test keys must exist; ask Akram if missing
```

## 3. Security bump (the step the cloud workspace could not do)

```bash
npm ci
npm install next@^15.5.27
npm audit --omit=dev --audit-level=critical   # must now pass
```

If the audit still fails on another critical advisory, bump only that package
within its current major version and report it. Then remove the
`continue-on-error: true` line (and its comment) from the "Dependency audit"
step in `.github/workflows/ci.yml`, so the audit blocks merges from now on.

## 4. Verify

```bash
npm test             # 15 unit tests, all must pass
npm run typecheck
npm run build
```

Local smoke test with `npm run start`:
- `/`, `/pricing`, `/how-it-works`, `/faq`, `/free-checklist` return 200.
- `/dashboard` redirects to sign-in when signed out.
- `/llms.txt` returns text; `/mcp` answers an MCP `initialize` request.
- Signed in with a test account, `/dashboard/readiness` renders a score between
  0 and 100.

Commit `package.json`, `package-lock.json` and `ci.yml` with a clear message,
for example "Bump next to 15.5.27+ for critical CVEs; make audit blocking".

## 5. Pull request

```bash
git push
gh pr create --base main --head claude/p1-hardening \
  --title "Phase 1 hardening: unit tests, 3 bug fixes, CI, security bump" \
  --body-file docs/PRODUCTION_PLAN.md
gh pr checks --watch   # must be green, including the now-blocking audit
```

If the CI build fails only because placeholder env values are rejected by a
library at build time, report the exact error to Akram before changing anything.

## 6. Approval checkpoint (stop here)

Show Akram: test results, audit result, CI status, and the three bug fixes
(weekend SLA "missed", Dec 31 2027 holiday, readiness over 100%). Wait for
"approve merge".

## 7. Merge and deploy

```bash
gh pr merge --squash --delete-branch
```

Check how Railway deploys this service (auto from `main` or manual); if unclear,
ask Akram. Confirm the Railway build passes its vulnerability scan this time.

## 8. Verify live

On the production URL (getcontractready.com or the Railway URL Akram confirms):
- Home, `/pricing`, `/free-checklist` return 200 and show the footer disclosure.
- `/dashboard` redirects to sign-in when signed out.
- `/mcp` answers `initialize`.

If anything fails and cannot be fixed quickly: `git revert` the merge commit on
`main`, push, redeploy, and tell Akram what failed.

## Done report

PR link, merge commit, test and audit results, CI result, Railway scan result,
live checks, and any out-of-scope notes.
