import { Page, Locator } from '@playwright/test'
export class Filtration {

    page: Page
    goToFilter: Locator
    floorsFrom: Locator
    floorsTo: Locator
    selectRoominess: Locator
    choiceRoominess: Locator
    selectStatus: Locator
    choiseStatus: Locator
    application_1: Locator
    reset1: Locator
    reset2: Locator
    application_2: Locator
    filteringAssertion: Locator

    constructor(page) {
        this.page = page;
        this.goToFilter = page.getByRole('button', { name: 'Фильтры' });
        this.floorsFrom = page.getByPlaceholder('с ');
        this.floorsTo = page.getByPlaceholder('по ');
        this.selectRoominess = page.locator('pb-multiselect:nth-child(2) > label > tui-multi-select > tui-hosted-dropdown > div > .t-input > .t-hosted > div > div > div > .t-wrapper > .t-absolute-wrapper');
        this.choiceRoominess = page.getByRole('option', { name: '3' });
        this.selectStatus = page.locator('pb-multiselect:nth-child(6) > label > tui-multi-select > tui-hosted-dropdown > div > .t-input > .t-hosted > div > div > div > .t-wrapper > .t-absolute-wrapper');
        this.choiseStatus = page.getByRole('option', { name: 'Свободно' });
        this.application_1 = page.getByRole('button', { name: 'Применить' });
        this.reset1 = page.getByRole('button', { name: 'Фильтры' });
        this.reset2 = page.getByRole('button', { name: 'Сбросить' });
        this.application_2 = page.getByRole('button', { name: 'Применить' });
        this.filteringAssertion = page.locator('[data-index="14836376"]');
        

    }

    async filters(): Promise<void> { // переход к фильтрам
        await this.page.waitForSelector('text="Фильтры"'); 
        await this.goToFilter.click();
    }
    async floorSelection(): Promise<void> { // выбор этажа
        await this.floorsFrom.fill('с 1');
        await this.floorsTo.fill('по 1'); 
    }
    async roomSelection(): Promise<void> { // выбор комнатности
        await this.selectRoominess.click();
        await this.choiceRoominess.click(); 
    }
    async statusSelection(): Promise<void> { // выбор статуса
        await this.selectStatus.click();
        await this.choiseStatus.click(); 
        await this.application_1.click();
    }
    async checkChess(): Promise<Locator> { // проверка фильтрации на Ш
        await this.page.waitForSelector('[data-index="14836376"]'); 
        return this.filteringAssertion;
    }
    async resetFiltering(): Promise<void> { // сброс фильтрации
        await this.reset1.click();
        await this.reset2.click();
        await this.application_2.click();
    }
    
}
/* 
Проверка работы фильтра на шахматке
*/
