import { Page, Locator, expect } from '@playwright/test'
export class PublicationPriceList {

    page: Page
    published: Locator
    project: Locator
    successAllert: Locator
    choice: Locator
    toDraftList: Locator

    constructor(page) {
        this.page = page
        this.published = page.getByRole('button', { name: 'Опубликовано' })
        this.project = page.locator('article').filter({ hasText: 'Тест SDA (не удалять не использовать)' }).nth(0)
        this.successAllert = page.getByRole('heading', { name: 'Изменения цен успешно опубликованы' })
        this.choice = page.locator('[data-index="14836386"]')
        this.toDraftList = page.getByRole('link', { name: 'Редакторе цен.' })
    }
    async verification_1(): Promise<void> {
        await this.published.click()
        await this.project.click()
    }
    async verification_2(): Promise<void> {
        await expect(this.successAllert).toHaveText('Изменения цен успешно опубликованы'); // проверка надичия текса в аллерте успеха
    }

    async verification_3(): Promise<Locator> {
        return this.choice;
    }

    async verification_4(): Promise<void> {
        await this.toDraftList.click()
    }
}

