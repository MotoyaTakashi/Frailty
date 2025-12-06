import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("複数のクラス名を結合する", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("条件付きクラス名を処理する", () => {
    expect(cn("foo", false && "bar", "baz")).toBe("foo baz");
  });

  it("Tailwindクラスの競合を解決する", () => {
    // tailwind-mergeが同じプロパティの競合するクラスをマージする
    const result = cn("p-4", "p-6");
    expect(result).toBe("p-6"); // 後者が優先される
  });

  it("空の値を無視する", () => {
    expect(cn("foo", undefined, null, "", "bar")).toBe("foo bar");
  });

  it("配列やオブジェクトを処理する", () => {
    expect(cn(["foo", "bar"], { baz: true, qux: false })).toBe("foo bar baz");
  });
});

