/// <reference types='cypress' />
let worker

describe('Web Tables page', () => {

  beforeEach(() => {
    cy.task('newWorker').then(newWorker => {
      worker = newWorker;
   });
    cy.visit('/');
    
  });
   
  it('The page should contain the pagination', () => {

    cy.get('.-pageInfo').should('contain.text', 'Page  of 1');
    cy.contains('[disabled]', 'Previous').should('contain', 'Previous');
    cy.contains('[disabled]', 'Next').should('contain', 'Next');
  });

  it('Should provide an ability to select rows count', () => {
    cy.get('select').select('5 rows').should('have.value', '5');

   cy.get('select').select('10 rows').should('have.value', '10');

  
   cy.get('select').select('25 rows').should('have.value', '25')

  });

  it('Should provide an ability to add new worker', () => {


   cy.contains('#addNewRecordButton', 'Add').click();
   cy.findByPlaceholder('First Name').type(worker.firstName);
   cy.findByPlaceholder('Last Name').type(worker.lastName);
   cy.findByPlaceholder('name@example.com').type(worker.email);
   cy.findByPlaceholder('Age').type(worker.age);
   cy.findByPlaceholder('Salary').type(worker.salary);
   cy.findByPlaceholder('Department').type(worker.department);
   cy.contains('#submit', 'Submit').click();
   cy.contains('.rt-tr', worker.firstName).should('contain', worker.firstName);
   cy.contains('.rt-tr', worker.lastName).should('contain', worker.lastName);
   cy.contains('.rt-tr', worker.age).should('contain', worker.age);
   cy.contains('.rt-tr', worker.salary).should('contain', worker.salary);
   cy.contains('.rt-tr', worker.department).should('contain', worker.department);

  })

  it('Should provide an ability to delete worker', () => {
    cy.contains('#addNewRecordButton', 'Add').click();
    cy.findByPlaceholder('First Name').type(worker.firstName);
    cy.findByPlaceholder('Last Name').type(worker.lastName);
    cy.findByPlaceholder('name@example.com').type(worker.email);
    cy.findByPlaceholder('Age').type(worker.age);
    cy.findByPlaceholder('Salary').type(worker.salary);
    cy.findByPlaceholder('Department').type(worker.department);
    cy.contains('#submit', 'Submit').click();

    cy.get('#delete-record-4').click();
    cy.contains('.rt-tr', worker.department).should('not.be.an', worker.department);
    cy.contains('.rt-tr', worker.firstName).should('not.exist');
    cy.contains('.rt-tr', worker.lastName).should('not.exist');

  })

  it('Should provide an ability to delete all workers', () => {

    cy.get('#delete-record-1').click();  
    cy.get('#delete-record-2').click();  
    cy.get('#delete-record-3').click();         
   
    cy.contains('.rt-noData', 'No rows found').should('contain.text', 'No rows found');
    
  })

  it('Should allow to find a worker in the search field and edit it.', () => {


    cy.contains('#addNewRecordButton', 'Add').click();
    cy.findByPlaceholder('First Name').type(worker.firstName);
    cy.findByPlaceholder('Last Name').type(worker.lastName);
    cy.findByPlaceholder('name@example.com').type(worker.email);
    cy.findByPlaceholder('Age').type(worker.age);
    cy.findByPlaceholder('Salary').type(worker.salary);
    cy.findByPlaceholder('Department').type(worker.department);
    cy.contains('#submit', 'Submit').click();

    cy.get('#searchBox').type(worker.firstName);
    cy.get('.rt-tr').should('contain', worker.firstName);

    cy.get('#searchBox').clear();
    cy.get('#searchBox').type(worker.lastName);
    cy.get('.rt-tr').should('contain', worker.lastName);

    cy.get('#searchBox').clear();
    cy.get('#searchBox').type(worker.email);
    cy.get('.rt-tr').should('contain', worker.email);

    cy.get('#searchBox').clear();
    cy.get('#searchBox').type(worker.age);
    cy.get('.rt-tr').should('contain', worker.age);

    cy.get('#searchBox').clear();
    cy.get('#searchBox').type(worker.salary);
    cy.get('.rt-tr').should('contain', worker.salary);

    cy.get('#searchBox').clear();
    cy.get('#searchBox').type(worker.department);
    cy.get('.rt-tr').should('contain', worker.department);


    cy.get('#edit-record-4').click();
    cy.findByPlaceholder('Salary').type(worker.salary);
    cy.findByPlaceholder('Department').type(worker.department);
       cy.contains('#submit', 'Submit').click();

    cy.contains('.rt-tr', worker.salary).should('contain', worker.salary);
    cy.contains('.rt-tr', worker.department).should('contain', worker.department);





  })
});
