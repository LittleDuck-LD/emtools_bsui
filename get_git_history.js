import { exec } from 'child_process';
import fs from 'fs';

// 获取 Git 提交记录
function getGitLog() {
  return new Promise((resolve, reject) => {
    exec(
      'git log --pretty=format:"%H%x1f%an%x1f%ad%x1f%s%x1f%b%x1e" --date=iso',
      (err, stdout, stderr) => {
        if (err) {
          reject(`Failed to run git log command: ${stderr}`);
        } else {
          resolve(stdout);
        }
      }
    );
  });
}

// 解析 Git 提交记录
function parseGitLog(log) {
  const commits = [];
  const pattern = /(?<hash>.*?)\x1f(?<author>.*?)\x1f(?<date>.*?)\x1f(?<summary>.*?)\x1f(?<description>.*?)\x1e/g;
  let match;

  // 使用正则表达式匹配每一条提交记录
  while ((match = pattern.exec(log)) !== null) {
    const commit = {
      hash: match.groups.hash.replace("\n", ""),
      author: match.groups.author,
      date: match.groups.date,
      summary: match.groups.summary,
      description: match.groups.description
    };
    commits.push(commit);
  }
  return commits;
}

// 导出到 JSON 文件
function exportToJson(commits, filename) {
  fs.writeFileSync(filename, JSON.stringify(commits, null, 4), 'utf-8');
}

// 主函数
const main = async () => {
  try {
    const log = await getGitLog();
    const commits = parseGitLog(log);
    exportToJson(commits, 'public/updatelog/git_commit_history.json');
    console.log("Git commit history has been exported to git_commit_history.json");
  } catch (error) {
    console.error(`An error occurred: ${error}`);
  }
};

main();
