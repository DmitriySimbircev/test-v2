import { Page, Locator } from '@playwright/test'
import dotenv from 'dotenv' // для файла .env
dotenv.config()

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
    async gotoLoginPage(): Promise<void> { // переход на страницу авторизации
        await this.page.goto(process.env.BASE_URL as string)
    }
    async login(): Promise<void> { // ввод кредов
        await this.username.fill(process.env.LOGIN as string);
        await this.password.fill(process.env.PASSWORD as string);
        await this.loginButton.click()
    }
}
