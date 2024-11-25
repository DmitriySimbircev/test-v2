import { Page, Locator } from '@playwright/test';

export class CreatingPriceListPage { // у тебя тут есть и создание и удаление, кажется, что название неверное, думаю лучше PriceListsMainPage
    public page: Page;
    public priceEditorButton: Locator;
    public newPricesButton: Locator;
    public projectSelection: Locator;
    public confirmButton: Locator;
    public cancelButton: Locator;
    public modalWindow: Locator;
    public deleteButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.priceEditorButton = page.getByRole('link', { name: 'Редактор цен' });
        this.newPricesButton = page.getByRole('button', { name: 'Редактировать цены' }); // ИМХО кнопки лучше начать называть с глагола createNewPricesButton - что-то в этом духеы
        this.projectSelection = page.locator('label').filter({ hasText: process.env.PROJECT_NAME! });
        this.confirmButton = page.getByRole('dialog').getByRole('button', { name: 'Редактировать цены' });
        this.cancelButton = page.getByRole('button', { name: 'Отменить' });
        this.modalWindow = page.locator('article').filter({ hasText: process.env.PROJECT_NAME! }).getByRole('button');
        this.deleteButton = page.getByRole('button', { name: 'Удалить' });
    }

    async createPriceList(): Promise<void> { // лучше выдели открытие страницы в отдельный метод, потом же тебе наверняка надо будет использовать другие действия на странице: просмотр/редактирование/удаление -  каждый раз будешь открытие страницы зашивать внутрь нового метода? + у тебя в названии класса уже есть PriceList, как по мне лучше оставить просто названия create и delete
// лишние отсупы по файлам убрать
        await this.priceEditorButton.click(); 
        await this.page.waitForResponse(response => response.url().includes('/api/v4/json/house'))
        await this.newPricesButton.click();

        // Проверяем доступность выбора проекта
        if (await this.projectSelection.isEnabled()) {
            await this.projectSelection.click();
            await this.confirmButton.click();
        } 
        else {
            await this.deletePricelist();
        }
    }

    async deletePricelist(): Promise<void> { // этот метод публичный, попробуй его использовать не в контексте создания - не получится, во первых у тебя захардкожен ЖК на уровне локатора, а должен он передаваться из тела теста
        await this.cancelButton.click();
        await this.modalWindow.click();
        await this.deleteButton.click();
        await this.createPriceList(); // Переходим снова к созданию после удаления
    }
}
