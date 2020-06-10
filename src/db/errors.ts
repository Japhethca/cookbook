export class DoesNotExistError extends Error {
  constructor(m: string = 'Does not exist') {
    super(m);
  }
}

export class AlreadyExistsError extends Error {
  constructor(m: string = 'Already exists') {
    super(m);
  }
}
