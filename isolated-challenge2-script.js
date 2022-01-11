

/**
 * 
 * @param {Array<{user: string, bid: number}>} bids array of bids
 */
function generalizedSecondPriceAuction(bids) {
    if (!bids || bids.length == 0) {
        return 'No Winners';
    }
    const bidsSorted = bids.sort((a, b) => {
        if (a.bid != b.bid) { return b.bid - a.bid }
        return (a.firstName + a.lastName) > (b.firstName + b.lastName) ? 1 : -1
    });

    let results = bidsSorted.slice(1).reduce((prev, current) => {
        let prevCorrected = [...prev];
        prevCorrected[prevCorrected.length - 1]['Paid in USD'] = current.bid;
        return [...prevCorrected, current];
    }, [bidsSorted[0]])
    
    if (results.length > 1) {
        results[results.length - 1]['Paid in USD'] = 'Lost the auction'
    }
    else {
        results[0]['Paid in USD'] = 0;
    }
    return results.map(result => {delete result['bid']; return {...result}});
}


const bids = [
    {
        user: 'John Doe',
        bid: 100
    },
    {
        user: 'John Smith',
        bid: 500
    },
    {
        user: 'Sara Connor',
        bid: 280
    },
    {
        user: 'Martin Fowler',
        bid: 320
    }
]

console.log("ORIGINAL BIDS")
console.log(bids);

const gspResults = generalizedSecondPriceAuction(bids);
console.log("Generalized Second price bids")
console.log(gspResults)

