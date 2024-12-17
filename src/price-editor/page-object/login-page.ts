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
        this.username = page.getByLabel('Email')
        this.password = page.getByLabel('Password')
        this.loginButton = page.getByRole('button', { name: 'Log in' })
        this.languageSelect = page.getByLabel('[object Object]')
        this.russianButton = page.getByRole('option', { name: 'Русский' })

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
    public async language():Promise<void> {
        await this.languageSelect.click()
        await this.russianButton.click()
    }

}