import { Page, Locator } from '@playwright/test';

export class ListOfChangesPage {
  public page: Page;
  public changesButton: Locator;
  public deleteButton: Locator;
  public selectPaginatorPage: Locator;
  public editPriceButton: Locator;
  public priceChangeSelector: Locator;
  public replaceValue: Locator;
  public priceValue: Locator;
  public changeButton: Locator;
  public publicationButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.changesButton = page.getByRole('button', { name: 'Список изменений' });
    this.deleteButton = page.getByRole('button', { name: 'Удалить' });
    this.selectPaginatorPage = page.getByLabel('Страница');
    this.editPriceButton = page.getByRole('button', { name: 'Редактировать цену' });
    this.priceChangeSelector = page.getByLabel('Как изменяем Увеличить up');
    this.replaceValue = page.getByRole('option', { name: 'Заменить' });
    this.priceValue = page.getByPlaceholder('Укажите значение');
    this.changeButton = page.getByRole('button', { name: 'Изменить' });
    this.publicationButton = page.getByRole('button', { name: 'Опубликовать' });
  }

  getApartmentLocator(floor: number, apartmentNumber: number, priceChange: string): Locator {
    return this.page.getByLabel(`Этаж ${floor}, кв. ${apartmentNumber} ${priceChange}`).nth(0);
  }

async goToChangesPage(): Promise<void> {
    await this.changesButton.click();
  }

async chooseApartments(apartments: Array<{ floor: number; apartmentNumber: number; priceChange: string }>): Promise<void> {
    for (const { floor, apartmentNumber, priceChange } of apartments) {
      const apartmentLocator = this.getApartmentLocator(floor, apartmentNumber, priceChange);
      await apartmentLocator.click();
    }
  }

async deleteApartments(): Promise<void> {
    await this.deleteButton.click();
    await this.page.waitForResponse((response) =>
      response.url().includes('/price-recalculation/api/price-lists/') && response.url().includes('houseId')
    );
  }

async selectEntirePage(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.selectPaginatorPage.click();
  }

async recountPrice(newPrice: string): Promise<void> {
    await this.editPriceButton.click();
    await this.priceChangeSelector.click();
    await this.replaceValue.click();
    await this.priceValue.fill(newPrice);
    await this.changeButton.click();
  }
  
 async publishPrice(): Promise<void> {
    await this.publicationButton.click();
  }
}