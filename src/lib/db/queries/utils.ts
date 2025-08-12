export function firstOrUndefined<T>(items: T[]) {
    if (items.length > 0) {
        return items[0];
    }

    return;
}
