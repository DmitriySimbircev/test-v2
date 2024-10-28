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
    async publishedPage(): Promise<void> { // переход на вкладку опубликовано и открытие прайс листа 
        await this.published.click()
        await this.project.click()
    }
    async successAlert(): Promise<void> { // проверка надичия текса в аллерте успеха (по сути, проверка наличия алерта)
        await expect(this.successAllert).toHaveText('Изменения цен успешно опубликованы'); 
    }

    async checChess(): Promise<Locator> { // проверка что на шахматке отмечены помещения с измененной ценой
        return this.choice;
    }

    async followLinkInAlert(): Promise<void> { // переход по ссылки в аллерте на вкладку в работе 
        await this.toDraftList.click()
    }
}

