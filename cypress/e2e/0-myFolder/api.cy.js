/// <reference types="cypress" />

import { host } from "../testData/endpoints";
import { endpoints } from "../testData/endpoints";
import { randoms } from "../utils/random";

describe(`Go Rest API`, () => {

    let arr = [];
    let userId = new Number;
    const access_token = '5d9aef4d4d0ffa0516c0b18110bc1410658c79da4a63fc05301951111aa80b7e';

    let newUser = {
        name: 'YuLee_' + randoms.getString(4),
        gender: "female",
        email: randoms.getString(8) + "_test@harakirimail.com",
    }

    it(`should Get All Users `, () => {
        cy.request('https://gorest.co.in/public/v2/users/').as('getUsers')
        cy.get('@getUsers')
            .then((response) => {
                expect(response.status).to.eq(200)
                arr = response.body.map(item => ({
                    name: item.name,
                    status: item.status
                }))
                console.log(arr)
                return arr
            })
    })

    it(`should create new user`, () => {
        cy.log(newUser.name)
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users/',
            headers: {
                'Content-Type': 'application/json', 
                Accept: 'application/json',
                Authorization: `Bearer ${access_token}`
            }, 
            body: {
                name: newUser.name,
                gender: "female",
                email: newUser.email,
                status: "active"
            },
        }).as('createUser')

        cy.get('@createUser')
            .then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body).to.have.property('name', newUser.name)
                expect(response.body).to.have.property('email', newUser.email)
                userId = response.body.id
                return userId
            })
        cy.log()
    })

    it(`should get created user `, () => {
        cy.request({
            method: 'GET', 
            url: `https://gorest.co.in/public/v2/users/${userId}`, 
            headers: {
                'Content-Type': 'application/json', 
                Accept: 'application/json',
                Authorization: `Bearer ${access_token}`
            }, 

        }).as('getUser')
        
        cy.get('@getUser')
            .then((response) => {
                expect(response.status).to.eq(200)
                return response.body
            })
    }); 

    it(`should delete created user `, () => {
        cy.request({
            method: 'DELETE', 
            url:  `https://gorest.co.in/public/v2/users/${userId}`, 
            headers: {
                'Content-Type': 'application/json', 
                Accept: 'application/json',
                Authorization: `Bearer ${access_token}`
            }, 

        }).as('deleteUser')
        
        cy.get('@deleteUser')
            .then((response) => {
                expect(response.status).to.eq(204)
                cy.log(response.body)
                return response.body
            })
    }); 


})