exports.validateResponse = async (responseBody, comparedData) => {

    expect(responseBody.title).toBe(comparedData.title)
    expect(responseBody.description).toBe(comparedData.description)
    expect(responseBody.author).toBe(comparedData.author)
    expect(responseBody.img).toBeTruthy()
}

