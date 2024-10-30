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

    async creationPriceList(): Promise<void> {
        await this.priceEditorButton.waitFor();
        await this.priceEditorButton.click();
        await this.newPricesButton.waitFor();
        await this.newPricesButton.click();

        const isProjectSelectionEnabled = await this.projectSelection.isEnabled();

        if (isProjectSelectionEnabled) { // Проверяем, доступен ли ЖК для выбора
            await this.projectSelection.click();
            await this.confirmButton.waitFor();
            await this.confirmButton.click();
        } else {
            await this.deletionPricelist(); // Если элемент задезейблен, переходим к удалению
        }
    }

    async deletionPricelist(): Promise<void> { // Функция удаления черновика (deletionPricelist - удалениеПрайсЛиста)
        await this.cancelButton.click();
        await this.modalWindow.click();
        await this.deleteButton.click();
        await this.creationPriceList(); // Создание нового после удаления, для дальнейшей работы 
    }
}

