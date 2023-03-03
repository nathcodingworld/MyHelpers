

class Extension extends Renderer {
    constructor() { super() }
    tableSpliter({ tableid, tdFrom, tdTo }) {
        const table = document.getElementById(tableid);
        const targetHeadTr = table.querySelector("thead > tr:not(.splitedtable thead tr)");
        const targetBodyTr = table.querySelectorAll("tbody > tr:not(.splitedtable tbody tr)");
        const splitedTh = cutter(targetHeadTr);
        targetBodyTr?.forEach((tr) => {
          const splitedTd = cutter(tr);
          const splitedTr = document.createElement("tr");
          splitedTr.innerHTML = `
                    <td colspan=${tdTo - tdFrom + 1}>
                      <table class="table splitedtable">
                        <thead>
                            <tr>
                            ${splitedTh.innerHTML}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            ${splitedTd.innerHTML}
                            </tr>
                        </tbody>
                      </table>
                    </td>
                 `;
          tr.insertAdjacentElement("afterend", splitedTr);
        });
        function cutter(tr) {
          const trow = document.createElement("tr");
          if (tr.childElementCount >= tdTo)
            for (let i = tdFrom - 1; i < tdTo; i++) {
              trow.append(tr.children[tdFrom - 1]);
            }
          return trow;
        }
      }
}