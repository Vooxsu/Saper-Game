/*
function stworz() {

    document.getElementById("tabela").rows[i].cells[g].id = "x" + a;
    document.getElementById("tabela").rows[i].cells[g].setAttribute("onclick", "zmien(this.id);");
}
function zmien(id) {
    document.getElementById(id).style.backgroundColor = kolor;
}

document.getElementById("losowy").addEventListener("click", function () {
        zmienna = parseInt(Math.floor(Math.random() * 16));
});
const draw = function (e) {
    if (active == false) return;
    const x = e.clientX;
    const y = e.clientY;
    const div = document.createElement("div");
    document.getElementById("centrum").appendChild(div);

}
pola.splice(pola.indexOf(losowa), 1);
*/
var czy_liczba = /^[0-9]{0,}$/;
var pola = [];
var W_planszy;
var gra_trwa = false;
var losowa;
var g;
var p;
var z_bomba = 0;
var zostalo;

//wybór ile plansza ma mieć pól
function Wybor_planszy() {
    if (gra_trwa == false) {
        W_planszy = parseInt(prompt("Jaką planszę byś chciał podaj liczbę"));
        if ((((W_planszy != null) || (W_planszy != 0)) || ((W_planszy != 0) || (W_planszy != 2))) && (czy_liczba.test(W_planszy))) {
            gra_trwa = !gra_trwa;
            Budowa();
        } else Wybor_planszy();
    } else alert("Gra już Trwa");
}
//budowanie planszy
function Budowa() {
    //ile liczb losowych
    g = W_planszy + 2;
    //wielkość planszy
    p = W_planszy * W_planszy;
    zostalo = p - g;

    //tworzenie pol logicznych
    let o = 0;
    for (let c = 0; c < W_planszy; c++) {
        for (let x = 0; x < W_planszy; x++) {

            pola[o] = {
                pole: o,
                x: x,
                y: c,
                bomba: false
            };
            o++;
        }
    }

    //generowanie pól z bombą
    for (let c = 0; c < g; c++) {
        losowa = parseInt(Math.floor(Math.random() * p));
        for (let x = 0; x < p; x++) {
            if ((losowa == pola[x].pole) && (pola[x].bomba == true)) {
                c = c - 1;
            }
            if ((losowa == pola[x].pole) && (pola[x].bomba == false)) {
                pola[x].bomba = true;
            }
        }

    }
    //generowanie planszy widocznej
    let j = 0
    for (let i = 0; i < W_planszy; i++) {
        for (let z = 0; z < W_planszy; z++) {

            var gozik = document.createElement('button');
            gozik.id = "x" + pola[j].x + "_y" + pola[j].y;
            gozik.setAttribute("type", "button");
            gozik.setAttribute("onclick", "Sprawdz(this.id)");
            gozik.style.backgroundColor = "lightgray";
            gozik.style.textAlign = "center";
            gozik.style.height = "25px";
            gozik.style.width = "25px";
            gozik.sstyle

            j++;
            document.getElementById("Plansza").appendChild(gozik);
        }
        document.getElementById("Plansza").appendChild(document.createElement('br'));
    }
}


//zamiast podawać ile pól do okoła jest bez bomby będę podawał ile jest pól z bombą
function Sprawdz(id) {
    //sprawdzanie czy przegrana?
    for (let x = 0; x < p; x++) {
        if (id == ("x" + pola[x].x + "_y" + pola[x].y)) {
            if (pola[x].bomba == true) {
                for (let h = 0; h < p; h++) {
                    if (pola[h].bomba == true) {
                        document.getElementById("x" + pola[h].x + "_y" + pola[h].y).style.backgroundImage = "url('Resource/bomba.png')";

                    }
                }

            }
            if (pola[x].bomba == false) {

                if (x == 0) {
                    if (pola[x + 1].bomba == true) z_bomba++;
                    if (pola[x + W_planszy].bomba == true) z_bomba++;
                    if (pola[x + (W_planszy + 1)].bomba == true) z_bomba++;
                }




                if (z_bomba == 0) document.getElementById(id).style.backgroundColor = "gray";
                else
                    document.getElementById(id).style.backgroundImage = "url('Resource/" + z_bomba + ".png')";
                z_bomba = 0;

                zostalo--;
                if (zostalo == 0) {
                    alert("Gratuluję");
                }
            }
        }
    }


}

/*
function Sprawdz(id) {
    //sprawdzanie czy przegrana?
    for (let v = 0; v < p; v++) {
        if (id == "miejsce" + v) {
            if (pola[v].bomba == true) {
                for (let h = 0; h < p; h++) {
                    if (pola[h].bomba == true) {
                        document.getElementById("miejsce" + (pola[h].pole)).style.backgroundImage = "url('Resource/bomba.png')";
                    }
                }
            }

            if (pola[v].bomba == false) {
                if ((v - (W_planszy - 1)) > 0)
                    if (pola[v - (W_planszy - 1)].bomba == true) z_bomba++;

                if ((v - W_planszy) > 0)
                    if (pola[v - W_planszy].bomba == true) z_bomba++;

                if ((v - (W_planszy + 1)) > 0)
                    if (pola[v - (W_planszy + 1)].bomba == true) z_bomba++;

                if (pola[v - 1].bomba == true) z_bomba++;
                if (pola[v + 1].bomba == true) z_bomba++;
                if (v < p + W_planszy - 1)
                    if (pola[v + (W_planszy - 1)].bomba == true) z_bomba++;

                if (v < p + W_planszy )
                    if (pola[v + W_planszy].bomba == true) z_bomba++;

                if (pola[v + (W_planszy + 1)].bomba == true) z_bomba++;

                document.getElementById(id).style.backgroundImage = "url('Resource/" + z_bomba + ".png')";
                z_bomba = 0;
            }



        }
    }
}*/
