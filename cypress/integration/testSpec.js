describe('Image Viewer Test',() => {
    context('Given I access to the viewer and view images', () => {
        beforeEach(() => {
            cy.visit('http://localhost:1234/')
        })
        it('Then Test viewer is launched',() => {
            cy.visit('http://localhost:1234/')
        })
        it('When image is viewed then With and Height of image are correct',() => {
            cy.get('.overlay').invoke('width').should('be.equal', 512);
            cy.get('.overlay').invoke('height').should('be.equal', 512);
        })
        it('When image is switched Then Image is available in less than 1s ',() => {
            const t0 = performance.now()
            cy.get('[style="transform: rotate(180deg);"]').click()
            cy.wrap(performance.now()).then(t1 => {
                expect(t1-t0).to.be.lessThan(1000)
            })
        })
        it('Then Only one viewport is available',() => {
            cy.get('head meta[name="viewport"]').should('have.length', 1)
        })
        it('When image is switched the next image can be viewed',() => {
            cy.get('.background[src]').then((firstImage) => {
                cy.get('[style="transform: rotate(180deg);"]').click()
                cy.get('.background[src]').then((nextImage) => {
                    expect(nextImage).not.to.equal(firstImage)
                })
            }) 
        })

        it('When image is switched Than all the images can be viewed',() => {
            cy.get('.background[src]').then((firstImage) => {
                let nextImage = firstImage
                while(nextImage !== (firstImage)){
                    cy.get('[style="transform: rotate(180deg);"]').click()
                    nextImage = cy.get('.background[src]')
                }
                expect(nextImage).to.equal(firstImage)
            }) 
        })
    })

    context('Given I am using the distance tool', () => {
        it('Then distance tool is available',() => {
            cy.get(cy.get('[src="./assets/distance-svgrepo-com.svg"]'))
        })
    })
})