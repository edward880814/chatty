import { rest } from 'msw';
import { existingUser, userJwt } from '@mocks/data/user.mock';

const BASE_URL = `${process.env.REACT_APP_BASE_ENDPOINT}/api/v1`;

export const signUpMock = rest.post(`${BASE_URL}/signup`, (req, res, ctx) => {
  const result = { message: 'User created successfully', user: existingUser, token: userJwt };
  return res(ctx.json(result));
});

export const authHandlers = [signUpMock];
