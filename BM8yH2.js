import{o,c as n,a as e,b as t}from"./Dba_Ss.js";const a={class:"markdown-body"},l=e("p",null,"Capture The Flag (CTF) is a cybersecurity contest where players are tasked with solving different security-related challenges. These challenges could involve decoding or encoding data, uncovering hidden details in files or pictures, or taking advantage of system weaknesses. However, what we have here should not be technically referred to as CTF. Instead, they are more like puzzles or riddles that need to be solved.",-1),r=e("p",null,"The objective is to locate a specific string of text, referred to as “flags”, which are concealed in intentionally complex files or websites. For this website, all flags must be submitted in the following format:",-1),c=e("pre",null,[e("code",null,`cStDf{...}
`)],-1),i=e("p",null,[t("A flag can only include "),e("strong",null,"lowercase and uppercase letters, numbers, and underscores"),t(". A flag will contain at least one character and is case-sensitive.")],-1),d=e("p",null,"For this introductory challenge, simply input the flag from below and click on Check.",-1),h=[l,r,c,i,d],m={__name:"description",setup(u,{expose:s}){return s({frontmatter:{}}),(p,_)=>(o(),n("div",a,h))}};export{m as default};