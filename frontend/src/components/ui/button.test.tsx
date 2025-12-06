import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";

describe("Button", () => {
  it("デフォルトのボタンがレンダリングされる", () => {
    render(<Button>クリック</Button>);
    const button = screen.getByRole("button", { name: "クリック" });
    expect(button).toBeInTheDocument();
  });

  it("クリックイベントが発火する", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={handleClick}>クリック</Button>);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("disabled状態でクリックできない", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Button onClick={handleClick} disabled>
        無効
      </Button>
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("variantプロップが適用される", () => {
    const { rerender } = render(<Button variant="destructive">削除</Button>);
    let button = screen.getByRole("button");
    expect(button).toHaveClass("bg-destructive");

    rerender(<Button variant="outline">アウトライン</Button>);
    button = screen.getByRole("button");
    expect(button).toHaveClass("border");
  });

  it("sizeプロップが適用される", () => {
    const { rerender } = render(<Button size="sm">小</Button>);
    let button = screen.getByRole("button");
    expect(button).toHaveClass("h-8");

    rerender(<Button size="lg">大</Button>);
    button = screen.getByRole("button");
    expect(button).toHaveClass("h-10");
  });

  it("カスタムクラス名が適用される", () => {
    render(<Button className="custom-class">カスタム</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  it("asChildプロップでSlotコンポーネントとしてレンダリングされる", () => {
    render(
      <Button asChild>
        <a href="/test">リンク</a>
      </Button>
    );
    const link = screen.getByRole("link", { name: "リンク" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
  });

  it("その他のHTML属性が適用される", () => {
    render(<Button aria-label="送信ボタン" type="submit">送信</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "送信ボタン");
    expect(button).toHaveAttribute("type", "submit");
  });
});

