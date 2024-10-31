import { Page, Locator } from '@playwright/test';

export class CreatingPriceListPage {
    public page: Page;
    public priceEditorButton: Locator;
    public newPricesButton: Locator;
    public projectSelection: Locator;
    public confirmButton: Locator;
    public cancelButton: Locator;
    public modalWindow: Locator;
    public deleteButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.priceEditorButton = page.getByRole('link', { name: 'Редактор цен' });
        this.newPricesButton = page.getByRole('button', { name: 'Редактировать цены' });
        this.projectSelection = page.locator('label').filter({ hasText: process.env.PROJECT_NAME! });
        this.confirmButton = page.getByRole('dialog').getByRole('button', { name: 'Редактировать цены' });
        this.cancelButton = page.getByRole('button', { name: 'Отменить' });
        this.modalWindow = page.locator('article').filter({ hasText: process.env.PROJECT_NAME! }).getByRole('button');
        this.deleteButton = page.getByRole('button', { name: 'Удалить' });
    }

    async createPriceList(): Promise<void> {

        await this.priceEditorButton.click();
        await this.page.waitForTimeout(2500) // костыль связаный с багом (не могу обыграть его ни waitForLoadState ни waitForResponse)
        await this.newPricesButton.click();

        // Проверяем доступность выбора проекта
        if (await this.projectSelection.isEnabled()) {
            await this.projectSelection.click();
            await this.confirmButton.click();
        } else {
            await this.deletePricelist();
        }
    }

    async deletePricelist(): Promise<void> {
        await this.cancelButton.click();
        await this.modalWindow.click();
        await this.deleteButton.click();
        await this.createPriceList(); // Переходим снова к созданию после удаления
    }
}
