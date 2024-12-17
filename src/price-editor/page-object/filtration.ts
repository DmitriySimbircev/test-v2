import { Page, Locator } from '@playwright/test';

export enum RoomStatus {
    available = 'Свободно',
    reserved = 'Бронь',
    sold = 'Продано',
}

export class FiltrationPage {
    private page: Page;
    private filterButton: Locator;
    private floorsFrom: Locator;
    private floorsTo: Locator;
    private roominessSelect: Locator;
    private statusSelect: Locator;
    private applicationButton: Locator;
    private resetButton: Locator;
    private filteringAssertion: Locator;

    constructor(page: Page) {
        this.page = page;
        this.filterButton = page.getByRole('button', { name: 'Фильтры' });
        this.floorsFrom = page.getByPlaceholder('с ');
        this.floorsTo = page.getByPlaceholder('по ');
        this.roominessSelect = page.locator('[formcontrolname="roominess"]');
        this.statusSelect = page.locator('[formcontrolname="status"]');
        this.applicationButton = page.getByRole('button', { name: 'Применить' });
        this.resetButton = page.getByRole('button', { name: 'Сбросить' });
        this.filteringAssertion = page.locator('[data-index="14836376"]');
    }

    public async openFiltering(): Promise<void> {
        await this.filterButton.click();
    }

    public async chooseFloor({ from, to }: { from: number; to: number }): Promise<void> {
        await this.floorsFrom.fill(from.toString());
        await this.floorsTo.fill(to.toString());
    }

    public async chooseRoom(roomNumber: number): Promise<void> {
        await this.roominessSelect.click();
        const roomOption = this.page.getByRole('option', { name: roomNumber.toString() });
        await roomOption.click();
    }

    public async chooseStatus(status: RoomStatus): Promise<void> {
        await this.statusSelect.click();
        const statusOption = this.page.getByRole('option', { name: status });
        await statusOption.click();
        await this.applicationButton.click();
        await this.page.waitForResponse(response => response.url().includes('/api/v4/json/property'));
    }

    public async checkFilterChess(): Promise<boolean> {
        await this.filteringAssertion.waitFor();
        const isFiltered = await this.filteringAssertion.getAttribute('data-filtered');
        return isFiltered === 'true';
    }

    public async resetFilter(): Promise<void> {
        await this.filterButton.click();
        await this.resetButton.click();
        await this.applicationButton.click();
    }
}