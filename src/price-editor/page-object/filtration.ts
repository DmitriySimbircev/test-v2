import { Page, Locator } from '@playwright/test'
export class FiltrationPage {

    public page: Page
    public filterButton: Locator
    public floorsFrom: Locator
    public floorsTo: Locator
    public selectRoominess: Locator
    public choiceRoominess: Locator
    public selectStatus: Locator
    public choiseStatus: Locator
    public applicationButton: Locator
    public resetButton: Locator
    public filteringAssertion: Locator

    constructor(page: Page) {
        this.page = page;
        this.filterButton = page.locator('button.ng-star-inserted:has-text("Фильтры")');
        this.floorsFrom = page.locator('input[placeholder="с "]');
        this.floorsTo = page.locator('input[placeholder="по "]');
        this.selectRoominess = page.locator('pb-multiselect:nth-child(2) > label > tui-multi-select > tui-hosted-dropdown > div > .t-input > .t-hosted > div > div > div');
        this.choiceRoominess = page.getByRole('option', { name: '3' });
        this.selectStatus = page.locator('pb-multiselect:nth-child(6) > label > tui-multi-select > tui-hosted-dropdown > div > .t-input > .t-hosted > div > div > div');
        this.choiseStatus = page.getByRole('option', { name: 'Свободно' });
        this.applicationButton = page.getByRole('button', { name: 'Применить' });
        this.resetButton = page.getByRole('button', { name: 'Сбросить' });
        this.filteringAssertion = page.locator('[data-index="14836376"]');
        

    }

    async clickfilterButton(): Promise<void> { // переход к фильтрам
        await this.filterButton.click();
    }
    async choiceOfFloor(): Promise<void> { // выбор этажа
        await this.floorsFrom.fill('1');
        await this.floorsTo.fill('1'); 
    }
    async choiceOfRoom(): Promise<void> { // выбор комнатности
        await this.selectRoominess.click();
        await this.choiceRoominess.click(); 
    }
    async choiceStatus(): Promise<void> { // выбор статуса
        await this.selectStatus.click();
        await this.choiseStatus.click(); 
        await this.applicationButton.click();
    }
    async checkFilterChess(): Promise<Locator> { // проверка фильтрации на Ш
        await this.filteringAssertion.waitFor(); 
        return this.filteringAssertion;
    }
    async resetFilter(): Promise<void> { // сброс фильтрации
        await this.filterButton.click();
        await this.resetButton.click();
        await this.applicationButton.click();
    }
    
}
/* 
Проверка работы фильтра на шахматке
*/
