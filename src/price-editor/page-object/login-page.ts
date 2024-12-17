import { Page, Locator } from '@playwright/test'

export class LoginPage {
    private page: Page
    private username: Locator
    private password: Locator
    private loginButton: Locator
    private languageSelect: Locator
    private russianButton: Locator

    constructor(page: Page) {
        this.page = page
        this.username = page.locator('[formcontrolname="login"]').locator('[type="text"]')
        this.password = page.locator('[formcontrolname="password"]').locator('[type="password"]')
        this.loginButton = page.locator('[type="submit"]').locator('button')
        this.languageSelect = page.locator('pb-language').locator('tui-select')
        this.russianButton = page.locator('tui-data-list').locator('button').first()

    }

    public async open(): Promise<void> {
        await this.page.goto('new/catalog/projects')
    }

    public async login(): Promise<void> {
        await this.username.fill(process.env.LOGIN!);
        await this.password.fill(process.env.PASSWORD!);
        await this.loginButton.click()
        await this.page.waitForLoadState()
    }
    public async language():Promise<void> {
        await this.languageSelect.click()
        await this.russianButton.click()
    }
}