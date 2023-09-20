export function setCookie(name, value) {
  const expires = new Date();
  expires.setMonth(expires.getMonth() + 13);

  document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()}`;
}

export function getCookie(cookie) {
  for (const item of document.cookie.split(';')) {
    const [name, value] = item.split('=');
    if (name?.trim() === cookie) {
      return value;
    }
  }
  return null;
}
