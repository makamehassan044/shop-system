// const sub1 = document.querySelector("#sub1");
// const input1 = document.querySelectorAll(".input1");
// sub1.addEventListener("click", () => {
//     input1.forEach(el => {
//         el.value = " ";
//     })
// })
// const sub2 = document.querySelector("#sub2");
// const input2 = document.querySelectorAll(".input2");
// sub2.addEventListener("click", () => {
//     input1.forEach(el => {
//         el.value = " ";
//     })
// })
// const sub3 = document.querySelector("#sub3");
// const input3 = document.querySelectorAll(".input3");
// sub3.addEventListener("click", () => {
//     input1.forEach(el => {
//         el.value = " ";
//     })



// })
let bidhaa = [];
let list
const input1 = document.querySelector(".input1");
const matchList = document.querySelector("#match-list");



const searchStates = async searchText => {
    if (searchText.length !== 0) {
        searchText.toLowerCase()
        const res = await axios.get("http://127.0.0.1:777/duka/v1/bidhaa/zote")
        bidhaa = res.data
            // console.log(bidhaa)
        const filtered = bidhaa.filter(el => el.name.toLowerCase().includes(searchText))
            // console.log(filtered)
        const filteredHtml = filtered.map(el => {
            return `<li style="list-style:none;font-size:medium" class="li"> ${el.name} </li>`;
        }).join(" ");
        // console.log(filteredHtml);
        matchList.innerHTML = filteredHtml;
        list = document.querySelectorAll(".li");
        list.forEach(el => {

            el.addEventListener("click", () => {
                let txt = el.innerText;
                input1.value = txt;
            })
        })
        console.log(list);
    } else {
        list.forEach(el => {
            el.remove();
        })
    }

}
input1.addEventListener("input", ({ target: t }) => searchStates(t.value.toLowerCase()))





// console.log(filteredHtml);