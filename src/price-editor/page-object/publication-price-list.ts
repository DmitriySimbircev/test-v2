import { Page, Locator, expect } from '@playwright/test';

export class PublicationPriceListPage {
    private page: Page;
    private publishedButton: Locator;
    private successAllert: Locator;
    private filteredRoom: Locator;
    private clickLinkInAlert: Locator;

    constructor(page: Page) {
        this.page = page;
        this.publishedButton = page.getByRole('button', { name: 'Опубликовано' });
        this.successAllert = page.getByRole('heading', { name: 'Изменения цен успешно опубликованы' });
        this.filteredRoom = page.locator('[data-index="14836386"]');
        this.clickLinkInAlert = page.getByRole('link', { name: 'Редакторе цен.' });
    }
    
    public async goToPublishedPriceListsPage(projectName: string): Promise<void> {
        await this.publishedButton.click();
        const project = this.page.locator('article').filter({ hasText: projectName }).nth(0);
        await project.click();
    }

    public async checkAlert(): Promise<Locator> {
        return this.successAllert;
    }

    public async checkChess(): Promise<boolean> {
        const isSelected = await this.filteredRoom.getAttribute('data-selected');
        return isSelected === 'true';
    }

    public async followLinkInAlert(): Promise<void> {
        await this.clickLinkInAlert.click();
    }
}