const tryCatcher = async (func: () => any) => {
    try {
        const data = await func()
        return [data, null]
    } catch (error) {
        return [null, error]
    }
}