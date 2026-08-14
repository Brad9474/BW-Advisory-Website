# Vendoring notes

This directory is a trimmed, pinned vendor copy of the `last30days` Claude Code
skill from https://github.com/mvanhorn/last30days-skill, used for topic/trend
research (Reddit, Hacker News, Polymarket, GitHub work with no API keys;
other sources are opt-in via env vars).

- **Pinned to:** tag `v3.18.4` (commit `9067158`), not `main`.
- **Trimmed** per the upstream project's own `.skillignore`: `assets/`,
  `agents/`, dev/eval-only scripts, and `scripts/lib/vendor/` (a vendored
  Node.js X-search client) were removed. This is a ~2.3MB copy vs. the
  upstream ~17MB, and nothing removed is required for the no-API-key sources
  (Reddit, HN, Polymarket, GitHub) to work.
- **License:** MIT, upstream `LICENSE` included in this directory.
- No plugin/marketplace machinery or `SessionStart` hooks were installed —
  this is only the `skills/last30days/` directory, added as a plain
  project-scoped Claude Code skill.

## Do not enable, given client-confidentiality (financial advisory firm)

The upstream skill supports two opt-in features that must **not** be enabled
in this repo:

1. **Browser cookie extraction** (`scripts/lib/chrome_cookies.py`,
   `safari_cookies.py`, `cookie_extract.py`, macOS Keychain / Linux `pass`
   integration) — used to read X/Twitter session cookies for authenticated
   search. Do not run the setup wizard's cookie-import flow.
2. **Publishing to `ht-ml.app`** — an optional third-party hosting feature
   for generated research briefs. Do not opt into this; it sends content to
   a host outside our control.

To update this vendor copy, re-pull `skills/last30days/` from a specific
upstream release tag and re-apply the same trims — don't `git subtree pull`
from `main` directly.
