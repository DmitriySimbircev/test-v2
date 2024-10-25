import { Page, Locator } from '@playwright/test'
export class ChangesPriceList {

    page: Page
    chessSelect: Locator
    chessPlus: Locator
    oneFloor: Locator
    changePrice_1: Locator
    value_1: Locator
    apply_1: Locator

    twoFloor_1: Locator
    twoFloor_2: Locator
    changePrice_2: Locator
    value_2: Locator
    replaceSelect_1: Locator
    decrease_1: Locator
    apply_2: Locator

    threeFloor: Locator
    changePrice_3: Locator
    replaceSelect_2: Locator
    replace: Locator
    value_3: Locator
    apply_3: Locator

    fourFloor: Locator
    changePrice_4: Locator
    procentSelect_1: Locator
    procent_1: Locator
    value_4: Locator
    apply_4: Locator

    fiveFloor: Locator
    changePrice_5: Locator
    decreaseSelect: Locator
    decrease_2: Locator
    procentSelect_2: Locator
    procent_2: Locator
    value_5: Locator
    apply_5: Locator

    constructor(page) {

        this.page = page;
        this.chessSelect = page.getByLabel('Шахматка [object Object]');
        this.chessPlus = page.getByRole('option', { name: 'Шахматка+' });
        this.oneFloor = page.locator('span').filter({ hasText: /^1$/ }).nth(1);
        this.changePrice_1 = page.getByRole('button', { name: 'Изменить цену' });
        this.value_1 = page.getByPlaceholder('Укажите значение');
        this.apply_1 = page.getByRole('button', { name: 'Изменить', exact: true });

        this.twoFloor_1 = page.getByText('Квартира 35 м²№4 1 Стоимость, ₽ 5 000 000 Цена, ₽/м² NaN');
        this.twoFloor_2 = page.getByText('Квартира 70 м²№6 3 Стоимость, ₽ 5 000 000 Цена, ₽/м² NaN');
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
    async switchToChess(): Promise<void> {
        await this.chessSelect.click()
        await this.chessPlus.click()
    }
    async oneFloor_(): Promise<void> {
        await this.oneFloor.click()
        await this.changePrice_1.click()
        await this.value_1.fill('10000')
        await this.apply_1.click()
    }
    async twoFloor_(): Promise<void> {
        await this.twoFloor_1.click()
        await this.twoFloor_2.click()
        await this.changePrice_2.click()
        await this.value_2.fill('10000')
        await this.replaceSelect_1.click()
        await this.decrease_1.click()
        await this.apply_2.click()
    }
    async threeFloor_(): Promise<void> {
        await this.page.waitForTimeout(1000)
        await this.threeFloor.click()
        await this.changePrice_3.click()
        await this.replaceSelect_2.click()
        await this.replace.click()
        await this.value_3.fill('555555')
        await this.apply_3.click()
    }
    async fourFloor_(): Promise<void> {
        await this.page.waitForTimeout(1000)
        await this.fourFloor.click()
        await this.changePrice_4.click()
        await this.procentSelect_1.click()
        await this.procent_1.click()
        await this.value_4.fill('5')
        await this.apply_4.click()
    }
    async fiveFloor_(): Promise<void> {
        await this.page.waitForTimeout(1000)
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