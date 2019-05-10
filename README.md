# delivery-docket

REST API for managing delivery dockets.

## Endpoint Documentation

| Endpoint  | Method | Usage | Action |  |
| --- | --- | --- | --- | --- |
| `dockets` | `GET` | Get a list of all dockets for a user | `DocketController.index`
| `dockets` | `POST` | Create a new docket | `DocketController.store`
| `dockets/:id` | `GET` | Get a specific docket |`DocketController.show`
| `dockets/:id` | `PATCH` | Update a docket | `DocketController.update`
| `dockets/:id` | `PUT` | Replace a docket entirely | `DocketController.update`
| `dockets/:id/lots` | `GET` | Get the lots for a specific docket | `LotController.index` | ¹ |
| `dockets/:id/lots` | `POST` | Create a lot on a docket | `LotController.store` |
| `users` | `GET` | Get a list of all users | `UserController.index`
| `users` | `POST` | Create a new user | `UserController.store` | ² |
| `users/:id` | `GET` | Get a specific user | `UserController.show`
| `users/:id` | `PATCH` | Update the user | `UserController.update`
| `login` | `POST` | Attempt to login | `LoginController.authenticate` | ² |

All routes are prepended with `/api/`. All docket responses include lots and the declaration.

There is no `logout` route, as the login does not create a session - it creates a stateless JWT which can simply be dropped by the client. There is no current way to patch or remove a specific lot. There are no endpoints for deleting or invalidating any entities. It is not possible to do `GET lots/:id` because lots are not an independent document, but a subdocument of dockets.

¹ The route `GET dockets/:id` will also include lots, making this largely redundant.

² These routes are not protected by any form of authentication. All other routes require an authenticated user.

## Installation and Setup

1. Clone this repository.
2. Run `npm install`
3. [Install mongodb](https://treehouse.github.io/installation-guides/mac/mongo-mac.html) and ensure that it is running with `mongod`.
4. Run the command `npm run serve` to start up the application.
5. Navigate to https://localhost:3050/api
6. Submit a post to the user post endpoint (code example below) using a tool such as [Postman](https://www.getpostman.com/)
7. Use the same email address and password to post to the authenticate route
8. The response to a successful authentication as above will contain a token. This token needs to be passed in as a header `Authorization: Bearer <token>` in all future requests. This can be saved globally in Postman.

It is critically important that the host can serve as HTTPS, as the JWT bearer token **must** be served over HTTPS. The application serves as https, but lacking certificates can create local issues. The following article may help: https://medium.freecodecamp.org/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec


## Usage

All endpoints get and return a **root named resource**. For example, the dockets endpoint:

```
{
  "dockets": [
    { ... },
    { ... },
    { ... }
  ]
}
```
Or the endpoint for a single docket:
```
{
  "docket": { ... }
}
```

`POST`, `PUT` and `PATCH` payloads must be made as JSON and must also include the resource key.

For example, to create a new user `POST /api/users/`:

```
{
  "user": {
    "name": "Matt Burgess",
    "email":"matt@example.com",
    "password":"test123"
  }
}
```

