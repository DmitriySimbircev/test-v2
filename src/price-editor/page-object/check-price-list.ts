import { Page, Locator } from '@playwright/test';

export class CheckPriceListPage {
    public page: Page;
    public closeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.closeButton = page.getByRole('button', { name: 'Убрать' });
    }

    getFloorChoiceLocator(text: string): Locator {
        return this.page.getByText(text).first();
    }
    
    async checkResult(expectedValues: string[]): Promise<void> {
        for (const value of expectedValues) {
            const floorChoice = this.getFloorChoiceLocator(value);
            await floorChoice.click();
        }
    }

    async checkAlertReselection(): Promise<void> {
        await this.closeButton.click();
    }
}