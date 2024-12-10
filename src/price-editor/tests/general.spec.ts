import {
    test, expect, Locator,
    LoginPage,
    PriceListsMainPage,
    FiltrationPage,RoomStatus,
    ChangesPriceListPage, ActionType, UnitType,
    CheckPriceListPage,
    ListOfChangesPage,
    PublicationPriceListPage,
} from '../page-object';

test('https://jira.abanking.ru/secure/Tests.jspa#/testCase/PBA-T353', async ({ page }) => {

    test.slow();

    const projectName = 'Тест SDA (не удалять не использовать)';

    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login();

    const priceListsMainPage = new PriceListsMainPage(page);
    await priceListsMainPage.open();
    const isAlreadyCreated = await priceListsMainPage.isProjectHavePriceList(projectName);
    if (isAlreadyCreated) {
        await priceListsMainPage.delete(projectName);
    }
    await priceListsMainPage.create(projectName);

    const filtrationPage = new FiltrationPage(page);
    await filtrationPage.openFiltering();
    await filtrationPage.chooseFloor({ from: 1, to: 3 });
    await filtrationPage.chooseRoom(3);
    await filtrationPage.chooseStatus(RoomStatus.Available);
    expect(await filtrationPage.checkFilterChess()).toBeTruthy();
    await filtrationPage.resetFilter();

    const changesPriceListPage = new ChangesPriceListPage(page);
    await changesPriceListPage.switchToChessPlus();
    await changesPriceListPage.changePriceOnFloor(1, '10000', ActionType.Increase, UnitType.Currency);
    await changesPriceListPage.changePriceOnFloor(2, '10000', ActionType.Decrease, UnitType.Currency);
    await changesPriceListPage.changePriceOnFloor(3, '555555', ActionType.Replace, UnitType.Currency);
    await changesPriceListPage.changePriceOnFloor(4, '5', ActionType.Increase, UnitType.Percent);
    await changesPriceListPage.changePriceOnFloor(5, '5', ActionType.Decrease, UnitType.Percent);

    const checkPriceListPage = new CheckPriceListPage(page);
    await checkPriceListPage.checkResult([
        '+ 10 000 (0.2%)',
        '-10 000 (-0.2%)',
        '-4 444 445 (-88.89%)',
        '+ 250 000 (5%)',
        '-250 000 (-5%)',
    ]);  
    await checkPriceListPage.closeReselectAlert();

    const listOfChangesPage = new ListOfChangesPage(page);
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
    await listOfChangesPage.deleteApartments();
    await listOfChangesPage.selectAllApartmentsOnPage();
    await listOfChangesPage.recountPrice(5000000);
    await listOfChangesPage.publishPrice();

    const publicationPriceListPage = new PublicationPriceListPage(page);
    await publicationPriceListPage.goToPublishedPriceListsPage(projectName);
    const alertText = await publicationPriceListPage.checkAlert();
    expect(alertText).toHaveText('Изменения цен успешно опубликованы');
    const isChessSelected = await publicationPriceListPage.checkChess();
    expect(isChessSelected).toBeTruthy();
    await publicationPriceListPage.followLinkInAlert();
    await expect(page).toHaveURL(/.*\/new\/prices/);
});