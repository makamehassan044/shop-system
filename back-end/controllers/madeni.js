const fs = require('fs');
const { deni } = require(`${__dirname}/../models/mauzo`);
const card = fs.readFileSync(`${__dirname}/../../front-end/card.html`, 'utf8')
const overview = fs.readFileSync(`${__dirname}/../../front-end/overview.html`, 'utf8')
const product = fs.readFileSync(`${__dirname}/../../front-end/product.html`, 'utf8')
const { mdaiwaReplacer, paymentReplacer } = require(`./replacement`)

const madeni = fs.readFileSync(`${__dirname}/../madeni.html`, "utf-8")

exports.kukopaPage = (req, res) => {
    res.writeHead(200, {
        "content-type": "text/html"
    });
    res.end(madeni);
}

exports.wekaWadaiwa = async(req, res) => {
    const person = await deni.find({ name: req.body.name })


    if (person.length !== 0) {
        if (req.body.name !== person[0].name) {
            let day = new Date()
            day = `${day.getDate()}/${day.getMonth()+1}/${day.getFullYear()}`;
            let mdaiwa = {...req.body, totalPrice: `${req.body.price}` * `${req.body.quantity}`, createdAt: day };
            mdaiwa = await deni.create(mdaiwa);
            let date1 = "YOU ADDED NEW ";
            let cash = " "
            let sales1 = "BORROWER";
            let total1 = "POST";
            let totalSales1 = "SUCCESSFUL"
            const cardHtml = mdaiwaReplacer(card, mdaiwa)
            let overviewHtml = overview.replace(/{%ITEMS%}/g, cardHtml);
            overviewHtml = overviewHtml.replace(/{%total_sales%}/g, totalSales1);
            overviewHtml = overviewHtml.replace(/{%SALES%}/g, sales1);
            overviewHtml = overviewHtml.replace(/{%TOTAL%}/g, total1);
            overviewHtml = overviewHtml.replace(/{%DATE%}/g, date1);
            overviewHtml = overviewHtml.replace(/{%CASH%}/g, cash);
            return res.end(overviewHtml)
        } else {
            let date1 = "ON";
            let cash = " "
            let sales1 = person[0].createdAt;
            let total1 = "HE HAS TO";
            let totalSales1 = "COMPLETE THE DEBT"
            const cardHtml = mdaiwaReplacer(card, person[0])
            let overviewHtml = overview.replace(/{%ITEMS%}/g, cardHtml);
            overviewHtml = overviewHtml.replace(/{%total_sales%}/g, totalSales1);
            overviewHtml = overviewHtml.replace(/{%SALES%}/g, sales1);
            overviewHtml = overviewHtml.replace(/{%TOTAL%}/g, total1);
            overviewHtml = overviewHtml.replace(/{%DATE%}/g, date1);
            overviewHtml = overviewHtml.replace(/{%CASH%}/g, cash);
            return res.end(overviewHtml)
        }
    } else {
        let day = new Date()
        day = `${day.getDate()}/${day.getMonth()+1}/${day.getFullYear()}`;
        let mdaiwa = {...req.body, totalPrice: `${req.body.price}` * `${req.body.quantity}`, createdAt: day };
        mdaiwa = await deni.create(mdaiwa);
        let date1 = "YOU ADDED NEW ";
        let cash = " "
        let sales1 = "BORROWER";
        let total1 = "POST";
        let totalSales1 = "SUCCESSFUL"
        const cardHtml = mdaiwaReplacer(card, mdaiwa)
        let overviewHtml = overview.replace(/{%ITEMS%}/g, cardHtml);
        overviewHtml = overviewHtml.replace(/{%total_sales%}/g, totalSales1);
        overviewHtml = overviewHtml.replace(/{%SALES%}/g, sales1);
        overviewHtml = overviewHtml.replace(/{%TOTAL%}/g, total1);
        overviewHtml = overviewHtml.replace(/{%DATE%}/g, date1);
        overviewHtml = overviewHtml.replace(/{%CASH%}/g, cash);
        return res.end(overviewHtml)
    }
}

exports.payment = async(req, res) => {
    const payer = await deni.find({ name: req.body.name });
    if (payer.length !== 0) {
        const remaining = payer[0].totalPrice - req.body.pay;
        payer[0].totalPrice = remaining;
        let x = await deni.findOneAndUpdate({ name: req.body.name }, { totalPrice: remaining }, {
            returnOriginal: false
        });
        x = await deni.deleteMany({ totalPrice: { $lte: 0 } });
        let date1;
        (remaining <= 0) ? date1 = "COMPLETED": date1 = "ON PAYMENT";

        let cash = " "
        let sales1 = " ";
        let total1 = " ";
        let totalSales1 = " "
        const cardHtml = mdaiwaReplacer(card, payer[0])
        let overviewHtml = overview.replace(/{%ITEMS%}/g, cardHtml);
        overviewHtml = overviewHtml.replace(/{%total_sales%}/g, totalSales1);
        overviewHtml = overviewHtml.replace(/{%SALES%}/g, sales1);
        overviewHtml = overviewHtml.replace(/{%TOTAL%}/g, total1);
        overviewHtml = overviewHtml.replace(/{%DATE%}/g, date1);
        overviewHtml = overviewHtml.replace(/{%CASH%}/g, cash);
        return res.end(overviewHtml);
    } else {
        let date1 = req.body.name;
        let cardHtml = " "
        let cash = " "
        let sales1 = " ";
        let total1 = " ";
        let totalSales1 = "HIS DEPT IS OVER "
        let overviewHtml = overview.replace(/{%ITEMS%}/g, cardHtml)
        overviewHtml = overviewHtml.replace(/{%total_sales%}/g, totalSales1);
        overviewHtml = overviewHtml.replace(/{%SALES%}/g, sales1);
        overviewHtml = overviewHtml.replace(/{%TOTAL%}/g, total1);
        overviewHtml = overviewHtml.replace(/{%DATE%}/g, date1);
        overviewHtml = overviewHtml.replace(/{%CASH%}/g, cash);
        return res.end(overviewHtml);
    }

}
exports.kwaMajina = async(req, res) => {
    if (req.body.name === "wote") {
        const borrowers = await deni.find();
        if (borrowers.length !== 0) {
            let date1 = "BORROWERS "
            let cash = " "
            let sales1 = " ";
            let total1 = " ";
            let totalSales1 = " "
            const cardHtml = borrowers.map(el => mdaiwaReplacer(card, el)).join("\n");
            let overviewHtml = overview.replace(/{%ITEMS%}/g, cardHtml);
            overviewHtml = overviewHtml.replace(/{%total_sales%}/g, totalSales1);
            overviewHtml = overviewHtml.replace(/{%SALES%}/g, sales1);
            overviewHtml = overviewHtml.replace(/{%TOTAL%}/g, total1);
            overviewHtml = overviewHtml.replace(/{%DATE%}/g, date1);
            overviewHtml = overviewHtml.replace(/{%CASH%}/g, cash);
            return res.end(overviewHtml);
        } else {
            let date1 = " ";
            let cardHtml = " "
            let cash = " "
            let sales1 = " ";
            let total1 = " ";
            let totalSales1 = "NO ANY BORROWER "
            let overviewHtml = overview.replace(/{%ITEMS%}/g, cardHtml)
            overviewHtml = overviewHtml.replace(/{%total_sales%}/g, totalSales1);
            overviewHtml = overviewHtml.replace(/{%SALES%}/g, sales1);
            overviewHtml = overviewHtml.replace(/{%TOTAL%}/g, total1);
            overviewHtml = overviewHtml.replace(/{%DATE%}/g, date1);
            overviewHtml = overviewHtml.replace(/{%CASH%}/g, cash);
            return res.end(overviewHtml);
        }
    } else {
        const borrower = await deni.find({ name: req.body.name });
        if (borrower.length !== 0) {
            let date1 = " ";
            let cash = " "
            let sales1 = " ";
            let total1 = " ";
            let totalSales1 = " "
            const cardHtml = mdaiwaReplacer(card, borrower[0])
            let overviewHtml = overview.replace(/{%ITEMS%}/g, cardHtml);
            overviewHtml = overviewHtml.replace(/{%total_sales%}/g, totalSales1);
            overviewHtml = overviewHtml.replace(/{%SALES%}/g, sales1);
            overviewHtml = overviewHtml.replace(/{%TOTAL%}/g, total1);
            overviewHtml = overviewHtml.replace(/{%DATE%}/g, date1);
            overviewHtml = overviewHtml.replace(/{%CASH%}/g, cash);
            return res.end(overviewHtml);
        } else {
            let date1 = req.body.name;
            let cardHtml = " "
            let cash = " "
            let sales1 = " ";
            let total1 = " ";
            let totalSales1 = "NO SUCH BORROWER "
            let overviewHtml = overview.replace(/{%ITEMS%}/g, cardHtml)
            overviewHtml = overviewHtml.replace(/{%total_sales%}/g, totalSales1);
            overviewHtml = overviewHtml.replace(/{%SALES%}/g, sales1);
            overviewHtml = overviewHtml.replace(/{%TOTAL%}/g, total1);
            overviewHtml = overviewHtml.replace(/{%DATE%}/g, date1);
            overviewHtml = overviewHtml.replace(/{%CASH%}/g, cash);
            return res.end(overviewHtml);
        }
    }
}