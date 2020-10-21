function intervalConstruction(arr) {
    if (arr.length < 2 || arr.length > 3) {
        throw Error("Illegal number of elements in input array");
    }
    const noteNameValues = {
        'm2': {semitone: 1, degree: 2},
        'M2': {semitone: 2, degree: 2},
        'm3': {semitone: 3, degree: 3},
        'M3': {semitone: 4, degree: 3},
        'P4': {semitone: 5, degree: 4},
        'P5': {semitone: 7, degree: 5},
        'm6': {semitone: 8, degree: 6},
        'M6': {semitone: 9, degree: 6},
        'm7': {semitone: 10, degree: 7},
        'M7': {semitone: 11, degree: 7},
        'P8': {semitone: 12, degree: 8},
    }
    const inputArray = [...arr];
    let [inputInterval, startPosition, direction = 'asc'] = inputArray;

    let firstValue = startPosition.length === 1 ? startPosition : startPosition.split('').shift();

    const possibleAscValues = [{note: 'C', semitone: 2,}, {note: 'D', semitone: 2,}, {note: 'E', semitone: 1,}, {
        note: 'F',
        semitone: 2,
    }, {note: 'G', semitone: 2,}, {note: 'A', semitone: 2,}, {note: 'B', semitone: 1,}];
    const possibleDscValues = [{note: 'C', semitone: 1,}, {note: 'D', semitone: 2,}, {note: 'E', semitone: 2,}, {
        note: 'F',
        semitone: 1,
    }, {note: 'G', semitone: 2,}, {note: 'A', semitone: 2,}, {note: 'B', semitone: 2,}]

    const indexStart = possibleAscValues.findIndex(el =>
        el.note === firstValue
    )
// filter array to start from first given position
    const sortingArray = direction === 'asc' ? possibleAscValues.splice(indexStart).concat(possibleAscValues) :
        possibleDscValues.splice(0, indexStart + 1).reverse().concat(possibleDscValues.reverse());

    const indexEnd = inputInterval.split('')[1];


    const resultArr = sortingArray.slice(0, indexEnd);


    let semitonesQuantity = resultArr.reduce((accum, current, i, arr) =>
            i === arr.length - 1 ? accum : current.semitone + accum
        , 0);

    let calcLeftSemitone;

    if (direction === 'asc') {
        calcLeftSemitone = startPosition.length === 1 ? 0 : startPosition.endsWith('#') ? -1 : 1;

    } else if (direction === 'dsc') {

        calcLeftSemitone = startPosition.length === 1 ? 0 : startPosition.endsWith('b') ? -1 : 1;

    }

    let result;
    const noteName = resultArr[resultArr.length - 1].note;
    const finalSemitonesQuantity = semitonesQuantity + (calcLeftSemitone);
    let expectedSemitoneQuantity = noteNameValues[inputInterval].semitone - finalSemitonesQuantity;
    if (direction === 'asc') {
        expectedSemitoneQuantity === 0 ? result = noteName :
            expectedSemitoneQuantity >= 1 ? result = `${noteName}${'#'.repeat(Math.abs(expectedSemitoneQuantity))}` :
                result = `${noteName}${'b'.repeat(Math.abs(expectedSemitoneQuantity))}`;

    } else {
        expectedSemitoneQuantity === 0 ? result = noteName :
            expectedSemitoneQuantity >= 1 ? result = `${noteName}${'b'.repeat(Math.abs(expectedSemitoneQuantity))}` :
                result = `${noteName}${'#'.repeat(Math.abs(expectedSemitoneQuantity))}`;

    }
    return result;

}

function intervalIdentification(arr) {
    let intervalValues = {
        'm2': {semitone: 1, degree: 2},
        'M2': {semitone: 2, degree: 2},
        'm3': {semitone: 3, degree: 3},
        'M3': {semitone: 4, degree: 3},
        'P4': {semitone: 5, degree: 4},
        'P5': {semitone: 7, degree: 5},
        'm6': {semitone: 8, degree: 6},
        'M6': {semitone: 9, degree: 6},
        'm7': {semitone: 10, degree: 7},
        'M7': {semitone: 11, degree: 7},
        'P8': {semitone: 12, degree: 8},
    }
    const inputArray = [...arr];
    let [startPosition, finalPosition, direction = 'asc'] = inputArray;
    let firstValue = startPosition.length === 1 ? startPosition : startPosition.split('').shift();
    let secondValue = finalPosition.length === 1 ? finalPosition : finalPosition.split('').shift();

    const possibleAscValues = [{note: 'C', semitone: 2,}, {note: 'D', semitone: 2,}, {note: 'E', semitone: 1,}, {
        note: 'F',
        semitone: 2,
    }, {note: 'G', semitone: 2,}, {note: 'A', semitone: 2,}, {note: 'B', semitone: 1,}];
    const possibleDscValues = [{note: 'C', semitone: 1,}, {note: 'D', semitone: 2,}, {note: 'E', semitone: 2,}, {
        note: 'F',
        semitone: 1,
    }, {note: 'G', semitone: 2,}, {note: 'A', semitone: 2,}, {note: 'B', semitone: 2,}]

    const indexStart = possibleAscValues.findIndex(el =>
        el.note === firstValue
    )
// filter array to start from first given position
    const sortingArray = direction === 'asc' ? possibleAscValues.splice(indexStart).concat(possibleAscValues) :
        possibleDscValues.splice(0, indexStart + 1).reverse().concat(possibleDscValues.reverse());

    const indexEnd = sortingArray.findIndex(el =>
        el.note === secondValue
    )

    const resultArr = sortingArray.slice(0, indexEnd + 1);
    const degree = resultArr.length;
    let semitonesQuantity = resultArr.reduce((accum, current, i, arr) =>
            i === arr.length - 1 ? accum : current.semitone + accum
        , 0);

    let calcLeftSemitone = startPosition.length === 3 ? 2 : startPosition.length === 2 ? 1 : 0;
    let calcRightSemitone = finalPosition.length === 3 ? 2 : finalPosition.length === 2 ? 1 : 0;
    if (direction === 'asc') {
        calcLeftSemitone = startPosition.endsWith('#') ? -calcLeftSemitone : calcLeftSemitone;
        calcRightSemitone = finalPosition.endsWith('b') ? -calcRightSemitone : calcRightSemitone;
    } else if (direction === 'dsc') {

        calcLeftSemitone = startPosition.endsWith('b') ? -calcLeftSemitone : calcLeftSemitone;
        calcRightSemitone = finalPosition.endsWith('#') ? -calcRightSemitone : calcRightSemitone;
    }


    const finalSemitonesQuantity = semitonesQuantity + (calcLeftSemitone) + (calcRightSemitone);
    let interval;
    for (let key in intervalValues) {
        if (intervalValues[key].semitone === finalSemitonesQuantity && intervalValues[key].degree === degree) {
            interval = key;

        }
    }
    if (interval === undefined) {
        throw Error("Cannot identify the interval");
    }

    return interval;

}