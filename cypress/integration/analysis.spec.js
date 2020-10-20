/// <reference types="cypress" />

/**
 * ANALYSIS VIEW
 * This view relies on component keyboard implementation
 * (component-chessboard module)
 */

const { INPUT_SELECTOR } = require('../constants');

const ARROW_SELECTOR = 'img.chessBoardArrow';
const E2E4_ARROW_SELECTOR = 'chess-board .arrows [data-arrow="e2e4"]';
const SQUARE_SELECTOR = 'chess-board [class^="highlight square-"][style*="background-color: rgb(235, 97, 80)"]';

context('Analysis page', () => {
  beforeEach(() => {
    cy.visit('https://www.chess.com/analysis')
    cy.wait(10000)
    cy
      .get('.ui_outside-close-component')
      .click();
  });

  it('highlights arrows and squares', function() {
    cy
      .get(ARROW_SELECTOR)
      .should('not.exist')

    cy
      .get(SQUARE_SELECTOR)
      .should('not.exist')

    cy
      .get(INPUT_SELECTOR)
      .should('have.value', '')

    cy
      .get(INPUT_SELECTOR)
      .type('e4')

    cy
      .get(E2E4_ARROW_SELECTOR)
      .should('exist')

    cy
      .get(INPUT_SELECTOR)
      .clear()
    cy
      .get(ARROW_SELECTOR)
      .should('not.exist')

    cy
      .get(INPUT_SELECTOR)
      .type('e2e4')

    cy
      .get(E2E4_ARROW_SELECTOR)
      .should('exist')

    cy
      .makeMove('e4')
      .makeMove('e5')
      .makeMove('Nc3')
      .makeMove('Nc6')
      .makeMove('Ne2')

    cy
      .get(SQUARE_SELECTOR)
      .should('have.length', 2)

    cy
      .get(INPUT_SELECTOR)
      .clear()
      .type('Nfe2')

    cy
      .get(SQUARE_SELECTOR)
      .should('not.exist')
  });
});