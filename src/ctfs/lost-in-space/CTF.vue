<template>
  <pre>  <span class="n"># 	<span class="i">include</span> 	<span class="s">&lt;stdio.h&gt;</span></span>
	
 	   <span class="i">const</span>		  <span class="i">char</span>  
	*
	  flag  	
=	
	   <span class="s">"y-E R7\x10"</span>		  	<span class="s">"cC.A3Vv\x02j\veE1Y0CmMo8Y0DfF'Tt\0h\r-D*Z/[u"</span> 
	
;	   <span class="i">int</span> 		 <span class="f">main</span> 	 
<span>(				)</span>
   {  		<span class="i">for</span>    (
			<span class="i">int</span>	
  i   	=		 	<span class="n">1</span> 	
	;
   i  	 &lt;				<span class="n">45</span>	
	
;    ++ 	
	i			
)    { 		 <span class="t">printf</span>   
(	
	 <span class="s">"%c"</span>   	,	   i 
		[		
 flag    ]		 	^		 
flag   	[	   i 
  - 		 <span class="n">1</span> 	 
]			 ) 		 ;    }
	  <span class="i">return</span> 	
 <span class="n">0</span> 	
 ; 	
 } 



</pre>
</template>

<style scoped>
@import '@/components/code-style.css';
</style>
