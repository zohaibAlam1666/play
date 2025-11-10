import test, { expect } from "@playwright/test";
import LoginPage from "./pages/LoginPage";

test("Test 1", async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();

  const [reqAuth, recAuth] = await Promise.all([
    page.waitForRequest(req => req.url().includes("authenticate")),
    page.waitForResponse(res => res.url().includes("authenticate")),
    login.login("wronguser", "wrongpass"), // action triggers the request
  ]);

  expect(reqAuth.method()).toBe("POST");
  console("this is just a test")

  const status = recAuth.status();
  console.log("this is my status",status)
  expect([400, 403, 401, 422, 302, 204].includes(status)).toBeTruthy();

});
