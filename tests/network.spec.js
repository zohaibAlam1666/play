import {test,expect} from '@playwright/test'
import LoginPage from './page/loginpage'

test("this is my network test",async({page})=>{
    page.on("request",(req)=>{
        const url = req.url();
        if(url.includes("/authenticate")){
            console.log("Auth REQ", req.method(),url)
        }
        
    })
    page.on("responce",async(res)=>{
        const url = res.url();
        if(url.includes("/authenticate")){
            console.log("Auth REQ", res.method(),url)
        }
    })

    const login = new LoginPage(page)
    await login.goto();
    await login.login("wronguser", "wrongpassword")

    await login.getMessageText()
})