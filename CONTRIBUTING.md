# Contributing to EduSphere LMS

Thank you for your interest in contributing! This guide explains the branching strategy and the step-by-step process for merging branches.

---

## 📋 Table of Contents

1. [Branching Strategy](#-branching-strategy)
2. [How to Merge Branches](#-how-to-merge-branches)
   - [Using GitHub Pull Requests (recommended)](#1-using-github-pull-requests-recommended)
   - [Using the Git CLI](#2-using-the-git-cli)
3. [Resolving Merge Conflicts](#-resolving-merge-conflicts)
4. [Branch Naming Conventions](#-branch-naming-conventions)
5. [Commit Message Guidelines](#-commit-message-guidelines)

---

## 🌿 Branching Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready code. Only merged into via reviewed Pull Requests. |
| `develop` | Integration branch. Features are merged here before going to `main`. |
| `feature/<short-description>` | New features (e.g. `feature/ai-tutor-chat`). |
| `fix/<short-description>` | Bug fixes (e.g. `fix/attendance-date-overflow`). |
| `hotfix/<short-description>` | Urgent fixes applied directly to `main` (e.g. `hotfix/login-redirect`). |
| `chore/<short-description>` | Maintenance tasks — deps, tooling, CI (e.g. `chore/upgrade-nextjs`). |

---

## 🔀 How to Merge Branches

### 1. Using GitHub Pull Requests (recommended)

This is the preferred workflow for all contributions.

1. **Push your branch** to the remote repository:

   ```bash
   git push origin feature/my-feature
   ```

2. **Open a Pull Request** on GitHub:
   - Go to the repository on GitHub.
   - Click **"Compare & pull request"** (GitHub shows this banner automatically after a push).
   - Set the **base** branch (the branch you want to merge *into*, e.g. `develop` or `main`).
   - Fill in the PR title and description.
   - Request a reviewer.

3. **Address review feedback** by pushing additional commits to the same branch.

4. Once approved, click **"Merge pull request"** — prefer **"Squash and merge"** for feature branches to keep the history clean, or **"Create a merge commit"** when you want to preserve individual commits.

5. **Delete the source branch** after merging (GitHub offers a one-click button).

---

### 2. Using the Git CLI

Use this approach for local integrations or when merging without a PR (e.g. rebasing `develop` onto `main` by a maintainer).

#### a) Fast-forward merge (no merge commit)

```bash
# Switch to the target branch
git checkout develop

# Make sure it is up to date
git pull origin develop

# Merge the feature branch
git merge --ff-only feature/my-feature
```

Use `--ff-only` when the feature branch was based on the latest `develop` and no divergence exists.

#### b) No-fast-forward merge (keeps a merge commit)

```bash
git checkout develop
git pull origin develop
git merge --no-ff feature/my-feature -m "Merge feature/my-feature into develop"
```

The `--no-ff` flag creates an explicit merge commit, making it easy to see where a feature was integrated.

#### c) Squash merge (flatten all commits into one)

```bash
git checkout develop
git pull origin develop
git merge --squash feature/my-feature
git commit -m "feat: add <feature description>"
```

Use squash merges to keep `develop`/`main` history clean.

#### d) Rebase and merge

```bash
# Switch to your feature branch
git checkout feature/my-feature

# Rebase onto develop to incorporate the latest changes
git rebase develop

# Switch back and fast-forward
git checkout develop
git merge --ff-only feature/my-feature
```

Rebasing rewrites history — **never rebase branches that others are working on**.

After merging, push and optionally delete the remote branch:

```bash
git push origin develop
git push origin --delete feature/my-feature  # delete remote branch
git branch -d feature/my-feature             # delete local branch
```

---

## ⚠️ Resolving Merge Conflicts

Conflicts occur when the same lines were changed in both branches. Git marks them with conflict markers:

```
<<<<<<< HEAD
// code from the target branch (e.g. develop)
=======
// code from the source branch (e.g. feature/my-feature)
>>>>>>> feature/my-feature
```

**Steps to resolve:**

1. Open the conflicted file(s) and decide which change to keep (or combine both).
2. Remove all conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`).
3. Stage the resolved files:

   ```bash
   git add <file>
   ```

4. Complete the merge:

   ```bash
   git merge --continue   # or: git rebase --continue
   ```

5. Push the resolved branch:

   ```bash
   git push origin <branch-name>
   ```

> **Tip:** VS Code and many other editors have built-in merge conflict UIs. Use the "Accept Current Change / Accept Incoming Change / Accept Both Changes" buttons to resolve conflicts visually.

---

## 📝 Branch Naming Conventions

```
feature/<short-kebab-description>   # e.g. feature/quiz-generator
fix/<short-kebab-description>       # e.g. fix/gradebook-gpa-calc
hotfix/<short-kebab-description>    # e.g. hotfix/auth-redirect-loop
chore/<short-kebab-description>     # e.g. chore/upgrade-supabase-sdk
docs/<short-kebab-description>      # e.g. docs/api-reference-update
```

---

## 💬 Commit Message Guidelines

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short summary>

[optional body]
[optional footer]
```

| Type | When to use |
|------|------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no logic change |
| `refactor` | Code restructure, no feature/fix |
| `test` | Adding or updating tests |
| `chore` | Build process, tooling |

**Examples:**

```
feat(ai): add essay grader with rubric feedback
fix(attendance): correct date boundary in monthly report
docs(contributing): add branch merge guide
chore(deps): upgrade next.js to 14.2
```

---

## 🙏 Code of Conduct

Please be respectful and constructive in all interactions. This project follows the [Contributor Covenant](https://www.contributor-covenant.org/) Code of Conduct.
