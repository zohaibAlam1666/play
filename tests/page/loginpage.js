// tests/pages/LoginPage.js

export default class LoginPage {

  constructor(page) {
    this.page = page;
    this.username = page.locator('#username');
    this.password = page.locator('#password');
    this.submitButton = page.locator('#submit-login');
    this.message = page.locator("body")
  }

  async goto() {
    await this.page.goto('https://practice.expandtesting.com/login');
  }

  async login(user, pass) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.submitButton.click();
  }

  async getMessageText(){
    const possible = [
      this.page.locator("#message"),
      this.page.locator(".message"),
      this.page.locator(".alert"),
      this.page.locator("#flash"),    
    ]
    for(const i of possible){ 
      if(await i.count()&&(await i.isVisible())){
        const txt = (await i.innerText()).trim();

        if (txt){
          return txt
        }
      }
    } 

    return (await this.page.content() || "")
  }
   
  
}
