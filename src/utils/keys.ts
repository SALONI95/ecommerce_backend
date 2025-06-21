// file to create key name for redis
export function getKeyName(...args: string[]) {
  return `ecommerce:${args.join(":")}`;
}

export const productById = (id: string) => getKeyName("products", id);
