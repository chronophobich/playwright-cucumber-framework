Feature: EMI Calculator

  Scenario: Validate Home Loan EMI - Scenario A
    Given I launch the EMI Calculator application
    When I navigate to the Home Loan tab
    And I enter loan amount "2500000"
    And I enter interest rate "10"
    And I enter tenure "10"
    Then the EMI should be calculated correctly
    And the pie chart should be visible
    And the pie chart values should be greater than zero

  Scenario: Validate Home Loan EMI - Scenario B
    Given I launch the EMI Calculator application
    When I navigate to the Home Loan tab
    And I enter loan amount "5000000"
    And I enter interest rate "7.5"
    And I enter tenure "15"
    Then the EMI should be calculated correctly
    And the pie chart should be visible
    And the pie chart values should be greater than zero

  Scenario: Validate Personal Loan EMI Bar Chart
    Given I launch the EMI Calculator application
    When I navigate to the Personal Loan tab
    And I enter personal loan amount "1000000"
    And I enter personal loan interest "12"
    And I enter personal loan tenure "5"
    And I select the schedule month
    Then the bar chart should be visible
    And the bar count should be greater than zero
    And the tooltip should display valid values