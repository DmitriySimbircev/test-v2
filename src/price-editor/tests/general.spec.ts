import { test, expect } from '@playwright/test';
import {
    LoginPage,
    PriceListsMainPage,
    FiltrationPage, RoomStatus,
    ChangesPriceListPage, ActionType, UnitType,
    CheckPriceListPage,
    ListOfChangesPage,
    PublicationPriceListPage,
} from '../page-object';

test('https://jira.abanking.ru/secure/Tests.jspa#/testCase/PBA-T353', async ({ page }) => {

    test.slow();

    const PROJECT_NAME = 'Тест SDA (не удалять не использовать)';

    const loginPage = new LoginPage(page);
    await test.step('Страница авторизации', async () => {
        await loginPage.open();
        await loginPage.login();
        await loginPage.language();
    });

    const priceListsMainPage = new PriceListsMainPage(page);
    await test.step('Страница создания прайс листа', async () => {
        await priceListsMainPage.open();
        const isAlreadyCreated = await priceListsMainPage.isProjectHavePriceList(PROJECT_NAME);
        if (isAlreadyCreated) {
            await priceListsMainPage.delete(PROJECT_NAME);
        }
        await priceListsMainPage.create(PROJECT_NAME);
    });

    // Шаг 3: Фильтрация квартир
    const filtrationPage = new FiltrationPage(page);
    await test.step('Страница фильтрации', async () => {
        await filtrationPage.openFiltering();
        await filtrationPage.chooseFloor({ from: 1, to: 3 });
        await filtrationPage.chooseRoom(3);
        await filtrationPage.chooseStatus(RoomStatus.available);
        expect(await filtrationPage.checkFilterChess()).toBeTruthy();
        await filtrationPage.resetFilter();
    });

    // Шаг 4: Изменение цен на этажах
    const changesPriceListPage = new ChangesPriceListPage(page);
    await test.step('Страница изменения прайс листа', async () => {
        await changesPriceListPage.switchToChessPlus();
        await changesPriceListPage.changePriceOnFloor(1, 10000, ActionType.increase, UnitType.currency);
        await changesPriceListPage.changePriceOnFloor(2, 10000, ActionType.decrease, UnitType.currency);
        await changesPriceListPage.changePriceOnFloor(3, 555555, ActionType.replace, UnitType.currency);
        await changesPriceListPage.changePriceOnFloor(4, 5, ActionType.increase, UnitType.percent);
        await changesPriceListPage.changePriceOnFloor(5, 5, ActionType.decrease, UnitType.percent);
    });

    // Шаг 5: Проверка изменений в прайс-листе
    const checkPriceListPage = new CheckPriceListPage(page);
    await test.step('Страница проверки прайс листа', async () => {
        await checkPriceListPage.checkResult([
            '+ 10 000 (0.2%)',
            '-10 000 (-0.2%)',
            '-4 444 445 (-88.89%)',
            '+ 250 000 (5%)',
            '-250 000 (-5%)',
        ]);
        await checkPriceListPage.closeReselectAlert();
    });

    const listOfChangesPage = new ListOfChangesPage(page);
    await test.step('Страница списка изменений', async () => {
        await listOfChangesPage.goToChangesPage();
        const apartments = [
            { floor: 1, apartmentNumber: 1, priceChange: '5 000 000→5 010' },
            { floor: 1, apartmentNumber: 2, priceChange: '5 000 000→5 010' },
            { floor: 1, apartmentNumber: 3, priceChange: '5 000 000→5 010' },
            { floor: 2, apartmentNumber: 4, priceChange: '5 000 000→4 990' },
            { floor: 2, apartmentNumber: 6, priceChange: '5 000 000→4 990' },
            { floor: 3, apartmentNumber: 7, priceChange: '5 000 000→555' },
        ];
        await listOfChangesPage.chooseApartments(apartments);
        await listOfChangesPage.deleteChoosenApartments();
        await listOfChangesPage.selectAllApartmentsOnPage();
        await listOfChangesPage.recountPrice(5000000);
        await listOfChangesPage.publishPrice();
    });

    const publicationPriceListPage = new PublicationPriceListPage(page);
    await test.step('Страница опубликованых прайс листов', async () => {
        await publicationPriceListPage.goToPublishedPriceListsPage(PROJECT_NAME);
        const alertText = await publicationPriceListPage.getAlert();
        expect(alertText).toHaveText('Изменения цен успешно опубликованы');
        const isChessSelected = await publicationPriceListPage.checkChess();
        expect(isChessSelected).toBeTruthy();
        await publicationPriceListPage.followLinkInAlert();
        await expect(page).toHaveURL(/.*\/new\/prices/);
    });
});