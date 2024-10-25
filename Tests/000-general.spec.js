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
Что сделать:
1.1 Добавить создание ЖК и дома что бы не быть привязаным к дому 
1.2 Добавить проверки крит. изменения цены и изменение баз. стоимости
1.3 На подходе кастомные фильтры
*/

test('Редактор цен', async ({ page }) => {

    test.setTimeout(180000);

    const login = new LoginPage(page)
    await login.gotoLoginPage()
    await login.login()

    const selectionAndEditing = new CreatingPriceList(page)
    await selectionAndEditing.withoutDeletion()

    const filtration = new Filtration(page);
    const filteringAssertion = await filtration.filters();
    await expect(filteringAssertion).toHaveAttribute('data-filtered', 'true'); // Проверка фильтрации на шахматке
    await filtration.resetFiltering()

    const selectionOfPremises = new ChangesPriceList(page)
    await selectionOfPremises.switchToChess()
    await selectionOfPremises.oneFloor_()
    await selectionOfPremises.twoFloor_()
    await selectionOfPremises.threeFloor_()
    await selectionOfPremises.fourFloor_()
    await selectionOfPremises.fiveFloor_()

    const priceCheck = new CheckPriceList(page)
    await priceCheck.check()
    await priceCheck.allertReselection()

    const listOfChanges = new ListOfChanges(page)
    await listOfChanges.changesList()
    await listOfChanges.publicationPrice()

    const publicationVerification = new PublicationPriceList(page)
    await publicationVerification.verification_1()
    await publicationVerification.verification_2()
    await publicationVerification.verification_3()

    const choice = await publicationVerification.verification_3()
    await expect(choice).toHaveAttribute('data-selected', 'true') // проверка что помещения отмечены на шахматке 
    await publicationVerification.verification_4()

})