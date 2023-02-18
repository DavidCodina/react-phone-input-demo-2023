import{u,r,j as t,a as e,T as m,H as p,I as i,W as b}from"./index-9e4b41e8.js";const y=()=>{u("Demo");const[c,d]=r.useState("+12065554433"),[h,s]=r.useState("+12065554433");return t("div",{className:"2xl:container flex-1 mx-auto w-full p-6",children:[e(m,{style:{marginBottom:50,textAlign:"center"},children:"Demo"}),e(p,{style:{marginBottom:50}}),e(i,{label:"Phone Number:",labelClassName:"text-sm font-bold text-blue-500",labelStyle:{},labelRequired:!0,defaultCountry:"US",formGroupStyle:{marginBottom:25,maxWidth:800},formGroupClassName:"mx-auto shadow-sm",inputClassName:"form-control form-control-sm",inputStyle:{},onChange:(n,o,l,a)=>{console.log({newValue:n,countryCallingCode:o,countryCode:l,isCorrectLength:a}),d(n)},placeholder:"Phone Number...",value:c}),e(i,{label:"Phone Number:",labelClassName:"text-sm font-bold text-blue-500",labelStyle:{},labelRequired:!0,international:!0,defaultCountry:"US",formGroupStyle:{marginBottom:25,maxWidth:800},formGroupClassName:"mx-auto shadow-sm",inputClassName:"form-control form-control-sm",inputStyle:{},onChange:(n,o,l,a)=>{console.log({newValue:n,countryCallingCode:o,countryCode:l,isCorrectLength:a}),s(n)},value:h}),t("section",{className:"bg-white mx-auto p-4 border border-gray-100 rounded-xl text-sm",style:{maxWidth:800},children:[t("p",{children:[e("span",{className:"font-bold text-blue-500",children:"Gotcha:"})," Suppose that"," ",e("code",{children:"react-phone-number-input"})," is set to"," ",e("code",{children:"international={false}"}),", and the country code is set to"," ",e("code",{children:"'US'"}),". In that case, if the initial value (i.e., value on mount) lacks ",e("code",{children:"'+1'"}),", then"," ",e("code",{children:"react-phone-number-input"})," won't render the value. This is the default behavior of the library."]}),t("p",{children:["This might occur in cases where the database previously stored the"," ",e("em",{children:"raw value"})," in a different format, and we're now using"," ",e("code",{children:"react-phone-number-input"})," on the client. However, if we're trying to render the initial value in an edit form,"," ",e("em",{children:"it will not output"}),"."]}),t("p",{className:"mx-10",children:[t("span",{className:"text-blue-500 font-bold",children:["Solution 1: ",e("code",{children:"enableFallbackInput"}),":"]})," ","The above component is called ",e("code",{children:"InputPhone"}),", and is an abstraction of ",e("code",{children:"react-phone-number-input"}),". By setting"," ",e("code",{children:"enableFallbackInput"})," to ",e("code",{children:"true"})," it allows"," ",e("code",{children:"InputPhone"})," to fallback to a standard"," ",e("code",{children:"<input type='tel' />"}),"."]}),t("p",{className:"mx-10",children:[t("span",{className:"text-blue-500 font-bold",children:["Solution 2 ",e("code",{children:"formatRawValue"}),":"]})," ","By setting ",e("code",{children:"formatRawValue"})," to ",e("code",{children:"true"}),","," ",e("code",{children:"InputPhone"})," will observe the raw value, and add"," ",e("code",{children:"'+'"})," or ",e("code",{children:"'+1'"})," to it if it is lacking (when"," ",e("code",{children:"'US'"}),"/",e("code",{children:"!international"}),"). The ",e("code",{children:"'+1'"})," ","is never observable in the formatted UI, but will exist on the raw state value. ",e("strong",{className:"text-blue-500",children:"Note:"})," ",e("code",{children:"enableFallbackInput"})," has precedence over"," ",e("code",{children:"formatRawValue"}),". Thus, if both are set to"," ",e("code",{children:"true"}),", only ",e("code",{children:"enableFallbackInput"})," will be implemented."]}),e("p",{className:"text-center",children:"---"}),t("p",{children:["By default, with the international version the number will still appear in the UI (even if missing ",e("code",{children:"'+'"})," and country), but it won't be formatted. Unfortunately, with international numbers there's just no way to know in advance what the country code is."]}),t("p",{children:["That said, ",e("code",{children:"react-phone-number-input"})," does attempt to infer the country code and formatting. Presumably, this is based both on the initial number (i.e., presumed country code) and the total length of the number."]}),t("p",{children:["If ",e("code",{children:"defaultCountry"})," is provided to the international version, it will only default to that country If the initial value is a partial or full match. For example, if we set"," ",e("code",{children:"defaultCountry"})," to",e("code",{children:"'US'"}),", the initial value can be ",e("code",{children:"''"}),","," ",e("code",{children:"'+'"}),", ",e("code",{children:"'+1'"}),", ",e("code",{children:"'+12'"}),", etc. Conversely, ",e("code",{children:"'206'"}),", ",e("code",{children:"'5'"}),", etc. won't work, and will instead just show the international option."]}),t("p",{children:["Ultimately, it seems preferable to opt for something simpler. For example, a basic ",e("code",{children:"<input type='tel />"})," that allows the user to enter whatever they want. Libraries like"," ",e("code",{children:"react-phone-number-input"})," just seem like they have the potential to incorrectly alter the user's number. The other solution is to ",e("em",{children:"always"})," use the international version."]})]}),e(b,{})]})};export{y as default};
