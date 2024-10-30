import { Page, Locator } from '@playwright/test'
export class CheckPriceListPage {
    page: Page
    public choiceOneFloor: Locator
    public choiceTwoFloor: Locator
    public choiceThreeFloor: Locator
    public choiceFourFloor: Locator
    public choiceFiveFloor: Locator
    public closeButton: Locator
    constructor(page: Page) {
        this.page = page;

        this.choiceOneFloor = page.getByText('+ 10 000 (0.2%)').first();
        this.choiceTwoFloor = page.getByText('-10 000 (-0.2%)').first();
        this.choiceThreeFloor = page.getByText('-4 444 445 (-88.89%)').first();
        this.choiceFourFloor = page.getByText('+ 250 000 (5%)').first();
        this.choiceFiveFloor = page.getByText('-250 000 (-5%)').first();
        this.closeButton = page.getByRole('button', { name: 'Убрать' });
    }
    async checkResult(): Promise<void> { // проходя каждый локатор, (каждый этаж) сверяем что пересчет цены был верным
        await this.choiceOneFloor.click()
        await this.choiceTwoFloor.click()
        await this.choiceThreeFloor.click()
        await this.choiceFourFloor.click()
        await this.choiceFiveFloor.click()
    }
    async checkAllertReselection(): Promise<void> { // закрытие аллерта о повторном выборе помещений 
        await this.closeButton.click()
    }
}
/* 
Не стал использовать expect т.к. проход по локаторам и так упадёт если не найдет их. 
В тесте мы проходим по значениям после измеения цен и сверяем значения на Шахматке+. 
Так же проверяем появление аллерта о повторном выборе помещений
*/
