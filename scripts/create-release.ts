#!/usr/bin/env bun
/* eslint-disable no-console */

/**
 * This script automates the process of creating a new release for the project.
 * It performs the following steps:
 * 1. Fetches the current version from package.json
 * 2. Prompts the user to select a version bump type (major, minor, or patch)
 * 3. Retrieves a list of merged PRs since the last release
 * 4. Updates the version in package.json
 * 5. Commits the changes
 * 6. Pushes the changes to the main branch
 * 7. Creates a pull request from main to production with release notes
 * 8. Opens the pull request in the browser
 *
 * Usage examples:
 * 1. Normal run:
 *    bun scripts/create-release.ts
 *
 * 2. Dry run (simulates the process without making actual changes):
 *    bun scripts/create-release.ts --dry-run
 */

import { execSync } from "child_process";
import fs from "fs";
import inquirer from "inquirer";
import semver from "semver";

// look for --dry-run flag
const dryRun = process.argv.includes("--dry-run");
if (dryRun) {
  console.log("Running in dry-run mode");
}

// Function to execute shell commands
function exec(command: string): string {
  try {
    return execSync(command, { encoding: "utf8" }).trim();
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error);
    throw error;
  }
}

// Function to get current version from package.json
function getCurrentVersion(): string {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  return packageJson.version;
}

// Function to update version in package.json
function updateVersion(newVersion: string): void {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  packageJson.version = newVersion;
  fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2) + "\n");
}

// Function to get merged PRs since last release
function getMergedPRs(): string {
  let prList = "";
  try {
    // Update local tags from remote
    exec("git fetch --tags");

    // Get the most recent tag
    const lastTag = exec(
      "git describe --tags --abbrev=0 $(git rev-list --tags --max-count=1)",
    ).trim();

    if (!lastTag) {
      console.log("No tags found. Fetching all merged PRs.");
      prList = exec(
        `gh pr list --base main --state merged --limit 1000 --json number,title,mergedAt --jq '.[] | "- " + .title + " (#" + (.number | tostring) + ")"'`,
      );
    } else {
      console.log(`Most recent tag: ${lastTag}`);
      prList = exec(
        `gh pr list --base main --state merged --limit 1000 --json number,title,mergedAt --jq '.[] | "- " + .title + " (#" + (.number | tostring) + ")"'`,
      );
    }

    if (prList.trim() === "") {
      console.log("No PRs found after the last tag.");
    }
  } catch (error) {
    console.error("Error in getMergedPRs:", error);
    throw error;
  }
  return prList;
}

// Function to check if we're on the main branch
function checkMainBranch(): void {
  const currentBranch = exec("git rev-parse --abbrev-ref HEAD");
  if (currentBranch !== "main") {
    console.error("Error: You must be on the main branch to run this script.");
    process.exit(1);
  }
}

/**
 * Runs action if not dry-run or prints message to console
 */
function runAction(action: any, message: string): void {
  if (dryRun) {
    console.log(message);
  } else {
    action();
  }
}

/**
 * Function to commit changes
 */
function commitChanges(version: string): void {
  exec("git add .");
  exec(`git commit -m "chore: release v${version}"`);
}

/**
 * Function to create a pull request
 */
function createPullRequest(version: string, mergedPRs: string): void {
  const title = `Release v${version}`;
  const body = `## Release Notes\n\n${mergedPRs}`;
  exec(
    `gh pr create --base production --head main --title "${title}" --body "${body}"`,
  );
  console.log(`Created pull request: ${title}`);
}

/**
 * Function to open a pull request in the browser
 */
function openPullRequest(): void {
  exec(`gh pr view --web`);
}

// Main function
async function createRelease(): Promise<void> {
  // Check if we're on the main branch
  checkMainBranch();

  const currentVersion = getCurrentVersion();
  console.log(`Current version: ${currentVersion}`);

  const mergedPRs = getMergedPRs();
  console.log("Merged PRs since last release:");
  console.log(mergedPRs);

  // Prompt for new version
  const { versionBump } = await inquirer.prompt([
    {
      name: "versionBump",
      message: "Select the type of version bump:",
      type: "list",
      choices: () => [
        { name: "Breaking (Major)", value: "major" },
        { name: "Feature (Minor)", value: "minor" },
        { name: "Fix (Patch)", value: "patch" },
      ],
    },
  ]);

  const newVersion = semver.inc(currentVersion, versionBump) || "";
  console.log(`New version: ${newVersion}`);

  // Update version in package.json
  runAction(() => updateVersion(newVersion), "Updated version in package.json");

  // Commit changes
  runAction(() => commitChanges(newVersion), "Committed changes");

  // Push changes to main
  runAction(() => exec("git push origin main"), "Pushed changes to main");

  // Create pull request from main to production
  runAction(
    () => createPullRequest(newVersion, mergedPRs),
    "Created pull request",
  );

  // Open the pull request
  runAction(() => openPullRequest(), "Opened pull request");
}

createRelease().catch(console.error);
