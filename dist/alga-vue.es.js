import{computed as e}from"vue";function l(l,u){return{getColumnProperties:e((()=>l.value.map((e=>{if("object"==typeof e&&"prop"in e||"property"in e)return e.prop||e.property})))),getColumnData:e=>{const l=u.value.map((l=>l[e]));return Array.from(new Set(l))}}}function u(l,u,r){const t=e((()=>{let e=[];return e=u.value.length>1?l.value.filter((e=>{for(const l of Object.keys(e)){if(!1===isNaN(e[l])&&Number(e[l])===Number(u.value))return!0;if("string"==typeof e[l]&&e[l].toLowerCase().includes(u.value.toLowerCase()))return!0}return!1})):l.value,e})),a=e((()=>{const e={},l=new Set(["",0,null,void 0]);for(const u of Object.keys(r.value))l.has(r.value[u])||(e[u]=r.value[u]);return e})),n=e((()=>{let e=t.value;for(const l of Object.keys(a.value))e=e.filter((e=>{if(l in e){if(!1===isNaN(e[l])&&Number(e[l])===Number(a.value[l]))return!0;if("string"==typeof e[l]&&e[l].toLowerCase().includes(a.value[l].toLowerCase()))return!0}return!1}));return e}));return{searchedEntries:t,getCleanFilter:a,filteredEntries:n}}function r(l,u){return{sortedEntries:e((()=>{let e=l.value;return"by"in u.value&&""!==u.value.by&&e.sort(((e,l)=>{if(u.value.col in e&&u.value.col in l){if(!1===isNaN(e[u.value.col])&&!1===isNaN(l[u.value.col]))return"asc"===u.value.by?Number(e[u.value.col])-Number(l[u.value.col]):Number(l[u.value.col])-Number(e[u.value.col]);if("string"==typeof e[u.value.col]&&"string"==typeof l[u.value.col])return"asc"===u.value.by?e[u.value.col].localeCompare(l[u.value.col]):l[u.value.col].localeCompare(e[u.value.col])}})),e}))}}function t(l,u,r,t){const a=e((()=>u.value*r.value-(u.value-1))),n=e((()=>{let e=Math.ceil(l.value.length/u.value);return e<1&&(e=1),e})),o=e((()=>l.value.slice(a.value-1,u.value*r.value))),v=e((()=>{const e=u.value*r.value;return{start:a.value,end:e<l.value.length?e:l.value.length,length:l.value.length}})),i=e((()=>{let e=[];const l=n.value<r.value?n.value:r.value,u=r.value<1?1:r.value,a=l+t.value,o=u-t.value;if(0===t.value)for(let r=1;r<=n.value;r++)e.push(r);else{if(u>1)for(let l=o;l<u;l++)e.push(l);for(let u=l;u<=a;u++)e.push(u)}const v=e.filter((e=>Number(e)>0)).filter((e=>Number(e)<=n.value));return a<n.value&&0!==t.value&&v.push("..."),o>1&&0!==t.value&&v.unshift("..."),v}));return{getOffset:a,getPages:n,paginatedEntries:o,getPageInfo:v,getPagination:i,handleEllipsis:(e,l)=>{let u=l,r=Math.floor(Number(l)/2),t=l;return Number(l)%2==0&&(t=Number(l)+1),u=Number(e)<=r?t-(Number(e)-1):r,u}}}export{u as useFilter,t as usePaginate,r as useSort,l as useTable};
