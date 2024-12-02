import { Page, Locator } from '@playwright/test';

export class PriceListsMainPage {
    public page: Page;
    public priceEditorButton: Locator;
    public createNewPricesButton: Locator;
    public projectSelection: Locator;
    public confirmButton: Locator;
    public cancelButton: Locator;
    public modalWindow: Locator;
    public deleteButton: Locator;

    constructor(page: Page, projectName: string) {
        this.page = page;
        this.priceEditorButton = page.getByRole('link', { name: 'Редактор цен' });
        this.createNewPricesButton = page.getByRole('button', { name: 'Редактировать цены' });
        this.projectSelection = page.locator('label').filter({ hasText: projectName }); // лучше передавай projectName в тело функций create и delete и задавай локатор там - он ведь у тебя больше нигде и не используется. Так у тебя будет универсальный класс, где ты можешь создать и удалить прайс лист с любым объектом
        this.modalWindow = page.locator('article').filter({ hasText: projectName }).getByRole('button');
        this.confirmButton = page.getByRole('dialog').getByRole('button', { name: 'Редактировать цены' });
        this.cancelButton = page.getByRole('button', { name: 'Отменить' });
        this.deleteButton = page.getByRole('button', { name: 'Удалить' });
    }

    async openPriceEditor(): Promise<void> {
        await this.priceEditorButton.click();
        await this.page.waitForResponse(response => response.url().includes('/api/v4/json/house'));
    }

    async create(): Promise<void> {
        await this.openPriceEditor();
        await this.createNewPricesButton.click();

        if (await this.projectSelection.isEnabled()) {
            await this.projectSelection.click();
            await this.confirmButton.click();
        } else { // тут вместо вызова метода delete рекомендовал бы сделать метод, который возвращал бы boolean значение - создан ли прайс лист для дома и если да, то в теле теста уже бы вызывал метод delete, а затем уже create. Старайся никогда не создавать циклических вызовов.
            await this.closeSitepage();
            await this.delete();
        }
    }

    async closeSitepage(): Promise<void> { // SidePage + тебе этот метод не понадобится если сделаешь, как я описал выше
        await this.cancelButton.click();
    }
    
    async delete(): Promise<void> {
        await this.modalWindow.click();
        await this.deleteButton.click();
        await this.create();
    }
}