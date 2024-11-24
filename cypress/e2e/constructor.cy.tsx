beforeEach(() => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
        fixture: 'ingredients.json'
    }).as('mockIngredients');
    cy.setCookie('accessToken', 'ACCESS_TOKEN');
    localStorage.setItem('refreshToken', 'REFRESH_TOKEN');
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', { fixture: 'user.json' }).as(
        'mockUser'
    );
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', { fixture: 'order.json' }).as(
        'mockOrder'
    );
    cy.visit('http://localhost:4000');
});
  
afterEach(() => {
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
});

describe('e2e тесты для страницы конструктора бургера (добавление ингредиентов)', () => {
    it('добавление ингредиентов в конструктор', () => {
        cy.get('[data-cy="main"]:first-of-type').children('button').click();
        cy.get('[data-cy="burgerConstructor"]').should('contain', 'Биокотлета из марсианской Магнолии');
        cy.get('[data-cy="sauce"]:first-of-type').children('button').click();
        cy.get('[data-cy="burgerConstructor"]').should('contain', 'Соус Spicy-X');
        cy.get('[data-cy="bun"]:first-of-type').children('button').click();
        cy.get('[data-cy="burgerConstructor"]').should('contain', 'Краторная булка N-200i');
    });
});

describe('e2e тесты для страницы конструктора бургера (проверка модальных окон)', () => {
    beforeEach(() => {
        cy.get('[data-cy="bun"]:first-of-type').click();
    });

    it('модальное окно открыто после его нажатия и после перезагрузки страницы', () => {
        cy.get('[data-cy="modal"]').should('be.visible');
        cy.reload(true);
        cy.get('[data-cy="modal"]').should('be.visible');
    });

    it('модальное окно закрыто после нажатия на кнопку закрыть', () => {
        cy.get('[data-cy="modalCloseButton"]').click();
        cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('модальное окно закрыто после нажатия на оверлей', () => {
        cy.get('[data-cy="modalOverlay"]').click({ force: true });
        cy.get('[data-cy="modal"]').should('not.exist');
    });
});

describe('e2e тесты для страницы конструктора бургера (создание заказа)', () => {
    it('should create order with chosen ingredients for auth user, open modal and clear constructor', () => {
        cy.get('[data-cy="bun"]:first-of-type').children('button').click();
        cy.get('[data-cy="main"]:first-of-type').children('button').click();
        cy.get('[data-cy="orderButton"]').should('be.enabled');

        cy.get('[data-cy="orderButton"]').click();
        cy.get('[data-cy="modal"]').should('be.visible');
        cy.get('[data-cy="orderNumber"]').should('contain.text', '52971');

        cy.get('[data-cy="modalCloseButton"]').click();
        cy.get('[data-cy="modal"]').should('not.exist');

        cy.get('[data-cy="burgerConstructor"]').should('not.contain', 'Биокотлета из марсианской Магнолии');
        cy.get('[data-cy="burgerConstructor"]').should('not.contain', 'Краторная булка N-200i');
    });
});