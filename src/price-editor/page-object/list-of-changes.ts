import { Page, Locator } from '@playwright/test'
export class ListOfChangesPage {

  public page: Page
  public changesButton: Locator
  public oneRoom: Locator
  public twoRoom: Locator
  public threRoom: Locator
  public fourRoom: Locator
  public fiveRoom: Locator
  public sixRoom: Locator
  public deleteButton: Locator
  public pageSelection: Locator
  public editPriceButton: Locator
  public replaceSelect: Locator
  public replace: Locator
  public value: Locator
  public changeButton: Locator
  public publicationButton: Locator

  constructor(page: Page) {
    this.page = page;

    this.changesButton = page.getByRole('button', { name: 'Список изменений' })
    this.oneRoom = page.getByLabel('Этаж 1, кв. 1 5 000 000→5 010')
    this.twoRoom = page.getByLabel('Этаж 1, кв. 2 5 000 000→5 010')
    this.threRoom = page.getByLabel('Этаж 1, кв. 3 5 000 000→5 010')
    this.fourRoom = page.getByLabel('Этаж 2, кв. 4 5 000 000→4 990')
    this.fiveRoom = page.getByLabel('Этаж 2, кв. 6 5 000 000→4 990')
    this.sixRoom = page.getByLabel('Этаж 3, кв. 7 5 000 000→555')
    this.deleteButton = page.getByRole('button', { name: 'Удалить' })
    this.pageSelection = page.getByLabel('Страница')
    this.editPriceButton = page.getByRole('button', { name: 'Редактировать цену' })
    this.replaceSelect = page.getByLabel('Как изменяем Увеличить up')
    this.replace = page.getByRole('option', { name: 'Заменить' })
    this.value = page.getByPlaceholder('Укажите значение')
    this.changeButton = page.getByRole('button', { name: 'Изменить' })
    this.publicationButton = page.getByRole('button', { name: 'Опубликовать' })
  }
  async changesPage(): Promise<void> { // переход на страницу изменений
    await this.changesButton.click()
  }
  async choiceApartments(): Promise<void> { // точечно выбираем помещения
    await this.oneRoom.click()
    await this.twoRoom.click()
    await this.threRoom.click()
    await this.fourRoom.click()
    await this.fiveRoom.click()
    await this.sixRoom.click()
  }
  async deletionApartmens(): Promise<void> { // удаляем выбранные помещения
    await this.deleteButton.click()
    
    await this.page.waitForResponse(response =>
      response.url().includes('/price-recalculation/api/price-lists/') && response.url().includes('houseId')
    );
  
  }
  async selectEntirePage(): Promise<void> { // после удаления выбираем чекбоксом всю старницу
    await this.page.waitForLoadState('domcontentloaded')
    await this.pageSelection.click()
  }
  async replacementPrice(): Promise<void> { // делаем перерасчет ранее измененных помещений
    await this.editPriceButton.click()
    await this.replaceSelect.click()
    await this.replace.click()
    await this.value.click()
    await this.value.fill('5000000')
    await this.changeButton.click()
  }
  async publicationPrice(): Promise<void> { // публикум прайс
    await this.publicationButton.click()
  }

}

