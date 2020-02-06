function handleError(error) {
    console.log(error);
    throw new Error('Felló la operación')
}

module.exports = handleError;
