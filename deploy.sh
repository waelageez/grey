#!/usr/bin/env bash
# Grey website: push to GitHub, then pull and deploy on the cPanel server, then check it live.
#   ./deploy.sh "what changed"
# Needs: git + gh logged in, and the "grey" SSH host (~/.ssh/config) authorized in cPanel.
set -euo pipefail
cd "$(dirname "$0")"
REPO=/home/greymarketingsol/repositories/grey
msg="${1:-Update website}"

if [ -n "$(git status --porcelain)" ]; then
  git add -A
  git -c user.name="waelageez" -c user.email="268495501+waelageez@users.noreply.github.com" \
    commit -q -m "$msg" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
fi
git push -q origin main
echo "pushed $(git rev-parse --short HEAD) to GitHub"

ssh -o BatchMode=yes grey "
  uapi VersionControl update repository_root=$REPO branch=main >/dev/null &&
  uapi VersionControlDeployment create repository_root=$REPO >/dev/null &&
  for i in \$(seq 1 20); do L=\$(ls -t ~/.cpanel/logs/vc_*_git_deploy.log | head -1); grep -q 'Build completed' \"\$L\" && break; sleep 2; done &&
  echo \"server at \$(git -C $REPO rev-parse --short HEAD): \$(grep 'Build completed' \"\$L\")\"
" 2>&1 | grep -v -E "post-quantum|store now|openssh.com/pq"

code=$(curl -s -o /dev/null -w '%{http_code}' -L --max-time 20 "https://greymarketingsolutions.com/?deploy=$(date +%s)")
echo "live site: HTTP $code"
