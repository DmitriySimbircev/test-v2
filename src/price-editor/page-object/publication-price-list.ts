import { Page, Locator, expect } from '@playwright/test';

export class PublicationPriceListPage {
    public page: Page;
    public publishedButton: Locator;
    public project: Locator;
    public successAllert: Locator;
    public filteredRoom: Locator;
    public atWorkPage: Locator;

    constructor(page: Page, projectName: string) {
        this.page = page;
        this.publishedButton = page.getByRole('button', { name: 'Опубликовано' });
        this.project = page.locator('article').filter({ hasText: projectName }).nth(0);
        this.successAllert = page.getByRole('heading', { name: 'Изменения цен успешно опубликованы' });
        this.filteredRoom = page.locator('[data-index="14836386"]');
        this.atWorkPage = page.getByRole('link', { name: 'Редакторе цен.' });
    }

    async publishedPage(): Promise<void> {
        await this.publishedButton.click();
        await this.project.click();
    }

    async checkAlert(): Promise<Locator> {
        return this.successAllert;
    }

    async checkChess(): Promise<boolean> {
        const isSelected = await this.filteredRoom.getAttribute('data-selected');
        return isSelected === 'true';
    }
    
    async followLinkInAlert(): Promise<void> {
        await this.atWorkPage.click();
    }
}