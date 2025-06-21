export function parseRedisHash(hash: Record<string, string>) {
  return Object.entries(hash).reduce((acc, [key, value]) => {
    try {
      acc[key] = JSON.parse(value);
    } catch {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, any>);
}
