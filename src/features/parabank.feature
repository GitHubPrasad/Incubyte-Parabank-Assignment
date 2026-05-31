Feature: ParaBank User Account Management
  As a new user
  I want to register and login to ParaBank
  So that I can access my account and view my balance

  Background:
    Given I am on the ParaBank home page

  Scenario: TC01 - Successful user registration
    When I click on the Register link
    And I fill in the registration form with valid details
    And I click the Register button
    Then I should see a successful registration message

  Scenario: TC02 - Successful login with registered credentials
    When I login with valid username and password
    Then I should be redirected to the account overview page
    And I should see the welcome message

  Scenario: TC03 - Account balance is displayed after login
    When I login with valid username and password
    Then I should be redirected to the account overview page
    And the account balance should be displayed on the page
    And the balance amount should be logged to the console

 Scenario: TC04 - Registration with mismatched passwords should show error
    When I click on the Register link
    And I fill the form with mismatched passwords
    Then I should see a password mismatch error message

  Scenario: TC05 - Registration with empty form should show validation errors
    When I click on the Register link
    And I click the Register button without filling the form
    Then I should see validation error messages