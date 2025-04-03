import { describe, it, expect, beforeEach } from "vitest";
import { setupNotificationCounter } from "../../src/components/NotificationCounter";

describe("NotificationCounter", () => {
  let el: HTMLSpanElement;

  beforeEach(() => {
    el = document.createElement("p");
    el.id = "notification-counter";
    document.body.appendChild(el);
  });

  it("start the counter and increments", () => {
    const counter = setupNotificationCounter(el);
    counter.increment();
    expect(el.textContent).toContain("1");
  });

  it("resets the counter", () => {
    const counter = setupNotificationCounter(el);
    counter.increment();
    counter.reset();
    expect(el.textContent).toContain("0");
  });
});
