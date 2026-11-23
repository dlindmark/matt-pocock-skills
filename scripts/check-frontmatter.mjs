// Parses every SKILL.md's frontmatter with `yaml`, the parser the `skills`
// installer uses, so a skill that would be skipped on install fails here first.
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";
import { parseDocument } from "yaml";

const root = new URL("..", import.meta.url).pathname;

function* skillFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* skillFiles(path);
    else if (entry.name === "SKILL.md") yield path;
  }
}

const failures = [];
const names = new Set();

for (const file of skillFiles(join(root, "skills"))) {
  const where = relative(root, file);
  const match = readFileSync(file, "utf8").match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    failures.push(`${where}: no frontmatter block`);
    continue;
  }
  const doc = parseDocument(match[1], { strict: true, uniqueKeys: true });
  if (doc.errors.length > 0) {
    failures.push(`${where}: ${doc.errors[0].message.split("\n")[0]}`);
    continue;
  }
  const data = doc.toJS();
  for (const key of ["name", "description"]) {
    if (typeof data?.[key] !== "string" || data[key].trim() === "") {
      failures.push(`${where}: missing \`${key}\``);
    }
  }

  if (typeof data?.name === "string") {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.name) || data.name !== basename(dirname(file))) {
      failures.push(`${where}: name must match its lowercase, hyphenated folder`);
    }
    if (names.has(data.name)) failures.push(`${where}: duplicate skill name ${data.name}`);
    names.add(data.name);
  }

  const metadata = join(dirname(file), "agents", "openai.yaml");
  const metadataPath = relative(root, metadata);
  if (!existsSync(metadata)) {
    failures.push(`${metadataPath}: missing Codex metadata`);
    continue;
  }
  const config = parseDocument(readFileSync(metadata, "utf8"), { strict: true, uniqueKeys: true });
  if (config.errors.length > 0) {
    failures.push(`${metadataPath}: ${config.errors[0].message.split("\n")[0]}`);
    continue;
  }
  if (config.getIn(["policy", "allow_implicit_invocation"]) !== false) {
    failures.push(`${metadataPath}: policy.allow_implicit_invocation must be false`);
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  console.error(
    `\n${failures.length} skill validation error(s).`,
  );
  process.exit(1);
}
console.log(`Validated frontmatter and explicit-only policy for ${names.size} skills.`);
