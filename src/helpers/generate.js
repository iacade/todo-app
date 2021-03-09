export function* id(startValue = 1, maxValue = Number.MAX_SAFE_INTEGER) {
    let currentValue = startValue;

    while (currentValue <= maxValue) {
        const needStop = yield currentValue;

        if (needStop) {
            return currentValue;
        }

        ++currentValue;
    }
}
