import { Page, Locator } from '@playwright/test'
export class CreatingPriceList { // все page object'ы называй ...Page - так понятнее. А если это какой-то модуль на странице, то стоит его отдельно в папочке хранить. Отдельно пейджы, отдельно модули и компоненты

    page: Page; // лучше явно прописывай модификаторы доступа, даже если это public
    priceEditor: Locator;
    newPrices: Locator; // везде где кнопка, лучше дописывай в название переменной это
    projectSelection: Locator;
    confirmation: Locator; // confirmButton
    cancellation: Locator;// cancelButton
    modalWindow: Locator; 
    delete: Locator; // deleteButton
    
    constructor(page) {
        this.page = page;
        this.priceEditor = page.getByRole('link', { name: 'Редактор цен' });
        this.newPrices = page.getByRole('button', { name: 'Редактировать цены' });
        this.projectSelection = page.locator('label').filter({ hasText: 'Тест SDA' }); // хардкод
        this.confirmation = page.getByRole('dialog').getByRole('button', { name: 'Редактировать цены' });
        this.cancellation = page.getByRole('button', { name: 'Отменить' });
        this.modalWindow = page.locator('article').filter({ hasText: 'Тест SDA' }).getByRole('button'); // хардкод
        this.delete = page.getByRole('button', { name: 'Удалить' }); 
    }

    async noDeletionPriceList(): Promise<void> { // название метода - всегда глагол
        try {

            await this.page.waitForSelector('text="Редактор цен"'); //  await this.priceEditor.waitFor(); - но и это избыточно
            await this.priceEditor.click();
            await this.page.waitForTimeout(3000); // накинул время для прогрузки списка - зачем?
            await this.page.waitForSelector('text="Редактировать цены"'); //  await this.newPrices.waitFor(); - но и это избыточно
            await this.newPrices.click();
            

            const isProjectSelectionEnabled = await this.projectSelection.isEnabled(); 

            if (isProjectSelectionEnabled) { // смотрим что ЖК активен и его можно выбрать
                await this.projectSelection.click();
                await this.page.waitForSelector('button:has-text("Редактировать цены")'); // избыточно
                await this.confirmation.click();

            } else {
                await this.deletionPricelist(); // Если элемент не активен, переход ко второму сценарию
            }

        } catch (error) { 
            console.error('Ошибка:', error); // try catch тут не нужен
            await this.deletionPricelist();
        }
    }
    async deletionPricelist(): Promise<void> { // название метода - всегда глагол

        await this.cancellation.click();
        await this.modalWindow.click();
        await this.delete.click();
        await this.noDeletionPriceList(); // Повторный запуск первого сценария после удаления - тут кажется вызов лишний - уже обговоривали
    }
}

