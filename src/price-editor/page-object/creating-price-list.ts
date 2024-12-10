import { Page, Locator } from '@playwright/test';

export class PriceListsMainPage {
    public page: Page;
    public priceEditorButton: Locator;
    public createNewPricesButton: Locator;
    public confirmButton: Locator;
    public cancelButton: Locator;
    public deleteButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.priceEditorButton = page.getByRole('link', { name: 'Редактор цен' });
        this.createNewPricesButton = page.locator('header[class*="page-head"]').getByRole('button');
        this.confirmButton = page.getByRole('dialog').getByRole('button', { name: 'Редактировать цены' });
        this.cancelButton = page.getByRole('button', { name: 'Отменить' });
        this.deleteButton = page.getByRole('button', { name: 'Удалить' });
    }

    public async open(): Promise<void> {
        await this.priceEditorButton.click();
        await this.page.waitForResponse(response => response.url().includes('/api/v4/json/house'));
    }

    public async create(projectName: string): Promise<void> {
        await this.createNewPricesButton.click();
        const projectSelect = this.page.locator('label').filter({ hasText: projectName });
        await projectSelect.click();
        await this.confirmButton.click();
    }

    public async isProjectHavePriceList(projectName: string): Promise<boolean> {
        await this.createNewPricesButton.click();
        const projectSelect = this.page.locator('label').filter({ hasText: projectName });
        const result = await projectSelect.isDisabled();
        await this.cancelButton.click();
        return result;
    }

    public async delete(projectName: string): Promise<void> {
        const modalWindow = this.page.locator('article').filter({ hasText: projectName }).getByRole('button');
        await modalWindow.click();
        await this.deleteButton.click();
        await this.page.waitForResponse(response => response.url().includes('/api/v4/json/house'));
    }
}