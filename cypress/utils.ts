export function getByTestId(testId: string) {
  return cy.get(`[data-testid=${testId}]`)
}
