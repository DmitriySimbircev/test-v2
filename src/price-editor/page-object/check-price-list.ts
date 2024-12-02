import { Page, Locator } from '@playwright/test';

export class CheckPriceListPage {
    public page: Page;
    public closeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.closeButton = page.getByRole('button', { name: 'Убрать' });
    }

    getFloorChoiceLocator(text: string): Locator { // зачем отдельный метод? Избыточно
        return this.page.getByText(text).first();
    }
    
    async checkResult(expectedValues: string[]): Promise<void> { // проставь еще всем локаторам модификаторы public, private и т.д.
        for (const value of expectedValues) {
            const floorChoice = this.getFloorChoiceLocator(value); // название переменной не очень
            await floorChoice.click();
        }
    }

    async checkAlertReselection(): Promise<void> { // логическая какая-то ошибка, название check, а по факту закрыть что-то...
        await this.closeButton.click();
    }
}