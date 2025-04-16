import { Request, Response } from "express"
import enforceAuth from "./enforce-auth"
import { StatusCodes } from "http-status-codes"
import AppError from "../errors/app-error"
import { sign } from "jsonwebtoken"
import user from "../model/user"
import config from "config"
describe('enforce-auth middleware tests', () => {
    test('calls next with a 401 error when no authorization header is provided', () => {
        const request = { headers: {} } as Request
        const response = {} as Response
        const next = jest.fn(err => {})
        enforceAuth(request, response, next)
        expect(next.mock.calls.length).toBe(1)
        expect(next.mock.calls[0][0]).toEqual(new AppError(StatusCodes.UNAUTHORIZED, 'Invalid authorization header'))
    })
    test('success when all is valid', () => {
        const jwt = sign({}, config.get<string>('app.jwtSecret'))
        const request = { headers: {
            authorization: `Bearer ${jwt}` 
        } } as Request
        const response = {} as Response
        const next = jest.fn(err => {})
        enforceAuth(request, response, next)
        expect(next.mock.calls.length).toBe(1)
        expect(next.mock.calls[0][0]).toBeUndefined()
    })


})