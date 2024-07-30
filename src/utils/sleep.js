export const sleep = (speedFactor) => {
    return new Promise((resolve) =>
        setTimeout((resolve), speedFactor))
}
