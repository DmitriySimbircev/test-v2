import { test, expect } from '@playwright/test'
import { LoginPage } from './001-login'
import { CreatingPriceList} from './002-creatingPriceList'
import { Filtration } from './003-filtration'
import { ChangesPriceList } from './004-changesPriceList'
import { CheckPriceList } from './005-checkPriceList'
import { ListOfChanges } from './006-listOfChanges'
import { PublicationPriceList } from './007-publicationPriceList'

/*
0. Логин
1. Создание черновика
2. Применение фильтра 
3. Переключение на Шахматку+, выбор помещений (разными спосабами) и изменение цены. На один этаж увеличить на второй уменьшить на третий заменить
4. Переход на шахматку и проверка цен
5. Переход в список изменений, часть удаляется, часть редактируется, и изменяется цена на первичные значения.
6. Публикация и проверка 
Что сделать в будущем:
1.1 Добавить создание ЖК и дома что бы не быть привязаным к дому и стенду
1.2 Добавить проверки крит. изменения цены и изменение баз. стоимости
1.3 На подходе кастомные фильтры
*/

test('Редактор цен', async ({ page }) => {

    test.setTimeout(180000);

    const login = new LoginPage(page) // 001 авторизация
    await login.gotoLoginPage()
    await login.login()

    const selectionAndEditing = new CreatingPriceList(page) // 002 создание черновика 
    await selectionAndEditing.noDeletionPriceList()

    const filtration = new Filtration(page) // 003 проверка фильтрации на шахматке
    await filtration.filters()
    await filtration.floorSelection()
    await filtration.roomSelection()
    await filtration.statusSelection()
    const filteringAssertion = await filtration.checkChess(); 
    await expect(filteringAssertion).toHaveAttribute('data-filtered', 'true'); 
    await filtration.resetFiltering();

    const selectionOfPremises = new ChangesPriceList(page) // 004 изменение цен на Ш+
    await selectionOfPremises.switchToChess()
    await selectionOfPremises.oneFloor_()
    await selectionOfPremises.twoFloor_()
    await selectionOfPremises.threeFloor_()
    await selectionOfPremises.fourFloor_()
    await selectionOfPremises.fiveFloor_()

    const priceCheck = new CheckPriceList(page) // 005 проверка пересчета цены на Ш+
    await priceCheck.check()
    await priceCheck.allertReselection()

    const listOfChanges = new ListOfChanges(page) // 006 действия на странице списка изменений 
    await listOfChanges.changelogPage()
    await listOfChanges.selectionApartments()
    await listOfChanges.deletionApartmens()
    await listOfChanges.selectEntirePage()
    await listOfChanges.replacementPrice()
    await listOfChanges.publicationPrice()

    const publicationVerification = new PublicationPriceList(page) // 007 вкладка опубликовано, проверка публикации
    await publicationVerification.publishedPage()
    await publicationVerification.successAlert()
    await publicationVerification.checChess()

    const choice = await publicationVerification.checChess()
    await expect(choice).toHaveAttribute('data-selected', 'true') 
    await publicationVerification.followLinkInAlert()

})