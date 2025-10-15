// use PascalCase for class name (convention)
export default class LoginPage {
  constructor(page) {
    this.p = page;
    this.username = page.locator('#username');   // corrected selector name
    this.password = page.locator('#password');   // corrected selector name
    this.submit = page.locator('button[type="submit"]');
    this.flash = page.locator('#flash');
  }

  async goto() {
    await this.p.goto('https://the-internet.herokuapp.com/login');
  }

  async login(user, pass) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.submit.click();   // perform submit so the login actually happens
  }

  async getFlashText() {
    return (await this.flash.textContent())?.trim();
  }
}
