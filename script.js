const calc=document.getElementById('calc'), section=document.getElementById('calculator');
const euro=n=>new Intl.NumberFormat('pt-PT',{style:'currency',currency:'EUR'}).format(Number(n)||0);
function openTool(t){section.classList.remove('hidden');let html='';
const base=(title,body)=>`<h2>${title}</h2><div class="form">${body}</div>`;
if(t==='salary') html=base('Calculadora de salário líquido 2026',`
<label>Salário bruto mensal (€)<input id="gross" type="number" value="2000"></label>
<label>Segurança Social (%)<input id="ss" type="number" value="11"></label>
<label>IRS estimado (%)<input id="irs" type="number" value="12"></label>
<button class="btn" onclick="salary()">Calcular</button><div id="out"></div>`);
if(t==='freelancer') html=base('Calculadora de recibos verdes',`
<label>Faturação mensal sem IVA (€)<input id="gross" type="number" value="2000"></label>
<label>Retenção IRS (%)<input id="irs" type="number" value="23"></label>
<label>Segurança Social estimada (%) sobre base relevante<input id="ss" type="number" value="21.4"></label>
<label>IVA (%)<input id="vat" type="number" value="23"></label>
<button class="btn" onclick="freelancer()">Calcular</button><div id="out"></div>`);
if(t==='car') html=base('Calculadora de custo do carro',`
<label>Quilómetros por mês<input id="km" type="number" value="1500"></label>
<label>Consumo (L/100 km)<input id="cons" type="number" value="6.5"></label>
<label>Preço combustível (€/L)<input id="fuel" type="number" value="1.75" step=".01"></label>
<label>Seguro mensal (€)<input id="ins" type="number" value="50"></label>
<label>Manutenção mensal (€)<input id="maint" type="number" value="60"></label>
<button class="btn" onclick="car()">Calcular</button><div id="out"></div>`);
if(t==='rent') html=base('Calculadora de renda acessível',`
<label>Rendimento líquido mensal (€)<input id="income" type="number" value="2000"></label>
<label>Percentagem máxima da renda (%)<input id="pct" type="number" value="35"></label>
<button class="btn" onclick="rent()">Calcular</button><div id="out"></div>`);
if(t==='home') html=base('Calculadora de custo inicial da casa',`
<label>Preço da casa (€)<input id="price" type="number" value="250000"></label>
<label>Entrada (%)<input id="down" type="number" value="20"></label>
<label>IMT estimado (%)<input id="imt" type="number" value="4"></label>
<label>Imposto do Selo (%)<input id="stamp" type="number" value="0.8"></label>
<label>Outros custos (€)<input id="other" type="number" value="2500"></label>
<button class="btn" onclick="home()">Calcular</button><div id="out"></div>`);
if(t==='solar') html=base('Calculadora de poupança solar',`
<label>Consumo mensal (kWh)<input id="use" type="number" value="400"></label>
<label>Potência solar (kW)<input id="kw" type="number" value="4"></label>
<label>Preço eletricidade (€/kWh)<input id="price" type="number" value=".22" step=".01"></label>
<label>Produção estimada por kW/mês (kWh)<input id="prod" type="number" value="120"></label>
<button class="btn" onclick="solar()">Calcular</button><div id="out"></div>`);
calc.innerHTML=html;section.scrollIntoView({behavior:'smooth'});
}
function closeTool(){section.classList.add('hidden')}
function result(main,sub){document.getElementById('out').innerHTML=`<div class="result"><strong>${main}</strong><p>${sub}</p></div>`}
function salary(){let g=+gross.value, s=g*(+ss.value/100), i=g*(+irs.value/100);result(euro(g-s-i),`Estimativa mensal: SS ${euro(s)} + IRS ${euro(i)}. Não substitui uma simulação fiscal oficial.`)}
function freelancer(){let g=+gross.value, i=g*(+irs.value/100), base=g*.7, s=base*(+ss.value/100), v=g*(+vat.value/100);result(euro(g-i-s),`Estimativa simples antes de outras obrigações. IVA a faturar: ${euro(v)}. Confirme o seu regime aplicável.`)}
function car(){let k=+km.value, fuelCost=k*(+cons.value/100)*(+fuel.value);let total=fuelCost+(+ins.value)+(+maint.value);result(euro(total)+` / mês`,`${euro(total/k)} por km. Combustível: ${euro(fuelCost)} por mês.`)}
function rent(){let x=+income.value*(+pct.value/100);result(euro(x),`Renda mensal de referência usando ${pct.value}% do rendimento líquido.`)}
function home(){let p=+price.value,d=p*(+down.value/100),i=p*(+imt.value/100),s=p*(+stamp.value/100),o=+other.value;result(euro(d+i+s+o),`Capital inicial estimado: entrada ${euro(d)} + IMT ${euro(i)} + selo ${euro(s)} + outros ${euro(o)}.`)}
function solar(){let u=+use.value,k=+kw.value,pr=+price.value,gen=k*(+prod.value),save=Math.min(u,gen)*pr;result(euro(save)+` / mês`,`Produção estimada: ${Math.round(gen)} kWh/mês. Poupança estimada: ${euro(save)}.`)}
