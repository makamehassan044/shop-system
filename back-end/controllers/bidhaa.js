//REQUIRE MODEL
const { mauzo } = require(`${__dirname}/../models/mauzo`)
    //READING TEMPLETES
const fs = require('fs')
const card = fs.readFileSync(`${__dirname}/../../front-end/card.html`, 'utf8')
const overview = fs.readFileSync(`${__dirname}/../../front-end/overview.html`, 'utf8')
const product = fs.readFileSync(`${__dirname}/../../front-end/product.html`, 'utf8')
const form = fs.readFileSync("./form.html", 'utf8')
const { bidhaaReplacer } = require(`./replacement`)
    //CREATING DATE, DAY ....
let day = new Date();
const o = 0;
let ThatDay = {
    createdAt: `${day.getFullYear()}-${o}${day.getMonth()+1}-${day.getDate()}`,
    time: `${day.getHours()}:${day.getMinutes()}:${day.getSeconds()}`,
    discreptions: `All prices are in TZS`,
};

exports.wekaBidhaa = async(req, res) => {
    //MODIFYING QUERY

    try {
        let bidhaa = {...req.body, totalPrice: `${req.body.price}` * `${req.body.numOfCommoditySoldNow}`, ...ThatDay };

        //MATCHING NAMES AND ADDING THE numOfCommoditySoldNow
        const { numOfCommoditySoldNow: reqIdadi, name: reqName, date: reqDate, day: reqDay, time: reqTime } = bidhaa;
        console.log(reqIdadi, reqName, reqDate);
        let getDocs = await mauzo.find({ name: reqName })

        if (getDocs.length !== 0) {
            console.log(getDocs);
            const { _id, numOfCommoditySoldNow: dbIdadi, name: dbName, price: dbPrice, date: dbDate } = getDocs[0];
            console.log(dbIdadi, reqIdadi, "mpya");
            if (reqName === dbName && reqDate === dbDate) {
                console.log(dbIdadi, reqIdadi);
                const sum = dbIdadi * 1 + reqIdadi * 1;
                const product = sum * dbPrice;
                console.log(sum);
                const { numOfCommoditySoldNow, totalPrice } = await mauzo.findByIdAndUpdate(_id, { numOfCommoditySoldNow: sum, totalPrice: product }, {
                    new: true,
                    runValidators: true
                });
                let date1 = "UPDATED";
                let cash = "/=";
                let sales1 = " ";
                let total1 = `Hongera kwa leo idadi ya ${dbName} zilizouzwa mpaka sasa saa ${reqTime} ni ${numOfCommoditySoldNow} na jumla ya mauzo yake ni ${totalPrice}`;
                let totalSales1 = " ";
                let cardHtml = " ";


                let overviewHtml = overview.replace(/{%ITEMS%}/g, cardHtml);
                overviewHtml = overviewHtml.replace(/{%total_sales%}/g, totalSales1);
                overviewHtml = overviewHtml.replace(/{%SALES%}/g, sales1);
                overviewHtml = overviewHtml.replace(/{%TOTAL%}/g, total1);
                overviewHtml = overviewHtml.replace(/{%DATE%}/g, date1);
                overviewHtml = overviewHtml.replace(/{%CASH%}/g, cash);
                return res.end(overviewHtml)



            } else if (reqName !== dbName) {
                res.writeHead(200, {
                    'Content-type': 'text/html'
                });
                //WHY IT RETURNS A JSON
                const posted = await mauzo.create(bidhaa);
                let date1 = "CURRENT";
                let sales1 = "UPDATES";
                let total1 = "POSTED";
                let totalSales1 = "SUCCESSFULY"
                const cardHtml = posted.map(el => bidhaaReplacer(card, el)).join('\n');
                let overviewHtml = overview.replace(/{%ITEMS%}/g, cardHtml);
                overviewHtml = overviewHtml.replace(/{%total_sales%}/g, totalSales1);
                overviewHtml = overviewHtml.replace(/{%SALES%}/g, sales1);
                overviewHtml = overviewHtml.replace(/{%TOTAL%}/g, total1);
                overviewHtml = overviewHtml.replace(/{%DATE%}/, date1);
                return res.end(overviewHtml)


            }
        } else {

            const posted = await mauzo.create(bidhaa);
            let date1 = "YOU POSTED ";
            let cash = " "
            let sales1 = "THIS";
            let total1 = "POST";
            let totalSales1 = "SUCCESSFUL"
            const cardHtml = bidhaaReplacer(card, posted);
            let overviewHtml = overview.replace(/{%ITEMS%}/g, cardHtml);
            overviewHtml = overviewHtml.replace(/{%total_sales%}/g, totalSales1);
            overviewHtml = overviewHtml.replace(/{%SALES%}/g, sales1);
            overviewHtml = overviewHtml.replace(/{%TOTAL%}/g, total1);
            overviewHtml = overviewHtml.replace(/{%DATE%}/g, date1);
            overviewHtml = overviewHtml.replace(/{%CASH%}/g, cash);
            return res.end(overviewHtml)

        }
    } catch (e) {
        return res.status(200).json({
            massege: `Kuna tatizo bidhaa haijahifadhiwa ---> ${e}`
        })
    }
}

exports.leteBidhaaZote = async(req, res) => {
    try {

        res.writeHead(200, {
            'Content-type': 'text/html'
        });

        return res.end(form)
    } catch (e) {
        // res.status(200).json({
        //     massege: `Kuna tatizo bidhaa haijahifadhiwa ---> ${e}`
        // })
        console.log(e)
    }

}

exports.leteBidhaaHii = async(req, res) => {
        const date = req.body.date;
        console.log(req.body);

        //why day should not be string 
        let bidhaa = await mauzo.find({ createdAt: date });
        console.log(bidhaa)
        if (bidhaa.length === 0) {
            res.writeHead(404, {
                'Content-type': 'text/html'
            });
            let date1 = "FAILED";
            let cash = " ";
            let sales1 = " ";
            let total1 = `Samahani hakuna rekodi zozote katika siku hii ${date} itakua siku haijafika au hukurekodi chochote`
            let totalSales1 = " ";
            let cardHtml = " ";
            let overviewHtml = overview.replace(/{%ITEMS%}/g, cardHtml);
            overviewHtml = overviewHtml.replace(/{%total_sales%}/g, totalSales1);
            overviewHtml = overviewHtml.replace(/{%SALES%}/g, sales1);
            overviewHtml = overviewHtml.replace(/{%TOTAL%}/g, total1);
            overviewHtml = overviewHtml.replace(/{%DATE%}/g, date1);
            overviewHtml = overviewHtml.replace(/{%CASH%}/g, cash);
            return res.end(overviewHtml)

        } else {
            let totalSales = 0;
            bidhaa.forEach((el) => {
                    let price = el.totalPrice;
                    totalSales += price;
                })
                // bidhaa= bidhaa.map((el) =>{...el,totalSales:`${totalSales}`} )
                // bidhaa.push({ totalSales: `${totalSales}` })
            let cash = "/=";
            let SALES = "SALES";
            let TOTAL = "TOTAL SALES";
            const cardHtml = bidhaa.map(el => bidhaaReplacer(card, el)).join('\n');
            let overviewHtml = overview.replace(/{%ITEMS%}/g, cardHtml);
            overviewHtml = overviewHtml.replace(/{%total_sales%}/g, totalSales);
            overviewHtml = overviewHtml.replace(/{%SALES%}/g, SALES);
            overviewHtml = overviewHtml.replace(/{%TOTAL%}/g, TOTAL);
            overviewHtml = overviewHtml.replace(/{%DATE%}/, date);
            overviewHtml = overviewHtml.replace(/{%CASH%}/g, cash);
            res.writeHead(200, {
                'Content-type': 'text/html'
            });
            res.end(overviewHtml)

        }
    }
    // exports.mapato = async(req, res) => {
    //     const date = req.query.date;
    //     let mapato = 0;
    //     const bidhaa = await mauzo.find({ createdAt: date });
    //     if (bidhaa.length !== 0) {
    //         bidhaa.forEach((el) => {
    //             let price = el.totalPrice;
    //             mapato += price;
    //         })
    //         return res.status(200).json({
    //             massege: `Total sales ${mapato}/= Tzs`
    //         })
    //     } else {

//     }
// }

exports.zote = async(req, res) => {
    const hizi = await mauzo.find();
    res.writeHead(200, {
        "content-type": "application/json",
    })
    res.end(JSON.stringify(hizi))

    return JSON.stringify(hizi);

}