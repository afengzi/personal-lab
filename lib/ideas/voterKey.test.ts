import { describe, test, expect } from "vitest";
import { voterKey } from "./voterKey";

describe("voterKey", () => {
  test("is stable for the same ip+ua+anon", () => {
    const a = voterKey({ ip: "1.2.3.4", ua: "x", anon: "abc" });
    const b = voterKey({ ip: "1.2.3.4", ua: "x", anon: "abc" });
    expect(a).toBe(b);
    expect(a).toHaveLength(64); // sha256 hex
  });

  test("differs by anon cookie", () => {
    expect(voterKey({ ip: "1.2.3.4", ua: "x", anon: "a" })).not.toBe(voterKey({ ip: "1.2.3.4", ua: "x", anon: "b" }));
  });

  test("differs by ip", () => {
    expect(voterKey({ ip: "1.1.1.1", ua: "x", anon: "a" })).not.toBe(voterKey({ ip: "2.2.2.2", ua: "x", anon: "a" }));
  });
});
