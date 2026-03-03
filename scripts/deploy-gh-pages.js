const fs = require('fs');
const os = require('os');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const SITE_DIR = path.join(ROOT, '_site');
const TARGET_BRANCH = process.env.DEPLOY_BRANCH || 'gh-pages';
const REMOTE_NAME = process.env.DEPLOY_REMOTE || 'origin';

function run(cmd, cwd = ROOT) {
  return execSync(cmd, { cwd, stdio: 'pipe' }).toString().trim();
}

function ensureSiteExists() {
  if (!fs.existsSync(SITE_DIR)) {
    throw new Error('找不到 _site，請先執行 npm run build');
  }
}

function getRepoInfo() {
  const repoRoot = run('git rev-parse --show-toplevel');
  if (path.resolve(repoRoot) !== ROOT) {
    throw new Error('請在專案根目錄執行此腳本');
  }

  const remoteUrl = run(`git remote get-url ${REMOTE_NAME}`);
  const commit = run('git rev-parse --short HEAD');
  return { remoteUrl, commit };
}

function prepareTempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'irvin-blog-gh-pages-'));
}

function resetWorktree(tempDir) {
  for (const entry of fs.readdirSync(tempDir)) {
    if (entry === '.git') continue;
    fs.rmSync(path.join(tempDir, entry), { recursive: true, force: true });
  }
}

function syncSiteFiles(tempDir) {
  fs.cpSync(SITE_DIR, tempDir, { recursive: true });
  fs.writeFileSync(path.join(tempDir, '.nojekyll'), '', 'utf8');
}

function checkoutTargetBranch(tempDir, remoteUrl) {
  run('git init', tempDir);
  run(`git remote add ${REMOTE_NAME} "${remoteUrl}"`, tempDir);

  try {
    run(`git fetch --depth=1 ${REMOTE_NAME} ${TARGET_BRANCH}`, tempDir);
    run(`git checkout -B ${TARGET_BRANCH} FETCH_HEAD`, tempDir);
  } catch (_err) {
    run(`git checkout -b ${TARGET_BRANCH}`, tempDir);
  }
}

function deploy(tempDir, remoteUrl, commit) {
  const message = `Deploy ${commit} at ${new Date().toISOString()}`;
  checkoutTargetBranch(tempDir, remoteUrl);
  resetWorktree(tempDir);
  syncSiteFiles(tempDir);
  run('git add -A', tempDir);
  const changed = run('git status --porcelain', tempDir);
  if (!changed) {
    console.log(`No changes to deploy on ${TARGET_BRANCH}`);
    return;
  }
  run(`git -c user.name='local-deploy' -c user.email='local-deploy@localhost' commit -m "${message}"`, tempDir);
  execSync(`git push ${REMOTE_NAME} ${TARGET_BRANCH}`, { cwd: tempDir, stdio: 'inherit' });
}

function main() {
  ensureSiteExists();
  const { remoteUrl, commit } = getRepoInfo();
  const tempDir = prepareTempDir();
  deploy(tempDir, remoteUrl, commit);
  console.log(`Deployed _site to ${REMOTE_NAME}/${TARGET_BRANCH}`);
}

main();
