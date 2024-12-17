import { Page, Locator } from '@playwright/test';

export enum ActionType {
    decrease = 'Уменьшить',
    replace = 'Заменить',
    increase = 'Увеличить',
}

export enum UnitType {
    percent = '%',
    currency = '₽',
}

export class ChangesPriceListPage {
    private page: Page;
    private chessSelect: Locator;
    private chessPlus: Locator;
    private changePriceButton: Locator;
    private value: Locator;
    private applyButton: Locator;
    private priceChangeSelect: Locator;
    private decrease: Locator;
    private replace: Locator;
    private unitSelect: Locator;
    private percent: Locator;
    private sidePage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.chessSelect = page.getByLabel('Шахматка');
        this.chessPlus = page.getByRole('option', { name: 'Шахматка+' });
        this.changePriceButton = page.getByRole('button', { name: 'Изменить цену' });
        this.value = page.getByPlaceholder('Укажите значение');
        this.applyButton = page.getByRole('button', { name: 'Изменить', exact: true });
        this.decrease = page.getByRole('option', { name: 'Уменьшить' });
        this.replace = page.getByRole('option', { name: 'Заменить' });
        this.unitSelect = page.getByLabel('Единица измерения ₽ absolute');
        this.percent = page.getByRole('option', { name: '%' });
        this.priceChangeSelect = page.getByLabel('Как изменяем Увеличить up');
        this.sidePage = page.locator('pr-property-price-change-form');
    }

    public async switchToChessPlus(): Promise<void> {
        await this.chessSelect.click();
        await this.chessPlus.click();
    }

    public async changePriceOnFloor(
        floor: number,
        value: number,
        action: ActionType,
        unit: UnitType
    ): Promise<void> {
        const floorLocator = this.page.locator('span').filter({ hasText: new RegExp(`^${floor}$`) }).nth(1);
        await floorLocator.click();
        await this.changePriceButton.click();
        await this.priceChangeSelect.click();

        switch (action) {
            case ActionType.decrease:
                await this.decrease.click();
                break;
            case ActionType.replace:
                await this.replace.click();
                break;
        }
        await this.unitSelect.click();

        if (unit === UnitType.percent) {
            await this.percent.click();
        }

        await this.value.fill(value.toString());
        await this.applyButton.click();

        await this.page.waitForResponse(response =>
            response.url().includes('/price-recalculation/api/price-lists/') && response.url().includes('/houses'));
        await this.sidePage.waitFor({ state: 'detached' });
    }
}