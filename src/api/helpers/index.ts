import md5 from 'md5';

export function encodePassword(pw: string, opts = { salt: '', rounds: 0 }) {
  const salt = opts.salt || new Date().getTime();
  const rounds = opts.rounds || 10;

  let hashed = md5(pw + salt);

  for (let i = 0; i <= rounds; i++) {
    hashed = md5(hashed);
  }

  return `${salt}$${rounds}$${hashed}`;
}
