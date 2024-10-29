import { Page, Locator } from '@playwright/test'
import dotenv from 'dotenv' // для файла .env
dotenv.config() // - избыточно , ты уже инициализируешь их в файле конфига

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
    async open(): Promise<void> { // переход на страницу авторизации уместнее и лаконичнее просто open или goto. loginPage.gotoLoginPage - масло масляное xD 
        await this.page.goto('/prices') // лучше просто process.env.BASE_URL! . ! - отбрасывает тип undefined. 
    }
    async login(): Promise<void> { // ввод кредов
        await this.username.fill(process.env.LOGIN!);
        await this.password.fill(process.env.PASSWORD as string);
        await this.loginButton.click()
    }
}
