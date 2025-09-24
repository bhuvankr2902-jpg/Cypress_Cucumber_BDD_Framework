class BasePage_PO{

    navigate(){
        cy.fixture('config.json').then((data)=>{
            cy.visit(data.baseURL)
        })
    }





}export default BasePage_PO;