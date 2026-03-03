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

function copySiteToTemp() {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'irvin-blog-gh-pages-'));
  fs.cpSync(SITE_DIR, tempDir, { recursive: true });
  fs.writeFileSync(path.join(tempDir, '.nojekyll'), '', 'utf8');
  return tempDir;
}

function deploy(tempDir, remoteUrl, commit) {
  const message = `Deploy ${commit} at ${new Date().toISOString()}`;
  run(`git init -b ${TARGET_BRANCH}`, tempDir);
  run('git add -A', tempDir);
  run(`git -c user.name='local-deploy' -c user.email='local-deploy@localhost' commit -m "${message}"`, tempDir);
  run(`git remote add ${REMOTE_NAME} "${remoteUrl}"`, tempDir);
  execSync(`git push --force ${REMOTE_NAME} ${TARGET_BRANCH}`, { cwd: tempDir, stdio: 'inherit' });
}

function main() {
  ensureSiteExists();
  const { remoteUrl, commit } = getRepoInfo();
  const tempDir = copySiteToTemp();
  deploy(tempDir, remoteUrl, commit);
  console.log(`Deployed _site to ${REMOTE_NAME}/${TARGET_BRANCH}`);
}

main();
