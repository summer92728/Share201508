var oTab = document.getElementById("tab");
var oBody = oTab.tBodies[0];
var oHead = oTab.tHead;
var oRows = oBody.rows;
var oThs = oHead.rows[0].cells;
//数据绑定
function bindData() {
    var frg = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
        var cur = data[i];
        cur.name = cur.name || "--";
        cur.age = cur.age || "--";
        cur.score = cur.score || "0";
        cur.sex = cur.sex === 0 ? "男" : "女";
        var oTr = document.createElement("tr");
        for (var key in cur) {
            var oTd = document.createElement("td");
            oTd.innerHTML = cur[key];
            oTr.appendChild(oTd);
        }
        frg.appendChild(oTr);
    }
    oBody.appendChild(frg);
}
bindData();
function changeBg() {
    for (var i = 0; i < oRows.length; i++) {
        oRows[i].className = i % 2 == 1 ? "select" : null;
        oRows[i].onmousemove = function () {
            this.style.backgroundColor = "blue";
        };
        oRows[i].onmouseout = function () {
            this.style.backgroundColor = "";
        };
    }
}
changeBg();
function sortList(index) {
    var ary = utils.listToArray(oRows);
    for (var j = 0; j < oThs.length; j++) {
        if (j !== index) {
            oThs[j].isClick = false;
        }
    }
    if (!this.isClick) {
        ary.sort(function (a, b) {
            var nowIn = a.cells[index].innerHTML;
            var nexIn = b.cells[index].innerHTML;
            var nowInNum = parseFloat(nowIn);
            var nexInNum = parseFloat(nexIn);
            if (isNaN(nowInNum)) {
                return nowIn.localeCompare(nexIn);
            }
            return nexIn - nowIn;
        });
        this.isClick = true;
    }
    ary.reverse();
    var frg = document.createDocumentFragment();
    for (var i = 0; i < ary.length; i++) {
        frg.appendChild(ary[i]);
    }
    oBody.appendChild(frg);
    frg=null;
    changeBg();
}
for (var i = 0; i < oThs.length; i++) {
    var oTh = oThs[i];
    if (oTh.className === "even") {
        oTh.index = i;
        oTh.isClick = false;
        oTh.onclick = function () {
            sortList.call(this, this.index);
        }
    }
}