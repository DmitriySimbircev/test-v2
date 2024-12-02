import { Page, Locator } from '@playwright/test';

export class ChangesPriceListPage {
    public page: Page;
    public chessSelect: Locator; // советую всем локаторам, которые тебе в теле теста не нужны ставить модификаторы private или protected, чтобы подсказки по методам и свойстав были более лаконичные, ну и безопасность само-собой
    public chessPlus: Locator;
    public changePriceButton: Locator;
    public value: Locator;
    public applyButton: Locator;
    public priceChangeSelector: Locator; // Select - если это просто селекты
    public decrease: Locator;
    public replace: Locator;
    public unitSelector: Locator; // Select - если это просто селекты
    public percent: Locator;
    public sidePage: Locator

    constructor(page: Page) {
        this.page = page;
        this.chessSelect = page.getByLabel('Шахматка');
        this.chessPlus = page.getByRole('option', { name: 'Шахматка+' });
        this.changePriceButton = page.getByRole('button', { name: 'Изменить цену' });
        this.value = page.getByPlaceholder('Укажите значение');
        this.applyButton = page.getByRole('button', { name: 'Изменить', exact: true });
        this.decrease = page.getByRole('option', { name: 'Уменьшить' });
        this.replace = page.getByRole('option', { name: 'Заменить' });
        this.unitSelector = page.getByLabel('Единица измерения ₽ absolute');
        this.percent = page.getByRole('option', { name: '%' });
        this.priceChangeSelector = page.getByLabel('Как изменяем Увеличить up'); 
        this.sidePage = page.locator('pr-property-price-change-form');
    }

    async switchToChessPlus(): Promise<void> {
        await this.chessSelect.click();
        await this.chessPlus.click();
    }
    
    async changePriceOnFloor(floor: number, value: string, action: 'Уменьшить' | 'Заменить' | 'Увеличить', unit: '%' | '₽'): Promise<void> { // енамы добавить для action и unit
        const floorLocator = this.page.locator('span').filter({ hasText: new RegExp(`^${floor}$`) }).nth(1);
        await floorLocator.click();
        await this.changePriceButton.click();
        await this.priceChangeSelector.click();

        if (action === 'Заменить') { // через switch-case лучше
            await this.replace.click();
        }
        else if (action === 'Уменьшить') {
            await this.decrease.click();
        }
        await this.unitSelector.click();
        if (unit === '%') {
            await this.percent.click();
        }
        await this.value.fill(value);
        await this.applyButton.click();
        await this.page.waitForResponse(response =>
            response.url().includes('/price-recalculation/api/price-lists/') &&
            response.url().includes('/houses'));
        await this.sidePage.waitFor({ state: 'detached' });
    }
}