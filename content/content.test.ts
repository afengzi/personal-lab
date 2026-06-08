import { describe, test, expect } from "vitest";
import zh from "@/messages/zh.json";
import en from "@/messages/en.json";
import { get } from "@/lib/i18n-get";
import { ideas } from "./ideas";
import { modules, quickTiles } from "./modules";
import { boardSeed } from "./telemetry";

const locales = { zh, en };

function expectKey(path: string) {
  for (const [name, dict] of Object.entries(locales)) {
    expect(get(dict, path), `${path} missing in ${name}.json`).toBeTruthy();
  }
}

describe("curated content keys resolve in both locales", () => {
  test("ideas: title/cat/desc/blurb + sub labels", () => {
    for (const n of ideas) {
      for (const field of ["title", "cat", "desc", "blurb"]) {
        expectKey(`ideas.${n.id}.${field}`);
      }
      for (const s of n.sub) {
        expectKey(`ideas.${n.id}.sub.${s.key}`);
      }
    }
  });

  test("modules: title + desc", () => {
    for (const m of modules) {
      expectKey(`modules.${m.id}.title`);
      expectKey(`modules.${m.id}.desc`);
    }
  });

  test("quick tiles: labels", () => {
    for (const q of quickTiles) {
      expectKey(`quick.${q.id}`);
    }
  });

  test("board seed: category tag + note resolve", () => {
    for (const c of boardSeed) {
      expectKey(`categories.${c.tagKey}`);
      expectKey(`board.notes.${c.id}`);
    }
  });

  test("zh and en have identical key shape for ideas", () => {
    expect(Object.keys(zh.ideas).sort()).toEqual(Object.keys(en.ideas).sort());
  });
});
