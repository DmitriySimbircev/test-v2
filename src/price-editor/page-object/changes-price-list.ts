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
        this.chessSelect = page.getByLabel('Шахматка [object Object]'); // [object Object] - убери, без него вроде должен найти
        this.chessPlus = page.getByRole('option', { name: 'Шахматка+' });
        this.changePrice = page.getByRole('button', { name: 'Изменить цену' }); // changePriceButton
        this.value = page.getByPlaceholder('Укажите значение');
        this.apply = page.getByRole('button', { name: 'Изменить', exact: true }); // не забываем про Button
        this.firstSecondFloor = page.getByText('Квартира 35 м²№4 1 Стоимость, ₽ 5 000 000 Цена'); // firstSecondFloor и secondSecondFloor - чзх? тут и название и локаторы...
        this.secondSecondFloor = page.getByText('Квартира 70 м²№6 3 Стоимость, ₽ 5 000 000 Цена');
        this.decrease = page.getByRole('option', { name: 'Уменьшить' });
        this.replace = page.getByRole('option', { name: 'Заменить' });
        this.unitsSelect = page.getByLabel('Единица измерения ₽ absolute'); // тоже кажется лишего захватил
        this.procent = page.getByRole('option', { name: '%' }); // percent
        this.clickSelect = page.getByLabel('Как изменяем Увеличить up'); // тоже кажется лишего захватил
        this.sidePage = page.locator('pr-property-price-change-form'); 
    }

    async switchToChess(): Promise<void> { // по названию как будто просто на шахматку обычную переходишь
        await this.chessSelect.click();
        await this.chessPlus.click();
    }

    // почему именно по этажу? Ты можешь изменять цены на отдельных помещениях еще... Можно сделать несколько функций, а лучше 1 по выбору помещений для изменения и 1 функцию для конкретного изменения в сайдпейдже. Посмотри на досуге принцип единой ответственности в ООП
    async changePriceOnFloor(floor: number, value: string, action: 'Уменьшить' | 'Заменить' | 'Увеличить' = 'Уменьшить', unit: '%' | '₽' = '₽'): Promise<void> { // зачем тут значения по дефолту?
        const floorLocator = this.page.locator('span').filter({ hasText: new RegExp(`^${floor}$`) }).nth(1); // молодец
        await floorLocator.click();
        await this.changePrice.click();

        if (action === 'Заменить') {
            await this.clickSelect.click(); // общий шаг, можно вынести из условий
            await this.replace.click();
        }

        else if (action === 'Увеличить') { // выглядит плохо, сделай лучше switch case тогда с теми, которые используешь
        }

        else {
            await this.clickSelect.click();
            await this.decrease.click();
        }

        await this.unitsSelect.click();
        if (unit === '%') await this.procent.click(); 

        await this.value.fill(value);
        await this.apply.click();

        await this.page.waitForResponse(response =>
            response.url().includes('/price-recalculation/api/price-lists/') &&
            response.url().includes('/houses'));

        await this.sidePage.waitFor({ state: 'detached' });
        // лишние пустые строки
    }
}

