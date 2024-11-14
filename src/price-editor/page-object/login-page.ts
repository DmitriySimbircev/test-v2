import { Page, Locator } from '@playwright/test'
import dotenv from 'dotenv' // для файла .env

export class LoginPage {
    private page: Page
    private username: Locator
    private password: Locator
    public loginButton: Locator

    constructor(page: Page) {
        this.page = page
        this.username = page.getByLabel('Логин / E-mail')
        this.password = page.getByLabel('Пароль')
        this.loginButton = page.getByRole('button', { name: 'Войти' })
    }
    async open(): Promise<void> { // переход на страницу авторизации
        await this.page.goto(process.env.BASE_URL!) // Денису: Оставлю так, не буду вносить в configs т.к. все действия теста в /prices
    }
    async login(): Promise<void> { // ввод кредов
        await this.username.fill(process.env.LOGIN!);
        await this.password.fill(process.env.PASSWORD!);
        await this.loginButton.click()
        await this.page.waitForLoadState()
    }

}
