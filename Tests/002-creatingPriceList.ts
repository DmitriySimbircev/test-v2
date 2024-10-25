import { Page, Locator } from '@playwright/test'
export class CreatingPriceList {

    page: Page;
    priceEditor: Locator;
    newPrices: Locator;
    projectSelection: Locator;
    confirmation: Locator;
    cancellation: Locator;
    modalWindow: Locator;
    delete: Locator;
    
    constructor(page) {
        this.page = page;
        this.priceEditor = page.getByRole('link', { name: 'Редактор цен' });
        this.newPrices = page.getByRole('button', { name: 'Редактировать цены' });
        this.projectSelection = page.locator('label').filter({ hasText: 'Тест SDA' });
        this.confirmation = page.getByRole('dialog').getByRole('button', { name: 'Редактировать цены' });
        this.cancellation = page.getByRole('button', { name: 'Отменить' });
        this.modalWindow = page.locator('article').filter({ hasText: 'Тест SDA' }).getByRole('button');
        this.delete = page.getByRole('button', { name: 'Удалить' });
    }

    async noDeletionPriceList(): Promise<void> {
        try {

            await this.page.waitForSelector('text="Редактор цен"');
            await this.priceEditor.click();
            await this.page.waitForTimeout(3000); // накинул время для прогрузки списка
            await this.page.waitForSelector('text="Редактировать цены"');
            await this.newPrices.click();
            

            const isProjectSelectionEnabled = await this.projectSelection.isEnabled(); // смотрим что ЖК активен и его можно выбрать

            if (isProjectSelectionEnabled) {
                await this.projectSelection.click();
                await this.page.waitForSelector('button:has-text("Редактировать цены")');
                await this.confirmation.click();

            } else {
                await this.deletionPricelist(); // Если элемент не активен, переход ко второму сценарию
            }

        } catch (error) {
            console.error('Ошибка:', error);
            await this.deletionPricelist();
        }
    }
    async deletionPricelist(): Promise<void> { // удаление

        await this.cancellation.click();
        await this.modalWindow.click();
        await this.delete.click();
        await this.noDeletionPriceList(); // Повторный запуск первого сценария после удаления
    }
}

