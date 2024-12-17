import { Page, Locator } from '@playwright/test';

export class ListOfChangesPage {
  private page: Page;
  private changesButton: Locator;
  private deleteButton: Locator;
  private allApartmentsSelect: Locator;
  private editPriceButton: Locator;
  private priceChangeSelect: Locator;
  private replaceValue: Locator;
  private priceValue: Locator;
  private changeButton: Locator;
  private publicationButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.changesButton = page.getByRole('button', { name: 'Список изменений' });
    this.deleteButton = page.getByRole('button', { name: 'Удалить' });
    this.allApartmentsSelect = page.getByLabel('Страница');
    this.editPriceButton = page.getByRole('button', { name: 'Редактировать цену' });
    this.priceChangeSelect = page.getByLabel('Как изменяем Увеличить up');
    this.replaceValue = page.getByRole('option', { name: 'Заменить' });
    this.priceValue = page.getByPlaceholder('Укажите значение');
    this.changeButton = page.getByRole('button', { name: 'Изменить' });
    this.publicationButton = page.getByRole('button', { name: 'Опубликовать' });
  }

  public async goToChangesPage(): Promise<void> {
    await this.changesButton.click();
  }

  public async chooseApartments(apartments: { floor: number; apartmentNumber: number }[]): Promise<void> {
    for (const apartment of apartments) {
      const apartmentLocator = this.page.getByLabel(`Этаж ${apartment.floor}, кв. ${apartment.apartmentNumber}`).nth(0); // убрал проверку цены, а этаж оставил 
      await apartmentLocator.click();
    }
  }
  
  public async deleteChoosenApartments(): Promise<void> { 
    await this.deleteButton.click();
    await this.page.waitForResponse((response) =>
      response.url().includes('/price-recalculation/api/price-lists/') && response.url().includes('houseId'));
  }

  public async selectAllApartmentsOnPage(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.allApartmentsSelect.click();
  }

  public async recountPrice(newPrice: number): Promise<void> {
    await this.editPriceButton.click();
    await this.priceChangeSelect.click();
    await this.replaceValue.click();
    await this.priceValue.fill(`${newPrice}`);
    await this.changeButton.click();
  }

  public async publishPrice(): Promise<void> {
    await this.publicationButton.click();
  }
}