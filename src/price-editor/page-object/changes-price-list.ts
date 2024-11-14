import { Page, Locator } from '@playwright/test';

export class ChangesPriceListPage {
    public page: Page;
    public chessSelect: Locator;
    public chessPlus: Locator;
    public changePrice: Locator;
    public value: Locator;
    public apply: Locator;
    public firstSecondFloor: Locator;
    public secondSecondFloor: Locator;
    public clickSelect: Locator;
    public decrease: Locator;
    public replace: Locator;
    public unitsSelect: Locator;
    public procent: Locator;
    public sidePage: Locator

    constructor(page: Page) {
        this.page = page;
        this.chessSelect = page.getByLabel('Шахматка [object Object]');
        this.chessPlus = page.getByRole('option', { name: 'Шахматка+' });
        this.changePrice = page.getByRole('button', { name: 'Изменить цену' });
        this.value = page.getByPlaceholder('Укажите значение');
        this.apply = page.getByRole('button', { name: 'Изменить', exact: true });
        this.firstSecondFloor = page.getByText('Квартира 35 м²№4 1 Стоимость, ₽ 5 000 000 Цена');
        this.secondSecondFloor = page.getByText('Квартира 70 м²№6 3 Стоимость, ₽ 5 000 000 Цена');
        this.decrease = page.getByRole('option', { name: 'Уменьшить' });
        this.replace = page.getByRole('option', { name: 'Заменить' });
        this.unitsSelect = page.getByLabel('Единица измерения ₽ absolute');
        this.procent = page.getByRole('option', { name: '%' });
        this.clickSelect = page.getByLabel('Как изменяем Увеличить up');
        this.sidePage = page.locator('pr-property-price-change-form');
    }

    async switchToChess(): Promise<void> {
        await this.chessSelect.click();
        await this.chessPlus.click();
    }

    async changePriceOnFloor(floor: number, value: string, action: 'Уменьшить' | 'Заменить' | 'Увеличить' = 'Уменьшить', unit: '%' | '₽' = '₽'): Promise<void> {
        const floorLocator = this.page.locator('span').filter({ hasText: new RegExp(`^${floor}$`) }).nth(1);
        await floorLocator.click();
        await this.changePrice.click();

        if (action === 'Заменить') {
            await this.clickSelect.click();
            await this.replace.click();
        }
        else if (action === 'Увеличить') {
        }
        else {
            await this.clickSelect.click();
            await this.decrease.click();
        }

        await this.unitsSelect.click();
        if (unit === '%') await this.procent.click();

        await this.value.fill(value);
        await this.apply.click();
        await this.sidePage.waitFor({ state: 'detached' });
         
    }
}

