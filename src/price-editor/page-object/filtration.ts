import { Page, Locator } from '@playwright/test'
export class FiltrationPage { // посмотри https://stackoverflow.com/questions/33305954/typescript-export-vs-default-export
// пробелы - дальше уже не пишу
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
        this.filterButton = page.locator('button.ng-star-inserted:has-text("Фильтры")'); // ng-star-inserted - безполезный класс, есть везде в ангуляре, переделай тогда уж на на getByText
        this.floorsFrom = page.locator('input[placeholder="с "]'); // переделай тогда уж на на getByPlaceholder
        this.floorsTo = page.locator('input[placeholder="по "]');
        this.selectRoominess = page.locator('pb-multiselect:nth-child(2) > label > tui-multi-select > tui-hosted-dropdown > div > .t-input > .t-hosted > div > div > div'); // надо что-то делать так оставлять нельзя
        this.choiceRoominess = page.getByRole('option', { name: '3' }); // хардкод
        this.selectStatus = page.locator('pb-multiselect:nth-child(6) > label > tui-multi-select > tui-hosted-dropdown > div > .t-input > .t-hosted > div > div > div');
        this.choiseStatus = page.getByRole('option', { name: 'Свободно' }); // хардкод
        this.applicationButton = page.getByRole('button', { name: 'Применить' });
        this.resetButton = page.getByRole('button', { name: 'Сбросить' });
        this.filteringAssertion = page.locator('[data-index="14836376"]');
        

    }

    async clickfilterButton(): Promise<void> { // переход к фильтрам - лушче openFiltering - по тесту больше понятно
        await this.filterButton.click();
    }
    async choiceOfFloor(): Promise<void> { // выбор этажа choice - выбор (сущ.), choose - выбирать
        await this.floorsFrom.fill('1'); // хардкод
        await this.floorsTo.fill('1'); 
    }
    async choiceOfRoom(): Promise<void> { // выбор комнатности
        await this.selectRoominess.click();
        await this.choiceRoominess.click(); // хардкод
    }
    async choiceStatus(): Promise<void> { // выбор статуса
        await this.selectStatus.click();
        await this.choiseStatus.click(); 
        await this.applicationButton.click();
    }
    async checkFilterChess(): Promise<Locator> { // проверка фильтрации на Ш
        await this.filteringAssertion.waitFor(); 
        return this.filteringAssertion; // можешь проверять фильтрацию в методе , а возвращать true или false, а результат уже в expect
    }
    async resetFilter(): Promise<void> { // сброс фильтрации
        await this.filterButton.click(); // лишнее, лучше функцию вызывай
        await this.resetButton.click();
        await this.applicationButton.click();
    }
    
}
/* 
Проверка работы фильтра на шахматке - ты себе или мне оставляешь такие комменты?)
*/
