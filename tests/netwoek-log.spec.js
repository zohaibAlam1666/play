import test, { expect } from "@playwright/test";
import LoginPage from "./pages/LoginPage";

// test("Test 1", async ({ page }) => {
//   const login = new LoginPage(page);
//   await login.goto();

//   let start = Date.now()

//   const reqestWaite = page.waitForRequest(req=> req.url().includes("authenticate"))
//   const respontWaite = page.waitForResponse(res=> res.url().includes("authenticate"))

//   await login.login("this is my user","this is my pass")

//   let reqAuth = await reqestWaite
//   let recAuth = await respontWaite

//   let elapsed = Date.now() - start

//   expect(reqAuth.method()).toBe("POST")

//   let status = recAuth.status()
//   console.log("this is the status", status)
//   expect([400,300,204].includes(status)).toBeTruthy();

//   expect(elapsed).toBeLessThan(3000)

//   console.log(elapsed)

// });




test ("websockets",async({page})=>{
  const url = "wss://echo.websocket.org/.ws"

  const echo = await page.evaluate(async (rurl)=>{
    return await new Promise((resolve, reject)=>{
      const ws = new WebSocket(rurl)
      
      ws.onopen = ()=>{
        ws.send("hello")
      }

      ws.onmessage = (event) => {
        resolve(event.data)
        ws.close();
      }

      ws.onerror = (error)=>{
        reject("websockets error", error)
      }

    })
  },url)

  expect(echo).toBe("hello")

})



