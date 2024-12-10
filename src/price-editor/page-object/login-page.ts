import { Page, Locator } from '@playwright/test'

export class LoginPage {
    private page: Page
    private username: Locator
    private password: Locator
    private loginButton: Locator

    constructor(page: Page) {
        this.page = page
        this.username = page.getByLabel('Логин / E-mail')
        this.password = page.getByLabel('Пароль')
        this.loginButton = page.getByRole('button', { name: 'Войти' })
    }

    public async open(): Promise<void> {
        await this.page.goto('/new')
    }

    public async login(): Promise<void> {
        await this.username.fill(process.env.LOGIN!);
        await this.password.fill(process.env.PASSWORD!);
        await this.loginButton.click()
        await this.page.waitForLoadState()
    }
}