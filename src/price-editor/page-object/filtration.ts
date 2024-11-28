import { Page, Locator } from '@playwright/test';

export class FiltrationPage {
    public page: Page;
    public filterButton: Locator;
    public floorsFrom: Locator;
    public floorsTo: Locator;
    public selectRoominess: Locator;
    public selectStatus: Locator;
    public applicationButton: Locator;
    public resetButton: Locator;
    public filteringAssertion: Locator;

    constructor(page: Page) {
        this.page = page;
        this.filterButton = page.getByRole('button', { name: 'Фильтры' });
        this.floorsFrom = page.getByPlaceholder('с ');
        this.floorsTo = page.getByPlaceholder('по ');
        this.selectRoominess = page.locator('pb-multiselect:nth-child(2) label tui-multi-select');
        this.selectStatus = page.locator('pb-multiselect:nth-child(6) label tui-multi-select');
        this.applicationButton = page.getByRole('button', { name: 'Применить' });
        this.resetButton = page.getByRole('button', { name: 'Сбросить' });
        this.filteringAssertion = page.locator('[data-index="14836376"]');
    }

    async openFiltering(): Promise<void> {
        await this.clickFilterButton();
    }

    private async clickFilterButton(): Promise<void> {
        await this.filterButton.click();
    }

    async chooseFloor({ from, to }: { from: string; to: string }): Promise<void> {
        await this.floorsFrom.fill(from);
        await this.floorsTo.fill(to);
    }

    async chooseRoom(roomNumber: string): Promise<void> {
        await this.selectRoominess.click();
        const roomOption = this.page.getByRole('option', { name: roomNumber });
        await roomOption.click();
    }

    async chooseStatus(status: string): Promise<void> {
        await this.selectStatus.click();
        const statusOption = this.page.getByRole('option', { name: status });
        await statusOption.click();
        await this.applicationButton.click();
        await this.page.waitForResponse(response =>
            response.url().includes('/api/v4/json/property'));
    }

    async checkFilterChess(): Promise<boolean> {
        await this.filteringAssertion.waitFor();
        const isFiltered = await this.filteringAssertion.getAttribute('data-filtered');
        return isFiltered === 'true';
    }
    
    async resetFilter(): Promise<void> {
        await this.clickFilterButton();
        await this.resetButton.click();
        await this.applicationButton.click();
    }
}