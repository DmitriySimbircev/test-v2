import { Page, Locator } from '@playwright/test'
export class ListOfChanges {

  page: Page
  changes: Locator
  room_1: Locator
  room_2: Locator
  room_3: Locator
  room_4: Locator
  room_5: Locator
  room_6: Locator
  deletion: Locator
  pageSelection: Locator
  editPrice: Locator
  replaceSelect: Locator
  replace: Locator
  value_1: Locator
  value_2: Locator
  apply: Locator
  publication: Locator

  constructor(page) {
    this.page = page;

    this.changes = page.getByRole('button', { name: 'Список изменений' })
    this.room_1 = page.getByLabel('Этаж 1, кв. 1 5 000 000→5 010')
    this.room_2 = page.getByLabel('Этаж 1, кв. 2 5 000 000→5 010')
    this.room_3 = page.getByLabel('Этаж 1, кв. 3 5 000 000→5 010')
    this.room_4 = page.getByLabel('Этаж 2, кв. 4 5 000 000→4 990')
    this.room_5 = page.getByLabel('Этаж 2, кв. 6 5 000 000→4 990')
    this.room_6 = page.getByLabel('Этаж 3, кв. 7 5 000 000→555')
    this.deletion = page.getByRole('button', { name: 'Удалить' })
    this.pageSelection = page.getByLabel('Страница')
    this.editPrice = page.getByRole('button', { name: 'Редактировать цену' })
    this.replaceSelect = page.getByLabel('Как изменяем Увеличить up')
    this.replace = page.getByRole('option', { name: 'Заменить' })
    this.value_1 = page.getByPlaceholder('Укажите значение')
    this.value_2 = page.getByPlaceholder('Укажите значение')
    this.apply = page.getByRole('button', { name: 'Изменить' })
    this.publication = page.getByRole('button', { name: 'Опубликовать' })
  }
  async changelogPage(): Promise<void> { // переход на страницу изменений
    await this.changes.click()
  }
  async selectionApartments(): Promise<void> { // точечно выбираем помещения
    await this.room_1.click()
    await this.room_2.click()
    await this.room_3.click()
    await this.room_4.click()
    await this.room_5.click()
    await this.room_6.click()
  }
  async deletionApartmens(): Promise<void> { // удаляем выбранные помещения
    await this.deletion.click()
  }
   async selectEntirePage(): Promise<void> { // после удаления выбираем чекбоксом всю старницу
    await this.page.waitForTimeout(2000)
    await this.pageSelection.click()
   }
   async replacementPrice(): Promise<void> { // делаем перерасчет ранее измененных помещений
    await this.editPrice.click()
    await this.replaceSelect.click()
    await this.replace.click()
    await this.value_1.click()
    await this.value_2.fill('5000000')
    await this.apply.click()
  }
  async publicationPrice(): Promise<void> { // публикум прайс
    await this.publication.click()
  }

}

