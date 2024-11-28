import { Page, Locator } from '@playwright/test';

export class PriceListsMainPage {
    public page: Page;
    public priceEditorButton: Locator;
    public createNewPricesButton: Locator;
    public projectSelection: Locator;
    public confirmButton: Locator;
    public cancelButton: Locator;
    public modalWindow: Locator;
    public deleteButton: Locator;

    constructor(page: Page, projectName: string) {
        this.page = page;
        this.priceEditorButton = page.getByRole('link', { name: 'Редактор цен' });
        this.createNewPricesButton = page.getByRole('button', { name: 'Редактировать цены' });
        this.projectSelection = page.locator('label').filter({ hasText: projectName });
        this.modalWindow = page.locator('article').filter({ hasText: projectName }).getByRole('button');
        this.confirmButton = page.getByRole('dialog').getByRole('button', { name: 'Редактировать цены' });
        this.cancelButton = page.getByRole('button', { name: 'Отменить' });
        this.deleteButton = page.getByRole('button', { name: 'Удалить' });
    }

    async openPriceEditor(): Promise<void> {
        await this.priceEditorButton.click();
        await this.page.waitForResponse(response => response.url().includes('/api/v4/json/house'));
    }

    async create(): Promise<void> {
        await this.openPriceEditor();
        await this.createNewPricesButton.click();

        if (await this.projectSelection.isEnabled()) {
            await this.projectSelection.click();
            await this.confirmButton.click();
        } else {
            await this.closeSitepage();
            await this.delete();
        }
    }

    async closeSitepage(): Promise<void> {
        await this.cancelButton.click();
    }
    
    async delete(): Promise<void> {
        await this.modalWindow.click();
        await this.deleteButton.click();
        await this.create();
    }
}