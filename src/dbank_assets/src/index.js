import { FuncClass } from "@dfinity/candid/lib/cjs/idl";
import { dbank } from "../../declarations/dbank"

window.addEventListener("load", async function() {
    //console.log("Finish loading");
    update();

});

document.querySelector("form").addEventListener("submit", async function(event){
    event.preventDefault();
    //console.log("submited.")

    const button = event.target.querySelector("#submit-btn");

    const inputAmount = parseFloat(document.getElementById("input-amount").value);
    const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);

    button.setAttribute("disabled", true);

    if (document.getElementById("input-amount").value.length !=0) {
        await dbank.topUp(inputAmount);

    };

    if (document.getElementById("withdrawal-amount").value.length !=0){
        await dbank.withdrawl(outputAmount);
    }

        await dbank.compound();
    update();
    document.getElementById("input-amount").value = "";
    document.getElementById("withdrawal-amount").value = "";
    button.removeAttribute("Disabled");


});

async function update() {
    const currentAmount =await dbank.checkBalance();
    document.getElementById("value").innerText =Math.round(currentAmount * 100)/ 100;
};