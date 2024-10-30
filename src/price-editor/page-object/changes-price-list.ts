import { Page, Locator } from '@playwright/test'
export class ChangesPriceListPage {

    public page: Page
    public chessSelect: Locator
    public chessPlus: Locator
    public oneFloor: Locator
    public changePrice_1: Locator
    public value_1: Locator
    public apply_1: Locator

    public twoFloor_1: Locator
    public twoFloor_2: Locator
    public changePrice_2: Locator
    public value_2: Locator
    public replaceSelect_1: Locator
    public decrease_1: Locator
    public apply_2: Locator

    public threeFloor: Locator
    public changePrice_3: Locator
    public replaceSelect_2: Locator
    public replace: Locator
    public value_3: Locator
    public apply_3: Locator

    public fourFloor: Locator
    public changePrice_4: Locator
    public procentSelect_1: Locator
    public procent_1: Locator
    public value_4: Locator
    public apply_4: Locator

    public fiveFloor: Locator
    public changePrice_5: Locator
    public decreaseSelect: Locator
    public decrease_2: Locator
    public procentSelect_2: Locator
    public procent_2: Locator
    public value_5: Locator
    public apply_5: Locator

    constructor(page: Page) {

        this.page = page;
        this.chessSelect = page.getByLabel('Шахматка [object Object]');
        this.chessPlus = page.getByRole('option', { name: 'Шахматка+' });
        this.oneFloor = page.locator('span').filter({ hasText: /^1$/ }).nth(1);
        this.changePrice_1 = page.getByRole('button', { name: 'Изменить цену' });
        this.value_1 = page.getByPlaceholder('Укажите значение');
        this.apply_1 = page.getByRole('button', { name: 'Изменить', exact: true });

        this.twoFloor_1 = page.getByText('Квартира 35 м²№4 1 Стоимость, ₽ 5 000 000 Цена');
        this.twoFloor_2 = page.getByText('Квартира 70 м²№6 3 Стоимость, ₽ 5 000 000 Цена');
        this.changePrice_2 = page.getByRole('button', { name: 'Изменить цену' });
        this.value_2 = page.getByPlaceholder('Укажите значение');
        this.replaceSelect_1 = page.getByLabel('Как изменяем Увеличить up');
        this.decrease_1 = page.getByRole('option', { name: 'Уменьшить' });
        this.apply_2 = page.getByRole('button', { name: 'Изменить', exact: true });

        this.threeFloor = page.locator('span').filter({ hasText: /^3$/ }).nth(1);
        this.changePrice_3 = page.getByRole('button', { name: 'Изменить цену' });
        this.replaceSelect_2 = page.getByLabel('Как изменяем Увеличить up');
        this.replace = page.getByRole('option', { name: 'Заменить' });
        this.value_3 = page.getByPlaceholder('Укажите значение');
        this.apply_3 = page.getByRole('button', { name: 'Изменить', exact: true });

        this.fourFloor = page.locator('span').filter({ hasText: /^4$/ }).nth(1);
        this.changePrice_4 = page.getByRole('button', { name: 'Изменить цену' });
        this.procentSelect_1 = page.getByLabel('Единица измерения ₽ absolute');
        this.procent_1 = page.getByRole('option', { name: '%' });
        this.value_4 = page.getByPlaceholder('Укажите значение');
        this.apply_4 = page.getByRole('button', { name: 'Изменить', exact: true });

        this.fiveFloor = page.locator('span').filter({ hasText: /^5$/ }).nth(1);
        this.changePrice_5 = page.getByRole('button', { name: 'Изменить цену' });
        this.decreaseSelect = page.getByLabel('Как изменяем Увеличить up');
        this.decrease_2 = page.getByRole('option', { name: 'Уменьшить' });
        this.procentSelect_2 = page.getByLabel('Единица измерения ₽ absolute');
        this.procent_2 = page.getByRole('option', { name: '%' });
        this.value_5 = page.getByPlaceholder('Укажите значение');
        this.apply_5 = page.getByRole('button', { name: 'Изменить', exact: true });

    }
    async switchToChess(): Promise<void> { // переход на Ш+
        await this.chessSelect.click()
        await this.chessPlus.click()
    }
    async changesOneFloor_(): Promise<void> { // изменение цены на 1 этаже
        await this.oneFloor.click()
        await this.changePrice_1.click()
        await this.value_1.fill('10000')
        await this.apply_1.click()
    }
    async changesTwoFloor_(): Promise<void> { // изменение цены на 2 этаже
        await this.twoFloor_1.click()
        await this.twoFloor_2.click()
        await this.changePrice_2.click()
        await this.value_2.fill('10000')
        await this.replaceSelect_1.click()
        await this.decrease_1.click()
        await this.apply_2.click()
    }
    async changesThreeFloor_(): Promise<void> { // изменение цены на 3 этаже
        await this.threeFloor.waitFor()
        await this.threeFloor.click()
        await this.changePrice_3.click()
        await this.replaceSelect_2.click()
        await this.replace.click()
        await this.value_3.fill('555555')
        await this.apply_3.click()
    }
    async changesFourFloor_(): Promise<void> { // изменение цены на 4 этаже
        await this.fourFloor.waitFor()
        await this.fourFloor.click()
        await this.changePrice_4.click()
        await this.procentSelect_1.click()
        await this.procent_1.click()
        await this.value_4.fill('5')
        await this.apply_4.click()
    }
    async changesFiveFloor_(): Promise<void> { // изменение цены на 5 этаже
        await this.fiveFloor.waitFor()
        await this.fiveFloor.click()
        await this.changePrice_5.click()
        await this.decreaseSelect.click()
        await this.decrease_2.click()
        await this.procentSelect_2.click()
        await this.procent_2.click()
        await this.value_5.fill('5')
        await this.apply_5.click()
    }

}
/* 
В тесте проходим по всем этажам и изменяем стоимость. 
На каждом этаже изменение идут разными способами (увеличение, уменьшение, замена цены) 
Выбор помещения осуществляется разными способами 
*/