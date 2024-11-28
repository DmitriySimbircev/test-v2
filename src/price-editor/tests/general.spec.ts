import { test, expect, Locator } from '@playwright/test';
import {
    LoginPage,
    PriceListsMainPage,
    FiltrationPage,
    ChangesPriceListPage,
    CheckPriceListPage,
    ListOfChangesPage,
    PublicationPriceListPage,
} from '../page-object';

test('https://jira.abanking.ru/secure/Tests.jspa#/testCase/PBA-T353', async ({ page }) => {

    test.slow(); // тест длинный, стандартного времени не хватает

    const projectName = 'Тест SDA (не удалять не использовать)';

    const loginPage: LoginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login();

    const creatingPriceListPage: PriceListsMainPage = new PriceListsMainPage(page, projectName);
    await creatingPriceListPage.create();

    const filtrationPage: FiltrationPage = new FiltrationPage(page);
    await filtrationPage.openFiltering();
    await filtrationPage.chooseFloor({ from: '1', to: '3' });
    await filtrationPage.chooseRoom('3');
    await filtrationPage.chooseStatus('Свободно');
    const isFiltered = await filtrationPage.checkFilterChess();
    await expect(isFiltered).toBeTruthy();
    await filtrationPage.resetFilter();

    const changesPriceListPage = new ChangesPriceListPage(page);
    await changesPriceListPage.switchToChessPlus();
    await changesPriceListPage.changePriceOnFloor(1, '10000', 'Увеличить', '₽');
    await changesPriceListPage.changePriceOnFloor(2, '10000', 'Уменьшить', '₽');
    await changesPriceListPage.changePriceOnFloor(3, '555555', 'Заменить', '₽');
    await changesPriceListPage.changePriceOnFloor(4, '5', 'Увеличить', '%');
    await changesPriceListPage.changePriceOnFloor(5, '5', 'Уменьшить', '%');

    const checkPriceListPage = new CheckPriceListPage(page);
    await checkPriceListPage.checkResult([
        '+ 10 000 (0.2%)',
        '-10 000 (-0.2%)',
        '-4 444 445 (-88.89%)',
        '+ 250 000 (5%)',
        '-250 000 (-5%)',
    ]);
    await checkPriceListPage.checkAlertReselection();

    const listOfChangesPage: ListOfChangesPage = new ListOfChangesPage(page);
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
    await listOfChangesPage.selectEntirePage();
    await listOfChangesPage.recountPrice('5000000');
    await listOfChangesPage.publishPrice();

    const publicationPriceListPage: PublicationPriceListPage = new PublicationPriceListPage(page, projectName);
    await publicationPriceListPage.publishedPage();
    const successAlert = await publicationPriceListPage.checkAlert();
    await expect(successAlert).toHaveText('Изменения цен успешно опубликованы');
    const isSelected = await publicationPriceListPage.checkChess();
    await expect(isSelected).toBeTruthy();
    await publicationPriceListPage.followLinkInAlert();
});