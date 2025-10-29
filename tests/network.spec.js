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
    await login.goto("'https://practice.expandtesting.com/login");
    await login.login("wronguser", "wrongpassword")

    await login.getMessageText()
})

test('capture authenticate request and response using waitForRequest/waitForResponse', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();

  const waitReq = page.waitForRequest(req => req.url().includes('/authenticate') && req.method() === 'POST');
  const waitRes = page.waitForResponse(res => res.url().includes('/authenticate'));

  
  await login.login('wronguser', 'wrongpass');


  const authRequest = await waitReq;
  const authResponse = await waitRes;


  console.log('Request URL:', authRequest.url());
  console.log('Request method:', authRequest.method());
  const headers = authRequest.headers();
  console.log('Request headers:', headers);
  const postData = authRequest.postData(); 
  console.log('POST data:', postData);


  if (postData && postData.includes('=')) {
    const params = new URLSearchParams(postData);
    console.log('username param:', params.get('username'));
    
  }

  console.log('Response status:', authResponse.status());

  let bodyText;
  try {
    const json = await authResponse.json();
    console.log('Response JSON:', json);
  } catch {
    bodyText = await authResponse.text();
    console.log('Response text (truncated):', bodyText.slice(0, 400));
  }


  expect(authResponse.status()).toBeGreaterThanOrEqual(400); // expecting failure for wrong creds
  expect(authRequest.method()).toBe('POST');
});
