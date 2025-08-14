let time = document.getElementById("time")
let giay = 0;
let dangChay = false;
let dongHoChay = null;
let winText = document.getElementById("winText")
let thoiGianKetThuc = "";
let hop = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, null]
let soHang = 3;
let soCot = 4;
let count = 0
let soLanChoi = 0;

function hienThiDongHoChay() {
    const phut = Math.floor(giay / 60);
    const giayConDu = giay % 60;

const chuoiPhut = phut < 10 ? "0" + phut : phut;
const chuoiGiay = giayConDu < 10 ? "0" + giayConDu : giayConDu;

time.textContent = `${chuoiPhut}:${chuoiGiay}`
}

function batDauDemGio(){
    dongHoChay = setInterval(() => {
        giay ++
        hienThiDongHoChay();
    }, 1000)
}

function dungDemGio() {
    clearInterval(dongHoChay);
}

const nutBam = document.getElementById("button")
nutBam.addEventListener("click", function () {
    if (!dangChay) {
        count = 0;
        giay = 0;
        dangChay = true;
        nutBam.textContent = "Kết Thúc"
        nutBam.className = "stop"
        batDauDemGio();

        hop = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, null];
        tron(hop, 100);
        hopMoi();
        winText.textContent = "";
    }
    else {
        dangChay = false;
        dungDemGio();
        nutBam.textContent = "Bắt đầu"
        nutBam.className = "start"
    }
}
)


window.onload = function () {
    tron(hop, 100);
    hopMoi();
}

function hopMoi() {
    for (let i = 0; i < 12; i++) {
        let hopHTML = document.getElementById("box-" + (i +1));
        
        if (hop[i] === null){
            hopHTML.textContent = "";
            hopHTML.className = "box box-12";
        }

        else {
            hopHTML.textContent = hop[i];
            hopHTML.className = "box box-" + hop[i];
        }
    }
}

function tron(hop, soLanTron) {
    for (let i = 0; i < soLanTron; i++){
        let hopA = Math.floor(Math.random() * hop.length);
        let hopB = Math.floor(Math.random() * hop.length);

        let a = hop[hopA];
        hop[hopA] = hop[hopB];
        hop[hopB] = a;
    }
}




function timNull() {
    return hop.indexOf(null);
}

function diChuyen(huong) { 
    let viTricuaNull = timNull();
    let viTriMoi = -1

    switch(huong) {
        case "trai": {
            if (viTricuaNull % soCot !== 0){
                viTriMoi = viTricuaNull - 1
            }
        }
        break;
        case "phai": {
            if (viTricuaNull % soCot !== soCot - 1){
                viTriMoi = viTricuaNull + 1
            }
        }
        break;
        case "len": {
            if (viTricuaNull >= soCot ){
                viTriMoi = viTricuaNull - soCot
            }
        }
        break;
        case "xuong": {
            if (viTricuaNull < soCot * (soHang - 1)){
                viTriMoi = viTricuaNull + soCot
            }
        }
        break;
    }

    if (viTriMoi >= 0) {
        let a = hop[viTricuaNull];
        hop[viTricuaNull] = hop[viTriMoi];
        hop[viTriMoi] = a;

        hopMoi();
        
        count++

        soBuoc()
    }

    if (daThang()) {
        dungDemGio();
        nutBam.textContent = "Bắt đầu";
        nutBam.className = "start";
        alert("You Win")
        // winText.textContent = "You Win"
        // winText.className = "p"
        dangChay = false;
        thoiGianKetThuc = `${chuoiPhut}:${chuoiGiay}`;
        themLichSu(count, thoiGianKetThuc); 
        return;
    }
}

window.addEventListener("keydown", function(event) {
    switch(event.key.toLowerCase()) {
        case "a": 
            diChuyen("trai");
            break;
        case "d": 
            diChuyen("phai");
            break;
        case "w": 
            diChuyen("len");
            break;
        case "s": 
            diChuyen("xuong");
            break;
        case "arrowleft":
            diChuyen("trai");
            break;
        case "arrowright":
            diChuyen("phai");
            break;
        case "arrowup":
            diChuyen("len");
            break;
        case "arrowdown":
            diChuyen("xuong");
            break;
    }
});



function daThang() {
    for(let i = 0; i < hop.length-1; i++) {
        if (hop[i] !== i + 1) {
            return false;
        }
    }
    return hop[hop.length -1] ===null;
}


function demSoLan() {
    if(daThang()){
        count++;
    }
}

function themLichSu(buoc, thoiGian) {
    soLanChoi++;
    const lichSu = document.getElementById("history-1");

    const dongMoi = document.createElement("div");
    dongMoi.classList.add("component");

    dongMoi.innerHTML = `
        <div><h5>${soLanChoi}</h5></div>
        <div><h5>${buoc}</h5></div>
        <div><h5>${thoiGian}</h5></div>
    `;

    lichSu.appendChild(dongMoi);
}
