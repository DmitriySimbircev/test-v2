import { Page, Locator } from '@playwright/test';

export class CheckPriceListPage {
    private page: Page;
    private closeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.closeButton = page.getByRole('button', { name: 'Убрать' });
    }

    public async checkResult(expectedValues: string[]): Promise<void> {
        for (const value of expectedValues) {
            const checkPriceChanges = this.page.getByText(value).first();
            await checkPriceChanges.click();
        }
    }

    public async closeReselectAlert(): Promise<void> {
        await this.closeButton.click();
    }
}